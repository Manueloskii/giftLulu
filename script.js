// Pin Code and Introduction Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    const pinScreen = document.getElementById('pin-screen');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const pinInput = document.getElementById('pin-input');
    const pinSubmit = document.getElementById('pin-submit');
    const pinError = document.getElementById('pin-error');
    
    const CORRECT_PIN = '14';
    
    // Pin code functionality
    function checkPin() {
        const enteredPin = pinInput.value;
        
        if (enteredPin === CORRECT_PIN) {
            // Correct pin - hide pin screen and show intro
            pinScreen.style.opacity = '0';
            setTimeout(() => {
                pinScreen.style.display = 'none';
                introScreen.classList.remove('hidden');
                startIntroAnimation();
            }, 1000);
        } else {
            // Wrong pin - show error
            pinError.classList.add('show');
            pinInput.value = '';
            pinInput.focus();
            
            // Hide error after 3 seconds
            setTimeout(() => {
                pinError.classList.remove('show');
            }, 3000);
        }
    }
    
    // Pin submit button click
    pinSubmit.addEventListener('click', checkPin);
    
    // Pin input enter key
    pinInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPin();
        }
    });
    
    // Focus on pin input when page loads
    pinInput.focus();
    
    // Introduction Screen Animation
    function startIntroAnimation() {
        let introSkipped = false;
        
        // Function to hide intro and show main content
        function hideIntro() {
            if (introSkipped) return; // Prevent multiple calls
            introSkipped = true;
            
            // Fade out intro screen
            introScreen.style.opacity = '0';
            
            // After fade out completes, hide intro and show main content
            setTimeout(() => {
                introScreen.style.display = 'none';
                mainContent.classList.remove('hidden');
                setupCupFunctionality();
            }, 1000); // Faster transition when clicked
        }
        
        // Click anywhere on intro screen to skip
        introScreen.addEventListener('click', hideIntro);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (!introSkipped) {
                hideIntro();
            }
        }, 5000);
    }
    
    // Cup functionality
    function setupCupFunctionality() {
        const cupImage = document.getElementById('cup-image');
        const cupText = document.getElementById('cup-text');
        const buttonSection = document.getElementById('button-section');
        const simButton = document.getElementById('sim-button');
        let isDrinkable = false;
        
        // Create audio element for drinking sound
        const drinkingSound = new Audio('./media/drink-swallow.mp3');
        drinkingSound.loop = true;
        drinkingSound.volume = 0.65; // Reduced volume
        
        // Create audio element for sigh sound
        const sighSound = new Audio('./media/sigh_drink.mp3');
        sighSound.volume = 0.3; // Reduced volume
        
        cupImage.addEventListener('click', function() {
            if (!isDrinkable) {
                // Switch to drinkable cup
                cupImage.src = './media/Drinkable_cup.png';
                isDrinkable = true;
                
                // Change text to drinking message
                cupText.textContent = "mmmm, yummy...";
                
                // Add drinking animation
                cupImage.classList.add('drinking');
                
                // Play drinking sound continuously
                drinkingSound.play().catch(e => console.log('Audio play failed:', e));
                
                // After 4 seconds, stop animation and audio, play sigh
                setTimeout(() => {
                    // Stop drinking animation
                    cupImage.classList.remove('drinking');
                    cupImage.classList.add('finished');
                    
                    // Switch back to still cup image
                    cupImage.src = './media/Cup_still.png';
                    
                    // Change text to Portuguese question
                    cupText.textContent = "vamos continuar?";
                    
                    // Show button section
                    buttonSection.classList.remove('hidden');
                    
                    // Stop drinking sound
                    drinkingSound.pause();
                    drinkingSound.currentTime = 0;
                    
                    // Play sigh sound
                    sighSound.play().catch(e => console.log('Sigh audio play failed:', e));
                    
                    // Create persistent cup in right corner
                    createPersistentCup();
                }, 4000);
                
                // Remove click event listener and cursor pointer
                cupImage.removeEventListener('click', arguments.callee);
                cupImage.style.cursor = 'default';
            }
        });
        
        // Add cursor pointer to indicate clickability
        cupImage.style.cursor = 'pointer';
        
        // Function to create persistent cup in right corner
        function createPersistentCup() {
            const persistentCup = document.createElement('div');
            persistentCup.id = 'persistent-cup';
            persistentCup.className = 'persistent-cup';
            
            const persistentCupImg = document.createElement('img');
            persistentCupImg.src = './media/Cup_still.png';
            persistentCupImg.className = 'persistent-cup-image';
            persistentCupImg.style.cursor = 'pointer';
            
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
            
            persistentCup.appendChild(persistentCupImg);
            document.body.appendChild(persistentCup);
        }

        // Sim button click functionality
        simButton.addEventListener('click', function() {
            // Navigate to the arquivo.html page
            window.location.href = 'arquivo.html';
        });
    }
});