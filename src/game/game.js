//constants
const colors = ["red", "orange", "green", "yellow", "indigo",];
const startBtn = document.getElementById("restarter");
const board = document.getElementById("game-board");
const canvas = board.getElementsByTagName("canvas")[0];

//variables
let player;
let obstacles = [];
let rateOfGravity = 0.08;

//set canvas dimensions
canvas.width = window.innerWidth / 1.25;
canvas.height = window.innerHeight / 1.75;

//give the buttons purpose
document.body.onload = mapButtonPresses;

//game piece, score, obstacles
class component {
    constructor(height, width, color, x, y, type) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.gravitySpeed = 0;
        this.gravity = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.score = 0;


        this.update = function () {
            let ctx = gameArea.context;
            //trying to make our player a picture
            if (0) {
                let pic = new Image(width, height);
                pic.src = "pics/notajet.png";
                pic.onload = () => {
                    ctx.fillStyle = ctx.createPattern(pic, "no-repeat")
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
            }
            else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }

        //decides how the component's position will change
        this.newPos = function () {
            this.gravitySpeed += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY + this.gravitySpeed;
            this.stopAtFloor();
            this.stopAtCeiling();
        }

        //create a ceiling so game piece doesn't fly off the canvas
        this.stopAtCeiling = () => {
            if (this.y <= (0)) {
                this.y = .1;
                this.gravitySpeed = 0;
                accelerate(rateOfGravity);
            }
        }

        //create a floor so game piece doesn't fall off the canvas
        this.stopAtFloor = () => {
            let rockbottom = gameArea.canvas.height - this.height;
            if (this.y > rockbottom) {
                this.y = rockbottom;
                this.gravitySpeed = 0;
            }
        }

        this.crashWith = function (otherobj) {
            //my dimensions
            let myleft = this.x;
            let mytop = this.y;
            let myright = this.x + (this.width);
            let mybottom = this.y + (this.height);
            //other object dimnsions
            let otherleft = otherobj.x;
            let othertop = otherobj.y;
            let otherright = otherobj.x + (otherobj.width);
            let otherbottom = otherobj.y + (otherobj.height);
            //return if we hit something or not
            return !((mybottom < othertop) || (mytop > otherbottom) ||
                (myright < otherleft) || (myleft > otherright))
        }
    }//end constructor
}//end class


function updateGameArea() {

    let crash = checkForCrash();
    if (crash) gameOver();
    else keepOnMoving();

    function checkForCrash() {
        //if the gamepiece connects with an obstacle, return true; we crashed
        for (let i = 0; i < obstacles.length; i++)
            if (player.crashWith(obstacles[i]))
                return true;
        return false;
    }

    //if we've reached this far, we crashed
    function gameOver() {
        startBtn.disabled = false;
        gameArea.clear();
    }

    function keepOnMoving() {
        //alter game area
        keepTheGameRolling();
        //get new obstacles
        mapObstacles();
        //move obstacles closer
        moveThroughMap();
        //change score
        updateScore();

        function keepTheGameRolling() {
            gameArea.clear();
            gameArea.frameNo++;
        }

        function mapObstacles() {
            let height, gap, lowerHeight, lowerY, obstacleColor;
            //obstacle mins and maxes
            const x = gameArea.canvas.width, minHeight = 20, maxHeight = 200,
                minGap = (player.height * 2), maxGap = 200, widths = 13;

            if (everyinterval()) {
                // gaps between upper and lower obstacles
                gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
                //get random height for top obstacle
                height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
                //lower obstacle coordinates
                lowerHeight = (x - height - gap);
                lowerY = (height + gap);
                //place two components in the obstacle array 
                obstacleColor = getRandomColor();
                //(top obstacle) 
                obstacles.push(new component(height, widths, obstacleColor, x, 0, "obstacle"));
                //(bottom obstacle)
                obstacles.push(new component(lowerHeight, widths, obstacleColor, x, lowerY, "obstacle"));
            }

            function getRandomColor() {
                return colors[Math.floor(Math.random() * (colors.length + 1))];
            }
            //changes the speed that the obstacles come at player
            function everyinterval() {
                return (gameArea.frameNo / 100) % 1 === 0;
            }
        }

        function moveThroughMap() {
            //moves the obstacle toward the main component
            for (let i = 0; i < obstacles.length; i++) {
                obstacles[i].x--;
                obstacles[i].update();
            }
        }
    }

    function updateScore() {
        const scoreCard = document.getElementById("score-board");
        let score = scoreCard.getElementsByTagName("span")[0];
        score.innerText = (gameArea.frameNo).toFixed(0);
        updateComponents();

        function updateComponents() {
            player.newPos();
            player.update();
        }
    }
}

function mapButtonPresses() {
    startBtn.onclick = startGame;
    //when we get off the button, drop
    document.onkeyup = () => accelerate(rateOfGravity);
    //when we press 'up' move up
    document.onkeydown = (event) => changeSpeed(event.key)

    function changeSpeed(key) {
        switch (key) {
            case "ArrowUp": {
                accelerate(-0.2);
                break;
            }
            case "ArrowDown": {
                accelerate(0.2);
                break;
            }
            default:{}
        }
    }

    function startGame() {
        //get randy num
        let randomNum = Math.floor(Math.random() * colors.length);
        //get randy color
        let color = colors[randomNum];
        //set player piece
        player = new component(30, 30, color, 10, 120, "pic");
        player.gravity = 0.5;
        startBtn.disabled = true;
        gameArea.start();
    }
}

//negative values move our piece up; poisitive values move us down
function accelerate(n) {
    player.gravity = n;
}

const gameArea = {

    canvas: canvas,

    start: function () {
        this.frameNo = 0;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
        board.append(this.canvas);
    },

    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}