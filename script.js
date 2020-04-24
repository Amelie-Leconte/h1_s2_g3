  //NOM ENNEMI
const biscuit = {
  //ATRIBUTION DE LA SOURCE DE L'IMAGE
  src:"images/biscuit.png",
  //ATTRIBUTION DE LA HAUTEUR
  height : 60,
  //ATTRIBUTION DE LA LARGEUR
  width : 60,
  //ATTRIBUTION DU POIDS
  weight : 70,
}

const bonbonRond = {
  src:"images/bonbon_rond.png",
  height : 60,
  width : 60,
  weight : 90,
}

const bonbon = {
  src:"images/bonbon.png",
  height : 60,
  width : 60,
  weight : 50,
}

const chocolat_1 = {
  src:"images/chocolat_1.png",
  height : 60,
  width : 60,
  weight : 50,
}

const croissant = {
  src:"images/croissant.png",
  height : 60,
  width : 100,
  weight : 50,
}

const donnut = {
  src:"images/donnut.png",
  height : 60,
  width : 60,
  weight : 50,
}

const muffinA = {
  src:"images/muffina.png",
  height : 60,
  width : 60,
  weight : 50,
}

const muffinB = {
  src:"images/muffinb.png",
  height : 60,
  width : 60,
  weight : 50,
}

const muffinC = {
  src:"images/muffinc.png",
  height : 80,
  width : 60,
  weight : 50,
}
const sucette = {
  src:"images/sucette.png",
  height : 100,
  width : 60,
  weight : 50,
}

const sucette_1 = {
  src:"images/sucette_1.png",
  height : 100,
  width : 60,
  weight : 50,
}

const tarte = {
  src:"images/tarte.png",
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

 //OBJECT CREATION-ENNEMIS



// A protéger
//ON DETERMINE LA POSITION DE LA BULLE SUR L'ECRAN
function bubbleGum()
{
  bubblePosition = bubble.getBoundingClientRect();
}
bubbleGum()


//PARAMETRE Collision
//ON REGARDE SI L'UN DES ELEMENTS TOUCHE LE REBORD DE LA BULLE
function bubbleColision (element)
{
  if (element[4] + element[0].width >= bubblePosition.left + 15 && element[4] <= bubblePosition.left - 15 + (bubblePosition.right - bubblePosition.left) && element[3] + element[0].height >= bubblePosition.top + 15 && element[3] <= bubblePosition.bottom - 15)
  {//SI CA TOUCHE + FIN DE PARTIE
    gameOver()
  }//Calcul de position droite> a la gauche de la bulle, position de gauche vers la droite
}



//CREATION D'UN ENNEMI POSITION, DIRECTION, IMAGE
function createEnemy()
{
  //On choisi un ennemi aléatoirement
  enemiesChoice()
  //CREATION D'UNE DIV ET APPLICATION DE STYLE HAUTEUR:LARGEUR PUIS D'UN CLASS
  enemy = document.createElement("div")
  enemy.style.height = `${enemyChoice.height}px`
  enemy.style.width = `${enemyChoice.width}px`
  enemy.setAttribute("class","enemies")
  //CREATION VISUELLE ENNEMIS ET SOURCE DE L'IMAGE
  imageEnemy = new Image()
  imageEnemy.src = enemyChoice.src
  //ALEATOIRE DE DEPART POUR LA POSITION HORIZONTALE DE L'ENNEMI
  let posright = Math.floor(Math.random()*(window.innerWidth-enemyChoice.width))
  // CREATION DE 20 INTERVALES SUR LA LARGEUR DE LA FENETRE
  let createInterval = window.innerWidth/3
  //Pour ces 20 sections on regarde dans quel intervalle on place l'ennemi, en fonction de l'intervalle on lui donne une direction pour qu'il aille vers la bulle
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
  //APPLICATION AU DOM DE LA DIV PUIS DE LIMAGE
  container.appendChild(enemy)
  enemy.appendChild(imageEnemy)

  //SAUVEGARDE DE L'ENNEMI DANS UN TABLEAU
  enemiesOnScreen.push(newEnemy)
}


//Aléatoire chance égale
function enemiesChoice()
{
  enemyChoice =  listEnemies[Math.floor(Math.random()*listEnemies.length)]
}


 //GRAVITY
function gravity()
{//CREATION D'UNE RECURRENCE POUR LE DEPLACEMENT DES OBJETS
  interval = setInterval(function()
  {//ON PARCOURT LE TABLEAU DES ENNEMIS A L'ECRAN POUR LEUR APPLIQUER UN MOUVEMENT
    enemiesOnScreen.forEach((element, index) =>
      {//ON APPLIQUE UN MOUVEMENT VERS LE BAS EN FONCTION DU POIDS
        element[3] += element[0].weight
        element[1].style.top = `${element[3]}px`
        //APPLIQUE UN MOUVEMENT VERS LA GAUCHE OU VERS LA DROITE EN FONCTION DE LA DIRECTION ENREGISTREE
        element[4] = element[4] + element[2]
        element[1].style.left = `${element[4]}px`
        if (element[0].weight <= 3)
        {
          refall(element)
        }
        //APPLIQUE LE POTENTIEL REBOND A L'ECRAN
        rebond(element)
        //VERIFICATION QU'UN ELEMENT N'ECLATE PAS LA BULLE
        cursorColision(element)
        bubbleColision(element)
        //SI UN ELEMENT N'EST PLUS A L'ECRAN IL EST SUPPRIME
        if(element[3]>window.innerHeight)
        {
          //SUPPRESSION DE L'ECRAN
          element[1].parentNode.removeChild(element[1])
          //SUPRESSION DES ENNEMIS DANS LE TABLEAU
          enemiesOnScreen.splice(index,1)
        }
    });
  },gravitySpeed)
}
function refall(element)
{
  element[0].weight += 0.5
}


//FONCTION POUR LES REBONDS A GAUCHE ET A DROITE
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

  // setTimeout(function()
  // {
  //   clearInterval(lvlInterval)
  //   lv2()
  // },5000)
}


//CREATION CURSOR
function cursorF()
{
  window.addEventListener("mousemove", (e)=>
  {//LIAISON ET POSITIONNEMENT DU CURSEUR
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


//Paramètres colision avec le curseur


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

  //Calcul de position droite> a la gauche de la bulle, position de gauche vers la droite

//FONCTION DE FIN DE PARTIE
function gameOver()
{//ON ENLEVE L'INTERVALLE NECESSAIRE AU DEPLACEMENT DES ELEMENTS
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
