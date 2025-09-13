/* eslint-disable @next/next/no-img-element */
import React from "react";

function About() {
  return (
    <>
      <div
        id="aboutSection"
        className="flex items-center justify-center flex-col"
      >
        <div
          id="about"
          className="flex items-center justify-center flex-col pt-24 pb-16 px-5 sm:px-7 md:px-10"
        >
          <div className="w-full xl:w-[70rem] flex items-center justify-center flex-col-reverse md:flex-row gap-5">
            <div className="flex items-start justify-center flex-col w-full md:w-[60%] font-poppins">
              <p className="text-orange-300 text-3xl font-semibold sm:text-4xl md:text-5xl">
                What we do?
              </p>
              <p className="mt-6 text-orange-700">
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
      </div>
    </>
  );
}

export default About;
