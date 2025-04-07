// components/ReviewPage.js
import { useState } from 'react';
import { motion } from 'framer-motion';

// You'll need to import your images or use placeholders

import img1 from '../../assests/1.jpg'; // Adjust path as needed
import img2 from '../../assests/2.jpg';
import img3 from '../../assests/3.jpg';

const ReviewPage = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    comment: ''
  });

  const reviews = [
    {
      review: 'The pizza at this place is absolutely amazing! Perfect crust and fresh toppings made our family dinner unforgettable.',
      name: 'Heshan Silva',
      location: 'Gampola',
      image: img1,
      rating: 5
    },
    {
      review: 'Fast delivery and the pizza was still hot when it arrived. Best pepperoni I’ve ever had!',
      name: 'Shihan Senevirathne',
      location: 'Matale',
      image: img2,
      rating: 4
    },
    {
      review: 'Their wood-fired pizza is to die for! Great service and reasonable prices—definitely coming back!',
      name: 'Sneha Wijekoon',
      location: 'Kandy',
      image: img3,
      rating: 5
    },
  ];

  const handleStarClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <section className="py-16 bg-[#F9F5E0]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#8B4513] mb-6 text-center">Guest Reviews</h2>
        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border-l-4 border-[#8B4513] w-full sm:w-1/3 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F5DC] opacity-20 rounded-full -mr-16 -mt-16 animate-pulse" />
              <img
                src={review.image}
                alt={review.name}
                className="w-24 sm:w-32 h-24 sm:h-32 rounded-full mx-auto mb-2 object-cover border-4 border-[#2F4F4F]"
                loading="lazy"
              />
              <div className="text-center mb-4">{renderStars(review.rating)}</div>
              <p className="text-gray-600 italic text-base sm:text-lg mb-4">"{review.review}"</p>
              <p className="font-semibold text-[#8B4513] text-lg sm:text-xl">{review.name}</p>
              <p className="text-gray-600">{review.location}</p>
            </motion.div>
          ))}
        </div>

        {/* Add Review Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-[#8B4513] text-white px-6 py-3 rounded-lg hover:bg-[#6B3510] transition-colors"
          >
            Add Review
          </button>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-2xl font-bold text-[#8B4513] mb-4">Add Your Review</h3>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Rating:</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleStarClick(star)}
                        className={`cursor-pointer text-2xl ${
                          star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <textarea
                    placeholder="Your Comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                    rows="4"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowReviewForm(false)} // Temporary close, we'll add submission later
                    className="px-4 py-2 bg-[#8B4513] text-white rounded hover:bg-[#6B3510] transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewPage;