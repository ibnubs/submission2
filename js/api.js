//Fetch API with JSON.

//Inisiasi variabel
const apiToken = "52e671c86c404fac9a956a398c9eec75";
const idLeague = 2002;
var nameLeague = "BL1";
var baseUrl = "https://api.football-data.org/v2/";
var teamUrl = `${baseUrl}competitions/${idLeague}/teams`;
var standingUrl = `${baseUrl}competitions/${idLeague}/standings?standingType=TOTAL`;
var matchUrl = `${baseUrl}competitions/${idLeague}/matches`;

//fetch header api
var fetchApi = url => {
  return fetch(url, {
    method: "get",
    mode: "cors",
    headers: {
      "X-Auth-Token": apiToken
    }
  });
};

//kode yang memeriksa fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    //metode reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    //mengubah objek menjadi promise agar bisa di-then-kan
    return Promise.resolve(response);
  }
}

//Blok kode untuk memparsing json menjadi array javascript
function json(response) {
  return response.json();
}

//Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  //Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

//Blok kode untuk request data JSON
//Request Standings
function getStandings() {
  if ("caches" in window) {
    caches.match(standingUrl).then(response => {
      if (response) {
        response.json().then(data => {
          console.dir("Competition Data " + data);
          standingsToHtml(data);
        });
      }
    });
  }
  fetchApi(standingUrl)
    .then(status)
    .then(json)
    .then(data => {
      console.log(data);
      standingsToHtml(data);
    })
    .catch(error => {
      console.log(error);
    });
}

function getMatches() {
  fetchApi(matchUrl);
  then(status)
    .then(json)
    .then(data => {
      console.log(data);
      matchToHTML(data);
    })
    .catch(error => {
      console.log(error);
    });
}

function getTeams() {
  if ("caches" in window) {
    caches.match(teamUrl).then(res => {
      if(res) {
        res.json().then(data =>{
          console.dir("Teams Data " + data);
          teamsToHtml(data)
        });
      }
    });
  }
  fetchApi(teamUrl)
    .then(status)
    .then(json)
    .then(data => {
      console.log(data);
      teamsToHtml(data);
    })
    .catch(error => {
      console.log(error);
    });
}


function getFavTeams() {
  if ("caches" in window) {
    caches.match(teamUrl).then(res => {
      if(res) {
        res.json().then(data =>{
          console.dir("Teams Data " + data);
          favTeamsToHtml(data)
        });
      }
    });
  }
  fetchApi(teamUrl)
    .then(status)
    .then(json)
    .then(data => {
      console.log(data);
      favTeamsToHtml(data);
    })
    .catch(error => {
      console.log(error);
    });
}

//Tampil di HTML

function standingsToHtml(data) {
  var standings = "";
  var standingElement = document.getElementById("viewStandings");

  data.standings[0].table.forEach(standing => {
    standings += `
                <tr>
                    <td><img src='${standing.team.crestUrl.replace(
                      /^http:\/\//i,
                      "https://"
                    )}' width='30px' alt='badge'/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
  });

  standingElement.innerHTML = `
            <div class='card' style='padding-left: 24px; padding-right: 24px; margin-top: 30px;'>
                <table class='striped responsive-table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id='standings'>
                        ${standings}
                    </tbody>
                </table>
            </div>
    `;
}



function teamsToHtml(data) {
  var teams = "";
  var teamsElement = document.getElementById("viewTeams");

  data.teams.forEach(team => {
    teams += `
      <tr>
        <td>
          <img
            src='${team.crestUrl.replace(
                      /^http:\/\//i,
                      "https://"
                    )}'
            width="30px"
            alt="badge"
          />
        </td>
        <td>${team.name}</td>
        <td>${team.area.name}</td>
        <td>
          <a href="${team.website}" target="_blank">
            ${team.website}
          </a>
        </td>
        <td>
        <a class="btn-small waves-effect waves-light green" type="submit" onclick="insertFavTeam('${team.name}','${team.id}')"> <i class="small material-icons">ADD</i></a>        
        </td>
      </tr>
    `;
  });

  teamsElement.innerHTML = 
  `<div class='card' style='padding-left: 24px; padding-right: 24px; margin-top: 30px;'>
  <table class='striped responsive-table'>
      <thead>
          <tr>
              <th>Team Logo</th>
              <th>Team Name</th>
              <th>Team Area</th>
              <th>Team Web</th>
              <th>Team Favorit</th>
          </tr>
       </thead>
      <tbody id='teams'>
          ${teams}
      </tbody>
  </table>
</div>
`;
}



function favTeamToHtml(data) {
  var teamsFav = "";
  var favTeamElement = document.getElementById("viewFavoritTeams");



  favTeamElement.innerHTML = 
  `<div class='card' style='padding-left: 24px; padding-right: 24px; margin-top: 30px;'>
  <table class='striped responsive-table'>
      <thead>
          <tr>
              <th>Team Logo</th>
              <th>Team Name</th>
              <th>Team Area</th>
              <th>Team Web</th>
              <th>Team Favorit</th>
          </tr>
       </thead>
      <tbody id='teams'>
          ${teamsFav}
      </tbody>
  </table>
</div>
`;

}




// indexdb

document.addEventListener('DOMContentLoaded',function (){
  var item = getFavTeamsById();

  var papTeams = document.getElementById('papTeams');
  papTeams.onclik = () => {
    console.log('Tombol add di klik');
    item.then(function(tim)  {
      saveTeam(tim)
    });
  }
});


function getFavTeamsById(){
  return new Promise(function (resolve,reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get('id');

    if ('caches' in window) {
        caches.match(baseUrl + '/teams/' + idParam)
        .then(response => {
          if (response) {
            response.json().then(data =>{
              console.dir("Teams Data " + data);

              document.getElementById('papTeams') = timHTML
              resolve(data)


            });
          }
        })
    }
    
  })
}