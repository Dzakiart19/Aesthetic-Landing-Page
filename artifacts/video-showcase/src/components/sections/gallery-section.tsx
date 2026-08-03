import React from 'react';
import { motion } from 'framer-motion';

// Using the provided alias to load images
import still1Url from "@assets/images/still1.jpg";
import still2Url from "@assets/images/still2.jpg";
import still3Url from "@assets/images/still3.jpg";

export function GallerySection() {
  const images = [
    { src: still2Url, alt: "Raw concert energy", className: "col-span-1 md:col-span-2 row-span-2" },
    { src: still1Url, alt: "Street culture action", className: "col-span-1 row-span-1" },
    { src: still3Url, alt: "Adrenaline rush", className: "col-span-1 row-span-1" },
  ];

  return (
    <section className="relative w-full py-24 px-4 sm:px-8 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6"
        >
           <div>
             <h2 className="text-6xl md:text-8xl font-display text-white mb-2 leading-none">FIRE FRAMES</h2>
             <div className="w-full h-2 bg-gradient-to-r from-primary to-accent" />
           </div>
           <p className="font-sans font-bold text-primary tracking-widest uppercase">Select Cuts Only</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 auto-rows-[250px] md:auto-rows-[400px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className={`relative overflow-hidden group bg-black ${img.className}`}
            >
              {/* Intense red overlay on hover */}
              <div className="absolute inset-0 bg-primary/40 mix-blend-color-burn opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
              
              <img 
                src={img.src} 
                alt={img.alt}
                className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-110 transition-all duration-500 ease-out"
              />
              
              {/* Decorative target reticle */}
              <div className="absolute top-4 right-4 w-8 h-8 border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none flex items-center justify-center">
                <div className="w-1 h-1 bg-primary rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
