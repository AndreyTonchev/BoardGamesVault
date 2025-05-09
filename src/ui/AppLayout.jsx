import { Outlet, useLocation, useNavigation } from 'react-router';
import { FaHome, FaUser, FaDice, FaDiceD20 as Logo } from 'react-icons/fa';
import {
    FaArrowRightFromBracket as LogOut,
    FaArrowRightToBracket as LogIn,
} from 'react-icons/fa6';

import supabase from '../services/supabase';

import Dropdown from './DropDown';
import NavButton from './NavButton';
import SearchBar from './SearchBar';
import Loader from './Loader';

function AppLayout() {
    const location = useLocation();
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';

    async function logOut() {}

    return (
        <>
            {isLoading && <Loader />}
            <aside className="container flex h-auto w-[15%] flex-col">
                <div>
                    <header className="my-5 flex flex-col items-center gap-1 text-center text-4xl">
                        <Logo className="" />
                        Board Games Vault
                    </header>
                    <div className="flex flex-col space-y-4">
                        <NavButton to="/" icon={<FaHome />}>
                            Home
                        </NavButton>
                        <NavButton to="profile" icon={<FaUser />}>
                            Profile
                        </NavButton>
                        <NavButton to="games" icon={<FaDice />}>
                            Games
                        </NavButton>
                    </div>
                </div>
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
