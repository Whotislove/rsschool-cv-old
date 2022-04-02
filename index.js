var cvs = document.getElementById('canvas');
var ctx = cvs.getContext("2d");
var gap = 90;
var score = 0;
var gameOver = document.getElementById('gameover');
var replay = document.querySelector('.replay')
//Image

var bird = new Image();
var bg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var fg = new Image();

//Load png

bird.src = "assets/png/flappy_bird_bird.png"
bg.src = "assets/png/flappy_bird_bg.png"
pipeUp.src = 'assets/png/flappy_bird_pipeUp.png'
pipeBottom.src = 'assets/png/flappy_bird_pipeBottom.png'
fg.src = 'assets/png/flappy_bird_fg.png'


var pipe = [2];


pipe[0] = {
    x: cvs.width,
    y: 0 , 
}

//Load audio

var flyAudio = new Audio();
var scoreAudio = new Audio();

flyAudio.src = "assets/audio/fly.mp3"
scoreAudio.src = "assets/audio/score.mp3"


//Fly bird
document.addEventListener('click', moveUp)
document.addEventListener('keydown', moveUp)

function moveUp () {
    yPos -=25;
    flyAudio.play()
}
//Bird position

var xPos = 10;
var yPos = 160;
var grav = 1.5;

//Lose

var lose = "You lose!!!"

//Draw all


function drawImage() {
    ctx.drawImage(bg, 0, 0);

    for( let i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        ctx.drawImage(pipeBottom, pipe[i].x,pipe[i].y + pipeUp.height + gap)
        pipe[i].x--
        if(pipe[i].x == 100){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
            })
        }
        
        if(xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - fg.height){
           
            pipe[i].x++
            grav = 0
            gameOver.style.visibility = "visible"
            document.removeEventListener('click', moveUp)
            document.removeEventListener('keydown', moveUp)
            replay.addEventListener('click', function (){
                location.reload()
            })

           break;  
        }
        if (pipe[i].x == 5){
       score++
       scoreAudio.play()
        }
        
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height)
    ctx.drawImage(bird, xPos, yPos)

    yPos += grav;

    ctx.fillStyle = "#000"
    ctx.font = "24px Arial"
    ctx.fillText("Счет: " + score, 10, cvs.height - 20)
    requestAnimationFrame(drawImage);
}
pipeBottom.onload = drawImage;
