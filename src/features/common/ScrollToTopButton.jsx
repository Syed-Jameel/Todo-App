import React, { useState, useEffect } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show/hide the button based on the user's scroll position
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add event listener to track scrolling
    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds a smooth scrolling effect
    });
  };

  return (
    <button className={`${isVisible ? "block" : "hidden"} shadow-lg fixed z-50 bottom-10 right-5 p-2 rounded-full  bg-[#051937] hover:bg-gray-700 hover:text-white text-gray-100`} onClick={scrollToTop} title="Scroll to Top">
      <ArrowUpIcon className="h-4 w-4 font-bold" />
    </button>
  );
};

export default ScrollToTopButton;
