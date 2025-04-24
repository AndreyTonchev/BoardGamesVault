import { NavLink, Link, Outlet } from 'react-router';
import {
    FaHome,
    FaUser,
    FaSearch,
    FaDice,
    FaDiceD20 as Logo,
} from 'react-icons/fa';
import NavButton from './NavButton';

function AppLayout() {
    return (
        <>
            <aside className="container flex h-full w-[15%] flex-col">
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
            </aside>

            <section className="w-full">
                <header className="flex justify-center">
                    <form className="container flex w-[50%] items-center gap-2">
                        <input className="w-full outline-none" type="text" />
                        <button>
                            <FaSearch />
                        </button>
                    </form>
                </header>

                <main>
                    <Outlet></Outlet>
                </main>
            </section>
        </>
    );
}

export default AppLayout;
