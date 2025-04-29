const API = 'https://boardgamegeek.com/xmlapi2';

export async function getSearchResults(params) {
    const res = await fetch(
        `${API}/search?query=${params.query}&exact=1&type=boardgame`,
    );

    if (!res.ok) throw new Error('Error fetching the API');

    const xmlString = await res.text();

    const data = new DOMParser().parseFromString(xmlString, 'text/xml');

    return data;
}
