import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import g1 from "../assets/g1.png";
import g2 from "../assets/g2.JPG";
import g3 from "../assets/g3.JPG";
import g4 from "../assets/g4.JPG";
import g5 from "../assets/g5.JPG";
import g6 from "../assets/g6.JPG";
import g7 from "../assets/g7.JPG";
import g8 from "../assets/g8.JPG";
import g9 from "../assets/g9.JPG";
import g10 from "../assets/g10.JPG";
import g11 from "../assets/g11.JPG";
import g12 from "../assets/g12.JPG";
import g13 from "../assets/g13.JPG";
import g14 from "../assets/g14.JPG";
import g15 from "../assets/g15.JPG";
import g16 from "../assets/g16.JPG";
import g17 from "../assets/g17.JPG";
import g18 from "../assets/g18.JPG";

const galleryImages = [
  g1,
  g2,
  g3,
  g4,
  g5,
  g6,
  g7,
  g8,
  g9,
  g10,
  g11,
  g12,
  g13,
  g14,
  g15,
  g16,
  g17,
  g18,
];

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const openImage = (index) => {
    setSelectedImage(index);
  };
  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((current) =>
      current === galleryImages.length - 1
        ? 0
        : current + 1
    );
  };

  const previousImage = () => {
    setSelectedImage((current) =>
      current === 0
        ? galleryImages.length - 1
        : current - 1
    );
  };

  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeImage();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="px-4 pb-10 pt-14 sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
           

            <h1 className="text-3xl font-bold text-indigo-950 sm:text-4xl">
              আমাদের মসজিদ ও মাদ্রাসা
            </h1>

            <div className="mt-4 h-1 w-12 rounded-full bg-amber-400" />
          </motion.div>

        </div>
      </section>
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.05,
          }}
          className="
            mx-auto
            max-w-7xl
            columns-1
            gap-4
            sm:columns-2
            lg:columns-3
          "
        >
          {galleryImages.map((image, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              type="button"
              onClick={() => openImage(index)}
              className="
                group
                relative
                mb-4
                block
                w-full
                overflow-hidden
                rounded-2xl
                bg-slate-200
                text-left
                shadow-sm
                focus:outline-none
                focus:ring-2
                focus:ring-amber-400
              "
            >
              
              <img
                src={image}
                alt={`মসজিদ ও মাদ্রাসার ছবি ${index + 1}`}
                loading="lazy"
                className="
                  block
                  h-auto
                  w-full
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              
              <div
                className="
                  absolute
                  inset-0
                  bg-indigo-950/0
                  transition-colors
                  duration-300
                  group-hover:bg-indigo-950/20
                "
              />

              
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-2xl
                  ring-1
                  ring-inset
                  ring-white/10
                "
              />
            </motion.button>
          ))}
        </motion.div>
      </section>

      
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/90
              p-4
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
          >

           
            <button
              type="button"
              onClick={closeImage}
              aria-label="ছবি বন্ধ করুন"
              className="
                absolute
                right-4
                top-4
                z-20
                grid
                size-11
                place-items-center
                rounded-full
                bg-white/10
                text-xl
                text-white
                backdrop-blur-md
                transition
                hover:bg-white/20
                sm:right-6
                sm:top-6
              "
            >
              <FaTimes />
            </button>

            
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              aria-label="আগের ছবি"
              className="
                absolute
                left-3
                z-20
                grid
                size-11
                place-items-center
                rounded-full
                bg-white/10
                text-white
                backdrop-blur-md
                transition
                hover:bg-white/20
                sm:left-6
                sm:size-12
              "
            >
              <FaChevronLeft />
            </button>

            
            <motion.img
              key={selectedImage}
              src={galleryImages[selectedImage]}
              alt={`মসজিদ ও মাদ্রাসার ছবি ${
                selectedImage + 1
              }`}
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                max-h-[85vh]
                max-w-[85vw]
                rounded-xl
                object-contain
                shadow-2xl
              "
            />

           
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              aria-label="পরের ছবি"
              className="
                absolute
                right-3
                z-20
                grid
                size-11
                place-items-center
                rounded-full
                bg-white/10
                text-white
                backdrop-blur-md
                transition
                hover:bg-white/20
                sm:right-6
                sm:size-12
              "
            >
              <FaChevronRight />
            </button>

            
            <div
              className="
                absolute
                bottom-5
                left-1/2
                -translate-x-1/2
                rounded-full
                bg-white/10
                px-4
                py-2
                text-sm
                text-white
                backdrop-blur-md
              "
            >
              {selectedImage + 1} / {galleryImages.length}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}