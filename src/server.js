const app = require("express")();
const stripe = require("stripe")("sk_test_A7SQV0st2Qhl0ipO9NjO2Zil");

app.use(require("body-parser").text());

// Should pull this in from question, but cant even get these custom variables to run
var messageCount = 6 * 0.25;
var minuteCount = 40.32 * 0.50;

app.post("/charge-message", async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 12345,
      currency: "usd",
      description: "Message chat with John Cena - 6 messages charged.",
      source: req.body,
      metadata: {order_id: 1234},
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});

app.post("/charge-call", async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 666,
      currency: "usd",
      description: "Video chat with Donnie Darko - Duration 1 hour 34 minutes.",
      source: req.body,
      metadata: {order_id: 666},
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});

stripe.charges.retrieve(
  'ch_1EA8r5FZW9pBNLO2VIC3tZub',
  function(err, charge) {
    // asynchronously called
  }
);

app.listen(9000, () => console.log("Listening on port 9000"));