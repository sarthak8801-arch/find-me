// ======================================================
// FIND ME
// A Romantic Puzzle Adventure
// Part 1
// ======================================================


// ======================================================
// GAME STATE
// ======================================================

const game = {

    currentMemory:0,

    moves:0,

    hintsUsed:0,

    playerX:0,

    playerY:0,

    maze:null,

    enemies:[],

    typing:false

};


// ======================================================
// MAIN CONTAINER
// ======================================================

const scene = document.getElementById("scene");


// ======================================================
// START GAME
// ======================================================

window.onload=function(){

    showBoot();

};


// ======================================================
// FADE HELPER
// ======================================================

function fade(html){

    scene.classList.remove("fadeIn");

    void scene.offsetWidth;

    scene.innerHTML=html;

    scene.classList.add("fadeIn");

}


// ======================================================
// TYPEWRITER EFFECT
// ======================================================

function typeWriter(text,element,callback){

    let i=0;

    element.innerHTML="";

    game.typing=true;

    function type(){

        if(i<text.length){

            element.innerHTML+=text.charAt(i);

            i++;

            setTimeout(type,20);

        }

        else{

            game.typing=false;

            if(callback){

                callback();

            }

        }

    }

    type();

}



// ======================================================
// BOOT SCREEN
// ======================================================

function showBoot(){

fade(`

<div class="memoryCard">

<div class="heart">

❤️

</div>

<h1>

Find Me

</h1>

<p>

Preparing Your Adventure...

</p>

<div class="loading">

<div class="progress" id="progress"></div>

</div>

<p id="loadingText">

0%

</p>

</div>

`);

startLoading();

}



// ======================================================
// LOADING
// ======================================================

function startLoading(){

let progress=0;

const bar=document.getElementById("progress");

const text=document.getElementById("loadingText");

const timer=setInterval(function(){

progress++;

bar.style.width=progress+"%";

text.innerHTML=progress+"%";

if(progress>=100){

clearInterval(timer);

setTimeout(showTransmission,500);

}

},25);

}



// ======================================================
// TRANSMISSION
// ======================================================

function showTransmission(){

fade(`

<div class="memoryCard">

<h1>

Incoming Transmission

</h1>

<div id="story"></div>

<br>

<button
id="continueButton"
style="display:none;">

Accept Mission ❤️

</button>

</div>

`);

const message=`

Hello Munchkin,

Someone very precious has disappeared...

The only way to find them

is to recover three forgotten memories.

Each memory is protected

by a unique challenge.

Recover every memory.

Reach the end.

And discover your surprise.

Good luck.

Love,

Baby Shark ❤️

`;

const target=document.getElementById("story");

typeWriter(message,target,function(){

document
.getElementById("continueButton")
.style.display="inline-block";

document
.getElementById("continueButton")
.onclick=function(){

showTutorial();

};

});

}



// ======================================================
// TUTORIAL
// ======================================================

function showTutorial(){

fade(`

<div class="memoryCard">

<h1>

Tutorial

</h1>

<p>

Before we begin...

Enter the verification code.

</p>

<h2>

2006

</h2>

<input
id="answer"
placeholder="Enter Code">

<br>

<button
onclick="checkTutorial()">

Submit

</button>

<button
onclick="tutorialHint()">

Hint

</button>

<p id="hint"></p>

</div>

`);

}

// ======================================================
// TUTORIAL CHECK
// ======================================================

function checkTutorial(){

const answer=document
.getElementById("answer")
.value
.trim();

if(answer==="2006"){

showTutorialSuccess();

}

else{

alert("Incorrect code.");

}

}



// ======================================================
// TUTORIAL HINT
// ======================================================

function tutorialHint(){

document
.getElementById("hint")
.innerHTML="The answer is shown right above the input box.";

}



// ======================================================
// TUTORIAL SUCCESS
// ======================================================

function showTutorialSuccess(){

fade(`

<div class="memoryCard">

<h1>

Verified ❤️

</h1>

<p>

Identity confirmed.

The first memory is ready.

</p>

<br>

<button onclick="memory1Title()">

Continue

</button>

</div>

`);

}



// ======================================================
// MEMORY 01 TITLE
// ======================================================

function memory1Title(){

fade(`

<div class="memoryCard">

<h1>

Memory 01

</h1>

<h2>

The Beginning

</h2>

<p>

Every story has a beginning.

</p>

</div>

`);

setTimeout(showMemory1,2500);

}



// ======================================================
// MEMORY 01
// ======================================================

function showMemory1(){

fade(`

<div class="memoryCard">

<h1>

The Beginning

</h1>

<p>

Every story has a beginning.

</p>

<p>

Do you remember ours?

</p>

<br>

<p>

What date did ours begin?

</p>

<input

id="memoryAnswer"

placeholder="Enter Date">

<br>

<button

onclick="checkMemory1()">

Submit

</button>

<button

onclick="memory1Hint()">

Hint

</button>

<p id="hint"></p>

</div>

`);

}



// ======================================================
// MEMORY 01 HINT
// ======================================================

function memory1Hint(){

game.hintsUsed++;

const hint=document.getElementById("hint");

switch(game.hintsUsed){

case 1:

hint.innerHTML="Think about the day everything started.";

break;

case 2:

hint.innerHTML="It isn't the month.";

break;

case 3:

hint.innerHTML="It's simply 15.";

break;

default:

hint.innerHTML="No more hints ❤️";

}

}



// ======================================================
// MEMORY 01 CHECK
// ======================================================

function checkMemory1(){

const answer=document
.getElementById("memoryAnswer")
.value
.trim();

if(answer==="15"){

showMemory1Success();

}

else{

alert("Not quite ❤️");

}

}



// ======================================================
// MEMORY 01 SUCCESS
// ======================================================

function showMemory1Success(){

fade(`

<div class="memoryCard">

<div class="heart">

❤️

</div>

<h1>

Memory Restored

</h1>

<p>

You remembered the beginning.

</p>

<p>

Memory Fragment 1 recovered.

</p>

<br>

<button onclick="memory2Title()">

Continue

</button>

</div>

`);

}



// ======================================================
// MEMORY 02 TITLE
// ======================================================

function memory2Title(){

game.moves=0;

fade(`

<div class="memoryCard">

<h1>

Memory 02

</h1>

<h2>

A Beautiful Memory

</h2>

<p>

One of our favourite memories

has been scattered.

Can you put it back together?

</p>

</div>

`);

setTimeout(showMemory2,2500);

}

// ======================================================
// MEMORY 02 VARIABLES
// ======================================================

let memory2Board = [];

let selectedTile = null;

let puzzleSolved = false;

const correctOrder = [
0,1,2,
3,4,5,
6,7,8
];



// ======================================================
// SHOW MEMORY 02
// ======================================================

function showMemory2(){

memory2Board = [...correctOrder];

shuffleBoard();

selectedTile = null;

puzzleSolved = false;

drawMemory2();

}



// ======================================================
// SHUFFLE
// ======================================================

function shuffleBoard(){

for(let i=memory2Board.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1));

[memory2Board[i],memory2Board[j]]=[

memory2Board[j],

memory2Board[i]

];

}

// Prevent solved board

if(isSolved()){

shuffleBoard();

}

}



// ======================================================
// DRAW PUZZLE
// ======================================================




// ======================================================
// TILE SELECT
// ======================================================

function selectTile(index){

if(puzzleSolved){

return;

}

const tiles=document.querySelectorAll(".photoTile");

if(selectedTile===null){

selectedTile=index;

tiles[index].style.outline="4px solid #ff6fa5";

return;

}

if(selectedTile===index){

tiles[index].style.outline="none";

selectedTile=null;

return;

}

swapTiles(selectedTile,index);

selectedTile=null;

game.moves++;

drawMemory2();

}



// ======================================================
// SWAP
// ======================================================

function swapTiles(a,b){

[memory2Board[a],memory2Board[b]]=[

memory2Board[b],

memory2Board[a]

];

}

// ======================================================
// MEMORY 02 HINT
// ======================================================

function memory2Hint(){

const hint=document.getElementById("hint");

hint.innerHTML=

"Start by rebuilding one complete row. The corners are the easiest pieces to recognise.";

}



// ======================================================
// CHECK IF SOLVED
// ======================================================

function isSolved(){

for(let i=0;i<9;i++){

if(memory2Board[i]!==correctOrder[i]){

return false;

}

}

return true;

}



// ======================================================
// UPDATE AFTER EVERY MOVE
// ======================================================

function drawMemory2(){

fade(`

<div class="memoryCard">

<h1>

Memory 02

</h1>

<p>

Rebuild our memory ❤️

</p>

<p>

Moves:
<span id="moveCounter">

${game.moves}

</span>

</p>

<div id="photoPuzzle">

</div>

<br>

<button onclick="memory2Hint()">

Hint

</button>

<p id="hint"></p>

</div>

`);

const board=document.getElementById("photoPuzzle");

for(let i=0;i<9;i++){

const tile=document.createElement("div");

tile.className="photoTile";

tile.dataset.index=i;

const piece=memory2Board[i];

const row=Math.floor(piece/3);

const col=piece%3;

tile.style.backgroundImage="url('images/memory2.jpg')";

tile.style.backgroundSize="300% 300%";

tile.style.backgroundPosition=

`${col*50}% ${row*50}%`;

tile.onclick=function(){

selectTile(i);

};

board.appendChild(tile);

}

// Check for victory after rendering

if(isSolved()){

puzzleSolved=true;

setTimeout(showMemory2Success,700);

}

}



// ======================================================
// MEMORY 02 SUCCESS
// ======================================================

function showMemory2Success(){

fade(`

<div class="memoryCard">

<h1>

Memory Restored ❤️

</h1>

<p>

You put our favourite memory back together.

</p>

<img

src="images/memory2.jpg"

style="

width:420px;

border-radius:18px;

margin:25px 0;

box-shadow:0 10px 30px rgba(0,0,0,.2);

">

<p>

Moves Used:

<strong>

${game.moves}

</strong>

</p>

<br>

<button onclick="memory3Title()">

Continue

</button>

</div>

`);

}



// ======================================================
// MEMORY 03 TITLE
// ======================================================

function memory3Title(){

fade(`

<div class="memoryCard">

<h1>

Memory 03

</h1>

<h2>

Find Me ❤️

</h2>

<p>

No matter how confusing life became...

you always found your way back to me.

</p>

</div>

`);

setTimeout(showMemory3,2500);

}

// ======================================================
// MEMORY 03 VARIABLES
// ======================================================

const mazeSize = 10;

let player = {
    x:0,
    y:0
};

let goal = {
    x:9,
    y:9
};

let enemies = [

    {x:2,y:2,dx:1,dy:0,img:"images/friend1.png"},

    {x:6,y:5,dx:-1,dy:0,img:"images/friend2.png"},

    {x:4,y:8,dx:0,dy:-1,img:"images/friend3.png"}

];

const maze = [

[0,0,0,0,1,0,0,0,0,0],
[1,1,1,0,1,0,1,1,1,0],
[0,0,0,0,1,0,0,0,1,0],
[0,1,1,0,1,1,1,0,1,0],
[0,1,0,0,0,0,1,0,0,0],
[0,1,0,1,1,0,1,1,1,0],
[0,0,0,1,0,0,0,0,1,0],
[1,1,0,1,0,1,1,0,1,0],
[0,0,0,0,0,1,0,0,0,0],
[0,1,1,1,0,0,0,1,1,0]

];



// ======================================================
// SHOW MEMORY 03
// ======================================================

function showMemory3(){

player.x = 0;
player.y = 0;

enemies = [

    {
        x:2,
        y:2,
        dx:1,
        dy:0,
        img:"images/friend1.png"
    },

    {
        x:6,
        y:5,
        dx:-1,
        dy:0,
        img:"images/friend2.png"
    },

    {
        x:4,
        y:8,
        dx:0,
        dy:-1,
        img:"images/friend3.png"
    }

];
fade(`

<div class="memoryCard">

<h1>

Find Me ❤️

</h1>

<p>

Help Munchkin reach Baby Shark.

Avoid the moving friends!

</p>

<div id="maze"></div>

<br>

<button onclick="memory3Hint()">

Hint

</button>

<p id="hint"></p>

</div>

`);

drawMaze();

startEnemies();

}



// ======================================================
// DRAW MAZE
// ======================================================

function drawMaze(){

const board=document.getElementById("maze");

board.innerHTML="";

for(let y=0;y<mazeSize;y++){

for(let x=0;x<mazeSize;x++){

const cell=document.createElement("div");

cell.className="mazeCell";

if(maze[y][x]===1){

cell.classList.add("wall");

}

if(player.x===x && player.y===y){

cell.innerHTML=`<img src="images/her.png">`;

}

else if(goal.x===x && goal.y===y){

cell.innerHTML=`<img src="images/me.png">`;

}

else{

enemies.forEach(enemy=>{

if(enemy.x===x && enemy.y===y){

cell.innerHTML=`<img src="${enemy.img}">`;

}

});

}

board.appendChild(cell);

}

}

}



// ======================================================
// HINT
// ======================================================

function memory3Hint(){

document
.getElementById("hint")
.innerHTML=

"The friends keep moving. Wait for an opening before crossing.";

}

// ======================================================
// KEYBOARD CONTROLS
// ======================================================

document.addEventListener("keydown",function(e){

switch(e.key){

case "ArrowUp":
movePlayer(0,-1);
break;

case "ArrowDown":
movePlayer(0,1);
break;

case "ArrowLeft":
movePlayer(-1,0);
break;

case "ArrowRight":
movePlayer(1,0);
break;

}

});



// ======================================================
// MOBILE CONTROLS
// ======================================================

window.addEventListener("load",()=>{

const up=document.getElementById("up");
const down=document.getElementById("down");
const left=document.getElementById("left");
const right=document.getElementById("right");

if(up){

up.onclick=()=>movePlayer(0,-1);

down.onclick=()=>movePlayer(0,1);

left.onclick=()=>movePlayer(-1,0);

right.onclick=()=>movePlayer(1,0);

}

});



// ======================================================
// MOVE PLAYER
// ======================================================

function movePlayer(dx,dy){

if(!document.getElementById("maze")){

    return;

}

const newX=player.x+dx;
const newY=player.y+dy;

if(newX<0 || newX>=mazeSize){

return;

}

if(newY<0 || newY>=mazeSize){

return;

}

if(maze[newY][newX]===1){

return;

}

player.x=newX;
player.y=newY;

checkEnemyCollision();

drawMaze();

if(player.x===goal.x && player.y===goal.y){

mazeComplete();

}

}



// ======================================================
// ENEMY MOVEMENT
// ======================================================

let enemyTimer;



function startEnemies(){

clearInterval(enemyTimer);

enemyTimer=setInterval(function(){

moveEnemies();

},600);

}



// ======================================================
// MOVE ENEMIES
// ======================================================

function moveEnemies(){

enemies.forEach(enemy=>{

let nextX=enemy.x+enemy.dx;
let nextY=enemy.y+enemy.dy;

if(

nextX<0 ||

nextX>=mazeSize ||

nextY<0 ||

nextY>=mazeSize ||

maze[nextY][nextX]===1

){

enemy.dx*=-1;
enemy.dy*=-1;

nextX=enemy.x+enemy.dx;
nextY=enemy.y+enemy.dy;

}

enemy.x=nextX;
enemy.y=nextY;

});

checkEnemyCollision();

drawMaze();

}



// ======================================================
// COLLISION
// ======================================================

function checkEnemyCollision(){

for(const enemy of enemies){

if(

enemy.x===player.x &&

enemy.y===player.y

){

clearInterval(enemyTimer);

alert("😂 Your friends caught you! Try again.");

showMemory3();

return;

}

}

}



// ======================================================
// MAZE COMPLETE
// ======================================================

function mazeComplete(){

clearInterval(enemyTimer);

fade(`

<div class="memoryCard">

<div class="heart">

❤️

</div>

<h1>

You Found Me

</h1>

<p>

No matter what came between us...

you always found your way back to me.

</p>

<br>

<button onclick="showLetter()">

Read My Letter ❤️

</button>

</div>

`);

}



// ======================================================
// HEARTFELT LETTER
// ======================================================

function showLetter(){

fade(`

<div class="memoryCard">

<h1>

For My Munchkin ❤️

</h1>

<pre id="letterText"></pre>

</div>

`);

const letter=`

Hey Baby ❤️

Since you were having a boring day, I came up with this idea of creating a little game to surprise you and bring a smile to your face. 🥰

Baki, you know how badly I have been falling for you day by day... 😌

With you, every day feels like a new beginning and every moment spent with you feels refreshing and beautiful. 🫶🏻

I know we had some rough moments in the past, but despite all of that, my love for you has only grown stronger.

I truly see you as a part of me, without whom everything around me feels incomplete. 🥺

So Baby...

I just want to tell you one thing...

❤️ I LOVE YOU ❤️

And I genuinely want to spend my life with you till eternity. ♾️

I really look forward to meeting you this week...

and I expect a very good pappi for all this effort. 🙈❤️

Love,

Yours Forever,

Baby Shark 🦈 ❤️

`;

const target=document.getElementById("letterText");

typeWriter(letter,target,function(){

const btn=document.createElement("button");

btn.innerHTML="❤️ The End ❤️";

btn.onclick=function(){

fade(`

<div class="memoryCard">

<div class="heart">

❤️

</div>

<h1>

Thank You

</h1>

<p>

Thank you for playing.

But more importantly...

Thank you for being a part of my life.

❤️

</p>

</div>

`);

};

scene.appendChild(btn);

});

}
