import { createBrowserRouter, RouterProvider } from 'react-router';
import AppLayout from './ui/AppLayout';
import Home, { loader as homeLoader } from './ui/Home';
import SearchResults, { loader as searchLoader } from './ui/SearchResults';

import Signup from './services/authentication/Signup';
import Login from './services/authentication/Login';

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
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
