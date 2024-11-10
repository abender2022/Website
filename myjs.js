$('.cell').on('click', function() {
    // Hide the instructions
    $('#gameInstructions').hide();

});

$(function() {
    var turn = "X"; // Start with player X
    var score = { "X": 0, "O": 0 };
    var moves = 0;
    var wins = [7, 56, 448, 73, 146, 292, 273, 84];

    $('.cell').click(function() {
        var $this = $(this);
        if (!$this.text().trim() && win(score[turn]) === -1) {
            $this.text(turn);
            $this.addClass(turn.toLowerCase()); // Add class based on the turn
            score[turn] += $this.data('indicator');
            moves++;
            var winCheck = win(score[turn]);
            if (winCheck !== -1) { // Check if there's a win
                displayWinLine(winCheck); // Display the win line
                setTimeout(function() { // Set a delay before alert and reset for visual effect
                    showGameEndMessage(turn + " wins!!");
                    resetGame();
                }, 500); // Adjust delay as needed
            } else if (moves === 9) {
                showGameEndMessage("Tie game :(");
                resetGame();
            } else {
                turn = turn === "X" ? "O" : "X";
                // Optionally update UI to reflect whose turn it is
            }
        }
    });

    function win(currentScore) {
        for (var i = 0; i < wins.length; i++) {
            if ((wins[i] & currentScore) === wins[i]) {
                return i; // Return the index of the winning combination
            }
        }
        return -1; // Return -1 if no win
    }

function displayWinLine(winIndex) {
    var cellSelectors = {
        // Horizontal wins
        0: '.cell[data-indicator="1"], .cell[data-indicator="2"], .cell[data-indicator="4"]',
        1: '.cell[data-indicator="8"], .cell[data-indicator="16"], .cell[data-indicator="32"]',
        2: '.cell[data-indicator="64"], .cell[data-indicator="128"], .cell[data-indicator="256"]',
        // Vertical wins
        3: '.cell[data-indicator="1"], .cell[data-indicator="8"], .cell[data-indicator="64"]',
        4: '.cell[data-indicator="2"], .cell[data-indicator="16"], .cell[data-indicator="32"]',
        5: '.cell[data-indicator="4"], .cell[data-indicator="128"], .cell[data-indicator="256"]',
        // Diagonal wins
        6: '.cell[data-indicator="1"], .cell[data-indicator="16"], .cell[data-indicator="256"]',
        7: '.cell[data-indicator="4"], .cell[data-indicator="16"], .cell[data-indicator="64"]'
    };

    var $cells = $(cellSelectors[winIndex]);
    var $firstCell = $cells.first();
    var $lastCell = $cells.last();

    var startPosition = $firstCell.position();
    var endPosition = $lastCell.position();

    var $line = $("<div>").addClass("win-line");
    $("#tictactoe").append($line);

    // Adjusting for horizontal wins
    if (winIndex >= 0 && winIndex <= 2) {
        var lineLength = endPosition.left - startPosition.left + $lastCell.outerWidth();
        var topPosition = startPosition.top + $firstCell.outerHeight() / 2;
        $line.css({
            "left": startPosition.left,
            "top": topPosition,
            "width": lineLength,
            "height": "5px",
            "position": "absolute",
            "background-color": "#ff0000",
            "z-index": "100"
        });
    }
    // Adjusting for vertical wins
    else if (winIndex >= 3 && winIndex <= 5) {
        var lineLength = endPosition.top - startPosition.top + $lastCell.outerHeight();
        var leftPosition = startPosition.left + $firstCell.outerWidth() / 2;
        $line.css({
            "left": leftPosition,
            "top": startPosition.top,
            "height": lineLength,
            "width": "5px",
            "position": "absolute",
            "background-color": "#ff0000",
            "z-index": "100"
        });
    }
    // Adjusting for diagonal wins
    else if (winIndex >= 6) {
        var angle = winIndex === 6 ? 45 : -45; // 45 degrees for descending, -45 for ascending

        // Calculate the length of the diagonal line
        var lineLength = Math.sqrt(Math.pow(endPosition.top - startPosition.top, 2) + Math.pow(endPosition.left - startPosition.left, 2)) + $lastCell.outerWidth();

        // Set the CSS properties for the diagonal line
        $line.css({
            "left": startPosition.left + $firstCell.outerWidth() / 2 - (winIndex === 6 ? 0 : $firstCell.outerWidth()),
            "top": startPosition.top + $firstCell.outerHeight() / 2,
            "width": lineLength,
            "height": "5px",
            "position": "absolute",
            "background-color": "#ff0000", // Adjust the color as needed
            "z-index": "100",
            "transform-origin": "0 0",
            "transform": "rotate(" + angle + "deg)" // Rotate the line based on the angle
        });
    }
    console.log("Line Length:", lineLength);


}

// When the user wins or you need to show a message
function showGameEndMessage(message) {
    document.getElementById('winnerMessage').innerText = message;
    document.getElementById('winnerModal').style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
document.querySelector('.close-button').onclick = function() {
    document.getElementById('winnerModal').style.display = 'none';
}

// Optional: Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
    var modal = document.getElementById('winnerModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Example of checking for a draw in your game logic
if (checkForDraw()) {
    showGameEndMessage("Cat's game! It's a draw.");
}
function checkForDraw() {
    // Assuming you have a way to count filled cells or check if all cells are filled
    var allCellsFilled = $('.cell').filter(function() {
        return $(this).text().trim() !== '';
    }).length === 9; // Assuming a 3x3 grid

    // Assuming `checkForWin` returns true if a win condition is met
    return allCellsFilled && !checkForWin();
}


    function resetGame() {
        score = { "X": 0, "O": 0 };
        moves = 0;
        turn = "X";
        $('.cell').empty().removeClass('x o');
        $('.win-line').remove(); // Make sure to remove the win line
        // Optionally reset the UI to indicate it's X's turn
    }

    resetGame(); // Start a new game
});
