"use client";
import Image from "next/image";
import Button from "../Ui/Button";
import { motion } from "framer-motion";

export default function FeaturedProduct() {
  return (
    <section className="bg-[#0A0501] mx-auto py-32 h-full relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("/pattern.png")', backgroundSize: '200px' }}></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 to-transparent"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl"></div>

      <div className="container relative mx-auto">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-10"
          >
            <div className="mb-8">
              <h3 className="mb-4 text-lg uppercase tracking-widest bg-gradient-to-br from-amber-600 to-amber-800 bg-clip-text text-transparent">
                Featured
              </h3>
              <h2 className="mb-6 font-['Cormorant_Infant'] text-5xl text-amber-100 md:text-6xl">
                THORNFIELD 18
              </h2>
              <div className="mb-8 h-px w-32 bg-gradient-to-r from-amber-600 to-amber-800"></div>
            </div>

            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-300">
                Our signature 18-year-old expression exemplifies the Thornfield style.
                Matured in a combination of European and American oak casks.
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                Each bottle tells a story of craftsmanship and tradition, delivering an unparalleled tasting experience.
              </p>

              <div className="flex items-center gap-4 mt-8">
                <div className="flex-1 h-px bg-gradient-to-r from-amber-600/30 to-transparent"></div>
                <span className="text-amber-500 font-medium">Awards & Recognition</span>
                <div className="flex-1 h-px bg-gradient-to-l from-amber-600/30 to-transparent"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-amber-600/20 bg-amber-900/5">
                  <h4 className="text-amber-100 font-medium mb-2">Gold Medal</h4>
                  <p className="text-sm text-gray-400">International Spirits Challenge 2023</p>
                </div>
                <div className="p-4 rounded-lg border border-amber-600/20 bg-amber-900/5">
                  <h4 className="text-amber-100 font-medium mb-2">Best in Class</h4>
                  <p className="text-sm text-gray-400">World Whisky Awards 2023</p>
                </div>
              </div>

              <div className="flex flex-col gap-6 mt-8">
                <Button variant="primary" className="w-fit group">
                  <span className="relative z-10">Discover More</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </Button>
                <div className="h-px w-32 bg-gradient-to-r from-amber-600 to-amber-800"></div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden border border-amber-600/30">
                    <Image
                      src="/ceo.jpg"
                      alt="CEO"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg uppercase tracking-widest bg-gradient-to-br from-amber-600 to-amber-800 bg-clip-text text-transparent font-['Cormorant_Infant']">
                      <span className="text-white font-[Arial]">MC GORIILA</span> <br />
                      CEO of the Company
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[2/2] overflow-hidden rounded-2xl group">
              <Image
                src="/aboutus.png"
                alt="Thornfield 18"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-amber-100 text-lg">Experience the legacy of Thornfield 18</p>
              </div>
            </div>

            {/* Decorative frame */}
            <div className="absolute inset-0 rounded-2xl border border-amber-600/10 group-hover:border-amber-400/50 transition-all duration-500"></div>
            
            {/* Floating label */}
            <div className="absolute -top-4 -right-4 bg-amber-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-amber-600/30">
              <span className="text-amber-100 font-medium">Limited Edition</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
