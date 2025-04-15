"use client";
import { motion } from "framer-motion";
import Button from "../Ui/Button";

export default function Newsletter() {
  return (
    <section className="bg-[#0A0501] py-32 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("/pattern.png")', backgroundSize: '200px' }}></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 to-transparent"></div>

      <div className="container mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-4 text-lg uppercase tracking-widest bg-gradient-to-br from-amber-600 to-amber-800 bg-clip-text text-transparent">
            Stay Connected
          </h3>
          <h2 className="mb-6 font-serif text-5xl font-light text-amber-100">
            Join Our Newsletter
          </h2>
          <div className="mx-auto mb-8 h-px w-32 bg-gradient-to-r from-amber-600 to-amber-800"></div>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300">
            Subscribe for updates on new releases and special offers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row"
        >
          <div className="relative flex-grow group">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full rounded-lg border border-amber-800/30 bg-gradient-to-b from-gray-900 to-gray-950 px-6 py-4 text-amber-100 placeholder-gray-500 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
          </div>
          <Button variant="primary" className="group">
            <span className="relative z-10">Subscribe</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-sm text-gray-500"
        >
          By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
        </motion.div>
      </div>
    </section>
  );
}
