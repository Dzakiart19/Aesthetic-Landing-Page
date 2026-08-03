import React from 'react';
import { motion } from 'framer-motion';

// Using the provided alias to load images
import still1Url from "@assets/generated_images/still1.jpg";
import still2Url from "@assets/generated_images/still2.jpg";
import still3Url from "@assets/generated_images/still3.jpg";

export function GallerySection() {
  const images = [
    { src: still2Url, alt: "Silhouette in light", className: "col-span-1 md:col-span-2 row-span-2" },
    { src: still1Url, alt: "Film reel reflection", className: "col-span-1 row-span-1" },
    { src: still3Url, alt: "Director chair", className: "col-span-1 row-span-1" },
  ];

  return (
    <section className="relative w-full py-24 px-4 sm:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
           <h2 className="text-3xl font-serif text-white mb-4">Selected Frames</h2>
           <div className="w-24 h-px bg-primary/50" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className={`relative overflow-hidden group ${img.className}`}
            >
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
              <img 
                src={img.src} 
                alt={img.alt}
                className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
