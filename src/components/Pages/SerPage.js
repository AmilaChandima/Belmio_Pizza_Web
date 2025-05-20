import React from "react";
import heroImage from "../../assests/hero-image.png";
import Services from "../Services";


const Ser = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[90vh] flex items-center pt-[64px]"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-5"></div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col justify-center h-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-passion font-extrabold leading-snug tracking-tighter mb-4">
            OUR <span className="text-orange-500">SERVICES</span>
          </h1>

          <p className="text-white text-sm sm:text-base leading-relaxed">
            HOME / SERVICES
          </p>

          {/* Orange underline bar */}
          <div className="absolute bottom-0 left-0 w-40 h-2 bg-orange-500 sm:w-64 md:w-80 lg:w-[400px]"></div>
        </div>


      </section>

      <Services />


    </>

  );
};

export default Ser;
