# 🚀 Quick Start Guide - Stripe Payment Setup

## Step 1: Get Your Stripe Keys

1. Go to https://stripe.com and sign up
2. Navigate to **Developers → API Keys**
3. Copy your keys:
   - **Publishable Key** (starts with `pk_test_`)
   - **Secret Key** (starts with `sk_test_`)

## Step 2: Configure Your Environment

Create a `.env` file in your project root:

```bash
cp .env.example .env
```

Edit `.env` and add your keys:
```env
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
PORT=3000
NODE_ENV=development
```

## Step 3: Update index.html

Open `index.html` and find line 7, replace with your publishable key:
```html
<meta name="stripe-publishable-key" content="pk_test_YOUR_KEY_HERE">
```

## Step 4: Start the Server

```bash
npm start
```

You should see:
```
Server running on port 3000
Frontend: http://localhost:3000
Stripe Mode: TEST
```

## Step 5: Test a Payment

1. Open http://localhost:3000
2. Click any donation button
3. Use test card: **4242 4242 4242 4242**
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)
   - ZIP: Any 5 digits (e.g., 12345)
4. Complete payment
5. You should see the success page! 🎉

## Optional: Set Up Webhooks (Local Testing)

Install Stripe CLI:
```bash
brew install stripe/stripe-cli/stripe
```

Login and forward webhooks:
```bash
stripe login
stripe listen --forward-to localhost:3000/webhook
```

Copy the webhook secret and add to `.env`:
```env
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## 📚 Need More Help?

- Full documentation: `README_STRIPE_SETUP.md`
- Implementation details: See artifacts
- Stripe docs: https://stripe.com/docs

## ⚠️ Before Going Live

1. Complete Stripe account verification
2. Replace test keys with live keys (starts with `pk_live_` and `sk_live_`)
3. Set up production webhook in Stripe Dashboard
4. Enable HTTPS on your server
5. Test with a small real payment first

## 🎯 You're Ready!

Your Stripe payment gateway is configured. Happy fundraising! 🌟
