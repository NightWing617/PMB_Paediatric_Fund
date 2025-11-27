class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                /* Wave Divider */
                .wave-divider {
                    position: relative;
                    width: 100%;
                    height: 100px;
                    background: #2C4A63;
                    overflow: hidden;
                }
                
                .wave-divider svg {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 100px;
                }
                
                footer {
                    background: linear-gradient(180deg, #2C4A63 0%, #1a2e3f 100%);
                    color: white;
                    padding: 4rem 0 2rem;
                    position: relative;
                    overflow: hidden;
                }
                
                /* Decorative Background Elements */
                footer::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -10%;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(242, 159, 103, 0.1) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: float 20s ease-in-out infinite;
                }
                
                footer::after {
                    content: '';
                    position: absolute;
                    bottom: -30%;
                    left: -10%;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(111, 168, 170, 0.1) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: float 15s ease-in-out infinite reverse;
                }
                
                @keyframes float {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(30px, 30px); }
                }
                
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    position: relative;
                    z-index: 1;
                }
                
                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 3rem;
                    margin-bottom: 3rem;
                }
                
                .footer-section h4 {
                    font-weight: 700;
                    font-size: 1.25rem;
                    margin-bottom: 1.5rem;
                    color: #EBC472;
                    position: relative;
                    padding-bottom: 0.75rem;
                }
                
                .footer-section h4::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 50px;
                    height: 3px;
                    background: linear-gradient(90deg, #F29F67 0%, transparent 100%);
                    border-radius: 2px;
                }
                
                .footer-section p {
                    opacity: 0.9;
                    line-height: 1.8;
                    margin-bottom: 0.75rem;
                    transition: opacity 0.3s ease;
                }
                
                .footer-section p:hover {
                    opacity: 1;
                }
                
                .social-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .social-link {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    color: white;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }
                
                .social-link:hover {
                    background: linear-gradient(135deg, #F29F67 0%, #EBC472 100%);
                    transform: translateY(-3px) scale(1.1);
                    box-shadow: 0 8px 20px rgba(242, 159, 103, 0.4);
                    border-color: rgba(255, 255, 255, 0.3);
                }
                
                .social-link svg {
                    width: 20px;
                    height: 20px;
                }
                
                /* Newsletter Section */
                .newsletter {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    padding: 1.5rem;
                    border-radius: 1rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .newsletter-form {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }
                
                .newsletter-input {
                    flex: 1;
                    padding: 0.75rem 1rem;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 0.5rem;
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    font-size: 0.95rem;
                    transition: all 0.3s ease;
                }
                
                .newsletter-input::placeholder {
                    color: rgba(255, 255, 255, 0.6);
                }
                
                .newsletter-input:focus {
                    outline: none;
                    border-color: #F29F67;
                    background: rgba(255, 255, 255, 0.15);
                    box-shadow: 0 0 0 3px rgba(242, 159, 103, 0.2);
                }
                
                .newsletter-btn {
                    padding: 0.75rem 1.5rem;
                    background: linear-gradient(135deg, #F29F67 0%, #EBC472 100%);
                    color: #2C4A63;
                    border: none;
                    border-radius: 0.5rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }
                
                .newsletter-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(242, 159, 103, 0.4);
                }
                
                .footer-bottom {
                    text-align: center;
                    padding-top: 2.5rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .tagline {
                    font-weight: 800;
                    font-size: 1.5rem;
                    background: linear-gradient(135deg, #EBC472 0%, #F29F67 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 1rem;
                    animation: shimmer 3s ease-in-out infinite;
                }
                
                @keyframes shimmer {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                
                .hashtags {
                    margin-top: 1rem;
                    font-size: 0.9rem;
                    opacity: 0.7;
                    letter-spacing: 0.5px;
                }
                
                .copyright {
                    margin-top: 1.5rem;
                    font-size: 0.85rem;
                    opacity: 0.6;
                }
                
                /* Decorative Hearts */
                .heart {
                    display: inline-block;
                    color: #FA9BC5;
                    animation: heartbeat 2s ease-in-out infinite;
                }
                
                @keyframes heartbeat {
                    0%, 100% { transform: scale(1); }
                    25% { transform: scale(1.2); }
                    50% { transform: scale(1); }
                }
                
                @media (max-width: 768px) {
                    .footer-content {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    
                    .newsletter-form {
                        flex-direction: column;
                    }
                    
                    .newsletter-btn {
                        width: 100%;
                    }
                    
                    .tagline {
                        font-size: 1.25rem;
                    }
                }
            </style>
            
            <!-- Wave Divider -->
            <div class="wave-divider">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#FFFFFF"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#FFFFFF"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#FFFFFF"></path>
                </svg>
            </div>
            
            <footer>
                <div class="footer-container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h4>Contact Us</h4>
                            <p>📧 info@pmbfund.co.za</p>
                            <p>📍 Pietermaritzburg, South Africa</p>
                            <p>🏥 Serving Greys, Harry Gwala & Northdale Hospitals</p>
                        </div>
                        
                        <div class="footer-section">
                            <h4>Follow Our Journey</h4>
                            <p>Stay connected and see the impact of your donations</p>
                            <div class="social-links">
                                <a href="#" class="social-link" aria-label="Facebook" title="Facebook">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                </a>
                                <a href="#" class="social-link" aria-label="Twitter" title="Twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                    </svg>
                                </a>
                                <a href="#" class="social-link" aria-label="Instagram" title="Instagram">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        <div class="footer-section">
                            <h4>Stay Updated</h4>
                            <div class="newsletter">
                                <p style="margin-bottom: 0.5rem; font-size: 0.9rem;">Get campaign updates & impact stories</p>
                                <form class="newsletter-form">
                                    <input type="email" class="newsletter-input" placeholder="Your email" required>
                                    <button type="submit" class="newsletter-btn">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <div class="tagline">We Serve. We Care. Children Win. <span class="heart">❤️</span></div>
                        <div class="hashtags">
                            #PMBPaediatricFund #BoxesOfBlessings #LightAtTheBedside
                        </div>
                        <div class="copyright">
                            © ${new Date().getFullYear()} PMB Paediatric Fund NPC. Bringing light to hospitalized children.
                        </div>
                    </div>
                </div>
            </footer>
        `;

        this.setupNewsletter();
    }

    setupNewsletter() {
        const form = this.shadowRoot.querySelector('.newsletter-form');
        const input = this.shadowRoot.querySelector('.newsletter-input');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = input.value;

            if (email) {
                // Show success message
                const btn = this.shadowRoot.querySelector('.newsletter-btn');
                const originalText = btn.textContent;
                btn.textContent = '✓ Subscribed!';
                btn.style.background = 'linear-gradient(135deg, #6FA8AA 0%, #2C4A63 100%)';

                // Reset after 3 seconds
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    input.value = '';
                }, 3000);
            }
        });
    }
}

customElements.define('custom-footer', CustomFooter);