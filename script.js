//Dino-Game by var L. A. Souza based on Dino Game made by https://github.com/celso-henrique
//e-mail: lucasadsouza@gmail.com


const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;
let gameOver = false;


function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}


function onClickScreen() {
    if (!isJumping) {
        jump();
    }
}


function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        let aceleration = 0;

        if (position >= 200) {
            clearInterval(upInterval);
            aceleration = 0;

            //-jump
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;

                } else {
                    position -= (20 + aceleration);
                    dino.style.bottom = `${position}px`;

                    if (position === 14.799999999999972) {
                        aceleration = -5.200000000000028;
                    }else{
                        aceleration += 0.9;
                    }
                }
            }, 20);

        } else{
            //+jump
            position += (20 - aceleration);
            dino.style.bottom = `${position}px`;
            aceleration += 0.9;
        }
    }, 20);
}


function countScore() { //terminar
    actualScore = Number(document.getElementById("score").innerText);
    document.getElementById("score").innerText = `${actualScore + 1}`;

    return actualScore;
}


function createCactus() {
    const cactus = document.createElement("div");
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
    while(randomTime < 400) {
        randomTime = Math.random() * 6000;
    }

    console.log(randomTime);

    cactus.classList.add("cactus");
    cactus.style.left = "1000px";
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
            countScore();
        
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //game over
            clearInterval(leftInterval);
            document.body.innerHTML = `<h1 class="game-over">Fim de Jogo</h1><p id="end-score">${countScore()}</p><p id="end-message">Recarregue a página para jogar novamente</p>`
            gameOver = true;

        } else {
            cactusPosition -= 10;
            cactus.style.left = `${cactusPosition}px`;
        }
    }, 20);

    if (!gameOver) {
        setTimeout(createCactus, randomTime);
    }
}


createCactus();

document.addEventListener("keyup", handleKeyUp);