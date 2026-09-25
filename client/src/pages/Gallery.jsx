
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { api } from "../lib/api.js";

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
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] =
    useState(null);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const data = await api.get("/gallery");
        setGallery(data);
      } catch (error) {
        console.error(
          "Gallery load error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const openImage = (index) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((current) =>
      current === gallery.length - 1
        ? 0
        : current + 1
    );
  };

  const previousImage = () => {
    setSelectedImage((current) =>
      current === 0
        ? gallery.length - 1
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

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

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
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
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
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader />
            </div>
          ) : gallery.length === 0 ? (
            <EmptyState
              title="এখনও কোনো ছবি যোগ করা হয়নি"
              description="শীঘ্রই আমাদের গ্যালারিতে ছবি যোগ করা হবে।"
            />
          ) : (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                amount: 0.05,
              }}
              className="
                columns-1
                gap-4
                sm:columns-2
                lg:columns-3
              "
            >
              {gallery.map(
                (item, index) => (
                  <motion.button
                    key={item._id}
                    variants={itemVariants}
                    type="button"
                    onClick={() =>
                      openImage(index)
                    }
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
                      src={item.image}
                      alt={
                        item.title ||
                        `মসজিদ ও মাদ্রাসার ছবি ${
                          index + 1
                        }`
                      }
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
                )
              )}
            </motion.div>
          )}
        </div>
      </section>

    
      <AnimatePresence>
        {selectedImage !== null &&
          gallery[selectedImage] && (
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
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
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
                src={
                  gallery[selectedImage].image
                }
                alt={
                  gallery[selectedImage].title ||
                  `মসজিদ ও মাদ্রাসার ছবি ${
                    selectedImage + 1
                  }`
                }
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
                {selectedImage + 1} /{" "}
                {gallery.length}
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </main>
  );
}

