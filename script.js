let fields = [
    null,
    'circle',
    'circle',
    'circle',
    null,
    null,
    'cross',
    'cross',
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
            html += `<td>${displayValue}</td>`;
        }
        html += '</tr>';
    }
    
    html += '</table>';
    content.innerHTML = html;
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