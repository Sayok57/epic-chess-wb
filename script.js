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

    //=======================ВКЛ/ВЫКЛ ИГРУ================================
    playButton.addEventListener('click', () => {
        isGameOn = true;
        console.log(` Игра началась! ${isGameOn}`);
        playButton.style.display = "none";
        settingsButton.style.display = "none";
        time();
        score.innerHTML = `<p> Score: ${scoreCount} </p>`;
    })
    exitButton.addEventListener('click', () => {
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
    })
    //============================================================================================

    //==========================ЛОГИКА ИГРЫ===========================
    let timeValue = 10;
    let mode = 10;
    let timeInterval = null;
    let currentMode = "Quick";
    let scoreCount = 0;
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
        if (isGameOn == true) {
            if (timeInterval != null) {
                clearInterval(timeInterval);
                timeInterval = null;
            }
            timeInterval = setInterval(() => {
                timer.innerHTML = `<p style="font-size: 30px">${timeValue}</p>`
                timeValue--;
                console.log(timeValue);
                if (timeValue <= 0) {
                    clearInterval(timeInterval);
                    timeInterval = null;
                }
            }, 1000)
        }
    }
});