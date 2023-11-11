const mario = document.querySelector(".mario");
const cano = document.querySelector(".cano");

const start = document.querySelector(".start");
const gameOver = document.querySelector(".game-over");

const audioStart = new Audio('/sounds/audio_theme.mp3');
const audioGameOver = new Audio('/sounds/audio_gameover.mp3');

const startGame = () => {
    cano.classList.add('pipe-animation');
    start.style.display = 'none';

    //audio

    audioStart.play();
}

const restartGame = () => {
    gameOver.style.display = 'none';
    cano.style.left = '';
    cano.style.right = '-10px';
    mario.src = '/img/mario.gif'
    mario.style.width = '150px';
    mario.style.bottom = '0';

    start.style.display = 'none';

    audioGameOver.pause()
    audioGameOver.currentTime = 0;

    audioStart.play()
    audioStart.currentTime = 0;
}

const jump = () => {
    mario.classList.add('jump')

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 800)
}

const loop = () => {
    setInterval(() => {
        const canoPosition = cano.offsetLeft;
        const marioPosition = window
        .getComputedStyle(mario)
        .bottom.replace('px', '')

        if (canoPosition <= 120 && canoPosition > 0 && marioPosition < 80) {
            cano.classList.remove('.pipe-animation')
            cano.style.left = `${canoPosition}px`

            mario.classList.remove('.jump')
            mario.style.bottom = `${marioPosition}px`

            mario.src = '/img/game-over.png'
            mario.style.width = '80px'
            mario.style.marginLeft ='50px'



            function stopAudioStart() {
                audioStart.pause()
            }

            stopAudioStart()

            audioGameOver.play()


            function stopAudio() {
                audioGameOver.pause()
            }

            setTimeout(stopAudio, 7000)

            gameOver.style.display= 'flex'

            clearInterval(loop)
        }
    },10)
}

loop()

document.addEventListener('keypress', e => {
    const tecla = e.key

    if (tecla === ' ') {
        jump()
    }
})

document.addEventListener('touchstart', e =>{
    if (e.touches.length) {
        jump()
    }
})

document.addEventListener('keypress', e =>{
    const tecla = e.key
    if (tecla === 'Enter') {
        startGame()
    }
})