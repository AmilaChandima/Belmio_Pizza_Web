import React from "react";
import { motion } from "framer-motion";
import heroImage from "../../assests/AboutUs.png";
import storyImage from "../../assests/oven.jpg";
import CheffImage from "../../assests/cheff-image.png";
import outlet from "../../assests/story-image.jpg";
import outlet2 from "../../assests/branch2.jpg";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
  viewport: { once: true, amount: 0.2 },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92, rotate: -2 },
  whileInView: { opacity: 1, scale: 1, rotate: 0 },
  transition: { duration: 0.7, delay },
  viewport: { once: true, amount: 0.2 },
});

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero */}
      <section
        className="relative bg-cover bg-center min-h-[60vh] md:h-[75vh] flex items-center pt-[64px]"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-label="About Us hero"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            {...fadeUp(0)}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              ABOUT <span className="text-orange-500">US</span>
            </h1>
            <p className="mt-3 text-white/90 text-sm md:text-base">HOME / ABOUT US</p>
            <motion.div
              className="mt-6 h-1 w-28 bg-orange-500 rounded"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>
        </div>
      </section>

      {/* Story (styled like your sample) */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row gap-8">
          {/* Left with animated heading + image */}
          <motion.div className="lg:w-1/2 mr-0 lg:mr-4" {...scaleIn(0.15)}>
            <motion.h2
              className="text-4xl font-passion md:text-4xl font-extrabold text-gray-800 mb-8"
              {...fadeUp(0.05)}
            >
              DISCOVER OUR <span className="text-orange-500">STORY</span>
            </motion.h2>

            <motion.img
              src={storyImage}
              alt="Belmio Pizza oven"
              className="rounded-xl shadow-lg w-full object-cover"
              initial={{ opacity: 0, scale: 0.88, rotate: 3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.03, rotate: 1, transition: { duration: 0.25 } }}
              loading="lazy"
            />
          </motion.div>

          {/* Right with staggered paragraphs + stats */}
          <motion.div className="lg:w-1/2 flex flex-col justify-start lg:ml-5" {...fadeUp(0.1)}>
            <motion.p
              className="text-gray-600 leading-relaxed mb-6 text-justify"
              {...fadeUp(0.25)}
            >
              Belmio Pizza, founded in 2016, is a vibrant and beloved pizza restaurant nestled in
              the heart of Thalawathugoda. Known for authentic flavors and fresh ingredients, we’ve
              become a go-to destination for pizza lovers seeking a blend of tradition and
              innovation—crafting memorable dining experiences for families and friends.
            </motion.p>

            <motion.p
              className="text-gray-600 leading-relaxed mb-8 text-justify"
              {...fadeUp(0.35)}
            >
              We’re expanding our reach by embracing technology—launching our first e-commerce
              platform to make online ordering and promotions more accessible to our growing
              community.
            </motion.p>

            <motion.div
              className="flex gap-8 mb-4 md:mb-8 justify-start"
              {...fadeUp(0.45)}
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  SINCE <span className="text-blue-600">2016</span>
                </h3>
                <p className="text-gray-600">
                  Quality, tradition, and unforgettable flavors with every slice
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  10K+ <span className="text-blue-600">CLIENTS</span>
                </h3>
                <p className="text-gray-600">Trusted by thousands of happy customers</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Chef */}
      <section className="py-12">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div {...fadeUp(0.1)}>
            <h2 className="text-3xl md:text-4xl font-bold">
              OUR <span className="text-orange-500">CHEF</span>
            </h2>
            <p className="mt-6 text-gray-600 leading-7 text-justify">
              Quam ultrices bibendum accumsan morbi risus iaculis tellus tellus molestie. Auctor eu
              auctor aliquam porttitor scelerisque massa volutpat elit, urna. Eget quis porta
              euismod diam justo, tempor vehicula. Egestas turpis vel non diam nunc amet, a risus
              diam. Ultrices ac blandit sem nec nulla nisi habitasse.
            </p>
          </motion.div>

          <motion.div {...scaleIn(0.2)}>
            <motion.img
              src={CheffImage}
              alt="Head chef at Belmio"
              className="w-full rounded-xl shadow-lg object-cover"
              whileHover={{ scale: 1.03, transition: { duration: 0.25 } }}
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Outlets */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-black mb-8" {...fadeUp(0)}>
            OUR <span className="text-orange-500">OUTLETS</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Outlet 1 */}
            <motion.a
              href="https://www.google.com/maps/place/Belmio+Pizza/@6.8938806,79.8670833,14z/data=!4m10!1m2!2m1!1sbelmio+pizza!3m6!1s0x3ae25b1aedf162ab:0x2dc3df881740df18!8m2!3d6.8938806!4d79.9051921!15sCgxiZWxtaW8gcGl6emFaDiIMYmVsbWlvIHBpenphkgESaXRhbGlhbl9yZXN0YXVyYW504AEA!16s%2Fg%2F11n0blz_69?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Google Maps for Athulkotte outlet"
              className="group relative block rounded-xl overflow-hidden shadow-lg"
              {...scaleIn(0.05)}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <img
                src={outlet}
                alt="Athulkotte outlet exterior"
                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-xl md:text-2xl font-bold">123/AB, ATHULKOTTE, COLOMBO</p>
                <p className="mt-1 md:mt-2 text-lg md:text-2xl font-semibold">
                  CALL NOW – <span className="text-orange-500 font-bold">077 123 4567</span>
                </p>
              </div>
            </motion.a>

            {/* Outlet 2 */}
            <motion.a
              href="https://www.google.com/maps/place/Belmio+Pizza/@6.8938806,79.8670833,14z/data=!4m10!1m2!2m1!1sbelmio+pizza!3m6!1s0x3ae25097735c61dd:0xf9ad240bf76af948!8m2!3d6.8755645!4d79.9319902!15sCgxiZWxtaW8gcGl6emFaDiIMYmVsbWlvIHBpenphkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F11c48n48ht?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Google Maps for Thalawathogoda outlet"
              className="group relative block rounded-xl overflow-hidden shadow-lg"
              {...scaleIn(0.1)}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <img
                src={outlet2}
                alt="Thalawathogoda outlet exterior"
                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-xl md:text-2xl font-bold">456/CD, THALAWATHOGODA, COLOMBO</p>
                <p className="mt-1 md:mt-2 text-lg md:text-2xl font-semibold">
                  CALL NOW – <span className="text-orange-500 font-bold">077 123 4567</span>
                </p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.h2 className="text-3xl md:text-4xl font-bold" {...fadeUp(0)}>
            <span className="text-gray-400">REVIEW</span> <br />
            <span className="text-black">
              GET IN <span className="text-orange-500">TOUCH</span>
            </span>
          </motion.h2>

          <motion.form className="mt-8 space-y-6" aria-label="Contact form" {...fadeUp(0.1)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div {...fadeUp(0.15)}>
                <label className="block text-sm font-semibold" htmlFor="name">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Amila Chandima"
                  autoComplete="name"
                  required
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </motion.div>
              <motion.div {...fadeUp(0.2)}>
                <label className="block text-sm font-semibold" htmlFor="email">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="amilachandima@gmail.com"
                  autoComplete="email"
                  required
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </motion.div>
              <motion.div {...fadeUp(0.25)}>
                <label className="block text-sm font-semibold" htmlFor="subject">
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter your subject"
                  required
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </motion.div>
            </div>

            <motion.div {...fadeUp(0.3)}>
              <label className="block text-sm font-semibold" htmlFor="message">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message here..."
                rows="5"
                required
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full md:w-auto bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 active:scale-[0.99] transition"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              SUBMIT
            </motion.button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
