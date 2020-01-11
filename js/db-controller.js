var dbPromised = idb.open('bola_database', 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains('team_favorit')) {
        upgradeDb.createObjectStore('team_favorit');

    }
});