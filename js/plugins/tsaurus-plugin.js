// TSAURUS PLUGIN FOR 5ETOOLS
// This plugin modifies the 5etools UI when loaded in an iframe

(function() {
    // Check if we're in an iframe
    const isInIframe = window.self !== window.top;
    
    if (!isInIframe) return; // Don't run if not in iframe

    // Wait for DOM to be ready
    function waitForElement(selector, callback, maxTries = 60) {
        if (maxTries <= 0) {
            console.error('TSAURUS plugin: Failed to find element:', selector);
            return;
        }
        
        const element = document.querySelector(selector);
        if (element) {
            callback(element);
        } else {
            setTimeout(() => waitForElement(selector, callback, maxTries - 1), 500);
        }
    }

    // Inject our custom styles
    function injectStyles() {
        try {
            const style = document.createElement('style');
            style.textContent = `
                /* Reset some 5etools styles */
                body {
                    background: transparent !important;
                    padding: 0 !important;
                    margin: 0 !important;
                }

                /* Hide unnecessary elements */
                .ui-dialog,
                .ui-widget-overlay,
                #ui-datepicker-div,
                .ui-tooltip,
                .ui-helper-hidden-accessible {
                    display: none !important;
                }

                /* Style the main content area */
                .content {
                    background: transparent !important;
                    padding: 0 !important;
                    margin: 0 !important;
                }

                /* Style the loot generator */
                .lootgen {
                    background: transparent !important;
                    padding: 0 !important;
                    margin: 0 !important;
                }

                /* Style buttons */
                .lootgen button {
                    background: #2A2B2E !important;
                    color: white !important;
                    border: none !important;
                    border-radius: 0.5rem !important;
                    padding: 0.75rem 1rem !important;
                    transition: background-color 0.2s !important;
                }

                .lootgen button:hover {
                    background: #3A3B3E !important;
                }

                /* Style select elements */
                .lootgen select {
                    background: #2A2B2E !important;
                    color: white !important;
                    border: 1px solid #4A4B4E !important;
                    border-radius: 0.5rem !important;
                    padding: 0.5rem !important;
                }

                /* Style input elements */
                .lootgen input {
                    background: #2A2B2E !important;
                    color: white !important;
                    border: 1px solid #4A4B4E !important;
                    border-radius: 0.5rem !important;
                    padding: 0.5rem !important;
                }

                /* Style tables */
                .lootgen table {
                    background: transparent !important;
                    color: white !important;
                    border-collapse: collapse !important;
                    width: 100% !important;
                }

                .lootgen th {
                    background: #2A2B2E !important;
                    color: #FFD700 !important;
                    padding: 0.75rem !important;
                    text-align: left !important;
                }

                .lootgen td {
                    padding: 0.75rem !important;
                    border-bottom: 1px solid #4A4B4E !important;
                }

                /* Style results area */
                .lootgen .results {
                    background: #1A1B1E !important;
                    border: 2px solid #4A4B4E !important;
                    border-radius: 0.5rem !important;
                    padding: 1rem !important;
                    margin-top: 1rem !important;
                }

                /* Style headings */
                .lootgen h1,
                .lootgen h2,
                .lootgen h3 {
                    color: #FFD700 !important;
                    margin: 1rem 0 !important;
                }

                /* Style links */
                .lootgen a {
                    color: #4A90E2 !important;
                    text-decoration: none !important;
                }

                .lootgen a:hover {
                    text-decoration: underline !important;
                }

                /* Style tooltips */
                .lootgen [data-tooltip] {
                    border-bottom: 1px dotted #4A90E2 !important;
                    cursor: help !important;
                }

                /* Style error messages */
                .lootgen .error {
                    color: #ff6b6b !important;
                    background: rgba(255, 107, 107, 0.1) !important;
                    padding: 0.75rem !important;
                    border-radius: 0.5rem !important;
                    margin: 1rem 0 !important;
                }

                /* Style success messages */
                .lootgen .success {
                    color: #4CAF50 !important;
                    background: rgba(76, 175, 80, 0.1) !important;
                    padding: 0.75rem !important;
                    border-radius: 0.5rem !important;
                    margin: 1rem 0 !important;
                }

                /* Hide tab buttons except for the active one */
                .ui-tab__wrp-tab-heads--border button:not(.ve-btn-group button) {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
            //console.log('TSAURUS plugin: Styles injected successfully');
        } catch (error) {
            console.error('TSAURUS plugin: Error injecting styles:', error);
        }
    }

    // Modify the UI
    function modifyUI() {
        try {
            // Wait for the main content to load
            waitForElement('#navigation', (content) => {
                //console.log('TSAURUS plugin: Found content wrapper');
                
                // Remove unnecessary elements
                const elementsToRemove = [
                    'header',
                    'nav#navigation',
                    '.ui-dialog',
                    '.ui-widget-overlay',
                    '#ui-datepicker-div',
                    '.ui-tooltip',
                    '.ui-helper-hidden-accessible'
                ];

                elementsToRemove.forEach(selector => {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(el => {
                        if (el instanceof HTMLElement) {
                            el.style.display = 'none';
                        }
                    });
                });

                // Remove container classes and adjust spacing
                const containers = document.querySelectorAll('.container');
                containers.forEach(container => {
                    if (container instanceof HTMLElement) {
                        container.classList.remove('container');
                        container.style.padding = '0';
                        container.style.margin = '0';
                        container.style.width = '100%';
                        container.style.maxWidth = 'none';
                    }
                });

                // Adjust view-col-wrapper spacing
                const viewColWrapper = document.querySelector('.view-col-wrapper');
                if (viewColWrapper instanceof HTMLElement) {
                    viewColWrapper.style.padding = '0';
                    viewColWrapper.style.margin = '0';
                }

                // Adjust view-col spacing
                const viewCols = document.querySelectorAll('.view-col');
                viewCols.forEach(col => {
                    if (col instanceof HTMLElement) {
                        col.style.padding = '0.5rem';
                        col.style.margin = '0';
                    }
                });

                // Add our custom class to the main content
                content.classList.add('tsaurus-iframe');
                //console.log('TSAURUS plugin: UI modifications complete');
            });
        } catch (error) {
            console.error('TSAURUS plugin: Error modifying UI:', error);
        }
    }

    // Handle tab switching based on URL hash
    function handleTabSwitching() {
        // Get type from hash (e.g., #type=random_by_cr)
        const hash = window.location.hash;
        const type = hash.split('=')[1];

        if (!type) return;

        // Map our types to 5etools tab indices
        const typeToTabIndex = {
            'random_by_cr': 0,
            'tables': 1,
            'party_loot': 2,
            'dragon': 3,
        };

        const tabIndex = typeToTabIndex[type];
        if (tabIndex === undefined) return;

        // Wait for the tab buttons to be available
        waitForElement('.ui-tab__btn-tab-head', (tabButton) => {
            const tabButtons = document.querySelectorAll('.ui-tab__btn-tab-head');
            const tabBodies = document.querySelectorAll('.ui-tab__wrp-tab-body');

            if (tabButtons[tabIndex] && tabBodies[tabIndex]) {
                // Remove active class from all tabs
                tabButtons.forEach(btn => {
                    if (btn instanceof HTMLElement) {
                        btn.classList.remove('active');
                    }
                });

                // Hide all tab bodies
                tabBodies.forEach(body => {
                    if (body instanceof HTMLElement) {
                        body.classList.add('ve-hidden');
                    }
                });

                // Activate the correct tab
                if (tabButtons[tabIndex] instanceof HTMLElement) {
                    tabButtons[tabIndex].classList.add('active');
                }
                if (tabBodies[tabIndex] instanceof HTMLElement) {
                    tabBodies[tabIndex].classList.remove('ve-hidden');
                }
            }
        });
    }

    // Initialize the plugin
    function init() {
        try {
            //console.log('TSAURUS plugin: Initializing');
            injectStyles();
            modifyUI();
            handleTabSwitching();

            // Listen for hash changes
            window.addEventListener('hashchange', handleTabSwitching);

            // Listen for dynamic content changes
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.addedNodes.length) {
                        //console.log('TSAURUS plugin: Content changed, reapplying modifications');
                        modifyUI();
                        handleTabSwitching(); // Re-run tab switching when content changes
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            //console.log('TSAURUS plugin: Initialization complete');
        } catch (error) {
            console.error('TSAURUS plugin: Error during initialization:', error);
        }
    }

    function waitForLootOutputAndObserve() {
        const targetNode = document.querySelector('.w-100.h-100.ve-flex-col.ve-overflow-y-auto.smooth-scroll'); // Adjust selector as needed
        if (targetNode) {
            const observer = new MutationObserver((mutationsList, observer) => {
                // Your custom code here
                const lootHtml = targetNode.innerHTML;
                
                const parser = new DOMParser();
                const doc = parser.parseFromString(lootHtml, 'text/html');
                const h4s = Array.from(doc.querySelectorAll('h4 div:not(.ve-btn-group)'));
                const uls = Array.from(doc.querySelectorAll('ul'));
                               
                const lastH4 = h4s[0];
                const lastUl = uls[0];
                const relevantHtml = `<h1>${lastH4.textContent}</h1> ${lastUl.outerHTML}`;
                window.parent.postMessage(
                    { type: 'LOOT_ROLL', payload: relevantHtml },
                    '*'
                ); 
            });
            observer.observe(targetNode, { childList: true, subtree: true });
            console.log('MutationObserver attached to loot output!');
        } else {
            setTimeout(waitForLootOutputAndObserve, 200);
        }
      }
      waitForLootOutputAndObserve();

    // Run the plugin
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(); 