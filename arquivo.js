// Arquivo de Nós - Grid Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Create floating rectangles
    createFloatingRectangles();
    
    // Create floating receipt printer
    createFloatingReceiptPrinter();
    
    // Set up persistent cup
    setupPersistentCup();
    
    // Set up version toggle
    setupVersionToggle();
});

// Function to create floating rectangles
function createFloatingRectangles() {
    const container = document.querySelector('.blank-page');
        const rectangles = [
            { id: 'rect-1', top: '15%', left: '10%', width: '270px', height: '180px', delay: '0s' },
            { id: 'rect-2', top: '25%', left: '70%', width: '225px', height: '270px', delay: '0.5s' },
            { id: 'rect-3', top: '60%', left: '20%', width: '315px', height: '203px', delay: '1s' },
            { id: 'rect-4', top: '60%', left: '65%', width: '248px', height: '225px', delay: '1.5s' },
            { id: 'rect-6', top: '70%', left: '45%', width: '260px', height: '215px', delay: '2.5s' }
        ];

        rectangles.forEach(rect => {
            const rectangle = document.createElement('div');
            rectangle.id = rect.id;
            rectangle.className = 'floating-rectangle';
            rectangle.style.top = rect.top;
            rectangle.style.left = rect.left;
            rectangle.style.width = rect.width;
            rectangle.style.height = rect.height;
            rectangle.style.animationDelay = rect.delay;
            
                // Add content to rectangles
                if (rect.id === 'rect-1') {
                    addOurTimesContent(rectangle);
                } else if (rect.id === 'rect-2') {
                    addMessagesContent(rectangle);
                } else {
                    addInProgressContent(rectangle);
                }
            
            // Add click event listener
            rectangle.addEventListener('click', function() {
                if (rect.id === 'rect-1') {
                    window.location.href = 'our-times.html';
                } else if (rect.id === 'rect-2') {
                    window.location.href = 'messages.html';
                } else {
                    console.log(`Rectangle ${rect.id} clicked!`);
                    // Future functionality will be added here
                }
            });
            
            container.appendChild(rectangle);
        });
}

// Function to create floating receipt printer with gift box
function createFloatingReceiptPrinter() {
    const container = document.querySelector('.blank-page');
    
    const receiptPrinter = document.createElement('div');
    receiptPrinter.id = 'receipt-printer';
    receiptPrinter.className = 'floating-receipt-printer';
    receiptPrinter.style.top = '40%';
    receiptPrinter.style.left = '45%';
    receiptPrinter.style.width = '293px';
    receiptPrinter.style.height = '192px';
    receiptPrinter.style.animationDelay = '2s';
    
    // Create gift box that covers the receipt printer
    const giftBox = document.createElement('div');
    giftBox.className = 'gift-box';
    giftBox.innerHTML = '🎁';
    
    // Create hidden receipt printer image
    const receiptPrinterImg = document.createElement('img');
    receiptPrinterImg.src = './media/receipt_printer.png';
    receiptPrinterImg.className = 'receipt-printer-image hidden';
    receiptPrinterImg.alt = 'Receipt Printer';
    
    // Add click event listener for gift box explosion
    giftBox.addEventListener('click', function() {
        explodeGiftBox(giftBox, receiptPrinterImg, receiptPrinter);
    });
    
    receiptPrinter.appendChild(giftBox);
    receiptPrinter.appendChild(receiptPrinterImg);
    container.appendChild(receiptPrinter);
}

// Function to explode gift box and reveal receipt printer
function explodeGiftBox(giftBox, receiptPrinterImg, container) {
    // Create explosion particles
    createExplosionParticles(container);
    
    // Hide gift box with explosion effect
    giftBox.style.transform = 'scale(0) rotate(360deg)';
    giftBox.style.opacity = '0';
    giftBox.style.transition = 'all 0.5s ease-out';
    
    // Show receipt printer after explosion
    setTimeout(() => {
        giftBox.style.display = 'none';
        receiptPrinterImg.classList.remove('hidden');
        receiptPrinterImg.classList.add('revealed');
        
        // Add click event listener for receipt printer
        receiptPrinterImg.addEventListener('click', function() {
            window.location.href = 'receipt-printer.html';
        });
    }, 500);
}

// Function to create explosion particles
function createExplosionParticles(container) {
    const particles = ['✨', '💫', '⭐', '🌟', '💥', '🎆'];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
        
        // Random position around the gift box
        const angle = (i / 12) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.position = 'absolute';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.fontSize = '20px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.opacity = '1';
        particle.style.transition = 'all 1s ease-out';
        
        container.appendChild(particle);
        
        // Animate particle
        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transform = `translate(${x * 1.5}px, ${y * 1.5}px) scale(0)`;
        }, 100);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1100);
    }
}

// Function to set up persistent cup
function setupPersistentCup() {
    const persistentCupImg = document.querySelector('.persistent-cup-image');
    
    // Create audio elements for persistent cup
    const persistentDrinkingSound = new Audio('./media/drink-swallow.mp3');
    persistentDrinkingSound.loop = true;
    persistentDrinkingSound.volume = 0.65;
    
    const persistentSighSound = new Audio('./media/sigh_drink.mp3');
    persistentSighSound.volume = 0.3;
    
    let persistentIsDrinkable = false;
    
    persistentCupImg.addEventListener('click', function() {
        if (!persistentIsDrinkable) {
            // Switch to drinkable cup
            persistentCupImg.src = './media/Drinkable_cup.png';
            persistentIsDrinkable = true;
            
            // Add drinking animation
            persistentCupImg.classList.add('drinking');
            
            // Play drinking sound continuously
            persistentDrinkingSound.play().catch(e => console.log('Audio play failed:', e));
            
            // After 3 seconds, stop animation and audio, play sigh
            setTimeout(() => {
                // Stop drinking animation
                persistentCupImg.classList.remove('drinking');
                
                // Switch back to still cup image
                persistentCupImg.src = './media/Cup_still.png';
                
                // Stop drinking sound
                persistentDrinkingSound.pause();
                persistentDrinkingSound.currentTime = 0;
                
                // Play sigh sound
                persistentSighSound.play().catch(e => console.log('Sigh audio play failed:', e));
                
                persistentIsDrinkable = false;
            }, 3000);
        }
    });
}

// Function to add "Our Times" content to first rectangle
function addOurTimesContent(rectangle) {
    // Create content container
    const content = document.createElement('div');
    content.className = 'rectangle-content';
    
    // Create title
    const title = document.createElement('h3');
    title.className = 'rectangle-title';
    title.textContent = 'Our Times';
    
    // Create subtitle
    const subtitle = document.createElement('p');
    subtitle.className = 'rectangle-subtitle';
    subtitle.textContent = 'Riverside ↔ Itabira';
    
    // Create corner decorations
    const topLeftIcon = document.createElement('div');
    topLeftIcon.className = 'corner-icon top-left';
    topLeftIcon.innerHTML = '🕐';
    
    const bottomRightIcon = document.createElement('div');
    bottomRightIcon.className = 'corner-icon bottom-right';
    bottomRightIcon.innerHTML = '💕';
    
    // Append all elements
    content.appendChild(title);
    content.appendChild(subtitle);
    rectangle.appendChild(content);
    rectangle.appendChild(topLeftIcon);
    rectangle.appendChild(bottomRightIcon);
}

    // Function to add "Messages" content to second rectangle
    function addMessagesContent(rectangle) {
        // Create content container
        const content = document.createElement('div');
        content.className = 'rectangle-content';
        
        // Create title
        const title = document.createElement('h3');
        title.className = 'rectangle-title messages-title';
        title.textContent = 'Messages to Open When…';
        
        // Create subtitle
        const subtitle = document.createElement('p');
        subtitle.className = 'rectangle-subtitle messages-subtitle';
        subtitle.textContent = 'click when your heart needs something.';
        
        // Create envelope icon
        const envelopeIcon = document.createElement('div');
        envelopeIcon.className = 'envelope-icon';
        envelopeIcon.innerHTML = '💌';
        
        // Append all elements
        content.appendChild(title);
        content.appendChild(subtitle);
        rectangle.appendChild(content);
        rectangle.appendChild(envelopeIcon);
    }

    // Function to add "In progress..." content to other rectangles
    function addInProgressContent(rectangle) {
        // Create content container
        const content = document.createElement('div');
        content.className = 'rectangle-content in-progress-content';
        
        // Create title
        const title = document.createElement('h3');
        title.className = 'rectangle-title in-progress-title';
        title.textContent = 'In progress...';
        
        // Create subtitle
        const subtitle = document.createElement('p');
        subtitle.className = 'rectangle-subtitle in-progress-subtitle';
        subtitle.textContent = 'coming soon';
        
        // Create hammer and anvil icon
        const workIcon = document.createElement('div');
        workIcon.className = 'work-icon';
        workIcon.innerHTML = '🔨⚒️';
        
        // Append all elements
        content.appendChild(title);
        content.appendChild(subtitle);
        rectangle.appendChild(content);
        rectangle.appendChild(workIcon);
    }

// Function to set up version toggle
function setupVersionToggle() {
    const versionToggle = document.getElementById('version-toggle');
    const versionText = versionToggle.querySelector('.version-text');
    const body = document.body;
    
    let isLuVersion = true;
    
    versionToggle.addEventListener('click', function() {
        if (isLuVersion) {
            // Switch to Manuel's version
            versionText.textContent = "Manuel's Version";
            body.classList.add('manuel-version');
            isLuVersion = false;
        } else {
            // Switch to Lu's version
            versionText.textContent = "Lu's Version";
            body.classList.remove('manuel-version');
            isLuVersion = true;
        }
    });
}