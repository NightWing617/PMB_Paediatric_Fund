require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.static('.'));
app.use(express.json());

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Create checkout session
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount, boxes, donorName } = req.body;

        // Validate input
        if (!amount || amount < 150) {
            return res.status(400).json({
                error: 'Minimum donation amount is R150'
            });
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'zar',
                        product_data: {
                            name: `PMB Paediatric Fund - ${boxes} Care Package${boxes > 1 ? 's' : ''}`,
                            description: `Support hospitalized children in Pietermaritzburg. Each package includes items for both child and caregiver.`,
                            images: ['https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400'],
                        },
                        unit_amount: amount * 100, // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin || 'http://localhost:3000'}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin || 'http://localhost:3000'}/#donate`,
            metadata: {
                boxes: boxes.toString(),
                donorName: donorName || 'Anonymous',
                campaign: 'Christmas 2025: Play it Forward'
            },
            // Optional: Collect donor information
            customer_email: req.body.email || undefined,
        });

        res.json({
            id: session.id,
            url: session.url
        });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({
            error: 'Failed to create checkout session',
            message: error.message
        });
    }
});

// Webhook handler for Stripe events
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Payment successful!', {
                sessionId: session.id,
                amount: session.amount_total / 100,
                currency: session.currency,
                metadata: session.metadata
            });

            // TODO: Update your database with the donation
            // - Increment boxes counter
            // - Send thank you email
            // - Update progress bar data
            // - Log donation for reporting

            break;

        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            console.log('Payment failed:', failedPayment.id);
            // TODO: Send notification about failed payment
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

// Get session details (for success page)
app.get('/session/:sessionId', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
        res.json({
            status: session.payment_status,
            amount: session.amount_total / 100,
            currency: session.currency,
            metadata: session.metadata
        });
    } catch (error) {
        console.error('Error retrieving session:', error);
        res.status(500).json({ error: 'Failed to retrieve session' });
    }
});

// Get donation statistics (for progress bar)
app.get('/stats', async (req, res) => {
    try {
        // In production, this would query your database
        // For now, return mock data
        res.json({
            totalBoxes: 45,
            goal: 150,
            percentage: 30
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get stats' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend: http://localhost:${PORT}`);
    console.log(`Stripe Mode: ${process.env.STRIPE_SECRET_KEY?.startsWith('sk_test') ? 'TEST' : 'LIVE'}`);
});
