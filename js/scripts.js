var newGameBtn = document.getElementById('js-newGameButton');

//funkcja new game po nacisnieciuguzika//
newGameBtn.addEventListener('click', newGame);

//odnotowuje wcisniecie odpowiedniego buttona przez gracza//
var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

var gameState = 'notStarted',  // stan początkowy gry (zawsze zeruje na poczatku) started 
// ma 3 stany - started, w trakcie, ended - opisujemy to funkcja : setGameElements ; ustalamy obiekty player i computer
    player = {                     
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };
// otagowane containery // - decydujemy ktoy z nich, kiedy się  wyswietla
    var newGameElem = document.getElementById('js-newGameElement'),
        pickElem = document.getElementById('js-playerPickElement'),
        resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none'; // znika container z Button New Game
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz'; // Button New Game zmienia tresc (tylko jakim prawem jest widoczny skoro jego container nie jest)
    case 'notStarted':
    default:
        newGameElem.style.display = 'block'; // container z New game jest widoczny
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
setGameElements(); 

//Funkcja New Game

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

    function newGame() {
        player.name = prompt('Please enter your name', 'imię gracza');
        if (player.name) {                    // jeśli podał (anuluj jest w promt zawsze)
          player.score = computer.score = 0;    // zerujemy wynik (co ciekawe GameState- started tez zeruje - dubel?)
          gameState = 'started';               // przywracamy zmienna gamstarted
          setGameElements();                   // uruchamiamy setGameElements
      
          playerNameElem.innerHTML = player.name; // zmienia imię na tablicy wyników
            setGamePoints(); // This function has not been created yet
        }
      }
// pobranie wyboru gracza - wywolywane przy nacisneiciu przycisku - picRock np. -powyżej

//definiujemy co jest czym - jak narazie nie wiem czy jest podlaczone do czegokolwiek
function playerPick(playerPick) {
    console.log(playerPick);
}     
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}
// maja sie nijak fo playerpick
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');
// używamy powyższych zmiennych w funkcji : - wyswietla wybór gracza/ losowanie komputera 
function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;  // zdefiniowane powyżej 
    computerPickElem.innerHTML = computerPick;  // zdefiniowane powyżej computerPick=getcomputerpick
    checkRoundWinner(playerPick, computerPick);
}
// funkcja na to kto wygrał
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = ''; // usuwa tekst o wygranej kogokolwiek
  
    var winnerIs = 'player'; // zakładamy że wygrał gracz - reszte mozliwosci porownujemy z tym stanem 
  
      if (playerPick == computerPick) {    // jeśli komputer wybrał to samo to też wygrał = więc remis
          winnerIs = 'noone'; // remis
      } else if (                                  // jeśli komputer wybrał te opcje - to "wyjątkowo" wygrał komputer
          (computerPick == 'rock' &&  playerPick == 'scissors') ||
          (computerPick == 'scissors' &&  playerPick == 'paper') ||
          (computerPick == 'paper' &&  playerPick == 'rock')) {
  
          winnerIs = 'computer';
      }
      // dyspozycje do tabeli wyników  playerResultElem
      if (winnerIs == 'player') {
          playerResultElem.innerHTML = "Win!";
          player.score++;
      } else if (winnerIs == 'computer') {
          computerResultElem.innerHTML = "Win!";
          computer.score++;
      }
  
  }
  // nie mam pojecia co to robi - teoretycznie aktualizuej wynik - nie widze roznicy
  function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}