const gameStatus = {
    poused: false,
    score: 0,
    over: false
}

const platformData = {
    position: 285,
    speed: 20 * 0.5
}

const ballData = {
    positionX: 100,
    positionY: 200,
    direction: 'DL',
    speed: 4
}

const grid =  document.querySelector('.grid')
const platform = document.querySelector('.platform')
const ball = document.querySelector('.ball')

const createBoxes = () => {
    const quantityOfBoxes = 40
    
    for(let i = 0; i < quantityOfBoxes; i++) {
        let box = document.createElement('div')
        grid.appendChild(box)
    }
}

const verifyBlockColision = () => {
    const topPixel = grid.offsetTop
    const leftPixel = grid.offsetLeft
    const ballTopPosition = ball.offsetTop
    const blocks = document.querySelectorAll('.grid div')
    const line1Position = topPixel + blocks[0].offsetTop + blocks[0].offsetHeight
    const line2Position = topPixel + blocks[10].offsetTop + blocks[10].offsetHeight
    const line3Position = topPixel + blocks[20].offsetTop + blocks[20].offsetHeight
    const line4Position = topPixel + blocks[30].offsetTop + blocks[30].offsetHeight

    if(ballData.direction == 'UR' || ballData.direction == 'UL') {
        if(ballTopPosition <= line1Position) {
            for(let i = 0; i < 10; i++) {
                if(!(blocks[i].classList[0] == 'removed')) {
                    if(ball.offsetLeft + ball.offsetWidth <= blocks[i].offsetLeft + leftPixel + blocks[i].offsetWidth && ball.offsetLeft >= blocks[i].offsetLeft + leftPixel) {
                        ball.style.background = "rgb(204, 66, 72)"
                        if(ballData.direction == 'UR') ballData.direction = 'DR'
                        if(ballData.direction == 'UL') ballData.direction = 'DL'
                        removeBlocks(i)
                    }
                } 
            }
            
        } else if(ballTopPosition <= line2Position) {
            for(let i = 10; i < 20; i++) {
                if(!(blocks[i].classList[0] == 'removed')) {
                    if(ball.offsetLeft + ball.offsetWidth <= blocks[i].offsetLeft + leftPixel + blocks[i].offsetWidth && ball.offsetLeft >= blocks[i].offsetLeft + leftPixel) {
                        ball.style.background = "rgb(205, 166, 9)"
                        if(ballData.direction == 'UR') ballData.direction = 'DR'
                        if(ballData.direction == 'UL') ballData.direction = 'DL'
                        removeBlocks(i)
                    }
                } 
            }
    
        } else if(ballTopPosition <= line3Position) {
            for(let i = 20; i < 30; i++) {
                if(!(blocks[i].classList[0] == 'removed')) {
                    if(ball.offsetLeft + ball.offsetWidth <= blocks[i].offsetLeft + leftPixel + blocks[i].offsetWidth && ball.offsetLeft >= blocks[i].offsetLeft + leftPixel) {
                        ball.style.background = "rgb(55, 58, 209)"
                        if(ballData.direction == 'UR') ballData.direction = 'DR'
                        if(ballData.direction == 'UL') ballData.direction = 'DL'
                        removeBlocks(i)
                    }
                } 
            }
            
        } else if(ballTopPosition <= line4Position) {
            for(let i = 30; i < 40; i++) {
                if(!(blocks[i].classList[0] == 'removed')) {
                    if(ball.offsetLeft + ball.offsetWidth <= blocks[i].offsetLeft + leftPixel + blocks[i].offsetWidth && ball.offsetLeft >= blocks[i].offsetLeft + leftPixel) {
                        ball.style.background = "rgb(5, 182, 184)"
                        if(ballData.direction == 'UR') ballData.direction = 'DR'
                        if(ballData.direction == 'UL') ballData.direction = 'DL'
                        removeBlocks(i)
                    }
                }
            }
        }
    } 
}

const removeBlocks = block => {
    const blocksToRevmove = document.querySelectorAll('.grid div')
    blocksToRevmove[block].style.background = '#000'
    blocksToRevmove[block].classList.add('removed')
    updateSocre()
}

const updateSocre = () => {
    const scoreContent = document.querySelector('.score')
    gameStatus.score += 5
    scoreContent.innerHTML = gameStatus.score
}

const updateBallPosition = () => {
    // Esquerda 
    if(ball.offsetLeft <= grid.offsetLeft) {
        switch (ballData.direction) {
            case 'UL':
                ballData.direction = 'UR'
                break;

            case 'DL':
                ballData.direction = 'DR'
                break;
        
            default:
                break;
        }
    }

    // Direita
    if(ball.offsetLeft + ball.offsetWidth >= grid.offsetLeft + grid.offsetWidth) {
        switch (ballData.direction) {
            case 'DR':
                ballData.direction = 'DL'
                break;

            case 'UR':
                ballData.direction = 'UL'
                break;
        
            default:
                break;
        }
    }

    // Plataforma
    if(ball.offsetTop + ball.offsetHeight >= platform.offsetTop) {
        if(ball.offsetLeft >= platform.offsetLeft && ball.offsetLeft + ball.offsetWidth <= platform.offsetLeft + platform.offsetWidth) {
            switch (ballData.direction) {
                case 'DR':
                    ballData.direction = 'UR'
                    break;
    
                case 'DL':
                    ballData.direction = 'UL'
                    break;
            
                default:
                    break;
            }
        }
    }

    // Cima
    if(ball.offsetTop <= grid.offsetTop) {
        if(ballData.direction == 'UR') ballData.direction = 'DR'
        if(ballData.direction == 'UL') ballData.direction = 'DL'   
    }

    if(ball.offsetTop + ball.offsetHeight >= grid.offsetHeight + grid.offsetTop) gameStatus.over = true


    switch (ballData.direction) {
        case 'DR':
            ballData.positionX += ballData.speed
            ballData.positionY += ballData.speed
            ball.style.left = ballData.positionX + 'px'
            ball.style.top = ballData.positionY + 'px'
            break;

        case 'UR':
            ballData.positionX += ballData.speed
            ballData.positionY -= ballData.speed
            ball.style.left = ballData.positionX + 'px'
            ball.style.top = ballData.positionY + 'px'
            break;

        case 'DL':
            ballData.positionX -= ballData.speed
            ballData.positionY += ballData.speed
            ball.style.left = ballData.positionX + 'px'
            ball.style.top = ballData.positionY + 'px'
            break;
    
        case 'UL':
            ballData.positionX -= ballData.speed
            ballData.positionY -= ballData.speed
            ball.style.left = ballData.positionX + 'px'
            ball.style.top = ballData.positionY + 'px'
            break;
        
        default:
            break;
    }
    verifyBlockColision()
}

const updatePlatformPosition = () => {
    platform.style.left = platformData.position + 'px'
}

const verifyKeyPressed = () => {
    const shipMovementStrategy = {
        KeyA() {
            platformData.position -= platformData.speed
        },
        KeyD() {
            platformData.position += platformData.speed
        },
        Space() {
            gameStatus.poused = !gameStatus.poused
        }
    }

    function getKey() {
        const movients = shipMovementStrategy
        document.addEventListener('keypress', e => {
            shipMovementStrategy[e.code] && movients[e.code]()
        })
    }
    return {getKey}
}

const verifyBorderColisionPlatform = () => {
    const grid = document.querySelector('.grid')
    if(platform.offsetLeft <= grid.offsetLeft) {
        platformData.position += platformData.speed
    }
    if(platform.offsetLeft + platform.offsetWidth >= grid.offsetLeft + grid.offsetWidth) {
        platformData.position -= platformData.speed
    }
}

function loop() {
    updatePlatformPosition()
    
    verifyBorderColisionPlatform()
    requestAnimationFrame(loop)
}

window.onload = () => {
    const popUp = document.querySelector('.game-over-container')
    const finalScore = document.querySelector('.final-score')
    const title = document.querySelector('.game-over-text p')

    verifyKeyPressed().getKey()
    createBoxes()

    document.querySelector('.play-again-btt').addEventListener('click', () => {
        location.reload()
    })

    let enemyPosition = setInterval(i => {
        !gameStatus.poused && updateBallPosition()

        if(gameStatus.victory || gameStatus.over) {
            clearInterval(enemyPosition)
            gameStatus.victory ? title.innerHTML = 'WINNER' : title.innerHTML = 'GAME<br>OVER'
            finalScore.innerHTML = gameStatus.score
            popUp.style.display = "flex"
        }
    }, 16)
    loop()
}