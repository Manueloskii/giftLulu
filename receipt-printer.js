// Receipt Printer Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add any specific functionality for the receipt printer page
    console.log('Receipt Printer page loaded');
    
    // Set up receipt scrolling effect
    setupReceiptScrolling();
});

// Function to download the receipt image
function downloadReceipt() {
    const receiptImage = document.querySelector('.receipt-image');
    if (!receiptImage) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = receiptImage.src;
    link.download = 'ReceiptLuiza.jpg';
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function setupReceiptScrolling() {
    const receiptImage = document.querySelector('.receipt-image');
    const receiptContainer = document.querySelector('.receipt-container');
    
    if (!receiptImage || !receiptContainer) return;
    
    // Set initial position - hide the receipt below the middle line
    const containerHeight = receiptContainer.offsetHeight;
    const imageHeight = receiptImage.offsetHeight;
    const initialOffset = containerHeight / 2; // Middle line of the container
    
    receiptImage.style.transform = `translateY(${initialOffset}px)`;
    
        // Handle scroll events
        let scrollAmount = initialOffset; // Start at the middle line
        const scrollSpeed = 8; // Adjust this to control scroll speed
        
        document.addEventListener('wheel', function(e) {
            e.preventDefault();
            
            // Calculate scroll direction - scrolling down moves receipt up
            const delta = e.deltaY > 0 ? -1 : 1;
            scrollAmount += delta * scrollSpeed;
            
            // No limits - allow unlimited scrolling in both directions
            
            // Apply transform
            receiptImage.style.transform = `translateY(${scrollAmount}px)`;
        }, { passive: false });
    
    // Handle touch events for mobile
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
            
            const touchY = e.touches[0].clientY;
            const delta = touchStartY - touchY;
            
            scrollAmount -= delta * 0.5; // Inverted sensitivity to match wheel behavior
            
            // No limits - allow unlimited scrolling in both directions
            
            // Apply transform
            receiptImage.style.transform = `translateY(${scrollAmount}px)`;
            
            touchStartY = touchY;
        }, { passive: false });
}