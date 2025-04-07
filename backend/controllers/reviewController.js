import reviewModel from "../models/reviewModel.js"

const createReview = async (req, res) => {
  const { name, rating, comment, location } = req.body;

  try {
    if (!name || !rating || !comment) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, rating, and comment are required" 
      });
    }

    const newReview = new reviewModel({
      name,
      rating,
      comment,
      location
    });

    const savedReview = await newReview.save();
    res.status(201).json({ 
      success: true, 
      data: savedReview 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error creating review", 
      error: error.message 
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      data: reviews 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error fetching reviews", 
      error: error.message 
    });
  }
};

export { createReview, getReviews };