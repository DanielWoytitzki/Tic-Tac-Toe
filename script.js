let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

function render() {
    let content = document.getElementById('content');
    let html = '<table>';
    
    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let value = fields[index];
            let displayValue = '';
            if (value === 'circle') {
                displayValue = generateCircleSVG();
            } else if (value === 'cross') {
                displayValue = generateCrossSVG();
            }
            html += `<td id="cell-${index}" onclick="makeMove(${index})">${displayValue}</td>`;
        }
        html += '</tr>';
    }
    
    html += '</table>';
    content.innerHTML = html;
    updateCurrentPlayerDisplay();
}

function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" stroke="#00B0EF" stroke-width="5" fill="none">
                <animate 
                    attributeName="stroke-dasharray"
                    from="0, 188.4"
                    to="188.4, 188.4"
                    dur="500ms"
                    fill="freeze" />
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="5">
                <animate 
                    attributeName="stroke-dasharray"
                    from="0, 70"
                    to="70, 70"
                    dur="250ms"
                    fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#FFC000" stroke-width="5">
                <animate 
                    attributeName="stroke-dasharray"
                    from="0, 70"
                    to="70, 70"
                    dur="250ms"
                    fill="freeze"
                    begin="250ms" />
            </line>
        </svg>
    `;
}

function makeMove(index) {
    if (!fields[index]) {
        fields[index] = currentPlayer;
        let cell = document.getElementById(`cell-${index}`);
        if (currentPlayer === 'circle') {
            cell.innerHTML = generateCircleSVG();
        } else {
            cell.innerHTML = generateCrossSVG();
        }
        if (checkWinner()) {
            return;
        }
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        updateCurrentPlayerDisplay();
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(combination);
            alert(`${fields[a] === 'circle' ? 'O' : 'X'} wins!`);
            return true;
        }
    }
    return false;
}

function drawWinningLine(combination) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const lineColor = fields[combination[0]] === 'circle' ? '#00B0EF' : '#FFC000';
    const line = document.createElementNS(svgNamespace, 'line');
    const firstCell = document.getElementById(`cell-${combination[0]}`);
    const lastCell = document.getElementById(`cell-${combination[2]}`);
    const firstCellRect = firstCell.getBoundingClientRect();
    const lastCellRect = lastCell.getBoundingClientRect();
    
    line.setAttribute('x1', firstCellRect.left + firstCellRect.width / 2);
    line.setAttribute('y1', firstCellRect.top + firstCellRect.height / 2);
    line.setAttribute('x2', lastCellRect.left + lastCellRect.width / 2);
    line.setAttribute('y2', lastCellRect.top + lastCellRect.height / 2);
    line.setAttribute('stroke', lineColor);
    line.setAttribute('stroke-width', '5');

    const svg = document.createElementNS(svgNamespace, 'svg');
    svg.setAttribute('style', 'position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;');
    svg.appendChild(line);
    document.body.appendChild(svg);
}

function updateCurrentPlayerDisplay() {
    const display = document.getElementById('currentPlayerDisplay');
    if (currentPlayer === 'circle') {
        display.innerHTML = `Aktueller Spieler: ${generateCircleSVG()}`;
    } else {
        display.innerHTML = `Aktueller Spieler: ${generateCrossSVG()}`;
    }
}

function resetGame() {
    fields = Array(9).fill(null);
    currentPlayer = 'circle';
    const svgs = document.querySelectorAll('svg');
    svgs.forEach(svg => {
        if (svg.parentNode === document.body) {
            svg.remove();
        }
    });
    render();
}

let currentPlayer = 'circle';
window.onload = render;