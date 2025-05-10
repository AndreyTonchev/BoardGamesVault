import { createBrowserRouter, RouterProvider } from 'react-router';
import AppLayout from './ui/AppLayout';
import Home, { loader as homeLoader } from './ui/Home';
import SearchResults, { loader as searchLoader } from './ui/SearchResults';
import Profile, { loader as profileLoader } from './features/Profile/Profile';

import Signup from './features/authentication/Signup';
import Login from './features/authentication/Login';

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
                loader: homeLoader,
            },
            {
                path: '/games/:query',
                element: <SearchResults />,
                loader: searchLoader,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            {
                path: '/profile/:userId',
                element: <Profile />,
                loader: profileLoader,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
