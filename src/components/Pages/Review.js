import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../../assests/1.jpg";
import img2 from "../../assests/2.jpg";
import img3 from "../../assests/3.jpg";

const ReviewPage = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
    location: "",
  });

  const defaultReviews = [
    {
      review:
        "The pizza at this place is absolutely amazing! Perfect crust and fresh toppings made our family dinner unforgettable.",
      name: "Heshan Silva",
      location: "Gampola",
      image: img1,
      rating: 5,
    },
    {
      review:
        "Fast delivery and the pizza was still hot when it arrived. Best pepperoni I’ve ever had!",
      name: "Shihan Senevirathne",
      location: "Matale",
      image: img2,
      rating: 4,
    },
    {
      review:
        "Their wood-fired pizza is to die for! Great service and reasonable prices—definitely coming back!",
      name: "Sneha Wijekoon",
      location: "Kandy",
      image: img3,
      rating: 5,
    },
  ];

  const [reviews, setReviews] = useState(defaultReviews);

  const handleStarClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/reviews",
        newReview
      );
      const savedReview = {
        ...response.data.data,
        review: response.data.data.comment,
        image: img1,
      };
      setReviews([savedReview, ...reviews]);
      setNewReview({ name: "", rating: 0, comment: "", location: "" });
      setShowReviewForm(false);
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(reviews.length, 3),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(reviews.length, 2) },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-16 bg-[#f1f0ea]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 mb-6 text-center">
         <span className = "text-black"> CUSTOMER </span> REVIEWS
        </h2>

        {reviews.length <= 3 ? (
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 sm:p-6 rounded-xl shadow-xl border-l-4 border-orange-600 w-full sm:w-1/3 relative overflow-hidden h-[380px] flex flex-col justify-between"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 opacity-20 rounded-full -mr-12 -mt-12 animate-pulse" />
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-2 object-cover border-4 border-orange-500"
                  loading="lazy"
                />
                <div className="text-center mb-2">{renderStars(review.rating)}</div>
                <p className="text-gray-600 italic text-sm sm:text-base mb-2 line-clamp-4">
                  "{review.review}"
                </p>
                <p className="font-semibold text-orange-600 text-lg sm:text-lg">
                  {review.name}
                </p>
                <p className="text-gray-500 text-sm">{review.location || "Unknown"}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="px-4">
            <Slider {...sliderSettings}>
              {reviews.map((review, index) => (
                <motion.div
  key={index}
  className="bg-white p-6 sm:p-6 rounded-xl shadow-xl border-l-4 border-orange-600 w-full sm:w-1/3 relative overflow-hidden h-[380px] flex flex-col justify-between mb-6" // Added mb-6 for spacing
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: index * 0.2 }}
  whileHover={{ scale: 1.03 }}
>
  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 opacity-20 rounded-full -mr-12 -mt-12 animate-pulse" />
  <img
    src={review.image}
    alt={review.name}
    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-2 object-cover border-4 border-orange-500"
    loading="lazy"
  />
  <div className="text-center mb-2">{renderStars(review.rating)}</div>
  <p className="text-gray-600 italic text-sm sm:text-base mb-2 line-clamp-4">
    "{review.review}"
  </p>
  <p className="font-semibold text-orange-600 text-lg sm:text-lg">
    {review.name}
  </p>
  <p className="text-gray-500 text-sm">{review.location || "Unknown"}</p>
</motion.div>
              ))}
            </Slider>
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Add Review
          </button>
        </div>

        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-2xl font-bold text-orange-600 mb-4">
                Add Your Review
              </h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                  required
                />
                <div>
                  <label className="block text-gray-700 mb-1">Rating:</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleStarClick(star)}
                        className={`cursor-pointer text-2xl ${
                          star <= newReview.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <textarea
                  placeholder="Your Comment"
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                  rows="4"
                  required
                />
                <input
                  type="text"
                  placeholder="Your Location (optional)"
                  value={newReview.location}
                  onChange={(e) =>
                    setNewReview({ ...newReview, location: e.target.value })
                  }
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewPage;
