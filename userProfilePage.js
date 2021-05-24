$(document).ready(function () {
  if (sessionStorage.getItem("AuthenticationState") === null) {
    alert("You must have to login first.");
    window.open("./login.html", "_self");
  } else if (
    Date.now > new Date(sessionStorage.getItem("AuthenticationExpires"))
  ) {
    alert("Login expired. Please login again.");
    window.open("./login.html", "_self");
  } else {
    lastPlayed();
  }
});

function logout() {
  sessionStorage.removeItem("AuthenticationState");
  sessionStorage.removeItem("userProfile");
  window.open("./login.html", "_self");
}
//declearing html elements

const imgDiv = document.querySelector(".profile-pic-div");
const img = document.querySelector("#photo");
const file = document.querySelector("#file");
const uploadBtn = document.querySelector("#uploadBtn");
const username = document.getElementById("username");

function lastAdded() {
  const charactersList = document.getElementById("recentlyAdded");
  const searchBar = document.getElementById("searchBar");
  const user = document.getElementById("user");
  let hpCharacters = [];

  const urlparams = new URLSearchParams(window.location.search);
  var str = urlparams.get("id");

  const loadCharacters = async () => {
    try {
      const res = await fetch("http://localhost:3000/Album");
      hpCharacters = await res.json();
      console.log(hpCharacters);
      var result = findSong(hpCharacters);
      console.log(result);
      var id = findId(result);
      var song = recentlyAdded(id);
      console.log(id);
      hpCharacters = id;

      displayCharacters(song);
    } catch (err) {
      console.error(err);
    }
  };
  const displayCharacters = (characters) => {
    const htmlString = characters
      .map((value) => {
        return `
            <tr class="row1">
            <td>
            <a href="../html/music-panel.html?id=${value.ArtistName}&songName=${value.SongName}&list=artistSongList">
            ${value.SongName}
            </a>
            </td>
            <td>${value.ArtistName}</td>
            <tr>`;
      })
      .join("");
    $("#table").append(htmlString);
  };

  loadCharacters();

  function findId(data) {
    var artist = [];
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].length; j++) {
        artist.push(data[i][j]);
      }
    }
    return artist;
  }
  function findSong(data) {
    var result = [];
    for (var i = 0; i < data.length; i++) result.push(data[i].songs);
    return result;
  }

  function recentlyAdded(data) {
    var recentlyAdded = [];
    console.log(data);
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    console.log(month);
    var year = date.getFullYear();
    var today = day + "/" + month + "/" + year;
    console.log(today);
    for (var i = 0; i < data.length; i++) {
      var a = data[i].Date;
      recentlyAdded.push(a.split("/"));
    }
    console.log(recentlyAdded);
    var songNumber = [];
    for (var i = 0; i < recentlyAdded.length; i++) {
      for (var j = 0; j < recentlyAdded[i].length; j++)
        if (j == 1) {
          console.log(j);
          console.log(parseInt(recentlyAdded[i][j]));
          if (parseInt(recentlyAdded[i][j]) == month - 1) {
            console.log("hi");
            songNumber.push(i);
          }
        }
    }
    var result = [];
    for (var i = 0; i < songNumber.length; i++) {
      for (var j = 0; j < data.length; j++) {
        if (songNumber[i] == j) {
          result.push(data[j]);
        }
      }
    }

    console.log(result);
    return result;
  }
  recentlyAdded();
}

function lastPlayed() {
  var usera = localStorage.getItem("userDetails");
  console.log(usera);
  var a = localStorage.getItem(usera);
  var retrive = JSON.parse(a);

  console.log(retrive);
  const charactersList = document.getElementById("recentlyAdded");
  const searchBar = document.getElementById("searchBar");
  const user = document.getElementById("user");
  let hpCharacters = [];

  const urlparams = new URLSearchParams(window.location.search);
  var str = urlparams.get("id");

  const loadCharacters = async () => {
    try {
      const res = await fetch("http://localhost:3000/Album");
      hpCharacters = await res.json();
      console.log(hpCharacters);
      var result = findSong(hpCharacters);
      console.log(result);
      result = findRecentlyPlayedSong(result);

      displayCharacters(result);
    } catch (err) {
      console.error(err);
    }
  };
  const displayCharacters = (characters) => {
    const htmlString = characters
      .map((value) => {
        return `
            <tr class="row1">
            <td>
            <a href="../html/music-panel.html?id=${value.ArtistName}&songName=${value.SongName}&list=artistSongList">
            ${value.SongName}
            </a>
            </td>
            <td>${value.ArtistName}</td>
            <tr>`;
      })
      .join("");
    $("#table").append(htmlString);
  };

  loadCharacters();

  function findId(data) {
    var artist = [];
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].length; j++) {
        artist.push(data[i][j]);
      }
    }
    return artist;
  }
  function findSong(data) {
    var result = [];
    for (var i = 0; i < data.length; i++) result.push(data[i].songs);
    return result;
  }

  function findRecentlyPlayedSong(data) {
    console.log(data);
    var result = [];
    for (var k = 0; k < retrive.length; k++) {
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
          if (data[i][j].SongName == retrive[k]) {
            result.push(data[i][j]);
          }
        }
      }
    }
    console.log(result);
    return result;
  }
}

function favourites() {
  var usera = localStorage.getItem("userDetails");
  console.log(usera);
  usera = usera + "Favorite";
  var a = localStorage.getItem(usera);
  var retrive = JSON.parse(a);

  console.log(retrive);
  const favoriteSong = document.getElementById("favoriteSong");
  const searchBar = document.getElementById("searchBar");
  const user = document.getElementById("user");
  let hpCharacters = [];

  const urlparams = new URLSearchParams(window.location.search);
  var str = urlparams.get("id");

  const loadCharacters = async () => {
    try {
      const res = await fetch("http://localhost:3000/Album");
      hpCharacters = await res.json();
      console.log(hpCharacters);
      var result = findSong(hpCharacters);
      console.log(result);
      result = findRecentlyPlayedSong(result);

      displayCharacters(result);
    } catch (err) {
      console.error(err);
    }
  };
  const displayCharacters = (characters) => {
    const htmlString = characters
      .map((value) => {
        console.log(value);
        return `
            <tr class="row1">
            <td>
            <a href="../html/music-panel.html?id=${value.ArtistName}&songName=${value.SongName}&list=artistSongList">
            ${value.SongName}
            </a>
            </td>
            <td>${value.ArtistName}</td>
            <tr>`;
      })
      .join("");
    $("#table").append(htmlString);
  };

  loadCharacters();

  function findId(data) {
    var artist = [];
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].length; j++) {
        artist.push(data[i][j]);
      }
    }
    return artist;
  }
  function findSong(data) {
    var result = [];
    for (var i = 0; i < data.length; i++) result.push(data[i].songs);
    return result;
  }

  function findRecentlyPlayedSong(data) {
    console.log(data);
    var result = [];
    for (var k = 0; k < retrive.length; k++) {
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
          if (data[i][j].SongName == retrive[k]) {
            result.push(data[i][j]);
          }
        }
      }
    }
    console.log(result);
    return result;
  }
}

function getSongList(list) {
  if (list == "recently-added") {
    $(".row1").remove();
    lastAdded();
  } else if (list == "recently-played") {
    $(".row1").remove();
    lastPlayed();
  } else {
    $(".row1").remove();
    favourites();
  }
}

function upload() {
  window.location.href = "http://127.0.0.1:5500/html/userProfilePage.html";
}

var user1 = localStorage.getItem("userDetails");
user1 = user1 + "profilePicture";
document.querySelector("#fileimg").addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    localStorage.setItem(user1, reader.result);
  });
  reader.readAsDataURL(this.files[0]);
});
document.addEventListener("DOMContentLoaded", () => {
  const recentImg = localStorage.getItem(user1);
  if (recentImg) {
    document.querySelector("#photo").setAttribute("src", recentImg);
  }
});

function changePassword() {}
