document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('numbersForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        
        const input = document.getElementById('numbers').value;
        const inputs = input.split(',');
        const numbers = inputs.map(function(item) {
            return parseFloat(item.trim());
        });

        
        if (inputs.some(item => isNaN(item.trim()) || item.trim() === '')) {
            document.getElementById('result').innerText = 'Error: Please enter only numbers separated by commas.';
            return;
        }

        
        numbers.sort((a, b) => a - b);

        
        const max = Math.max(...numbers);
        const min = Math.min(...numbers);
        const mean = (numbers.reduce((acc, cur) => acc + cur, 0) / numbers.length).toFixed(1);
        const median = numbers.length % 2 !== 0 ? numbers[Math.floor(numbers.length / 2)] : (numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2]) / 2;
        const range = max - min;
        const mode = calculateMode(numbers);
        const variance = calculateVariance(numbers, mean);
        const standardDeviation = Math.sqrt(variance).toFixed(1);

        
        document.getElementById('result').innerHTML = `
            <strong>Max:</strong> ${max}<br>
            <strong>Min:</strong> ${min}<br>
            <strong>Mean:</strong> ${mean}<br>
            <strong>Median:</strong> ${median}<br>
            <strong>Range:</strong> ${range}<br>
            <strong>Mode:</strong> ${mode}<br>
            <strong>Variance:</strong> ${variance.toFixed(1)}<br>
            <strong>Standard Deviation:</strong> ${standardDeviation}`;
    });
});

function calculateMode(numbers) {
    const frequency = {};
    let maxFreq = 0;
    let modes = [];
    
    numbers.forEach(number => {
        if (frequency[number]) {
            frequency[number]++;
        } else {
            frequency[number] = 1;
        }
        
        if (frequency[number] > maxFreq) {
            maxFreq = frequency[number];
            modes = [number];
        } else if (frequency[number] === maxFreq) {
            modes.push(number);
        }
    });
    
    return modes.length === numbers.length ? 'No mode' : modes.join(', ');
}

function calculateVariance(numbers, mean) {
    const sumOfSquares = numbers.reduce((acc, cur) => acc + Math.pow(cur - mean, 2), 0);
    return sumOfSquares / numbers.length;
}
