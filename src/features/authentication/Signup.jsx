import { useNavigate } from 'react-router';
import InputField from '../../ui/InputField';
import { useState } from 'react';
import supabase from '../../services/supabase';
import Button from '../../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

function Signup() {
    const navigate = useNavigate();
    const { signUp } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleRedirect() {
        navigate('/login');
    }

    async function handleSignUp(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (password !== passwordConfirmation) {
                throw new Error('Passwords does not match');
            }

            if (password.length < 6) {
                throw new Error('Password must be at least 6 symbols');
            }

            const { data, error } = await signUp(email, password, username);
            if (error) throw error;

            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-xs"></div>
            <div className="z-20 container flex w-[25%] flex-col items-center">
                <h2 className="pt-5 text-2xl font-semibold text-neutral-200">
                    Sign up
                </h2>

                <form
                    className="flex w-full flex-col gap-10 p-4"
                    onSubmit={handleSignUp}
                >
                    <div className="flex flex-col gap-3">
                        <InputField
                            placeholder="Username"
                            required={true}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        >
                            Username:
                        </InputField>
                        <InputField
                            placeholder="youremail@mail.com"
                            required={true}
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        >
                            Email:
                        </InputField>
                        <InputField
                            placeholder="Password"
                            type="password"
                            required={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                            Password:
                        </InputField>
                        <InputField
                            placeholder="Confirm Password"
                            type="password"
                            required={true}
                            value={passwordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                        >
                            Confirm Password:
                        </InputField>
                    </div>

                    <Button>
                        {loading ? 'Creating account...' : 'Sign up'}
                    </Button>
                    {error && (
                        <span className="self-center text-red-400">
                            {error}
                        </span>
                    )}
                </form>

                <span className="text-neutral-200">
                    Already have an account?{' '}
                    <a
                        className="text-blue-400"
                        href="#"
                        onClick={handleRedirect}
                    >
                        Log in
                    </a>
                </span>
            </div>
        </div>
    );
}

export default Signup;
