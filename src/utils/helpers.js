const API = 'https://boardgamegeek.com/xmlapi2';

export async function getGameIdsFromQuery(searchQuery) {
    const res = await fetch(
        `${API}/search?query=${searchQuery}&exact=1&type=boardgame`,
    );

    if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const XMLString = await res.text();
    const XMLdata = new DOMParser().parseFromString(XMLString, 'text/xml');

    const result = [];
    const items = XMLdata.querySelectorAll('item');

    items.forEach((item) => {
        result.push(item.getAttribute('id'));
    });

    return result;
}

export async function getGameDataFromId(gameId) {
    const res = await fetch(`${API}/thing?id=${gameId}&stats=1`);

    if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const XMLString = await res.text();
    const XMLdata = new DOMParser().parseFromString(XMLString, 'text/xml');

    const safeGetElement = (selector, attribute = null) => {
        const element = XMLdata.querySelector(selector);
        if (!element) {
            return null;
        }

        if (attribute === 'textContent') {
            return element.textContent;
        }

        return attribute ? element.getAttribute(attribute) : element;
    };

    const gameData = {
        id: gameId,
        name: safeGetElement('name[type="primary"]', 'value') || 'Unknown',
        description: safeGetElement('description', 'textContent') || '',
        published: safeGetElement('yearpublished', 'value') || 'Unknown',
        image: safeGetElement('image', 'textContent') || '',
        minplayers: safeGetElement('minplayers', 'value') || 'Unknown',
        maxplayers: safeGetElement('maxplayers', 'value') || 'Unknown',
        playtime: safeGetElement('playingtime', 'value') || 'Unknown',
        weight: safeGetElement('averageweight', 'value') || 'Unknown',
        rating: safeGetElement('average', 'value') || 'Unknown',
    };

    return gameData;
}
