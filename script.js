  //NOM ENEMY
const biscuit = {
  //ATRIBUTION DE LA SOURCE DE L'IMAGE
  src:"./images/biscuit.png",
  //ATTRIBUTION DE LA HAUTEUR
  height : 60,
  //ATTRIBUTION DE LA LARGEUR
  width : 60,
  //ATTRIBUTION DU POIDS
  weight : 70,
}

const bonbonRond = {
  src:"./images/bonbon_rond.png",
  height : 60,
  width : 60,
  weight : 90,
}

const bonbon = {
  src:"./images/bonbon.png",
  height : 60,
  width : 60,
  weight : 50,
}

const chocolat_1 = {
  src:"./images/chocolat_1.png",
  height : 60,
  width : 60,
  weight : 50,
}

const croissant = {
  src:"./images/croissant.png",
  height : 60,
  width : 100,
  weight : 50,
}

const donnut = {
  src:"./images/donnut.png",
  height : 60,
  width : 60,
  weight : 50,
}

const muffinA = {
  src:"./images/muffinA.png",
  height : 60,
  width : 60,
  weight : 50,
}

const muffinB = {
  src:"./images/muffinB.png",
  height : 60,
  width : 60,
  weight : 50,
}

const muffinC = {
  src:"./images/muffinC.png",
  height : 80,
  width : 60,
  weight : 50,
}
const sucette = {
  src:"./images/sucette.png",
  height : 100,
  width : 60,
  weight : 50,
}

const sucette_1 = {
  src:"./images/sucette_1.png",
  height : 100,
  width : 60,
  weight : 50,
}

const tarte = {
  src:"./images/tarte.png",
  height : 60,
  width : 60,
  weight : 50,
}
let lvlInterval


 //VAR-OBJECT

const listEnemies = [biscuit, bonbonRond, bonbon, chocolat_1, croissant, donnut, muffinA,muffinB, muffinC, sucette_1, sucette, tarte]
let enemiesOnScreen = []
let valueEnemies
let enemy
let imageEnemy
const container = document.querySelector(".game_container")
let gravitySpeed = 200
const bubble = document.querySelector("#bubble")
let bubblePosition
let interval
let direction
let cursor = document.querySelector("#cursor")
let enemyChoice
const gameOverText = document.querySelector(".game_over")

 //OBJECT CREATION-ENEMIES



// A protéger
//ON DETERMINE LA POSITION DE LA BULLE SUR L'ECRAN
function bubbleGum()
{
  bubblePosition = bubble.getBoundingClientRect();
}
bubbleGum()


//PARAMETRE Colision
//ON REGARDE SI L4UN DES ELEMENT TOUCHE LE REBORD DE LA BULLE
function bubbleColision (element)
{
  if (element[4] + element[0].width >= bubblePosition.left + 15 && element[4] <= bubblePosition.left - 15 + (bubblePosition.right - bubblePosition.left) && element[3] + element[0].height >= bubblePosition.top + 15 && element[3] <= bubblePosition.bottom - 15)
  {//SI CA TOUCHE + FIN DE PARTIE
    gameOver()
  }//Calcule de position droite> a la gauche de la bulle, position de gauche vers la droite
}



//CREATION D'UN ENEMIE POSITION, DIRECTION, IMAGE
function createEnemy()
{
  //On choisi un ennemie aléatoirement
  enemiesChoice()
  //CREATION D4UNE DIV ET APPLICATION DE STYLE HAUTEUR:LARGEUR PUIS D4UN CLASS
  enemy = document.createElement("div")
  enemy.style.height = `${enemyChoice.height}px`
  enemy.style.width = `${enemyChoice.width}px`
  enemy.setAttribute("class","enemies")
  //CREATION VISUEL ENEMIES ET SOURCE DE L'IMAGE
  imageEnemy = new Image()
  imageEnemy.src = enemyChoice.src
  //ALEATOIRE DE DEPART POUR LA POSITION HORIZONTALE DE L'ENNEMIE
  let posright = Math.floor(Math.random()*(window.innerWidth-enemyChoice.width))
  // CREATION DE 20 INTERVALE SUR LA LARGEUR DE LA FENETRE
  let createInterval = window.innerWidth/3
  //Pour ses 20 section on regarde dans quel interval on place l'ennemie, en fonction de l'interval on lui donne une direction pour qu'il aille vers la bulle
  for (let i = 0 ;i <= 20; i++)
  {
    if(posright >= createInterval * i && posright < createInterval * (i + 1))
    {
      direction = (window.innerWidth/2 - i*window.innerWidth/100)/40
    }
  }


  //Objet, div, direction, position (Y & X)
  let newEnemy = [enemyChoice, enemy, direction, -200, posright]
  enemy.style.top = "-200px"
  //APLLICATION AU DOM DE LA DIV PUIS DE LIMAGE
  container.appendChild(enemy)
  enemy.appendChild(imageEnemy)

  //SAUVEGARDE DE L'ENNEMIE DANS UN TABLEAU
  enemiesOnScreen.push(newEnemy)
}


//Aléatoire chance égale
function enemiesChoice()
{
  enemyChoice =  listEnemies[Math.floor(Math.random()*listEnemies.length)]
}


 //GRAVITY
function gravity()
{//CREATION D'UNE RECURENCE POUR LE DEPLACEMENT DES OBJETS
  interval = setInterval(function()
  {//ON PARCOURT LE TABLEAU DES ENNEMIES A LECRAN POUR LEURS APPLIQUER UN MOUVEMENT
    enemiesOnScreen.forEach((element, index) =>
      {//ON APPLIQUE UN MOUVEMENT VERS LE BAS EN FONCTION DU POIDS
        element[3] += element[0].weight
        element[1].style.top = `${element[3]}px`
        //APPLIQUE UN MOUVEMENT VERS LA GAUCHE OU VERS LA DROITE EN FONCTION DE LA DIRECTION ENREGISTRE
        element[4] = element[4] + element[2]
        element[1].style.left = `${element[4]}px`
        if (element[0].weight <= 3)
        {
          refall(element)
        }
        //APPLIQUE LE POTENCIEL ROBOND A LECRAN
        rebond(element)
        //VERIFICATION QU'UN ELEMENT NE PETE LA BULLE
        cursorColision(element)
        bubbleColision(element)
        //SI UN ELEMENT NEST PLUS A LECRAN IL EST SUPPRIME
        if(element[3]>window.innerHeight)
        {
          //SUPPRESSION DE LECRAN
          element[1].parentNode.removeChild(element[1])
          //SUPRESSION DES ENNEMIES DANS LE TABLEAU
          enemiesOnScreen.splice(index,1)
        }
    });
  },gravitySpeed)
}
function refall(element)
{
  element[0].weight += 0.5
}


//FONCTION POUR LES REBOND A GAUCHE ET A DROITE
function rebond(element)
{//VERIFICATION QU'UN DES ELEMENTS VA TOUCHER UN DES REBORDS
  if(element[4] <= 0 || element[4] + element[0].width >= window.innerWidth)
  {//INVERSE SA DIRECTION DANS LE CAS OU UN BORD EST TOUCHE
    element[2] = -element[2]
  }
}


 //CREATION FONCTION NIVEAU 1
function lv1()
{


  let lvlInterval = setInterval(function()
  {
    createEnemy()
  }, 1000)

  setTimeout(function()
  {
    //clearInterval(lvlInterval)
    //lv2()
  //},5000)
}


//CREATION CURSOR
function cursorF()
{
  window.addEventListener("mousemove", (e)=>
  {//LIESON ET POSITIONNEMENT DU CURSEUR
    let xPos = e.pageX
    let yPos = e.pageY
    cursor.style.top = `${yPos}px`
    cursor.style.left = `${xPos}px`
  })
}


function init()
{
  cursorF()
  gravity()
  lv1()
  // lv2()
}
init()


//Paramètre colision avec le curseur


function cursorColision (element)
{
  const cursorPosition = cursor.getBoundingClientRect()
  if (element[4] + element[0].width >= cursorPosition.left && element[4] + element[0].width <= cursorPosition.left +30 && element[3] + element[0].height >= cursorPosition.top && element[3] <= cursorPosition.top + 60)
  {
    element[2] += window.innerWidth/10
  }
  else if(element[4] <= cursorPosition.left + (cursorPosition.right - cursorPosition.left) && element[4] >= cursorPosition.left + (cursorPosition.right - cursorPosition.left) - 30 && element[3] + element[0].height >= cursorPosition.top && element[3] <= cursorPosition.bottom)
  {
    element[2] -= window.innerWidth/10
  }
  else if(element[3] + element[0].height >= cursorPosition.top && element[3] + element[0].height <= cursorPosition.top + 30 && element[4] + element[0].width >= cursorPosition.left && element[4] <= cursorPosition.left + (cursorPosition.right - cursorPosition.left))
  {
    element[0].weight -= element[0].weight - 10
  }
  else if(element[3] <= cursorPosition.bottom && element[3] >= cursorPosition.bottom - 30 && element[4] + element[0].width >= cursorPosition.left && element[4] <= cursorPosition.left + (cursorPosition.right - cursorPosition.left))
  {
    element[0].weight += 4
  }
}

  //SI CA TOUCHE + FIN DE PARTIE

  //Calcule de position droite> a la gauche de la bulle, position de gauche vers la droite

//FONCTION DE FIN DE PARTIE
function gameOver()
{//ON ENLEVE L'INTERVAL NECESSAIRE AU DEPLACEMENT DES ELEMENTS
  clearInterval(interval)
  clearInterval(lvlInterval)
  gameOverText.classList.remove("hidden")
}

////////// SOUND //////////


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

//Pop up rules//

const modal = document.querySelector(".modal")

function openModal() {
  modal.style.top = "0px"
}

function closeModal() {
  modal.style.top = "-410px"
}

