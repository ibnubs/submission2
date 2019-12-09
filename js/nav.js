document.addEventListener("DOMContentLoaded", function() {
  // Acive sidebar nav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);

  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status !== 200) return;
        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu

        document.querySelectorAll(".sidenav a, .topnav a").forEach(elm=>{
          elm.addEventListener("click",event=>{
            // Tutup sidenav
            var sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            // Muat konten halaman yang dipanggil
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Load page content
  var page = window.location.hash.substr(1);

  loadPage(setupPage(page));

  function setupPage(page) {
    if (page == "" || page == "#") {
      page = "home";
    } else if (page === "about") {
      page = "about";
    } else if (page === "contact") {
      page = "contact";
    } else if (page === "teams") {
      page = "teams";
    } else if (page === "favorit") {
      page = "favorit";
    }
    return page;
  }

  function loadPage(page) {
    console.log("loadPage: page: " + page);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      var content = document.querySelector("#body-content");

      if (this.readyState === 4) {
        if (page === "home") {
          content.innerHTML = xhttp.responseText;
            getStandings();
        } else if (page === "teams") {
          content.innerHTML = xhttp.responseText;
            getTeams();
        } else if (page === "favorits") {
          getFavTeams();
        }

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status === 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }

});
