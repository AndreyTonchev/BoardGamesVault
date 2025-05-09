import { NavLink } from 'react-router';

function NavButton({ children, to, icon }) {
    return (
        <NavLink
            className={`m-1 flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xl underline-offset-3 aria-[current=page]:bg-neutral-700`}
            to={to}
        >
            {icon}
            {children}
        </NavLink>
    );
}

export default NavButton;
