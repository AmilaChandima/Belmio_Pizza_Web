import reviewModel from "../models/reviewModel.js";

const createReview = async (req, res) => {
  const { name, email, profileImage, rating, comment, location } = req.body;

  try {
    if (!name || !email || !profileImage || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Name, email, profile image, rating, and comment are required",
      });
    }

    const newReview = new reviewModel({
      name,
      email,
      profileImage,
      rating,
      comment,
      location,
    });

    const savedReview = await newReview.save();
    res.status(201).json({
      success: true,
      data: savedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    let reviews = await reviewModel.find().sort({ createdAt: -1 });

    // If no reviews exist, return empty array instead of test data
    // Frontend will handle the empty state
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

export { createReview, getReviews };