const API = 'https://boardgamegeek.com/xmlapi2';

export function getGameIdsFromQuery(query) {
    return fetchIds(`${API}/search?query=${query}&exact=1&type=boardgame`);
}

export function getPopularGames() {
    return fetchIds(`${API}/hot?type=boardgame`);
}

async function fetchIds(URL) {
    const res = await fetch(URL);

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
        type: safeGetElement('item', 'type') || 'Unknown',
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

export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function decodeHtmlEntities(text) {
    if (!text || typeof text !== 'string') {
        return '';
    }

    return text
        .replace(/&#10;/g, '\n')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ');
}
