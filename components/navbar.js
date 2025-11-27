class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }
                
                nav {
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    box-shadow: 0 4px 20px rgba(44, 74, 99, 0.08);
                    transition: all 0.3s ease;
                    border-bottom: 1px solid rgba(242, 159, 103, 0.1);
                }
                
                nav.scrolled {
                    background: rgba(255, 255, 255, 0.95);
                    box-shadow: 0 8px 30px rgba(44, 74, 99, 0.15);
                    border-bottom-color: rgba(242, 159, 103, 0.2);
                }
                
                /* Scroll Progress Bar */
                .scroll-progress {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #F29F67 0%, #E92B38 100%);
                    width: 0%;
                    transition: width 0.2s ease;
                    box-shadow: 0 0 10px rgba(242, 159, 103, 0.5);
                }
                
                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }
                
                .nav-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 0;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-weight: 800;
                    font-size: 1.25rem;
                    color: #2C4A63;
                    text-decoration: none;
                    transition: transform 0.3s ease;
                }
                
                .logo:hover {
                    transform: scale(1.05);
                }
                
                .logo svg {
                    color: #F29F67;
                    animation: rotate 20s linear infinite;
                }
                
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .logo span {
                    background: linear-gradient(135deg, #2C4A63 0%, #6FA8AA 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .nav-links {
                    display: flex;
                    gap: 2.5rem;
                    align-items: center;
                }
                
                .nav-link {
                    position: relative;
                    color: #2C4A63;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: color 0.3s ease;
                    padding: 0.5rem 0;
                }
                
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #F29F67 0%, #EBC472 100%);
                    transition: width 0.3s ease;
                }
                
                .nav-link:hover {
                    color: #F29F67;
                }
                
                .nav-link:hover::after {
                    width: 100%;
                }
                
                .donate-btn {
                    position: relative;
                    background: linear-gradient(135deg, #F29F67 0%, #EBC472 100%);
                    color: #2C4A63;
                    padding: 0.75rem 2rem;
                    border-radius: 9999px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(242, 159, 103, 0.3);
                    overflow: hidden;
                }
                
                .donate-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                    transition: left 0.5s;
                }
                
                .donate-btn:hover::before {
                    left: 100%;
                }
                
                .donate-btn:hover {
                    background: linear-gradient(135deg, #EBC472 0%, #F29F67 100%);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(242, 159, 103, 0.5);
                }
                
                .donate-btn:active {
                    transform: translateY(0);
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: #2C4A63;
                    cursor: pointer;
                    padding: 0.5rem;
                    transition: transform 0.3s ease;
                }
                
                .mobile-menu-btn:hover {
                    transform: scale(1.1);
                }
                
                .mobile-menu-btn svg {
                    width: 28px;
                    height: 28px;
                }
                
                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: block;
                    }
                    
                    .nav-links {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: rgba(255, 255, 255, 0.98);
                        backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px);
                        flex-direction: column;
                        padding: 1.5rem;
                        gap: 1.5rem;
                        box-shadow: 0 10px 30px rgba(44, 74, 99, 0.15);
                        border-top: 1px solid rgba(242, 159, 103, 0.2);
                        animation: slideDown 0.3s ease-out;
                    }
                    
                    .nav-links.active {
                        display: flex;
                    }
                    
                    .nav-link {
                        width: 100%;
                        padding: 0.75rem 1rem;
                        border-radius: 0.5rem;
                        text-align: center;
                    }
                    
                    .nav-link:hover {
                        background: rgba(242, 159, 103, 0.1);
                    }
                    
                    .donate-btn {
                        width: 100%;
                        text-align: center;
                    }
                }
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
            <nav>
                <div class="scroll-progress"></div>
                <div class="nav-container">
                    <div class="nav-content">
                        <a href="/" class="logo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                            <span>PMB Paediatric Fund</span>
                        </a>
                        
                        <button class="mobile-menu-btn" aria-label="Toggle menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                        
                        <div class="nav-links">
                            <a href="/" class="nav-link">Home</a>
                            <a href="/about" class="nav-link">About Us</a>
                            <a href="/campaigns" class="nav-link">Our Campaigns</a>
                            <a href="/gallery" class="nav-link">Gallery</a>
                            <a href="#donate" class="donate-btn">DONATE</a>
                        </div>
                    </div>
                </div>
            </nav>
        `;

        this.setupScrollEffects();
        this.setupMobileMenu();
    }

    setupScrollEffects() {
        const nav = this.shadowRoot.querySelector('nav');
        const progressBar = this.shadowRoot.querySelector('.scroll-progress');

        window.addEventListener('scroll', () => {
            // Add scrolled class
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            // Update progress bar
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
        const navLinks = this.shadowRoot.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!this.contains(event.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-link, .donate-btn').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

customElements.define('custom-navbar', CustomNavbar);