import data from "./kelimeler.json" assert { type: "json" };

// console.log(data.kelimeler[0].word);

var passHakki = 3;
var teamAScore = 0;
var teamBScore = 0;
var totalTeamAScore = 0;
var totalTeamBScore = 0;
var whichTeam = true;

// document.getElementById("word").innerHTML = data.kelimeler[0].word;

document.getElementById("teamA").innerHTML =
  "Takım A toplam skor : " + totalTeamAScore;
document.getElementById("teamB").innerHTML =
  "Takım B toplam skor : " + totalTeamBScore;

//document.getElementById("tabooWords").innerHTML = data.kelimeler[0].tabuWords[2];
fetch("./kelimeler.json")
  .then((response) => response.json())
  .then((json) => console.log(json));

var sure = 90;

setInterval(() => {
  document.getElementById("time").innerHTML = sure;
  if (sure == -1) {
    alert(
      "Süre bitti \nTakım A toplam skoru " +
        totalTeamAScore +
        "\nTakım B toplam skoru : " +
        totalTeamBScore
    );
    sure = 91;
    passHakki = 3;
    document.getElementById("pasHakki").innerHTML = "Pas hakkı : " + passHakki;

    if (whichTeam) {
      whichTeam = false;
      teamAScore = 0;
    } else {
      whichTeam = true;
      teamBScore = 0;
    }
    changeWord();
  }
  sure--;
}, 1000);

changeWord();

function changeWord() {
  var randomNumber = Math.floor(Math.random() * 136);

  var htmlString = "";

  htmlString += `<div id="word" class="word displayFlex">${data.kelimeler[randomNumber].word}</div>`;

  for (let i = 0; i < 5; i++) {
    htmlString += `<div id="tabooWords" class="tabooWords displayFlex">${data.kelimeler[randomNumber].tabuWords[i]}</div>`;
  }

  document.getElementById("taboo").innerHTML = htmlString;
}

//alert("Oyuna başlamak için tıklayınız..");

document.getElementById("pas").addEventListener("click", pass);

function pass() {
  if (passHakki > 0) {
    document.getElementById("pasHakki").innerHTML =
      "Pas hakkı : " + --passHakki;
    changeWord();
  } else {
  }
}

document.getElementById("dogru").addEventListener("click", score);

function score() {
  if (whichTeam) {
    document.getElementById("score").innerHTML = "Skor : " + ++teamAScore;
    totalTeamAScore++;
    document.getElementById("teamA").innerHTML =
      "Takım A toplam skor : " + totalTeamAScore;
    changeWord();
  } else {
    document.getElementById("score").innerHTML = "Skor : " + ++teamBScore;
    totalTeamBScore++;
    document.getElementById("teamB").innerHTML =
      "Takım B toplam skor : " + totalTeamBScore;
    changeWord();
  }
}

document.getElementById("yasak").addEventListener("click", yasak);

function yasak() {
  if (whichTeam) {
    document.getElementById("score").innerHTML = "Skor : " + --teamAScore;
    totalTeamAScore--;
    document.getElementById("teamA").innerHTML =
      "Takım A toplam skor : " + totalTeamAScore;
    changeWord();
  } else {
    document.getElementById("score").innerHTML = "Skor : " + --teamBScore;
    totalTeamBScore--;
    document.getElementById("teamB").innerHTML =
      "Takım B toplam skor : " + totalTeamBScore;
    changeWord();
  }
}

document.getElementById("durdur").addEventListener("click", durdur);

function durdur() {
  alert("Oyun durduruldu.\nDevam etmek için tıklayınız..");
}
