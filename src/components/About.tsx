/* eslint-disable @next/next/no-img-element */
import React from "react";

function About() {
  return (
    <>
      <div
        id="aboutSection"
        className="flex items-center justify-center flex-col pt-24 pb-20 sm:pb-16 px-5 overflow-hidden"
      >
        <div className="w-full flex items-center justify-center flex-col-reverse md:flex-row gap-5">
          <div className="flex items-center md:items-start justify-center flex-col w-full md:w-[60%] font-poppins">
            <h2 data-aos="fade-right" className="text-red-500 text-3xl font-semibold sm:text-4xl md:text-5xl">
              What we do?
            </h2>
            <p className="mt-6 text-orange-700 text-center md:text-left" data-aos="fade-right" data-aos-delay="100">
              At{" "}
              <span className="font-semibold text-orange-600 text-xl">
                VetPaw Medicine Manufacturers
              </span>
              , we are committed to improving animal health and well-being
              through innovative veterinary medicines and solutions. As a
              trusted name in the veterinary pharmaceutical industry, we
              specialize in manufacturing{" "}
              <span className="font-semibold text-orange-600 text-xl">
                high-quality, safe, and effective
              </span>{" "}
              medicines tailored to meet the needs of veterinarians, farmers,
              and pet owners alike.
            </p>
          </div>
          <div className="w-[80%] xs:w-[50%] md:w-[35%]">
            <img src="/About.jpg" alt="About VetPaw" />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
