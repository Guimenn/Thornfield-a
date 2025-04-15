"use client";
import { useState, useEffect } from "react";
import AgeGate from "./Components/VerificarIdade/page";
import Loading from "./Components/Ui/Loading/Loading";
import Hero from "./Components/Sections/Hero";
import HeroSection from "./Components/Sections/HeroSection";
import ProductionProcess from "./Components/Sections/ProductionProcess";
import Ingredients from "./Components/Sections/Ingredients";
import Heritage from "./Components/Sections/Heritage";
import Awards from "./Components/Sections/Awards";
import TastingExperience from "./Components/Sections/TastingExperience";
import FeaturedProduct from "./Components/Sections/FeaturedProduct";
import Collection from "./Components/Sections/Collection";
import VideoSection from "./Components/Sections/VideoSection";
import Experience from "./Components/Sections/Experience";
import Newsletter from "./Components/Sections/Newsletter";

export default function Home() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ageVerifiedStorage = localStorage.getItem("ageVerified") === "true";
      setIsAgeVerified(ageVerifiedStorage);
      setLoading(false);
    }, 1000);

    const handleAgeVerified = () => {
      setFadeOut(true);
      setTimeout(() => {
        setIsAgeVerified(true);
        setAnimationComplete(true);
      }, 500);
    };

    window.addEventListener("ageVerified", handleAgeVerified);

    return () => {
      window.removeEventListener("ageVerified", handleAgeVerified);
      clearTimeout(timer);
    };
  }, []);

  // useEffect separado para salvar no localStorage
  useEffect(() => {
    if (animationComplete) {
      localStorage.setItem("ageVerified", "true");
    }
  }, [animationComplete]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      {!isAgeVerified && <AgeGate />}
      {isAgeVerified && (
        <main className="min-h-screen bg-[#0A0501] text-white">
          <HeroSection />
          <ProductionProcess />
          <Ingredients />
          <Heritage />
          <VideoSection />
          <Awards />
          <Experience />
          <TastingExperience />
        
        </main>
      )}
    </div>
  );
}
