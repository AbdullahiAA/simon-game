// Variables...
const boxes = ['green', 'red', 'yellow', 'blue']
var patternToFollow = []
var isGameOn = false
var gameLevel = 1
var clickCount = 0

// Pressing a key to start the game
$(document).on('keypress', function() {
    if (isGameOn === false) {
        gameStart()
    }
})

// Clicking on the screen to start the game
$('body').on('click', function() {
    if (isGameOn === false) {
        // gameStart()
    }
})

// Accepting the player input based on the pattern to follow
$('.btn').on('click', function() {
    animateButton($(this))
    produceButtonSound($(this).attr('id'))
    const element = patternToFollow[clickCount];
    var clickedBox = $(this).attr('id')

    if (clickedBox === element) {
        clickCount++
        
        if (clickCount === patternToFollow.length) {
            gameLevel++
            // Set High Score
            setTimeout(() => {
                showTheCurrentBox()
            }, 700);
            clickCount = 0
        }
    } else {
        gameOver()
    }
})


// Functions...
function gameStart() {
    isGameOn = true
    showTheCurrentBox()
}

function gameOver() {
    let gameOverSound = new Audio('sounds/wrong.mp3')
    gameOverSound.play()

    patternToFollow = []
    isGameOn = false
    gameLevel = 1
    clickCount = 0

    $('#level-title').text('Game Over, Press Any Key to Restart')
    
    $('body').addClass('game-over')
    setTimeout(() => {
        $('body').removeClass('game-over')
    }, 200);
}

function animateButton(exactButton) {
    exactButton.addClass('pressed')
    setTimeout(() => {
        exactButton.removeClass('pressed')
    }, 100);
}

function produceButtonSound(exactButton) {
    let buttonSound = new Audio('sounds/' + exactButton + '.mp3')
    buttonSound.play()
}

function showTheCurrentBox() {
    $('#level-title').text('Level ' + gameLevel)

    var currentBox = boxes[Math.floor(Math.random() * boxes.length)]
    
    patternToFollow.push(currentBox)

    produceButtonSound(currentBox)
    
    $('#' + currentBox).addClass('pressed')
    
    setTimeout(() => {
        $('#' + currentBox).removeClass('pressed')
    }, 100);
}