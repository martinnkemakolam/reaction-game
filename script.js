const gameBackground = document.getElementById('gameSpace')
const gameObject = document.getElementById('gameObject')
const gameObject2 = document.getElementById('gameObject2')
const playerDirection = document.getElementById('directPlayer')
const pauser = document.getElementById('scoreAndTime')
const scoreHolder = document.getElementById('score')
const time = document.getElementById('time')
const pause = document.getElementById('pause')
const btnPlayAgain = document.getElementById('btn') 
const btnSeeScore = document.getElementById('btnScore')
const text = document.getElementById('text')
let savedScore =  new Map
let pauseBoleen = false
let haveNotFailed = false
let started = false
let timerSession;
let timePersession = 3
let defined = false
let score = 1
function start() {
    started = true
    if (defined) {
       let dummyObj = document.querySelectorAll('.dummyObj')
       dummyObj.forEach(dummy=> dummy.remove())
       gameObject2.style.display = 'none'
    }
    if (pauseBoleen || haveNotFailed) {
        alert('play first')
    }else{
        clearInterval(timerSession)
        playerDirection.style.display = 'none'
        //random numbers witdthin the width and height of gamebackground
        let numbersLeft =  randomNumberMaker(gameBackground.clientWidth)
        let numbersTop = randomNumberMaker(gameBackground.clientHeight)
        // change the position of game objects with thr random values

        positonGameObject(numbersLeft, numbersTop, gameObject)
        //time counts down
        timeCount(timePersession)

        scoreHolder.innerHTML = score++
        // adds a dummy after level 5
        function levels(score) {
            if (score>5) {
                for (let i = 1; i < score/5; i++) {
                    dummyDivCreator()
                    defined = true
                }  
            }
        }
        levels(score)
        // tricky obj
        if(1>randomNumberMaker(2)){
            let numbersLeft =  randomNumberMaker(gameBackground.clientWidth)
            let numbersTop = randomNumberMaker(gameBackground.clientHeight)
            gameObject2.style.display = 'flex'
            positonGameObject(numbersLeft, numbersTop, gameObject2) 
        } 
    }
}
function fail(arg) {
    if (pauseBoleen) {
        alert('paused')   
    }else{
        //save score
        savedScore.set('user', score - 1)
        score = scoreHolder.innerHTML
        playerDirection.style.display = null
        btnPlayAgain.style.display = 'block'
        text.innerText = `you failed cause ${arg} \n score: ${score}`
        clearInterval(timerSession)
        scoreHolder.innerHTML = 0
        time.innerHTML = 0
    }
    haveNotFailed = true
}
gameBackground.onclick=()=> {
    if (started) {
        haveNotFailed ? null : fail('you touched not the circle')
    }
}
function paused() {
    if(pauseBoleen){
        pause.style.display = 'none'
        pauseBoleen = false
        //call remembered time
        let rememberedTime = time.innerHTML
        timeCount(rememberedTime)
    }else{
        //time stops count
        clearInterval(timerSession)
        //bring in pause icon
        pause.style.display = 'flex'
        pauseBoleen =true
    }
}
function timeCount(number, level = 500){
    timerSession = setInterval(()=>{
        if (number<0) {
            clearTimeout(timerSession)
            haveNotFailed ? null : fail('you let the time run out')
        }else{
            time.innerHTML = number--
        }
    }, level)
}
pauser.onclick=()=> started ? paused() : null
gameObject.onclick=()=>{
    start()
}
btnPlayAgain.onclick=()=>{
    console.log('click')
    playerDirection.style.display = null 
    text.innerText = 'click on the black circle to start'
    btnPlayAgain.style.display = null
    haveNotFailed = false
    started= false
    score = 1
    timePersession = 3
}
function dummyDivCreator() {
    dummyDiv = document.createElement('div')
    dummyDiv.classList.add('dummyObj')
    let dummyLeft =  randomNumberMaker(gameBackground.clientWidth)
    let dummyRight = randomNumberMaker(gameBackground.clientHeight)
    positonGameObject(dummyLeft, dummyRight, dummyDiv)
    gameBackground.appendChild(dummyDiv)
    dummyDiv.onclick=()=>fail()
}
function randomNumberMaker(arg) {
    return Math.floor(Math.random() * arg)
}
function positonGameObject(left, top, object){
    top>470 ? top = 470 : top = top
    left>gameBackground.clientWidth - 70? left = gameBackground.clientWidth-80: left = left
    object.style.left = `${left}px`
    object.style.top = `${top}px`
}