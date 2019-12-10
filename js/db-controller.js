var dbPromised = idb.open('bola_database', 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains('teams')) {
        upgradeDb.createObjectStore('teams',{keyPath: 'id'});
    }
});


var dbGetFavTeams = () => {
  return new Promise((resolve,reject) => {
    dbPromised.then(db => {
      var trx = db.transaction('teams', `readonly`);
      return transaction.objectStore('teams').getAll();
    }).then(data => {
      if (data !== undefined){
          resolve(data);
      } else {
        reject(new Error('Favorite Not Found'))
      }
    });
  });
}

var insertFavTeam = team => {
    return new Promise((resolve,reject)=>{
        dbPromised.then(db => {
            var trx = db.transaction('teams', `readwrite`);
            trx.objectStore('teams').add(team);
            return trx  
        }).then(trx => {
            if (trx.complete){
                M.toast({html: `${team} berhasil disimpan`})
                console.log('Team berhasil disimpan');
                resolve(true)
            } else {
                console.error('Team gagal disimpan', err);
                reject(new Error (trx.onerror))
            }
        })
    })
};


var deleteFavTeam = (teamId) => {
   return new Promise((resolve, reject) => {
       dbPromised.then(db => {
           var trx = db.transaction('teams', `readwrite`);
           trx.objectStore('teams').delete(teamId);
           return trx;
       }).then(trx => {
           if (trx.complete) {
               M.Toast({html: `Team has been deleted`})
               resolve(true)
           } else {
               console.error('Error: ', err)
               reject(new Error(trx.onerror))
           }
       })
   })
};