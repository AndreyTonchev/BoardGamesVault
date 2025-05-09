import { useNavigate } from 'react-router';
import InputField from '../../ui/InputField';
import supabase from '../../services/supabase';
import { useState } from 'react';
import Button from '../../ui/Button';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleRedirect() {
        navigate('/signup');
    }

    async function handleLogIn(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;

            console.log('user logged: ', data);

            navigate('/');
        } catch (error) {
            setError(error);
        } finally {
            p;
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-xs"></div>
            <div className="z-20 container flex w-[25%] flex-col items-center">
                <h2 className="pt-5 text-2xl font-semibold text-neutral-200">
                    Log in
                </h2>

                <form
                    className="flex w-full flex-col gap-10 p-4"
                    onSubmit={handleLogIn}
                >
                    <div className="flex flex-col gap-3">
                        <InputField
                            bgColor="bg-neutral-900"
                            placeholder="Username"
                            required={true}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                            Email:
                        </InputField>
                        <InputField
                            bgColor="bg-neutral-900"
                            placeholder="Password"
                            type="password"
                            required={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                            Password:
                        </InputField>
                    </div>

                    <Button>{loading ? 'Logging in...' : 'Log in'}</Button>
                    {error && (
                        <span className="self-center text-red-400">
                            Invalid Email or Password!
                        </span>
                    )}
                </form>

                <span className="text-neutral-200">
                    Don't have an account?{' '}
                    <a
                        className="text-blue-400"
                        href="#"
                        onClick={handleRedirect}
                    >
                        Sign Up
                    </a>
                </span>
            </div>
        </div>
    );
}

export default Login;
