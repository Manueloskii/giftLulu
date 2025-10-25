// Messages to Open When... JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Set up envelope click handlers
    setupEnvelopeHandlers();
    
    // Set up modal close handler
    setupModalCloseHandler();
});

function setupEnvelopeHandlers() {
    const envelopes = document.querySelectorAll('.envelope');
    
    envelopes.forEach(envelope => {
        envelope.addEventListener('click', function() {
            const messageType = this.getAttribute('data-message');
            openLetter(messageType);
        });
    });
}

function setupModalCloseHandler() {
    const modal = document.getElementById('message-modal');
    const closeButton = document.getElementById('close-button');
    
    closeButton.addEventListener('click', function() {
        closeModal();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openLetter(messageType) {
    const modal = document.getElementById('message-modal');
    const letterContent = document.getElementById('letter-content');
    
    // Get letter content based on message type
    const letterText = getLetterContent(messageType);
    
    // Set the letter content
    letterContent.innerHTML = letterText;
    
    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('message-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function getLetterContent(messageType) {
    const letters = {
        miss: `
            <h3>When you miss me 💭</h3>
            <p>My love,</p>
            <p>I know the distance feels heavy sometimes, but remember that every heartbeat between us carries the same rhythm of love. I'm thinking of you right now, wondering what you're doing, hoping you're smiling.</p>
            <p>Close your eyes and feel my arms around you. I'm there, always.</p>
            <p>With all my love,<br>Your hairy clingy man 💕</p>
        `,
        sad: `
            <h3>When you're sad 💧</h3>
            <p>Sweetheart,</p>
            <p>It's okay to feel sad sometimes. Your feelings are valid and beautiful, just like you. Remember that this feeling is temporary, but my love for you is forever.</p>
            <p>You are stronger than you know, and I believe in you completely. Let me be your safe place, even from afar.</p>
            <p>I love you more than words can say,<br>Manuelzinho 💖</p>
        `,
        sleep: `
            <h3>When you can't sleep 🌙</h3>
            <p>My bunny,</p>
            <p>Let me tell you a story to help you drift off to dreamland. Imagine us walking hand in hand through a garden of stars, where every flower is a memory we've shared.</p>
            <p>Breathe slowly, feel my presence beside you, and let the gentle rhythm of your heart put you to sleep.</p>
            <p>Sweet dreams, my love,<br>Manuelzinho 🌙</p>
        `,
        proud: `
            <h3>When you're proud of yourself 🌸</h3>
            <p>My amazing Lu,</p>
            <p>I am so incredibly proud of you! You deserve to celebrate every achievement, big or small. You are capable of wonderful things, and I'm honored to witness your growth.</p>
            <p>Your success brings me so much joy. Keep shining, my beautiful star!</p>
            <p>Celebrating you always,<br>Manuelzinho 🌟</p>
        `,
        motivation: `
            <h3>When you need motivation 💪</h3>
            <p>My guerreira,</p>
            <p>You are stronger than any challenge that comes your way. Remember all the times you've overcome obstacles before, you have that same strength within you now.</p>
            <p>We both know that you are strong, and I am very proud for your consistence in multiple times you have.</p>
            <p>I believe in you completely. Take it one step at a time, and know that I'm cheering you on every step of the way.</p>
            <p>You've got this, my love,<br>Manuelzinho 💪</p>
        `,
        smile: `
            <h3>When you just want to smile ☀️</h3>
            <p>My sunshine,</p>
            <p>Your smile lights up my entire universe and makes everything better.</p>
            <p>You are pure joy, pure love, pure happiness. Never stop smiling, because when you smile, the whole world smiles with you.</p>
            <p>Making you smile is my life's mission, while those golden joy tears fall princess<br>Manuelzinho ☀️</p>
        `
    };
    
    return letters[messageType] || '<p>Letter not found.</p>';
}