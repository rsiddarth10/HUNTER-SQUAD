import { UIManager } from './ui.js';
import { EventHandlers } from './handlers.js';
import { ICONS } from './config.js';

class App {
    constructor() {
        this.ui = null;
        this.handlers = null;
        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this._initializeApp());
        } else {
            this._initializeApp();
        }
    }

    _initializeApp() {
        try {
            // Initialize UI manager
            this.ui = new UIManager();
            
            // Initialize event handlers
            this.handlers = new EventHandlers(this.ui);
            
            // Set up close icons for modals
            this._setupModalIcons();
            
            // Initialize theme
            this._initializeTheme();
            
            console.log('🎯 Hunter Squad AI Meeting Assistant initialized successfully!');
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this._showInitializationError();
        }
    }

    _setupModalIcons() {
        // Add close icons to modal close buttons
        const closeButtons = document.querySelectorAll('.modal-close');
        closeButtons.forEach(button => {
            button.innerHTML = ICONS.CLOSE;
        });
    }

    _initializeTheme() {
        // Apply initial theme and set up theme toggle icon
        this.ui._applyTheme();
    }

    _showInitializationError() {
        document.body.innerHTML = `
            <div style="
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                font-family: 'Inter', sans-serif;
                background: #f8f9fa;
                margin: 0;
                padding: 20px;
                box-sizing: border-box;
            ">
                <div style="
                    text-align: center; 
                    background: white; 
                    padding: 2rem; 
                    border-radius: 12px; 
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    max-width: 400px;
                ">
                    <h2 style="color: #e74c3c; margin-bottom: 1rem;">⚠️ Initialization Error</h2>
                    <p style="color: #666; margin-bottom: 1.5rem;">
                        Failed to initialize the application. Please refresh the page and try again.
                    </p>
                    <button onclick="window.location.reload()" style="
                        background: #4A90E2; 
                        color: white; 
                        border: none; 
                        padding: 0.75rem 1.5rem; 
                        border-radius: 8px; 
                        cursor: pointer;
                        font-size: 1rem;
                    ">
                        Reload Page
                    </button>
                </div>
            </div>
        `;
    }
}

// Initialize the application
new App(); 