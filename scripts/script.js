// Getting the grid


// Creating the cells

$(document).ready(function () {
    // Initialize the grid element with the Draggable plugin
    var grid = $('.grid');
    grid.draggable();

    // Set up the click event handler for the drag button
    var canDrag = false;
    var dragBtn = $('.btn-primary');
    dragBtn.click(function () {
        canDrag = !canDrag;
        if (canDrag) {
            // Enable dragging on the grid element
            grid.draggable('enable');
        } else {
            // Disable dragging on the grid element
            grid.draggable('disable');
        }
    });

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            let cell = $('<div>').addClass('cell').attr('id', 'cell-' + x + '-' + y);
            grid.append(cell);
        }

    }

    // Getting the game state

    var game_finished = false

    var gameState = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]

    // After clicking on a cell, I change Its text to X

    var turnX = true;
    $('.cell').click(function () {


        if (!game_finished) {

            // Getting the id of the cell clicked
            var id = $(this).attr('id')
            var coords_list = id.split("-")
            let x = parseInt(coords_list[1])
            let y = parseInt(coords_list[2]);

            if (turnX && $(this).text() === "") {
                gameState[x][y] = 1;
                // Change the text
                $(this).text("X")
                turnX = false
            }
            else if (!turnX && $(this).text() === "") {
                gameState[x][y] = 0;
                // Change the text
                $(this).text("O")
                turnX = true
            }

            checkwin(x, y)
        }

    })

    // Winning mechanism

    function checkwin(x, y) {

        // For the X player

        // Checking Its correspondant row
        point = 0;
        for (let i = 0; i < 3; i++) {
            if (gameState[x][i] === 1) {
                point++;
            }
        }
        if (point === 3) {
            alert("X won")
            game_finished = true
        }
        else { point = 0 }

        // Checking Its correspondant column
        for (let i = 0; i < 3; i++) {
            if (gameState[i][y] === 1) {
                point++;
            }
        }
        if (point === 3) {
            alert("X won")
            game_finished = true
        }
        else { point = 0 }

        // Checking diagonally

        for (let i = 0; i < 3; i++) {
            if (gameState[i][i] === 1 || gameState[2 - i][i] === 1) {
                point++;
            }
        }
        if (point === 3) {
            alert("X won")
            game_finished = true
        }
        else { point = 0 }




        // For the O player

        // Checking Its correspondant row
        point = 0;
        for (let i = 0; i < 3; i++) {
            if (gameState[x][i] === 0) {
                point++;
            }
        }
        if (point === 3) {
            alert("O won")
            game_finished = true
        }
        else { point = 0 }

        // Checking Its correspondant column
        for (let i = 0; i < 3; i++) {
            if (gameState[i][y] === 0) {
                point++;
            }
        }
        if (point === 3) {
            alert("O won")
            game_finished = true
        }
        else { point = 0 }

        // Checking diagonally

        for (let i = 0; i < 3; i++) {
            if (gameState[i][i] === 0 || gameState[2 - i][i] === 0) {
                point++;
            }
        }
        if (point === 3) {
            alert("O won")
            game_finished = true
        }
        else { point = 0 }

    }


    function allElementsfull(state){
        for (let i = 0; i < 3; i++){
            for (let j = 0; i <3; j++){
                if(state[i] === null){
                    return false
                }
            }
        }
        return true
    }

    // Reset the game
    var resetBtn = $('.btn-secondary');
    resetBtn.click(function () {
        gameState = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
        $('.cell').text("")
        game_finished = false;
    })
})
