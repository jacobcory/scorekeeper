const player1 = {
    name: 'PLAYER ONE',
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}
const player2 = {
    name: 'PLAYER TWO',
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}


const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
const winMsg = document.querySelector('#winMsg');

let winningScore = 5;
let isGameOver = false;

function updateScore(player, opponet) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponet.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponet.button.disabled = true;
            winMsg.innerText = `${player.name} WINS!!`;
            winMsg.classList.add('fadeIn');
        }
        player.display.textContent = player.score;
    }
};

function winBy2(player, opponent) {
    if (player.score === opponent.score && player.score === winningScore - 1) {
        winningScore++;
        tieBreak.innerText = `Tie BREAK to ${winningScore}!`;
        tieBreak.classList.add('overtime');

    }
}

player1.button.addEventListener('click', function (e) {
    updateScore(player1, player2)
    winBy2(player1, player2)
})

player2.button.addEventListener('click', function (e) {
    updateScore(player2, player1)
    winBy2(player2, player1)
})

winningScoreSelect.addEventListener('change', function (e) {
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset)

function reset() {
    isGameOver = false;
    for (let player of [player1, player2]) {
        player.score = 0;
        player.display.textContent = 0;
        player.display.classList.remove('has-text-success', 'has-text-danger');
        player.button.disabled = false;
    }
    winMsg.classList.remove('fadeIn')
    tieBreak.classList.remove('overtime')
}

