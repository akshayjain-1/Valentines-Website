// Configuration
const pickupLines = [
    "Are you a magician? Because whenever I look at you, everyone else disappears! ✨",
    "Do you have a map? I just got lost in your eyes! 🗺️💕",
    "If I could rearrange the alphabet, I'd put U and I together! 💑",
    "Are you a parking ticket? Because you've got FINE written all over you! 🚗",
    "Is your name Google? Because you have everything I've been searching for! 🔍❤️",
    "Do you believe in love at first sight, or should I walk by again? 😊",
    "Are you made of copper and tellurium? Because you're Cu-Te! 🧪💖"
];

const loveLetters = [
    `My Dearest Love,

From the moment I met you, my life changed in ways I never imagined. You are my sunshine on cloudy days, my laughter in moments of silence, and my strength when I feel weak.

Every day with you is a new adventure, and I cherish every moment we spend together. Your smile lights up my world, and your love fills my heart with joy.

I promise to love you, support you, and cherish you for all the days of my life. You are my everything, my forever, my always.

All my love,
Your Valentine 💕`,
    
    `To My Beautiful Valentine,

Words cannot express how deeply I care for you. You've shown me what true love really means - it's in the little things, the quiet moments, the shared laughs, and the comfortable silences.

You make me want to be a better person every single day. Your kindness, your compassion, your beautiful soul - these are the things that made me fall in love with you.

Thank you for being you, for accepting me, and for choosing to walk this journey of life together. I am so incredibly blessed to have you.

Forever yours,
Your Loving Partner 💝`,
    
    `My Sweet Love,

They say that true love is hard to find, but I found it in you. You are my dream come true, my answered prayer, and my greatest blessing.

With you, I've discovered a love that's patient, kind, and unconditional. You've taught me that love isn't just a feeling - it's a choice we make every day, and I choose you, today and always.

I look forward to creating countless more beautiful memories with you, to sharing dreams, adventures, and a lifetime of love.

You are my always and forever.

With all my heart,
Your Forever Valentine ❤️`
];

// State management
let currentLine = 0;
let boxesOpened = 0;
let musicPlayed = false;
let noBtnMoved = false;
let stopPickupLines = false;
let currentTypingId = 0;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    const page4 = document.getElementById('page4');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const nextToGifts = document.getElementById('nextToGifts');
    const nextToPhotos = document.getElementById('nextToPhotos');
    const giftBoxes = document.querySelectorAll('.gift-box');
    const letterModal = document.getElementById('letterModal');
    const closeModal = document.querySelector('.close-modal');
    const bgMusic = document.getElementById('bgMusic');
    const returnHomeBtn = document.getElementById('returnHome');

    // Play background music (with user interaction)
    function playMusic() {
        if (!musicPlayed) {
            bgMusic.play().catch(e => {
                console.log('Auto-play prevented. Music will play on user interaction.');
            });
            musicPlayed = true;
        }
    }

    // Page transition helper
    function transitionToPage(targetPage) {
        const currentPage = document.querySelector('.page.active');
        currentPage.classList.remove('active');
        setTimeout(() => {
            targetPage.classList.add('active');
        }, 300);
    }

    // Typewriter effect with cancellation support
    function typeWriter(element, text, speed = 50, typingId) {
        let i = 0;
        element.textContent = '';
        
        return new Promise((resolve) => {
            function type() {
                // Check if this typing operation has been cancelled
                if (typingId !== currentTypingId) {
                    resolve();
                    return;
                }
                
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    // Pickup lines with typewriter effect
    async function startPickupLines() {
        const lineElement = document.querySelector('.line-text');
        stopPickupLines = false;
        let lastLineIndex = -1;
        
        // Show continue button immediately
        nextToGifts.style.display = 'inline-block';
        
        // Keep showing random pickup lines until stopped
        while (!stopPickupLines) {
            // Get a random line different from the last one
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * pickupLines.length);
            } while (randomIndex === lastLineIndex && pickupLines.length > 1);
            
            lastLineIndex = randomIndex;
            const randomLine = pickupLines[randomIndex];
            
            currentTypingId++;
            await typeWriter(lineElement, randomLine, 40, currentTypingId);
            await new Promise(resolve => setTimeout(resolve, 2500)); // Pause between lines
            
            if (stopPickupLines) break;
            
            // Clear for next line
            lineElement.style.opacity = '0';
            await new Promise(resolve => setTimeout(resolve, 500));
            
            if (stopPickupLines) break;
            
            lineElement.style.opacity = '1';
        }
    }

    // Show letter modal with typewriter effect
    async function showLetter(letterIndex) {
        const letterText = document.querySelector('.letter-text');
        
        // Cancel any ongoing typing operation
        currentTypingId++;
        const myTypingId = currentTypingId;
        
        letterText.textContent = ''; // Clear any existing text first
        letterModal.classList.add('show');
        
        // Type out the letter with cancellation support
        await typeWriter(letterText, loveLetters[letterIndex], 30, myTypingId);
    }

    // Add extra floating hearts on final page
    function addExtraHearts() {
        const heartsContainer = page4.querySelector('.floating-hearts');
        const hearts = ['💖', '💕', '💗', '💝', '❤️', '💘'];
        
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.animation = `float ${Math.random() * 10 + 10}s infinite`;
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.opacity = '0.4';
            heartsContainer.appendChild(heart);
        }
    }

    // Confetti effect for Yes button
    function createConfetti() {
        const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ffd700', '#ff69b4'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '10000';
            
            const angle = (Math.PI * 2 * i) / 50;
            const velocity = Math.random() * 300 + 200;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            confetti.style.animation = `confettiFall 1.5s ease-out forwards`;
            confetti.style.setProperty('--tx', tx + 'px');
            confetti.style.setProperty('--ty', ty + 'px');
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 1500);
        }
    }

    // Sparkle effect
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    // ===== EVENT LISTENERS =====

    // Yes button - transition to page 2
    yesBtn.addEventListener('click', () => {
        playMusic();
        transitionToPage(page2);
        startPickupLines();
        createConfetti();
    });

    // No button - move away from cursor
    // Track mouse movement to move No button away
    document.addEventListener('mousemove', (e) => {
        const rect = noBtn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(e.clientX - btnCenterX, 2) + 
            Math.pow(e.clientY - btnCenterY, 2)
        );
        
        // If cursor is within 150px of the button, move it away
        if (distance < 150) {
            // Make button fixed positioned on first move attempt
            if (!noBtnMoved) {
                noBtn.classList.add('moving');
                noBtnMoved = true;
            }
            
            const maxX = window.innerWidth - noBtn.offsetWidth - 50;
            const maxY = window.innerHeight - noBtn.offsetHeight - 50;
            
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            
            noBtn.style.left = randomX + 'px';
            noBtn.style.top = randomY + 'px';
        }
    });

    noBtn.addEventListener('mouseenter', () => {
        // Make button fixed positioned when first hovered
        if (!noBtnMoved) {
            noBtn.classList.add('moving');
            noBtnMoved = true;
        }
        
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    });

    // Even more aggressive - also on click attempt
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Make button fixed positioned when first clicked
        if (!noBtnMoved) {
            noBtn.classList.add('moving');
            noBtnMoved = true;
        }
        
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // Make Yes button bigger to encourage clicking it
        stopPickupLines = true; // Stop the pickup lines loop
        const currentFontSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = (currentFontSize + 2) + 'px';
    });

    // Next to gifts page
    nextToGifts.addEventListener('click', () => {
        stopPickupLines = true; // Stop the pickup lines loop
        transitionToPage(page3);
    });

    // Gift boxes
    giftBoxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            // Only open if not already opened
            if (box.classList.contains('opened')) {
                return; // Don't do anything if already opened
            }
            
            // Mark as opened and show letter
            box.classList.add('opened');
            boxesOpened++;
            showLetter(index);
            
            // Show next button after all boxes opened
            if (boxesOpened === 3) {
                setTimeout(() => {
                    nextToPhotos.style.display = 'inline-block';
                }, 1000);
            }
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        letterModal.classList.remove('show');
    });

    // Close modal on outside click
    letterModal.addEventListener('click', (e) => {
        if (e.target === letterModal) {
            letterModal.classList.remove('show');
        }
    });

    // Next to photos page
    nextToPhotos.addEventListener('click', () => {
        transitionToPage(page4);
        addExtraHearts();
    });

    // Add sparkle effect on mouse move
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) { // Only occasionally create sparkles
            createSparkle(e.clientX, e.clientY);
        }
    });

    // Return to home button
    returnHomeBtn.addEventListener('click', () => {
        // Reset all state
        boxesOpened = 0;
        noBtnMoved = false;
        nextToPhotos.style.display = 'none';
        
        // Reset gift boxes
        giftBoxes.forEach(box => {
            box.classList.remove('opened');
        });
        
        // Reset Yes button size
        yesBtn.style.fontSize = '';
        
        // Go back to page 1
        transitionToPage(page1);
    });
});

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
