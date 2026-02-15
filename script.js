document.addEventListener('DOMContentLoaded', () => {
    let skinsButton = document.getElementById('skinsButtonID');
    let themeButton = document.getElementById('themeButtonID');
    let score = document.getElementById('scoreID');
    let timer = document.getElementById('timerID');
    let musicButton = document.getElementById('musicButtonID');
    let exitButton = document.getElementById('exitButtonID');
    let playButton = document.getElementById('playButtonID');
    let settingsButton = document.getElementById('settingsButtonID');
    let board = document.getElementById('boardID');
    let soundtrack = new Audio('assets/audio/gamesoundtrack.mp3');
    let isGameOn = false;
    //==================ЛОББИ ФУНКЦИИ===========================================
    function activateSound() {
        let isActive = false;
        musicButton.addEventListener('click', () => {
            isActive = !isActive;
            if (isActive == true) {
                soundtrack.play();
                soundtrack.loop = true;
                musicButton.style.opacity = 0.8;
            }
            else {
                soundtrack.pause();
                musicButton.style.opacity = 1;
            }
        })
    }
    let text = document.querySelectorAll('p');
    let bg = document.querySelector('body');
    let ui1 = document.querySelectorAll('.circle-button');
    let ui2 = document.querySelectorAll('.score-button');
    let ui3 = document.querySelectorAll('.settings-button');
    let ui4 = document.querySelectorAll('.play-button');
    let uiColor = "rgb(81, 81, 81)";
    function themeChange() {
        let isActive = false;
        themeButton.addEventListener('click', () => {
            isActive = !isActive;
            if (isActive == true) {
                text.forEach(p => p.style.color = "white");
                bg.style.background = "rgb(224, 224, 224)";
                ui1.forEach(el => el.style.background = uiColor);
                ui2.forEach(el => el.style.background = uiColor);
                ui3.forEach(el => el.style.background = uiColor);
                ui4.forEach(el => el.style.background = uiColor);
            }
            else {
                text.forEach(p => p.style.color = "black");
                bg.style.background = "rgb(48, 47, 47)";
                ui1.forEach(el => el.style.background = "white");
                ui2.forEach(el => el.style.background = "white");
                ui3.forEach(el => el.style.background = "white");
                ui4.forEach(el => el.style.background = "white");
            }
        })
    }
    let whiteSquare = document.querySelectorAll('.white-square');
    let darkSquare = document.querySelectorAll('.dark-square');
    let whiteSquareColors = ["rgb(2, 196, 255)", "rgb(255, 2, 2)", "rgb(3, 189, 0)", "rgb(255, 209, 2)", "rgb(255, 2, 179)"];
    let darkSquareColors = ["rgb(157, 242, 255)", "rgb(255, 157, 157)", "rgb(160, 255, 157)", "rgb(255, 240, 157)", "rgb(255, 157, 232)"];
    let hoverAnims = ["hoverButtonAnim1", "hoverButtonAnim2", "hoverButtonAnim3", "hoverButtonAnim4", "hoverButtonAnim5"];
    let currentHoverAnim = 0;
    ui1.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = `${hoverAnims[currentHoverAnim]} 0.2s forwards`;
        })
        button.addEventListener('mouseleave', () => {
            button.style.animation = `none`;
        })
    })
    ui2.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = `${hoverAnims[currentHoverAnim]} 0.2s forwards`;
        })
        button.addEventListener('mouseleave', () => {
            button.style.animation = `none`;
        })
    })
    ui3.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = `${hoverAnims[currentHoverAnim]} 0.2s forwards`;
        })
        button.addEventListener('mouseleave', () => {
            button.style.animation = `none`;
        })
    })
    ui4.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = `${hoverAnims[currentHoverAnim]} 0.2s forwards`;
        })
        button.addEventListener('mouseleave', () => {
            button.style.animation = `none`;
        })
    })
    function boardColorChange() {
        let timePressed = 1;
        skinsButton.addEventListener('click', () => {
            timePressed++;
            if (timePressed == 1) {
                whiteSquare.forEach(el => el.style.background = whiteSquareColors[0]);
                darkSquare.forEach(el => el.style.background = darkSquareColors[0]);
                currentHoverAnim = 0;
            }
            if (timePressed == 2) {
                whiteSquare.forEach(el => el.style.background = whiteSquareColors[1]);
                darkSquare.forEach(el => el.style.background = darkSquareColors[1]);
                currentHoverAnim = 1;
            }
            if (timePressed == 3) {
                whiteSquare.forEach(el => el.style.background = whiteSquareColors[2]);
                darkSquare.forEach(el => el.style.background = darkSquareColors[2]);
                currentHoverAnim = 2
            }
            if (timePressed == 4) {
                whiteSquare.forEach(el => el.style.background = whiteSquareColors[3]);
                darkSquare.forEach(el => el.style.background = darkSquareColors[3]);
                currentHoverAnim = 3
            }
            if (timePressed == 5) {
                whiteSquare.forEach(el => el.style.background = whiteSquareColors[4]);
                darkSquare.forEach(el => el.style.background = darkSquareColors[4]);
                currentHoverAnim = 4
                timePressed = 0;
            }
        })
    }
    activateSound();
    themeChange();
    boardColorChange();
    //================================================================================================

    //==================ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ=====================================

    function random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    function getSpot(i, j) {
        return i * 8 + j;
    }
    function getI(index) {
        return Math.floor(index / 8);
    }
    function getJ(index) {
        return index % 8;
    }
    function getAllRookMoves(index) {
        let i = Math.floor(index / 8);
        let j = index % 8;
        let moves = [];

        // Все 4 направления: вверх, вправо, вниз, влево
        const directions = [
            [-1, 0], // вверх
            [0, 1],  // вправо
            [1, 0],  // вниз
            [0, -1]  // влево
        ];

        for (let dir of directions) {
            let newI = i + dir[0];
            let newJ = j + dir[1];

            // Двигаемся в направлении, пока не выйдем за доску
            while (newI >= 0 && newI < 8 && newJ >= 0 && newJ < 8) {
                moves.push(newI * 8 + newJ);
                newI += dir[0];
                newJ += dir[1];
            }
        }

        return moves;
    }
    function getAllBishopMoves(index) {
        let i = Math.floor(index / 8);
        let j = index % 8;
        let moves = [];

        // Все 4 диагональных направления
        const directions = [
            [-1, -1], // вверх-влево
            [-1, 1],  // вверх-вправо
            [1, -1],  // вниз-влево
            [1, 1]    // вниз-вправо
        ];

        for (let dir of directions) {
            let newI = i + dir[0];
            let newJ = j + dir[1];

            // Двигаемся в направлении, пока не выйдем за доску
            while (newI >= 0 && newI < 8 && newJ >= 0 && newJ < 8) {
                moves.push(newI * 8 + newJ);
                newI += dir[0];
                newJ += dir[1];
            }
        }

        return moves;
    }
    function getAllKingMoves(index) {
        let i = Math.floor(index / 8);
        let j = index % 8;
        let moves = [];

        // Все 8 направлений движения короля
        const kingDirections = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (let dir of kingDirections) {
            let newI = i + dir[0];
            let newJ = j + dir[1];

            // Проверяем, что новая позиция в пределах доски
            if (newI >= 0 && newI < 8 && newJ >= 0 && newJ < 8) {
                moves.push(newI * 8 + newJ);
            }
        }

        return moves;
    }
    //===============================================================================

    //=======================ВКЛ/ВЫКЛ ИГРУ================================
    playButton.addEventListener('click', () => {
        isGameOn = true;
        console.log(` Игра началась! ${isGameOn}`);
        playButton.style.display = "none";
        settingsButton.style.display = "none";
        playerSpawner();
        time();
        score.innerHTML = `<p> Score: ${scoreCount} </p>`;
    })
    exitButton.addEventListener('click', () => {
        afterGameOver();
    })
    function afterGameOver() {
        isGameOn = false;
        console.log(` Игра кончилась! ${isGameOn}`)
        playButton.style.display = "flex";
        settingsButton.style.display = "flex";
        if (timeInterval != null) {
            clearInterval(timeInterval);
            timeInterval = null;
            timeValue = mode;
            timer.innerHTML = `<p style="font-size: 30px">${timeValue}</p>`;
        }
        timeValue = mode;
        score.innerHTML = `<p> ${currentMode} </p>`;
        for (let i = 0; i < 64; i++) {
            squares[i].innerHTML = '';
        }
        scoreCount = 0;
        timer.innerHTML = `<p style="font-size: 30px">${timeValue}</p>`;
    }
    //============================================================================================

    //=======================ЛОГИКА ГЕЙМПЛЕЯ=======================================
    let pieceTypeOf = ["King Player", "Rook Player", "Bishop Player", "King", "Rook", "Bishop", "King Bomb", "Rook Bomb", "Bishop Bomb",];
    let pieceType = null;
    let randomSpot = null;
    let scoreCount = 0;
    function initializeSquares() {
        let newSquares = [];
        for (let i = 0; i < 64; i++) {
            newSquares[i] = document.querySelector(`#square${i + 1}`);
        }
        return newSquares;
    }

    let squares = initializeSquares();

    function playerSpawner() {
        let piece = document.createElement('div');
        pieceType = pieceTypeOf[random(0, 3)];
        piece.className = pieceType;
        piece.style.transform = `scale(2)`;
        piece.style.cursor = "grab";
        piece.innerHTML = `<img src = "assets/images/${pieceType}.svg">`;
        randomSpot = random(0, 64);
        squares[randomSpot].appendChild(piece);
        console.log(`current pieceType: ${pieceType}, current square: ${squares[randomSpot]}`);
        createEatiblePieces();
        createNonEatiblePieces();
    }
    function getPlayerPos() {
        let playerPos = randomSpot;
        return playerPos
    }
    function getAvailableSpotForSpawn() {
        let availableSpotForSpawn = [];
        if (pieceType == pieceTypeOf[0]) {
            availableSpotForSpawn = getAllKingMoves(getPlayerPos());
        }
        if (pieceType == pieceTypeOf[1]) {
            availableSpotForSpawn = getAllRookMoves(getPlayerPos());
        }
        if (pieceType == pieceTypeOf[2]) {
            availableSpotForSpawn = getAllBishopMoves(getPlayerPos());
        }
        return availableSpotForSpawn;
    }
    function createEatiblePieces() {
        let availableSpots = getAvailableSpotForSpawn();
        let quantityOfSpawn = random(1, 4);
        for (let i = 0; i < quantityOfSpawn; i++) {
            let spawnSpot = availableSpots[random(0, availableSpots.length)];
            let piece = document.createElement('div');
            let pieceType = pieceTypeOf[random(3, 6)];
            piece.className = pieceType;
            piece.style.transform = `scale(2)`;
            piece.innerHTML = `<img src = "assets/images/${pieceType}.svg">`;
            squares[spawnSpot].appendChild(piece);
            console.log(`current pieceType: ${pieceType}, current square: ${squares[randomSpot]}`)
            piece.addEventListener('click', function (e) {
                scoreCount++;
                score.innerHTML = `<p> Score: ${scoreCount} </p>`;
                console.log('piece is captured!');
                for (let i = 0; i < squares.length; i++) {
                    squares[i].innerHTML = '';
                }
                playerSpawner();
            })
            for (let j = 0; j < availableSpots.length; j++) {
                if (spawnSpot == availableSpots[j]) {
                    availableSpots[j] = null;
                }
            }
        }
    }
    function createNonEatiblePieces() {
        let availableSpots = getAvailableSpotForSpawn();
        let playerSpot = getPlayerPos();
        let quantityOfSpawn = random(0, 5);
        let flag = false;
        for (let i = 0; i < quantityOfSpawn; i++) {
            let piece = document.createElement('div');
            let pieceType = pieceTypeOf[random(3, 6)];
            let spawnSpot = random(0, 64);
            if (spawnSpot != playerSpot) {
                for (let j = 0; j < availableSpots.length; j++) {
                    if (spawnSpot != availableSpots[j]) {
                        flag = true;
                    }
                }
            }
            if (flag == true) {
                for (let j = 0; j < availableSpots.length; j++) {
                    if (spawnSpot == availableSpots[j]) {
                        availableSpots[j] = null;
                    }
                }
                piece.className = pieceType;
                piece.style.transform = `scale(2)`;
                piece.innerHTML = `<img src = "assets/images/${pieceType}.svg">`;
                squares[spawnSpot].appendChild(piece);
                piece.id = "trap";
                console.log(`current pieceType: ${pieceType}, current square: ${squares[randomSpot]}`)
                piece.addEventListener('click', function (e) {
                    console.log('WRONG piece is captured!');
                    alert(`WRONG PIECE IS CAPTURED! You Loose Your Score is: ${scoreCount}`);
                    afterGameOver();
                })
            }
            if (flag == false) {
                continue;
            }
        }
    }


    //=============================================================================

    //==========================ЛОГИКА ТАЙМЕРА И ВЫБОРА РЕЖИМА===========================
    let timeValue = 10;
    let mode = 10;
    let timeInterval = null;
    let currentMode = "Quick";
    timer.innerHTML = `<p style="font-size: 30px">${timeValue}</p>`;
    score.innerHTML = `<p> ${currentMode} </p>`
    function modeSelection() {
        let timePressed = 1;
        settingsButton.addEventListener('click', () => {
            timePressed++;
            if (timePressed == 1) {
                mode = 10;
                timeValue = mode;
                timer.innerHTML = `<p style="font-size: 30px">${timeValue}</p>`;
                currentMode = "Quick";
                score.innerHTML = `<p> ${currentMode} </p>`
            }
            if (timePressed == 2) {
                mode = 30;
                timeValue = mode;
                timer.innerHTML = `<p style="font-size: 30px">${timeValue}</p>`;
                currentMode = "Normal";
                score.innerHTML = `<p> ${currentMode} </p>`
            }
            if (timePressed == 3) {
                mode = 60;
                timePressed = 0;
                timeValue = mode;
                timer.innerHTML = `<p style="font-size: 30px">${timeValue}</p>`;
                currentMode = "Long";
                score.innerHTML = `<p> ${currentMode} </p>`
            }
        })
    }
    modeSelection();
    function time() {
        if (timeInterval != null) {
            clearInterval(timeInterval);
            timeInterval = null;
        }

        let expectedEnd = Date.now() + (timeValue * 1000);

        timeInterval = setInterval(() => {
            let remaining = Math.max(0, Math.ceil((expectedEnd - Date.now()) / 1000));

            timer.innerHTML = `<p style="font-size: 30px">${remaining}</p>`;
            timeValue = remaining;

            console.log(remaining);

            if (remaining <= 0) {
                clearInterval(timeInterval);
                timeInterval = null;
                alert(`TIME IS UP! Your Score is: ${scoreCount}`);
                afterGameOver();
            }
        }, 1000);
    }
    //==========================================================================
});