const autoPlayBtnElement = document.querySelector('.auto-play-button');
// HERE 12t
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
// HERE 12t
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
      resultElement.innerHTML = `You win.`;
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
    // Chỉ thay đổi các thuộc tính của đối tượng score hiện có
    score.wins = 0;
    score.losses = 0;
    score.ties = 0; 
    
    // Lưu điểm số 0 vào localStorage
    localStorage.setItem('score', JSON.stringify(score));

    // Cập nhật giao diện người dùng
    updateScoreElement();
    
    // Tùy chọn: Thêm dòng này để kiểm tra
    console.log('Score has been reset!', score); 
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

  //HERE 12u 
    document.addEventListener('keydown',(e)=> {
      if(e.key === 'a' || e.key === 'A') {
        autoPlay();
      }
  })
  //HERE 12u


  //HERE 12v
  const resetBtnElement = document.querySelector('.reset-score-button');
  resetBtnElement.addEventListener('click',resetScore);
  //HERE 12v



  //HERE 12w
  document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors'); 
  } else if (event.key === 'a') {
    autoPlay();
  
  // Add an if-statement condition to
  // check if 'Backspace' was pressed.
  } else if (event.key === 'Backspace') {
    event.preventDefault(); 
    resetScore();   
  }
});


  //HERE 12w