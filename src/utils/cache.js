// Durée de validité du cache en millisecondes
const CACHE_DURATION = 3600000; // 1 heure en millisecondes

/**
 * Stocke des données dans le cache avec une durée de validité
 * @param {string} key - La clé pour identifier les données dans le cache
 * @param {any} data - Les données à stocker
 */
export const setCache = (key, data) => {
    // Crée un objet contenant les données et leur date d'expiration
    const item = {
        value: data,
        expiry: new Date().getTime() + CACHE_DURATION
    };
    // Stocke l'objet dans le localStorage après l'avoir converti en chaîne JSON
    localStorage.setItem(key, JSON.stringify(item));
};

/**
 * Récupère des données du cache si elles existent et ne sont pas expirées
 * @param {string} key - La clé pour identifier les données dans le cache
 * @returns {any|null} Les données stockées ou null si non trouvées ou expirées
 */
export const getCache = (key) => {
    // Récupère l'élément du localStorage
    const itemStr = localStorage.getItem(key);
    // Si l'élément n'existe pas, retourne null
    if (!itemStr) return null;

    // Parse la chaîne JSON en objet
    const item = JSON.parse(itemStr);
    // Vérifie si les données sont expirées
    if (new Date().getTime() > item.expiry) {
        // Si expirées, supprime l'élément du localStorage et retourne null
        localStorage.removeItem(key);
        return null;
    }
    // Si les données sont valides, retourne leur valeur
    return item.value;
}