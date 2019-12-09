var dbPromised = idb.open('bola_database', 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains('teams')) {
        upgradeDb.createObjectStore('teams',{autoIncremenet:true});
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
    return new Promise((resole,reject)=>{
        dbPromised.then(db => {
            var trx = db.transaction('teams', `readwrite`);
            trx.objectStore('teams').add(team);
            return trx  
        }).then(trx => {
            if (trx.complete){
                M.toast({html: `${team.name} berhasil disimpan`})
                console.log.log('Team berhasil disimpan');
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