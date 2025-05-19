import React from "react";
import heroVideo from "../assests/intro.mp4";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center pt-[64px] overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-5"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-32 text-left">
        <h2 className="text-4xl font-passion md:text-2xl font-extrabold text-white mb-1 tracking-tight">
          WELCOME TO <span className="text-orange-500">BELMIO</span>
          <span className="text-white"> PIZZA</span>
        </h2>

        <h2 className="text-4xl font-passion text-left md:text-6xl font-extrabold leading-snug mt-2 mb-4 tracking-tighter">
          DISCOVER MORE ABOUT <br />
        </h2>

        <h2 className="text-4xl font-passion md:text-6xl font-extrabold text-white mb-4 tracking-tighter leading-snug">
          OUR <span className="text-orange-500">DELICIOUS</span>
          <span className="text-white"> FOODS</span>
        </h2>

        <p className="mt-10 text-sm pr-96 text-left md:text-base leading-relaxed">
          Belmio Pizza is an authentic Italian pizzeria right here in Colombo, offering authentic thin crust pizzas
        </p>

        <div className="mt-8">
          <Link
            to="/menu"
            className="inline-flex items-center font-passion text-xl font-extrabold text-white rounded-lg"
          >
            MENU <span className="ml-2">→</span>
          </Link>
        </div>
      </div>

      {/* Slider Indicator */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center space-x-4">
        {/* Left Arrow */}
        <button className="p-2 bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 transition">
          <span className="text-lg text-orange-500">←</span>
        </button>

        {/* Current Slide Indicator */}
        <div className="text-center text-white">
          <span className="text-lg font-semibold">01</span>
          <span className="text-sm font-light"> / </span>
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