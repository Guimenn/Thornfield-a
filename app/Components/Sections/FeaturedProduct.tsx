"use client";
import Image from "next/image";
import Button from "../Ui/Button";

export default function FeaturedProduct() {
  return (
    <section className="bg-[#0A0501] mx-auto py-32 h-full">
      <div className="container bg-gray-950  mx-auto h-[76  vh]">
        <div className="grid items-start gap-16 md:grid-cols-2 ">
          <div className="p-10">
            <h3 className="mb-4 text-lg uppercase tracking-widest bg-gradient-to-br from-amber-600 to-amber-800 bg-clip-text text-transparent">
              Featured
            </h3>
            <h2 className="mb-6 font-['Cormorant_Infant'] text-5xl text-amber-100 md:text-6xl">
              THORNFIELD 18
            </h2>
            <div className="mb-8 h-px w-32 bg-gradient-to-r from-amber-600 to-amber-800"></div>
            <p className="mb-10 text-lg leading-relaxed text-gray-300">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae nesciunt sapiente voluptas dolore enim repellendus voluptates ut harum, quia eligendi in reprehenderit voluptate ducimus nam. Culpa dolorum dolor reprehenderit debitis?
            </p>
            <p className="mb-10 text-lg leading-relaxed text-gray-300">
              Our signature 18-year-old expression exemplifies the Thornfield style.
              Matured in a combination of European and American oak casks.
            </p>
            <p className="mb-10 text-lg leading-relaxed text-gray-300">
              Our signature 18-year-old expression exemplifies the Thornfield style.
              Matured in a combination of European and American oak casks.
            </p>

            <div className="flex flex-col gap-4">
              <Button variant="primary" className="w-fit">Discover More</Button>
              <div className="h-px w-32 bg-gradient-to-r from-amber-600 to-amber-800"></div>
              <h4 className="mb-4 text-lg uppercase tracking-widest bg-gradient-to-br from-amber-600 to-amber-800 bg-clip-text text-transparent font-['Cormorant_Infant']"><span className="text-white font-[Arial]">MC GORIILA</span> <br></br>CEO of the Company</h4>
            </div>

          </div>

          <div>
            <div className="relative aspect-[2/2] overflow-hidden rounded-xl">
              <Image
                src="/aboutus.png"
                alt="Thornfield 18"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-gray-900/90 to-transparent p-6">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
