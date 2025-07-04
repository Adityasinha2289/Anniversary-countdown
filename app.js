// Anniversary Reminder JavaScript
// Main application logic for countdown, animations, and message handling

// Global variables
let countdownInterval;
let savedMessage = '';
const anniversaryDate = new Date('July 9, 2025 00:40:00');


// DOM elements
const elements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    countdownContainer: document.getElementById('countdownContainer'),
    completionMessage: document.getElementById('completionMessage'),
    hugButton: document.getElementById('hugButton'),
    confettiContainer: document.getElementById('confettiContainer'),
    messageTextarea: document.getElementById('messageTextarea'),
    saveButton: document.getElementById('saveButton'),
    successIndicator: document.getElementById('successIndicator'),
    savedMessageDisplay: document.getElementById('savedMessageDisplay'),
    savedText: document.getElementById('savedText'),
    clearButton: document.getElementById('clearButton')
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    startCountdown();
    setupEventListeners();
    loadSavedMessage();
}

// Countdown Timer Functions
function startCountdown() {
    updateCountdown(); // Initial call
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = anniversaryDate - now;

    // Check if countdown has ended
    if (distance < 0) {
        clearInterval(countdownInterval);
        showCompletionMessage();
        return;
    }

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update display with leading zeros
    elements.days.textContent = formatNumber(days);
    elements.hours.textContent = formatNumber(hours);
    elements.minutes.textContent = formatNumber(minutes);
    elements.seconds.textContent = formatNumber(seconds);

    // Add pulse animation to seconds
    elements.seconds.style.animation = 'none';
    elements.seconds.offsetHeight; // Trigger reflow
    elements.seconds.style.animation = 'numberPulse 1s ease-out';
}

function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

function showCompletionMessage() {
    elements.countdownContainer.classList.add('hidden');
    elements.completionMessage.classList.remove('hidden');
    
    // Trigger celebration animation
    createCelebrationConfetti();
}

// Event Listeners Setup
function setupEventListeners() {
    // Hug button click handler
    elements.hugButton.addEventListener('click', function() {
        createConfetti();
        animateHugButton();
    });

    // Save button click handler
    elements.saveButton.addEventListener('click', function() {
        saveMessage();
    });

    // Clear button click handler
    elements.clearButton.addEventListener('click', function() {
        clearMessage();
    });

    // Textarea input handler for auto-save indication
    elements.messageTextarea.addEventListener('input', function() {
        hideSuccessIndicator();
    });
}

// Confetti Animation Functions
function createConfetti() {
    const confettiCount = 50;
    const colors = ['#ff6b9d', '#ffd93d', '#6bcf7f', '#4ecdc4', '#ff9a9e'];
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            
            // Random positioning and styling
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            // Random shapes
            const shapeRandom = Math.random();
            if (shapeRandom < 0.2) {
                confetti.style.borderRadius = '50%';
            } else if (shapeRandom < 0.4) {
                confetti.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
            } else {
                confetti.style.transform = 'rotate(45deg)';
            }
            
            elements.confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }, i * 50);
    }
}

function createCelebrationConfetti() {
    // Create a bigger celebration with more confetti
    const confettiCount = 100;
    const colors = ['#ff6b9d', '#ffd93d', '#6bcf7f', '#4ecdc4', '#ff9a9e', '#ffdde1', '#ee9ca7'];
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
            
            // More variety in shapes for celebration
            const shapeRandom = Math.random();
            if (shapeRandom < 0.3) {
                confetti.style.borderRadius = '50%';
            } else if (shapeRandom < 0.6) {
                confetti.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
            } else {
                confetti.style.transform = 'rotate(45deg)';
            }
            
            elements.confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 6000);
        }, i * 30);
    }
}

function animateHugButton() {
    elements.hugButton.style.animation = 'none';
    elements.hugButton.offsetHeight; // Trigger reflow
    elements.hugButton.style.animation = 'buttonBounce 0.3s ease';
    
    setTimeout(() => {
        elements.hugButton.style.animation = '';
    }, 300);
}

// Message Handling Functions (using memory storage instead of localStorage)
function saveMessage() {
    const messageText = elements.messageTextarea.value.trim();
    
    if (messageText === '') {
        alert('Please write a message before saving!');
        return;
    }
    
    // Save to memory (simulating localStorage functionality)
    savedMessage = messageText;
    
    // Show success indicator
    showSuccessIndicator();
    
    // Display saved message
    displaySavedMessage();
    
    // Clear textarea
    elements.messageTextarea.value = '';
}

function loadSavedMessage() {
    // In a real implementation, this would load from localStorage
    // For now, we'll just check if there's a saved message in memory
    if (savedMessage) {
        displaySavedMessage();
    }
}

function displaySavedMessage() {
    if (savedMessage) {
        elements.savedText.textContent = savedMessage;
        elements.savedMessageDisplay.classList.remove('hidden');
    }
}

function clearMessage() {
    if (confirm('Are you sure you want to clear your saved message?')) {
        savedMessage = '';
        elements.savedMessageDisplay.classList.add('hidden');
        hideSuccessIndicator();
    }
}

function showSuccessIndicator() {
    elements.successIndicator.classList.remove('hidden');
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        hideSuccessIndicator();
    }, 3000);
}

function hideSuccessIndicator() {
    elements.successIndicator.classList.add('hidden');
}

// Utility Functions
function formatTimeUnit(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

// Add some interactive hover effects
function addHoverEffects() {
    const cards = document.querySelectorAll('.countdown-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize hover effects after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addHoverEffects, 1000); // Wait for initial animations
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save message
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (elements.messageTextarea.value.trim()) {
            saveMessage();
        }
    }
    
    // Ctrl/Cmd + H to trigger hug animation
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        createConfetti();
        animateHugButton();
    }
});

// Add some fun easter eggs
let clickCount = 0;
elements.hugButton.addEventListener('click', function() {
    clickCount++;
    
    // Special animation after 5 clicks
    if (clickCount === 5) {
        this.textContent = 'You\'re so sweet! 🥰';
        setTimeout(() => {
            this.textContent = 'Send Yourself a Hug 🤗';
        }, 2000);
    }
    
    // Extra confetti after 10 clicks
    if (clickCount === 10) {
        createCelebrationConfetti();
        this.textContent = 'Wow! So much love! 💕';
        setTimeout(() => {
            this.textContent = 'Send Yourself a Hug 🤗';
            clickCount = 0; // Reset counter
        }, 3000);
    }
});

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Performance optimization: Remove old confetti elements
function cleanupConfetti() {
    const confettiElements = document.querySelectorAll('.confetti-piece');
    confettiElements.forEach(element => {
        if (element.offsetTop > window.innerHeight + 100) {
            element.remove();
        }
    });
}

// Run cleanup every 5 seconds
setInterval(cleanupConfetti, 5000);

// Add visual feedback for form interactions
elements.messageTextarea.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
    this.parentElement.style.transition = 'transform 0.3s ease';
});

elements.messageTextarea.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
});

// Add loading animation for save button
elements.saveButton.addEventListener('click', function() {
    const originalText = this.textContent;
    this.textContent = 'Saving... 💫';
    this.disabled = true;
    
    setTimeout(() => {
        this.textContent = originalText;
        this.disabled = false;
    }, 1000);
});

// Console easter egg
console.log('💕 Welcome to the Anniversary Reminder! 💕');
console.log('Try pressing Ctrl+H for a surprise! 🎉');
console.log('Made with love for eternal memories 💖');