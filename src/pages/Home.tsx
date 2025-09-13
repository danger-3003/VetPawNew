/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import About from "@/components/About";
import Hero from "@/components/Hero";
import OurValues from "@/components/OurValues";
import VisionMission from "@/components/VisionMission";
import Gallery from "@/components/Gallery";

function HomePage() {
  const [move, setMove] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMove(true); // start moving

      setTimeout(() => {
        setReset(true); // hide & jump back
        setMove(false); // reset position
        setTimeout(() => setReset(false), 50); // show again at start
      }, 10000); // matches duration
    }, 12000); // total cycle (move + reset gap)

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="w-full flex items-center justify-center flex-col" style={{ background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/Background.jpg)`, backgroundPosition: "top center", backgroundSize: "cover" }}>
        <div className="w-full max-w-[80rem]">
          <Hero />
        </div>
        <div className="w-full relative h-36 overflow-hidden">
          <div
            className={`absolute ${reset ? "opacity-0" : "opacity-100"} transition-opacity`}
            style={{
              transform: move ? "translateX(100vw)" : "translateX(0)",
              transition: reset
                ? "none"
                : "transform 10s linear",
            }}
          >
            <img
              src="/Gifs/DogRunning.gif"
              alt="About animation"
              className="rounded-lg w-32"
            />
          </div>
        </div>
      </div>
      <div className="bg-orange-50 w-full flex items-center justify-center flex-col">
        <div className="w-full max-w-[80rem]">
          <About />
        </div>
      </div>
      <div className="w-full flex items-center justify-center flex-col">
        <div className="w-full max-w-[80rem]">
          <OurValues />
        </div>
      </div>
      <div className="bg-orange-50 w-full flex items-center justify-center flex-col">
        <div className="w-full max-w-[80rem]">
          <VisionMission />
        </div>
      </div>
      <div className="w-full flex items-center justify-center flex-col">
        <div className="w-full max-w-[80rem]">
          <Gallery />
        </div>
      </div>
    </>
  );
}

export default HomePage;
