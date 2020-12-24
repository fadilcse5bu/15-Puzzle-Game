const gridBlock = document.querySelectorAll('.grid-content')
const newGame = document.getElementById('newGame')
const moves = document.getElementById('moves')
const time = document.getElementById('time')
const pauseGame = document.getElementById('pauseGame')
const overlay = document.getElementById('overlay')
const resume = document.getElementById('resume')
const gameBoard = document.getElementById('game-board')
const win = document.getElementById('win')
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
var seconds = 0
var pause
var myVar

startGame()

function startGame() {
  pauseGame.innerText = "Pause"
  time.innerText = 0
  moves.innerText = 0
  pause = false
  seconds = 0
  overlay.classList.remove('overlay')  
  win.style.display = "none"
  resume.style.display = "none"
  pauseGame.style.pointerEvents="all"
  gridBlock.forEach(singleGrid => {
    singleGrid.style.pointerEvents="all"
  })
  myVar = setInterval(countSeconds, 1000)

  arr.sort(function(a, b){return 0.5 - Math.random()});
  for(var i = 0; i < 16; i++) {
    if(arr[i] > 0) {
      const singleGrid = document.getElementById(i)
      addChild(singleGrid, i)
    } 
    else{
      const parent = document.getElementById(i)
      removeChild(parent)
    }
  }
}


newGame.addEventListener('click', () => {
  clearInterval(myVar)
  startGame()
})


function addChild(singleGrid, index) {
  singleGrid.classList.remove('draw-single-grid')
  singleGrid.classList.remove('text-none')

  singleGrid.appendChild(document.createElement('div'))
  singleGrid.childNodes[0].classList.add('little-circle')

  singleGrid.appendChild(document.createElement('div'))
  singleGrid.childNodes[1].classList.add('text')
  singleGrid.childNodes[1].innerHTML = arr[index]

  singleGrid.appendChild(document.createElement('div'))
  singleGrid.childNodes[2].classList.add('big-circle')

  if(parseInt(singleGrid.id) + 1 == parseInt(arr[index])) {
    singleGrid.classList.add('draw-single-grid')
  }
}


function removeChild(parent) {
  while(parent.firstChild) {
    parent.firstChild.remove()
  }
  parent.classList.remove('draw-single-grid')
  parent.classList.add('text-none')
}


function countSeconds() {
  if(pause == false) {
    seconds += 1
    document.getElementById('time').innerText = seconds
  }
}


function pauseUpdate() {
  pause = true
  pauseGame.innerText = "Play"
  overlay.classList.add('overlay')
  resume.style.display = "block"
  gridBlock.forEach(singleGrid => {
    singleGrid.style.pointerEvents="none"
  })
}


function resumeUpdate() {
  pause = false
  pauseGame.innerText = "Pause"
  overlay.classList.remove('overlay')
  resume.style.display = "none"
  gridBlock.forEach(singleGrid => {
    singleGrid.style.pointerEvents="all"
  })
}


pauseGame.addEventListener('click', () => {
  if(pause == false) {
    pauseUpdate()
  }
  else {
    resumeUpdate()
  }
})


resume.addEventListener('click', () => {
  resumeUpdate()
})


function checkWin() {
  for(var i = 0; i < 15; i++) {
    if(arr[i] !== i + 1) {
      return false
    }
  }
  return true
}


function winningUpdate() {
  pause = true
  pauseGame.style.pointerEvents="none"
  overlay.classList.add('overlay')
  win.style.display = "block"
  gridBlock.forEach(singleGrid => {
    singleGrid.style.pointerEvents="none"
  })

  var winningTime = parseInt(time.innerHTML)
  document.getElementById('seconds').innerHTML = winningTime
  var winningMoves = parseInt(moves.innerHTML)
  document.getElementById('winningMoves').innerHTML = winningMoves
}


function exchangeGridContents(firstIndex, secondIndex) {
  var steps = parseInt(moves.innerHTML)
  steps += 1
  moves.innerHTML = steps

  const parent = document.getElementById(firstIndex)
  removeChild(parent)

  const singleGrid = document.getElementById(secondIndex)
  singleGrid.classList.remove('text-none')
  addChild(singleGrid, secondIndex)

  var check = checkWin()
  if(check) {
    winningUpdate()
  }
}


function checkRight(contentId) {
  const index = parseInt(contentId)
  if(arr[index + 1] == '0') {
    var temp = arr[index]
    arr[index] = arr[index + 1]
    arr[index + 1] = temp
    exchangeGridContents(index, index + 1)
  }
}


function checkLeft(contentId) {
  const index = parseInt(contentId)
  if(arr[index - 1] == '0') {
    var temp = arr[index]
    arr[index] = arr[index - 1]
    arr[index - 1] = temp
    exchangeGridContents(index, index - 1)
  }
}


function checkUp(contentId) {
  const index = parseInt(contentId)
  if(arr[index - 4] == '0') {
    var temp = arr[index]
    arr[index] = arr[index - 4]
    arr[index - 4] = temp
    exchangeGridContents(index, index - 4)
  }
}


function checkBottom(contentId) {
  const index = parseInt(contentId)
  if(arr[index + 4] == '0') {
    var temp = arr[index]
    arr[index] = arr[index + 4]
    arr[index + 4] = temp
    exchangeGridContents(index, index + 4)
  }
}


gridBlock.forEach(singleBlock => {
  singleBlock.addEventListener('click', () => {
    const contentId = singleBlock.id
    if(contentId != 3 && contentId != 7 && contentId != 11 && contentId != 15) {
      checkRight(contentId)
    }
    if(contentId != 0 && contentId != 4 && contentId != 8 && contentId != 12) {
      checkLeft(contentId)
    }
    if(contentId != 0 && contentId != 1 && contentId != 2 && contentId != 3) {
      checkUp(contentId)
    }
    if(contentId != 12 && contentId != 13 && contentId != 14 && contentId != 15) {
      checkBottom(contentId)
    }
  })
})

document.getElementById('playAgain').addEventListener('click', () => {
  clearInterval(myVar)
  startGame()
})
