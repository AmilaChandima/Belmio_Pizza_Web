import React from "react";
import { motion } from "framer-motion";
import storyImage from "../assests/story-image.jpg";
import { Link } from "react-router-dom";

function StorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left Column */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Heading */}
          <motion.h2
            className="text-3xl sm:text-4xl font-passion font-extrabold text-gray-800 mb-6 sm:mb-10 leading-tight text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            DISCOVER OUR <span className="text-orange-500">STORY</span>
          </motion.h2>

          {/* Image */}
          <motion.img
            src={storyImage}
            alt="Belmio Pizza Shop"
            className="rounded shadow-lg w-full max-w-full"
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.03, rotate: 2, transition: { duration: 0.3 } }}
          />
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col justify-start"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Paragraph 1 */}
          <motion.p
            className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Belmio Pizza, founded in 2016, is a vibrant and beloved pizza restaurant nestled in the heart of Thalawathugoda. Known for its authentic flavors and fresh ingredients, Belmio Pizza has become a go-to destination for pizza lovers seeking a blend of tradition and innovation.
          </motion.p>

          {/* Paragraph 2 */}
          <motion.p
            className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Belmio Pizza is now expanding its reach by embracing technology to enhance customer convenience and engagement. With plans to launch its first e-commerce platform, the restaurant aims to make online ordering and promotions more accessible.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                SINCE <span className="text-blue-600">2015</span>
              </h3>
              <p className="text-gray-600">
                Serving quality, tradition, and unforgettable flavors with every slice.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                10K+ <span className="text-blue-600">CLIENTS</span>
              </h3>
              <p className="text-gray-600">
                Trusted by over 10,000 happy clients who love our delicious pizzas.
              </p>
            </div>
          </motion.div>

          {/* Button */}
          <motion.div
            className="mt-2 self-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}>
              <Link
                to="/aboutUs"
                className="px-6 py-3 bg-orange-500 text-white text-base sm:text-lg font-semibold rounded hover:bg-orange-600 transition"
              >
                LEARN MORE
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default StorySection;
