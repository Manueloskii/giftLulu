// Our Times functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set up dual timezone clocks
    setupDualClocks();
    
    // Set up back button
    setupBackButton();
});

function setupDualClocks() {
    const riversideTime = document.getElementById('riverside-time');
    const riversideDate = document.getElementById('riverside-date');
    const itabiraTime = document.getElementById('itabira-time');
    const itabiraDate = document.getElementById('itabira-date');
    const overlapInfo = document.getElementById('overlap-info');
    
    function updateClocks() {
        const now = new Date();
        
        // Riverside time (UTC-8)
        const riversideTime = new Date(now.getTime() - (8 * 60 * 60 * 1000));
        const riversideTimeStr = riversideTime.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const riversideDateStr = riversideTime.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Itabira time (UTC-3)
        const itabiraTime = new Date(now.getTime() - (3 * 60 * 60 * 1000));
        const itabiraTimeStr = itabiraTime.toLocaleTimeString('pt-BR', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const itabiraDateStr = itabiraTime.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Update display
        document.getElementById('riverside-time').textContent = riversideTimeStr;
        document.getElementById('riverside-date').textContent = riversideDateStr;
        document.getElementById('itabira-time').textContent = itabiraTimeStr;
        document.getElementById('itabira-date').textContent = itabiraDateStr;
        
        // Calculate overlap time
        const riversideHour = riversideTime.getHours();
        const itabiraHour = itabiraTime.getHours();
        
        // Simple overlap calculation (when both are awake: 6 AM - 11 PM)
        const overlapStart = Math.max(6, riversideHour - 5); // Riverside is 5 hours behind
        const overlapEnd = Math.min(23, itabiraHour + 5);
        
        if (overlapStart < overlapEnd) {
            overlapInfo.textContent = `Overlap: ${overlapStart}:00 - ${overlapEnd}:00`;
        } else {
            overlapInfo.textContent = "Dreaming of each other...";
        }
    }
    
    // Update clocks immediately and then every second
    updateClocks();
    setInterval(updateClocks, 1000);
}

function setupBackButton() {
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'arquivo.html';
        });
    }
}