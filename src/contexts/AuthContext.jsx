import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../services/supabase';

const AuthContext = createContext();
const initiialState = null;

function AuthProvider({ children }) {
    const [user, setUser] = useState(initiialState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initializeAuth() {
            try {
                const {
                    data: { session },
                    error,
                } = await supabase.auth.getSession();

                if (error) {
                    console.error(
                        'There was an error getting the session: ',
                        error,
                    );
                } else {
                    setUser(session?.user ?? null);
                }
            } catch (error) {
                console.error('Error initializing Auth: ', error);
            } finally {
                setLoading(false);
            }
        }

        initializeAuth();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.email);

            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                setUser(session?.user ?? null);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
            }

            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const logIn = async (email, password) => {
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            setUser(data.user);
            return { data, error: null };
        } catch (error) {
            console.error('Error signing in:', error);
            return { data: null, error };
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email, password, username) => {
        try {
            setLoading(true);
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { display_name: username },
                },
            });

            if (signUpError) throw signUpError;

            if (data.user) {
                const { error: profileError } = await supabase
                    .from('user_profiles')
                    .insert([
                        {
                            id: data.user.id,
                            username: username,
                            display_name: username,
                        },
                    ]);

                if (profileError) throw profileError;
            }

            return { data, error: null };
        } catch (error) {
            console.error('Error signing up:', error);
            return { data: null, error };
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        try {
            setLoading(true);

            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                console.log(
                    'No active session found, cleaning up local state only',
                );
                setUser(null);
                return { error: null };
            }

            console.log('Active session found, signing out');
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error('Logout error:', error);

                setUser(null);
                throw error;
            }

            setUser(null);
            return { error: null };
        } catch (error) {
            console.error('Error signing out:', error);

            setUser(null);
            return { error };
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        logIn,
        signUp,
        logOut,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within the Provider');
    }

    return context;
}

export { AuthProvider, useAuth };
