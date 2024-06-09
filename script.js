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
                displayValue = 'O';
            } else if (value === 'cross') {
                displayValue = 'X';
            }
            html += `<td>${displayValue}</td>`;
        }
        html += '</tr>';
    }
    
    html += '</table>';
    content.innerHTML = html;
}
