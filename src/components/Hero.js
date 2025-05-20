import React from "react";
import { motion } from "framer-motion";
import heroVideo from "../assests/intro.mp4";
import { Link } from "react-router-dom";

// Animation variants for individual letters
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Increased delay to 100ms per letter for slower stagger
      duration: 0.5, // Increased duration to 0.5s for smoother, slower animation
    },
  }),
};

// Animation variants for the container (to trigger children animations)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Match the letter delay for consistency
    },
  },
};

const Hero = () => {
  // Function to split text into letters and wrap each in motion.span
  const animateText = (text) => {
    return text.split("").map((char, index) => (
      <motion.span
        key={`${char}-${index}`}
        custom={index}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char} {/* Preserve spaces */}
      </motion.span>
    ));
  };

  return (
    <section className="relative h-screen flex items-center pt-[64px] overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-5"></div>

      {/* Content */}

      <div className="relative z-10 text-white px-6 sm:px-12 md:px-20 lg:px-32 max-w-7xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-passion font-extrabold mb-1 tracking-tight">
          WELCOME TO <span className="text-orange-500">BELMIO</span>
          <span className="text-white"> PIZZA</span>
        </h2>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-passion font-extrabold leading-snug mt-2 mb-4 tracking-tighter">
          DISCOVER MORE ABOUT <br />
        </h2>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-passion font-extrabold text-white mb-4 tracking-tighter leading-snug">
          OUR <span className="text-orange-500">DELICIOUS</span>
          <span className="text-white"> FOODS</span>
        </h2>

        <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed">
          Belmio Pizza is an authentic Italian pizzeria right here in Colombo, offering authentic thin crust pizzas
        </p>

      <div className="relative z-10 text-white px-32 text-left">
        <motion.h2
          className="text-4xl font-passion md:text-2xl font-extrabold text-white mb-1 tracking-tight"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {animateText("WELCOME TO ")}
          <span className="text-orange-500">{animateText("BELMIO")}</span>
          <span className="text-white">{animateText(" PIZZA")}</span>
        </motion.h2>

        <motion.h2
          className="text-4xl font-passion text-left md:text-6xl font-extrabold leading-snug mt-2 mb-4 tracking-tighter"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {animateText("DISCOVER MORE ABOUT ")}
          <br />
        </motion.h2>

        <motion.h2
          className="text-4xl font-passion md:text-6xl font-extrabold text-white mb-4 tracking-tighter leading-snug"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {animateText("OUR ")}
          <span className="text-orange-500">{animateText("DELICIOUS")}</span>
          <span className="text-white">{animateText(" FOODS")}</span>
        </motion.h2>

        <motion.p
          className="mt-10 text-sm pr-96 text-left md:text-base leading-relaxed"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {animateText(
            "Belmio Pizza is an authentic Italian pizzeria right here in Colombo, offering authentic thin crust pizzas"
          )}
        </motion.p>


        <div className="mt-8">
          <Link
            to="/menu"
            className="inline-flex items-center font-passion text-lg sm:text-xl font-extrabold text-white rounded-lg hover:text-orange-500 transition"
          >
            MENU <span className="ml-2">→</span>
          </Link>
        </div>
      </div>

      {/* Slider Indicator */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center space-x-4">
        {/* Left Arrow */}
        <button className="p-2 bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 transition">
          <span className="text-lg text-orange-500">←</span>
        </button>

        {/* Current Slide Indicator */}
        <div className="text-center text-white select-none">
          <span className="text-lg font-semibold">01</span>
          <span className="text-sm font-light mx-1"> / </span>
          <span className="text-lg font-semibold">05</span>
        </div>

        {/* Right Arrow */}
        <button className="p-2 bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 transition">
          <span className="text-lg text-orange-500">→</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
