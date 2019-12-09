TODO: DONE

note dari submission 1
--register service workernya minta di pisahin dari file index.html jadi dibuatkan file js sendiri (done)
--manifest.json,, untuk ukuran JSONnya di buatkan icon dengan ukuran yang beragam sesuaikan dengan materi (done)


TODO:NEXT STEP
EDIT HOME.HTML
EDIT API.JS
    DI API JS CEK BAGIAN ARTICLESHTML
    LALU BUAT GETARTICLES(CONTOHD DARI NEWS-READER)




TODO: BELUM
Minimal 2 Halaman
menerapkan chace

Memiliki fitur penyimpanan data dengan indexed db (bisa menambahkan, menampilkan, dan menghapus tim favorit, jadwal nonton, dsb.) dengan satu halaman khusus untuk menampilkan data yang disimpan (sehingga total halaman menjadi minimal 3 halaman).

Dapat menampilkan pesan push dari server (untuk simulasi pesan push dikirim menggunakan Firebase Cloud Messaging) dengan menggunakan payload. 

Dapat ditambahkan ke homescreen.

Memiliki Splash screen.

buat satu file bernama push.js



catatan tambahan-----------------
Catatan
Beberapa gambar dari server football data menggunakan http sehingga tidak termuat jika PWA sudah di hosting dengan protokol https. Solusi sementara untuk mengatasi masalah ini ialah dengan mengubah protokol di alamat url gambar menjadi https dengan perintah:

url = url.replace(/^http:\/\//i, 'https://');


notes:-----------------------------------------------------------------------------------------------------------------
Daftar Endpoint Football Data ORG
Ganti {id_liga} dengan salah satu nomor liga berikut:

Champions League = 2001

Liga Jerman = 2002

Liga Belanda = 2003

Liga Inggris = 2021

Liga Spanyol = 2014

Liga Perancis = 2015

Ganti {id_tim} dengan id tim (bisa dilihat dari standing). 

Klasemen Liga: https://api.football-data.org/v2/competitions/{id_liga}/standings

Informasi Tim: https://api.football-data.org/v2/teams/{id_tim}

Jadwal Tanding Tim: https://api.football-data.org/v2/teams/{id_tim}/matches?status=SCHEDULED

Endpoint lainnya: https://www.football-data.org/documentation/quickstart