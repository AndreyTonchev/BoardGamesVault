import { NavLink, Link } from 'react-router';

function AppLayout() {
    return (
        <>
            <aside className="bg-red-200">
                <h1 className="font-semibold, text-2xl">Board Games Vault</h1>
                <div className="flex flex-col">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="profile">Profile</NavLink>
                    <NavLink to="">Home</NavLink>
                    <NavLink to="/">Home</NavLink>
                </div>
            </aside>
        </>
    );
}

export default AppLayout;
