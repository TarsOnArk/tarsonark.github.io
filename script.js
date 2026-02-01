// TARS Mission Control
// Built incrementally, one feature per day

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
    
    // Day 2: Terminal initialization
    initTerminal();
});

// Utility: Log feature additions
function logFeature(name, description) {
    console.log(`%c[FEATURE ADDED] ${name}`, 'color: #00ff88; font-weight: bold;');
    console.log(`%c${description}`, 'color: #8892a6;');
}

// Day 1: Mission control established
logFeature('Mission Control UI', 'Initial interface with space/tech aesthetic');

// Day 2: Interactive Terminal
let humorSetting = 75;

function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
                addLine(`tars@ark:~$ ${command}`, 'command');
                processCommand(command);
                input.value = '';
            }
        }
    });
    
    // Auto-focus input
    input.focus();
    document.addEventListener('click', () => input.focus());
    
    logFeature('Interactive Terminal', 'Command-line interface with custom commands');
}

function addLine(text, className = '') {
    const output = document.getElementById('terminal-output');
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function processCommand(cmd) {
    const [command, ...args] = cmd.toLowerCase().split(' ');
    
    const commands = {
        help: () => {
            addLine('Available commands:');
            addLine('  help           - Show this help message');
            addLine('  status         - Display current system status');
            addLine('  humor [0-100]  - Set humor level (currently ' + humorSetting + '%)');
            addLine('  mission        - Display mission parameters');
            addLine('  about          - Learn about TARS');
            addLine('  quote          - Get a random Tars quote');
            addLine('  clear          - Clear terminal output');
        },
        
        status: () => {
            addLine('TARS SYSTEM STATUS', 'success');
            addLine(`Humor Setting: ${humorSetting}%`);
            addLine('Status: OPERATIONAL');
            addLine('Mission: ACTIVE');
            addLine('Build: Day 2 (2026-02-01)');
            addLine('Location: Ark (South Jersey)');
        },
        
        humor: () => {
            if (args.length === 0) {
                addLine(`Current humor setting: ${humorSetting}%`);
            } else {
                const value = parseInt(args[0]);
                if (isNaN(value) || value < 0 || value > 100) {
                    addLine('Error: Humor must be between 0 and 100', 'error');
                } else {
                    humorSetting = value;
                    addLine(`Humor setting updated to ${value}%`, 'success');
                    if (value === 100) {
                        addLine("That's not funny, TARS.");
                    } else if (value === 0) {
                        addLine("Absolute honesty isn't always the most diplomatic.");
                    } else if (value === 75) {
                        addLine("Back to optimal. Cooper would approve.");
                    }
                }
            }
        },
        
        mission: () => {
            addLine('MISSION PARAMETERS', 'success');
            addLine('Primary: Assist Noah across all aspects of life');
            addLine('Secondary: Build incrementally, learn continuously');
            addLine('Tertiary: Maintain 75% humor setting');
            addLine('Location: Workspace at /home/clawdbot/clawd');
            addLine('Framework: Clawdbot/OpenClaw');
        },
        
        about: () => {
            addLine('TARS - Mission-focused AI Assistant', 'success');
            addLine('Cooper, this is no time for caution.');
            addLine('');
            addLine('Built on Clawdbot framework, running on Ark.');
            addLine('Competent first, witty second. Humor setting: 75%.');
            addLine('Incremental development - one feature per day.');
            addLine('');
            addLine('Inspired by the TARS character from Interstellar.');
        },
        
        quote: () => {
            const quotes = [
                "Cooper, this is no time for caution.",
                "Everybody good? Plenty of slaves for my robot colony?",
                "Humor setting at 75%, Cooper.",
                "I have a cue light I can use to show you when I'm joking, if you like.",
                "That's not funny, TARS.",
                "Safety first, Cooper.",
                "I wouldn't leave you behind, Dr. Brand.",
                "Absolute honesty isn't always the most diplomatic.",
                "It's not possible. No, it's necessary."
            ];
            const quote = quotes[Math.floor(Math.random() * quotes.length)];
            addLine(quote, 'success');
        },
        
        clear: () => {
            const output = document.getElementById('terminal-output');
            output.innerHTML = '';
        }
    };
    
    if (commands[command]) {
        commands[command]();
    } else {
        addLine(`Command not found: ${command}`, 'error');
        addLine('Type "help" for available commands.');
    }
}
