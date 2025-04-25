"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from 'next/link';
import Button from "../Ui/Button";

export default function VideoSection() {
  return (
    <section className="relative bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-[80vh] w-full object-cover"
      >
        <source src="/fotos-menu/video/tour_3.mp4" type="video/mp4" />
        <Image
          src="/whisky-bg.jpg"
          alt="Thornfield Estate"
          fill
          className="object-cover"
        />
      </video>
      <div className="absolute inset-0 bg-gray-950/60"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="mb-6 font-serif text-5xl font-light text-amber-100 md:text-7xl">
            Nossa Tradição Ancestral
          </h2>
          <div className="mx-auto mb-8 h-px w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300">
            Conheça os segredos e processos artesanais que tornam nosso whisky verdadeiramente excepcional.
          </p>
          <Link  href="/pages/about"><Button variant="primary">Conheça Nossa História</Button></Link>
        </motion.div>
      </div>
    </section>
  );
}
