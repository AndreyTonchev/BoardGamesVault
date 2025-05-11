import { Outlet, useLocation, useNavigation } from 'react-router';
import { FaHome, FaUser, FaDice, FaDiceD20 as Logo } from 'react-icons/fa';
import {
    FaArrowRightFromBracket as LogOutIcon,
    FaArrowRightToBracket as LogInIcon,
} from 'react-icons/fa6';

import supabase from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';
import Dropdown from './DropDown';
import NavButton from './NavButton';
import SearchBar from './SearchBar';
import Loader from './Loader';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

function AppLayout() {
    const { user, logOut, loading: authLoading } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';

    return (
        <>
            {isLoading && <Loader />}
            <aside className="container flex h-auto w-[15%] flex-col justify-between">
                <div>
                    <header className="my-5 flex flex-col items-center gap-1 text-center text-4xl">
                        <Logo className="" />
                        Board Games Vault
                    </header>
                    <div className="flex flex-col space-y-4">
                        <NavButton to="/" icon={<FaHome />}>
                            Home
                        </NavButton>
                        <NavButton
                            to={user ? `profile/${user.id}` : 'login'}
                            icon={<FaUser />}
                        >
                            Profile
                        </NavButton>
                        <NavButton to="games" icon={<FaDice />}>
                            Games
                        </NavButton>
                    </div>
                </div>
                {user ? (
                    <button
                        className="m-1 flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xl underline-offset-3 transition-all duration-300 hover:bg-neutral-700"
                        onClick={() => {
                            logOut();
                            navigate('/');
                        }}
                        disabled={authLoading}
                    >
                        <LogOutIcon />
                        {authLoading ? 'Logging Out...' : 'Log Out'}
                    </button>
                ) : (
                    <button
                        className="m-1 flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xl underline-offset-3 transition-all duration-300 hover:bg-neutral-700"
                        onClick={() => navigate('login')}
                    >
                        <LogInIcon />
                        Log in
                    </button>
                )}
            </aside>

            <section className="flex flex-1 flex-col">
                <header className="flex justify-center">
                    {location.pathname.startsWith('/games/') && (
                        <>
                            <Dropdown
                                options={['Name', 'Year', 'Rating']}
                                hasSortDirection={true}
                                type="Sort"
                            />
                            <Dropdown
                                options={[
                                    'Board Game',
                                    'Expansion',
                                    'Accessory',
                                    'Users',
                                ]}
                                type="Type"
                            />
                        </>
                    )}
                    <SearchBar />
                </header>

                <main className="m-5 flex-1 overflow-y-auto rounded-2xl">
                    <Outlet />
                </main>
            </section>
        </>
    );
}

export default AppLayout;
