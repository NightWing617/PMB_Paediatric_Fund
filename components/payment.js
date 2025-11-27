// Payment Component for Stripe Integration
class PaymentComponent extends HTMLElement {
    constructor() {
        super();
        this.stripe = null;
        this.isProcessing = false;
    }

    connectedCallback() {
        // Initialize Stripe when component is added to DOM
        this.initializeStripe();
    }

    async initializeStripe() {
        // Wait for Stripe.js to load
        if (typeof Stripe === 'undefined') {
            console.error('Stripe.js not loaded. Please include the Stripe script in your HTML.');
            return;
        }

        // Get publishable key from meta tag or environment
        const publishableKey = document.querySelector('meta[name="stripe-publishable-key"]')?.content;

        if (!publishableKey) {
            console.error('Stripe publishable key not found. Add it as a meta tag.');
            return;
        }

        this.stripe = Stripe(publishableKey);
        console.log('Stripe initialized successfully');
    }

    async createCheckoutSession(amount, boxes, donorName = '') {
        if (this.isProcessing) {
            console.log('Payment already processing...');
            return;
        }

        this.isProcessing = true;
        this.showLoadingState();

        try {
            // Call backend to create checkout session
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    boxes: boxes,
                    donorName: donorName
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to create checkout session');
            }

            const session = await response.json();

            // Redirect to Stripe Checkout
            const result = await this.stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                throw new Error(result.error.message);
            }
        } catch (error) {
            console.error('Payment error:', error);
            this.showErrorMessage(error.message);
        } finally {
            this.isProcessing = false;
            this.hideLoadingState();
        }
    }

    showLoadingState() {
        // Create loading overlay
        const overlay = document.createElement('div');
        overlay.id = 'payment-loading';
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        overlay.innerHTML = `
            <div class="bg-white rounded-2xl p-8 text-center max-w-sm">
                <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-muted-orange mx-auto mb-4"></div>
                <h3 class="text-2xl font-bold text-slate-blue mb-2">Processing...</h3>
                <p class="text-gray-600">Redirecting to secure payment...</p>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    hideLoadingState() {
        const overlay = document.getElementById('payment-loading');
        if (overlay) {
            overlay.remove();
        }
    }

    showErrorMessage(message) {
        // Create error toast
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 transform transition-all duration-300 translate-x-full max-w-md';
        toast.innerHTML = `
            <div class="flex items-start space-x-3">
                <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                    <h4 class="font-bold mb-1">Payment Error</h4>
                    <p class="text-sm">${message}</p>
                </div>
            </div>
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);

        // Remove after delay
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }
}

// Register the custom element
customElements.define('payment-component', PaymentComponent);

// Global payment handler
window.handleDonation = function (amount, boxes) {
    const paymentComponent = document.querySelector('payment-component') ||
        document.createElement('payment-component');

    if (!document.querySelector('payment-component')) {
        document.body.appendChild(paymentComponent);
    }

    paymentComponent.createCheckoutSession(amount, boxes);
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaymentComponent;
}
