var newGameBtn = document.getElementById('js-newGameButton');
var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');
//Przypisujemy nasze elementy HTML - konkretnie buttony - do zmiennych

var playerPointsElem = document.getElementById('js-playerPoints');
var playerNameElem = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');
//Przypisujemy kolejne elementy HTML do zmiennych

var newGameElem = document.getElementById('js-newGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');
//Przypisujemy kolejne elementy - tym razem kontenery przechowujące informacja o stanie gry

var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');
var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');
//Przypisujemy kolejne elementy HTML do zmiennych

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });
//Do zadeklarowanych zmiennych przypisujemy funkcje którę będą odpalać się po kliknięciu - NewGame lub PlayerPick(z zagraniem wybranym przez użytkownika jako parametr przekazywany do funkcji)

var gameState = 'notStarted',  
    player = {                     
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };
//Tworzymy nasz bazowy stan gry - Nie rozpoczęta - zerujemy w nim wyniki oraz nick gracza

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none'; // znika container z Button New Game
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz'; // Button New Game zmienia tresc
    case 'notStarted':
    default:
        newGameElem.style.display = 'block'; // container z New game jest widoczny
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
//Funkcja która zależnie od Stanu Gry wpływa na wyglad planszy. Warto zwrócić uwagę na to że przy stanie 'Started' jest break czyli wychodzi z funkcji wtedy. Natomiast w przypadku 'Ended' break'a brakuje czyli po wykonaniu tego stanu przejdzie dalej i wejdzie też do 'Default', czyli włączy NewGameEle.
setGameElements();

function newGame() {
        player.name = prompt('Please enter your name', 'imię gracza');
        if (player.name) {                    // Wejdzie do if'a tylko jeżeli ktoś podał imię gracza
          //player.score = computer.score = 0;   // zerujemy wynik (co ciekawe GameState- started tez zeruje - dubel?)
          gameState = 'started';               // przywracamy zmienna gamstarted
          setGameElements();                   // uruchamiamy setGameElements
      
          playerNameElem.innerHTML = player.name; // zmienia imię na tablicy wyników
          setGamePoints(); // This function has not been created yet
        }
      }

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors']; //deklarujemy możliwe wybory - jest to tablica [0,1,2]
    return possiblePicks[Math.floor(Math.random()*3)]; //zwraca 0,1 lub 2 z naszej tablicy więc konkretny wybór
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;  // zdefiniowane poprzez parametr przekazywany przez clicknięcie buttona 
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
          setGamePoints(); // wpisanie punktów
          setGameElements(); //sprawdzenie stanu gry
          endGame(); //sprawdzenie czy nie powinno skończyć gry    
      } else if (winnerIs == 'computer') {
          computerResultElem.innerHTML = "Win!";
          computer.score++;
          setGamePoints(); // wpisanie punktów
          setGameElements(); //sprawdzenie stanu gry
          endGame(); //sprawdzenie czy nie powinno skończyć gry    
      }
  }

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}
//Funkcja wpisuje liczbę punktów do kółeczka

function endGame() {
	if (player.score == 10) {
        alert("The winner is " + player.name);
        gameState = 'ended';
        setGameElements();
    } if (computer.score == 10) {
        alert("The winner is computer");
        gameState = 'ended';
        setGameElements();
    }
	setGamePoints();
}
//Nasza funkcja sprawdzająca kto wygrał - jeżeli któryś z graczy osiągnie 10pkt stan gry jest zmieniany na 'Ended' i wywoływane jest sprawdzenie Stanu Gry