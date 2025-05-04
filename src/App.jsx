import { createBrowserRouter, RouterProvider } from 'react-router';
import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import SearchResults, { loader as searchLoader } from './ui/SearchResults';

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/games/:query',
                element: <SearchResults />,
                loader: searchLoader,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
