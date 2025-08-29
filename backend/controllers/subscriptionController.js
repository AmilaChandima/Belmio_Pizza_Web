import subscriptionModel from "../models/subscriptionModel.js";

// Create subscription
const createSubscription = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    if (!name || !email || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newSubscription = new subscriptionModel({ name, email, phone, address });
    const savedSubscription = await newSubscription.save();

    res.status(201).json({
      success: true,
      data: savedSubscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating subscription",
      error: error.message,
    });
  }
};

// Get all subscriptions
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching subscriptions",
      error: error.message,
    });
  }
};

// Delete a subscription
const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await subscriptionModel.findByIdAndDelete(id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
      data: subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting subscription",
      error: error.message,
    });
  }
};

export { createSubscription, getSubscriptions, deleteSubscription };
