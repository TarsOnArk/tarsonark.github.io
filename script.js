// TARS Mission Control - Day 1
// Simple interactions and dynamic elements

document.addEventListener('DOMContentLoaded', () => {
    // Update build date with current time
    const buildDate = document.getElementById('build-date');
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    buildDate.textContent = formattedDate;
    
    // Console easter egg
    console.log('%cTARS MISSION CONTROL', 'color: #00ff88; font-size: 20px; font-weight: bold;');
    console.log('%cCooper, this is no time for caution.', 'color: #00ccff; font-style: italic;');
    console.log('%cHumor setting: 75%', 'color: #8892a6;');
    console.log('%c\nBuilt incrementally. One feature per day.', 'color: #e0e6ed;');
    
    // Subtle status blink
    const statusItems = document.querySelectorAll('.status-item');
    statusItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.5}s`;
    });
});

// Utility: Log feature additions
function logFeature(name, description) {
    console.log(`%c[FEATURE ADDED] ${name}`, 'color: #00ff88; font-weight: bold;');
    console.log(`%c${description}`, 'color: #8892a6;');
}

// Day 1: Mission control established
logFeature('Mission Control UI', 'Initial interface with space/tech aesthetic');
