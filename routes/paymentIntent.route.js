const { Router } = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PIRouter = Router();

// Create Intent for Payment:
PIRouter.post("/v1/create_intent", async (req, res) => {
  try {
    // Extract necessary details from the request body
    const { amount, currency = "inr", description } = req.body;

    // Create a Payment Intent without attaching a payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      payment_method: 'pm_card_visa',
    });

    // Payment Intent status: requires_payment_method -> The customer’s payment failed on your checkout page

    // Respond with the client secret needed on the client side to confirm the Payment Intent later
    res.status(200).json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentID: paymentIntent
     });
  } catch (error) {
    console.error(error);

    // If an error occurs, respond with a 500 status and an error message
    res.status(500).json({ error: "An error occurred while creating the payment intent." });
  }
});


// Capture Created Intent:
PIRouter.post("/v1/capture_intent/:id", async (req, res) => {
  try {
    // Extract the Payment Intent ID from the request parameters
    const { id } = req.params; // Payment ID from params

    // Capture the payment intent using the provided ID
    const capturedIntent = await stripe.paymentIntents.capture(id);

    // Respond with the captured Payment Intent details
    res.status(200).json(capturedIntent);
  } catch (error) {
    console.error(error);

    // If an error occurs during the capture process, respond with a 500 status and an error message
    res
      .status(500)
      .json({ error: "An error occurred while capturing the payment intent." });
  }
});


// Create Refund for Intent:
PIRouter.post("/v1/create_refund/:id", async (req, res) => {
  try {
    // Extract the Payment Intent ID from the request parameters
    const { id } = req.params; // Payment ID from params

    // Extract refund details from the request body
    const { amount, reason } = req.body;

    // Create a refund for the specified Payment Intent
    const refund = await stripe.refunds.create({
      payment_intent: id, // Payment intent ID
      amount,
      reason,
    });

    // Respond with the details of the created refund
    res.status(200).json(refund);
  } catch (error) {
    console.error(error);

    // If an error occurs during the refund process, respond with a 500 status and an error message
    res.status(500).json({ error: "An error occurred during refund." });
  }
});


// Get List of All Intents:
PIRouter.get("/v1/get_intents", async (req, res) => {
  try {
    // Retrieve a list of all Payment Intents using the Stripe API
    const intents = await stripe.paymentIntents.list();

    // Respond with the list of Payment Intents
    res.status(200).json(intents);
  } catch (error) {
    console.error(error);

    // If an error occurs during the retrieval process, respond with a 500 status and an error message
    res
      .status(500)
      .json({ error: "An error occurred while fetching payment intents." });
  }
});

module.exports = PIRouter;
