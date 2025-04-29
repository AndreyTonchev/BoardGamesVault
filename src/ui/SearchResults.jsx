import { useLoaderData } from 'react-router';
import { getSearchResults } from '../utils/helpers';

function SearchResults() {
    const searchResult = useLoaderData();
    console.log(searchResult);
    const items = searchResult.querySelectorAll('item');
    const result = Array.from(items).map((item) => {
        return {
            id: item.getAttribute('id'),
        };
    });

    console.log(result);

    return <div className="text-green-400">Hello</div>;
}

export async function loader({ params }) {
    console.log('Hello');
    console.log(params);
    const searchResult = await getSearchResults(params);
    return searchResult;
}

export default SearchResults;
