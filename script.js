//VAR-OBJECT//

const listEnemies = ["biscuit", "bonbonRond","bonbon", "chocolat_1", "croissant", "donnut", "muffinA","muffinB", "muffinC", "sucette_1", "sucette", "tarte"]
let enemiesOnScreen = []
let valueEnemies
let enemy
let imageEnemy
const container = document.querySelector(".game_container")
let gravitySpeed = 30
const modal = document.querySelector(".modal")

//OBJECT//
const biscuit = {
src:"./images/biscuit.png",
height : 110,
width : 110,
weight : 5,
}

const bonbonRond = {
src:"./images/bonbon_rond.png",
height : 110,
width : 110,
weight : 50,
}

const bonbon = {
src:"./images/bonbon.png",
height : 110,
width : 110,
weight : 50,
}

const chocolat_1 = {
src:"./images/chocolat_1.png",
height : 110,
width : 110,
weight : 50,
}

const croissant = {
src:"./images/croissant.png",
height : 110,
width : 110,
weight : 50,
}

const donnut = {
src:"./images/donnut.png",
height : 110,
width : 110,
weight : 50,
}

const muffinA = {
src:"./images/muffinA.png",
height : 110,
width : 110,
weight : 50,
}

const muffinB = {
src:"./images/muffinB.png",
height : 110,
width : 110,
weight : 50,
}

const muffinC = {
src:"./images/muffinC.png",
height : 110,
width : 110,
weight : 50,
}
const sucette = {
src:"./images/sucette.png",
height : 110,
width : 110,
weight : 50,
}

const sucette_1 = {
src:"./images/sucette_1.png",
height : 110,
width : 110,
weight : 50,
}

const tarte = {
src:"./images/tarte.png",
height : 110,
width : 110,
weight : 50,
}

//Pop up rules//

function openModal() {
    modal.style.top = "0px"
}

function closeModal() {
    modal.style.top = "-400px"
}

//CREAT-ENEMIES//


//Application CSS & lien CREATION DIV & IMAGE//
function createEnemy()
{
enemy = document.createElement("div")
enemy.style.height = `${biscuit.height}px`
enemy.style.width = `${biscuit.width}px`
enemy.setAttribute("class","enemies")
imageEnemy = new Image()
imageEnemy.src = biscuit.src
container.appendChild(enemy)
enemy.appendChild(imageEnemy)
let newEnemy = [biscuit,enemy,Math.floor(Math.random()*10)-5, -200, 100]  //Objet, div, direction, position (Y & X) //
enemiesOnScreen.push(newEnemy)
}
createEnemy()

//Aléatoire chance égale//
function enemiesChoice()
{
Math.floor(Math.random()*listEnemies.length)
}

//GRAVITY//
function gravity()
{
setInterval(function()
{
enemiesOnScreen.forEach((element, index) =>
{
element[3] += element[0].weight
element[1].style.top = `${element[3]}px`
element[4] += element[2]
element[1].style.left = `${element[4]}px`
if(element[3]>window.innerHeight)
{
element[1].parentNode.removeChild(element[1])
enemiesOnScreen.splice(index,1)
}
});
},gravitySpeed)
}
gravity()
///////////// SOUND /////////////


function play(idPlayer, control) {
    let player = document.querySelector('#' + idPlayer);

    if (player.paused) {
        player.play();
        control.textContent = 'I I';
    } else {
        player.pause();
        control.textContent = '♪';
    }
}


function resume(idPlayer) {
    let player = document.querySelector('#' + idPlayer);

    player.currentTime = 0;
    player.pause();
}

 
