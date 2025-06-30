
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";

const images = [
"https://wallpaperaccess.com/full/2484021.jpg",
  "https://www.westend61.de/images/0001306783pw/stylish-man-shopping-in-a-clothes-store-AHSF01642.jpg",
  "https://static.vecteezy.com/system/resources/previews/027/214/755/non_2x/young-man-with-curly-hair-shopping-carrying-bags-on-neutral-background-new-collection-or-sales-mockup-free-photo.jpg",
];

const Herosection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-144px)] overflow-hidden bg-gray-900 flex  items-center justify-center">
      <img
       key={currentIndex}
        src={images[currentIndex]}
        alt="E-commerce Clothing Store"
        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-1000"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/1920x800/222222/cccccc?text=null";
        }}
      />
      <div className="relative z-10 text-center text-white p-4 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
          Discover Your Style
        </h1>
        <p className="text-base font-bold md:text-xl lg:text-2xl mb-8 text-white drop-shadow-md">
          <ReactTyped
        strings={["Shop The Latest Trends", "Mens", "Womens",]}
        typeSpeed={70}
        backSpeed={70}
        loop
      />
        </p>
        <Link
          to="/shop"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-sm md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Herosection;
