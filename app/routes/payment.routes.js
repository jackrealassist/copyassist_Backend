const controller = require("../controllers/homeCompare.controller");

module.exports = function(app) {

  const stripe = require("stripe")(process.env.STRIPE_SECRET);
  app.post("/api/create-checkout-session", async (req, res) => {
    
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1Ns7TaSCJGV158O3WTQRPfZE", 
          //price: "price_1NpushSCJGV158O3sORrSYPe", subscription
          quantity: 1,
        },
      ],
      mode: "payment",
      //mode: "subscription",
      // success_url: `http://realestate-three-lyart.vercel.app/success?transaction_id=${generateTransactionID()}`,
       success_url: `http://20.193.155.12:81/success?transaction_id=${generateTransactionID()}`,
      //success_url: `http://localhost:3000/success?transaction_id=${generateTransactionID()}`,

      // cancel_url: `http://realestate-three-lyart.vercel.app/cancel`,
       cancel_url: `http://20.193.155.12:81/cancel`,
      
      //cancel_url: `http://localhost:3000/cancel`,
    });
  
    res.redirect(303, session.url);

  });
};

// Function to generate a unique transaction ID
function generateTransactionID() {
  // Generate a unique ID here, you can use libraries like `uuid` or create your own logic.
  // For example, using the uuid library:
  const { v4: uuidv4 } = require("uuid");
  return uuidv4();
}
