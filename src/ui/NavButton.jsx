import { NavLink } from 'react-router';

function NavButton({ children, to, icon }) {
    return (
        <NavLink className="m-3 flex items-center gap-1.5 text-xl" to={to}>
            {icon}
            {children}
        </NavLink>
    );
}

export default NavButton;
