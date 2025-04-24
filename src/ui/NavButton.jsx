import { NavLink } from 'react-router';

function NavButton({ children, to, icon }) {
    return (
        <NavLink
            className={`m-3 flex items-center gap-1.5 text-xl underline-offset-3 aria-[current=page]:underline`}
            to={to}
        >
            {icon}
            {children}
        </NavLink>
    );
}

export default NavButton;
