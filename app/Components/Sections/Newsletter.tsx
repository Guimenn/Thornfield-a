"use client";
import { motion } from "framer-motion";
import Button from "../Ui/Button";

export default function Newsletter() {
  return (
    <section className="bg-[#0A0501] py-32">
      <div className="container mx-auto px-4 text-center">
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
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow rounded-lg border border-amber-800/30 bg-gradient-to-b from-gray-900 to-gray-950 px-6 py-4 text-amber-100 placeholder-gray-500 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
          />
          <Button variant="primary">Subscribe</Button>
        </motion.div>
      </div>
    </section>
  );
}
