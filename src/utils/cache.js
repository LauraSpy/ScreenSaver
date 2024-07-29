
const CACHE_DURATION = 3600000; // 1 heure en millisecondes

export const setCache = (key, data) => {
    const item = {
        value: data,
        expiry: new Date().getTime() + CACHE_DURATION
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export const getCache = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    if (new Date().getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
};