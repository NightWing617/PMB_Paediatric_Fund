# Stripe Payment Gateway Setup Guide

## 📋 Overview

This guide will help you set up Stripe as your payment gateway for the PMB Paediatric Fund donation website.

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- A Stripe account (sign up at https://stripe.com)
- Basic command line knowledge

### Installation

1. **Install Dependencies**

   Open your terminal in the project directory and run:

   ```bash
   npm install
   ```

   This will install all required packages:
   - Express (web server)
   - Stripe SDK
   - CORS (cross-origin resource sharing)
   - dotenv (environment variables)

2. **Configure Environment Variables**

   Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and add your Stripe keys (see next section).

### Getting Your Stripe API Keys

1. **Sign up for Stripe**
   - Go to https://stripe.com
   - Create an account (free for testing)
   - Complete your business profile

2. **Get Your API Keys**
   - Log in to your Stripe Dashboard
   - Click "Developers" in the sidebar
   - Click "API keys"
   - You'll see two keys:
     - **Publishable key** (starts with `pk_test_...`)
     - **Secret key** (starts with `sk_test_...`)

3. **Update Your Configuration**

   **In `.env` file:**
   ```env
   STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
   ```

   **In `index.html`:**
   Find this line (around line 7):
   ```html
   <meta name="stripe-publishable-key" content="pk_test_your_actual_key_here">
   ```
   Replace with your actual publishable key.

### Running the Application

1. **Start the Server**

   ```bash
   npm start
   ```

   You should see:
   ```
   Server running on port 3000
   Frontend: http://localhost:3000
   Stripe Mode: TEST
   ```

2. **Open in Browser**

   Navigate to: http://localhost:3000

3. **Test a Payment**

   - Click any donation button
   - You'll be redirected to Stripe Checkout
   - Use a test card number:
     - **Card:** 4242 4242 4242 4242
     - **Expiry:** Any future date (e.g., 12/25)
     - **CVC:** Any 3 digits (e.g., 123)
     - **ZIP:** Any 5 digits (e.g., 12345)

4. **Verify Success**

   - After payment, you'll be redirected to the success page
   - Check your terminal for the payment confirmation log
   - Check Stripe Dashboard → Payments

## 🔧 Advanced Configuration

### Setting Up Webhooks

Webhooks allow Stripe to notify your server about payment events (successful payments, failures, etc.).

#### Local Development (using Stripe CLI)

1. **Install Stripe CLI**

   - Mac: `brew install stripe/stripe-cli/stripe`
   - Windows: Download from https://stripe.com/docs/stripe-cli
   - Linux: Download from https://stripe.com/docs/stripe-cli

2. **Login to Stripe**

   ```bash
   stripe login
   ```

3. **Forward Webhooks to Local Server**

   ```bash
   stripe listen --forward-to localhost:3000/webhook
   ```

   This will output a webhook signing secret like `whsec_...`
   Copy this and add to your `.env` file:

   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

4. **Test Webhook**

   In a new terminal:
   ```bash
   stripe trigger checkout.session.completed
   ```

   Check your server logs to see the webhook event.

#### Production Webhooks

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter your production URL: `https://yourdomain.com/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret
6. Add to your production `.env` file

### Currency Configuration

The current setup uses South African Rand (ZAR). To change:

1. Open `server.js`
2. Find the `currency` field (around line 26):
   ```javascript
   currency: 'zar',
   ```
3. Change to your preferred currency code (e.g., `'usd'`, `'eur'`, `'gbp'`)

### Custom Donation Amounts

To add a custom amount field:

1. Add an input field in `index.html`:
   ```html
   <input type="number" id="custom-amount" min="150" placeholder="Custom amount">
   <button onclick="handleCustomDonation()">Donate Custom Amount</button>
   ```

2. Add handler in `script.js`:
   ```javascript
   function handleCustomDonation() {
       const amount = document.getElementById('custom-amount').value;
       const boxes = Math.floor(amount / 150);
       handleDonation(amount, boxes);
   }
   ```

## 🧪 Testing

### Test Card Numbers

| Scenario | Card Number | Result |
|----------|-------------|--------|
| Successful payment | 4242 4242 4242 4242 | Payment succeeds |
| Declined payment | 4000 0000 0000 0002 | Payment is declined |
| Requires authentication | 4000 0025 0000 3155 | Requires 3D Secure |
| Insufficient funds | 4000 0000 0000 9995 | Declined - insufficient funds |

For all test cards:
- Use any future expiry date
- Use any 3-digit CVC
- Use any 5-digit ZIP code

### Testing Checklist

- [ ] Payment succeeds with test card
- [ ] Success page displays correct donation amount
- [ ] Payment failure shows error message
- [ ] Webhook receives payment confirmation
- [ ] Multiple donation amounts work correctly
- [ ] Mobile view works properly

## 🚀 Going Live

When you're ready to accept real payments:

1. **Complete Stripe Account Setup**
   - Verify your business details
   - Add bank account for payouts
   - Complete compliance requirements

2. **Switch to Live Keys**
   - Get live API keys from Stripe Dashboard
   - Replace test keys in `.env`:
     ```env
     STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
     STRIPE_SECRET_KEY=sk_live_your_live_secret_key
     ```
   - Update publishable key in `index.html`

3. **Configure Live Webhooks**
   - Add production webhook endpoint in Stripe Dashboard
   - Update `STRIPE_WEBHOOK_SECRET` in `.env`

4. **Test with Small Real Payment**
   - Make a small test donation
   - Verify it appears in Stripe Dashboard
   - Verify success page works
   - Check webhook event

5. **Important Security Notes**
   - Never commit `.env` file to git
   - Use HTTPS in production
   - Keep secret keys secure
   - Regularly rotate API keys

## 📊 Monitoring & Analytics

### Stripe Dashboard

Monitor your donations in real-time:
- Go to Stripe Dashboard → Payments
- View successful and failed payments
- Export data for accounting
- Set up email notifications

### Server Logs

The server logs important events:
- Successful payments
- Failed payments
- Webhook events
- Errors

To view logs in production, use a service like:
- PM2 for Node.js process management
- LogRocket or Sentry for error tracking

## 🔒 Security Best Practices

1. **Never expose secret keys**
   - Secret keys must stay on the server
   - Only publishable keys go in frontend code

2. **Validate on the server**
   - Always validate amounts server-side
   - Don't trust client-side data

3. **Use HTTPS in production**
   - Required by Stripe
   - Protects sensitive data

4. **Verify webhook signatures**
   - Already implemented in `server.js`
   - Prevents fraudulent webhook calls

5. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

## 🆘 Troubleshooting

### "Stripe is not defined" Error

- Make sure Stripe.js is loaded: `<script src="https://js.stripe.com/v3/"></script>`
- Check that it loads before your payment component

### Webhook Not Receiving Events

- Verify `STRIPE_WEBHOOK_SECRET` is set in `.env`
- Check webhook URL in Stripe Dashboard
- For local dev, make sure `stripe listen` is running

### "Invalid API Key" Error

- Double-check your API keys in `.env`
- Make sure there are no extra spaces
- Verify you're using the correct environment (test vs live)

### Payment Not Redirecting

- Check browser console for errors
- Verify `handleDonation` function is defined
- Ensure payment component is loaded

### Server Won't Start

- Check if port 3000 is already in use
- Verify all dependencies are installed: `npm install`
- Check for syntax errors in server.js

## 📞 Support

- **Stripe Documentation:** https://stripe.com/docs
- **Stripe Support:** https://support.stripe.com
- **Test Mode Dashboard:** https://dashboard.stripe.com/test

## 📝 Next Steps

1. [ ] Set up email notifications for donations
2. [ ] Add donation tracking database
3. [ ] Create admin dashboard
4. [ ] Set up recurring donations
5. [ ] Add donation receipts/invoices
6. [ ] Integrate with CRM system

## 🎉 You're Ready!

Your Stripe payment gateway is now configured. Start accepting donations to help hospitalized children in Pietermaritzburg!

---

**Need help?** Review the Stripe documentation or contact their support team.
