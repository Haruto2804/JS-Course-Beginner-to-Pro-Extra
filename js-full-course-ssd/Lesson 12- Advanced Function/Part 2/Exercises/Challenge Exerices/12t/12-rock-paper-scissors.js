const autoPlayBtnElement = document.querySelector('.auto-play-button');
// HERE
autoPlayBtnElement.addEventListener('click',autoPlay);
  let score = {
    wins: 0,
    losses: 0,
    ties: 0
  };

  function autoPlay () {
    if(!isAutoPlaying) {
      autoPlayBtnElement.textContent = 'Stop Auto Play';
      intervalID = setInterval(function () {
      playGame();
      },1000);
      isAutoPlaying = true;
    }else {
      autoPlayBtnElement.textContent = 'Auto Play';
      clearInterval(intervalID);
      isAutoPlaying = false;
    }
  }
  // HERE
  const savedScore = JSON.parse(localStorage.getItem('score'));
  if (savedScore) {
    score = savedScore;
  }

  updateScoreElement();

  function makeMove(playerMove) {
    const computerMove = pickComputerMove();
    const resultElement = document.querySelector('.js-result');

    if (playerMove === computerMove) {
      resultElement.innerHTML = `Tie.`;
      score.ties += 1;

    } else if (
      (playerMove === 'rock' && computerMove === 'scissors') ||
      (playerMove === 'paper' && computerMove === 'rock') ||
      (playerMove === 'scissors' && computerMove === 'paper')
    ) {
      resultElement.innerHTML = `You lose.`;
      score.losses += 1;

    } else {
      resultElement.innerHTML = `You wins.`;
      score.wins += 1;
    }

    const movesElement = document.querySelector('.js-moves-chosen');
    movesElement.innerHTML = `
      You
      <img src="./rock-paper-scissors-pictures/${playerMove}-emoji.png" class="move-icon">
      <img src="./rock-paper-scissors-pictures/${computerMove}-emoji.png" class="move-icon">
      Computer
    `;

    updateScoreElement();
    localStorage.setItem('score', JSON.stringify(score));
  }

  function resetScore() {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };

    updateScoreElement();
    localStorage.removeItem('score');
  }

  function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove;

    if (randomNumber < (1 / 3)) {
      computerMove = 'rock';
    } else if (randomNumber < (2 / 3)) {
      computerMove = 'paper';
    } else {
      computerMove = 'scissors';
    }

    return computerMove;
  }

  function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `
      Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
    `;
  }
  
  function playerMoveRandom () {
    let getNumber = Math.random();
    if(getNumber <=1/3) {
      return 'rock';
    } 
    else if(getNumber <=2/3) {
      return 'paper';
    }
    else {
      return 'scissors';
    }
  }  
  
  
  function playGame () {
    const playerMove = playerMoveRandom();
    makeMove(playerMove);
  } 
  let isAutoPlaying = false;
  let intervalID;
