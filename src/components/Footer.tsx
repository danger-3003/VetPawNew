import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer
        id="footer"
        className="bg-dark font-poppins text-white py-10 bg-[#191919]"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="footer-contact">
              <h4 className="text-xl font-semibold mb-3">
                Contact Us
              </h4>
              <p className="text-sm leading-relaxed">
                43-16-23, near Sri Kanya Theatre, Subbalakshmi
                Nagar, Railway New Colony, Visakhapatnam, Andhra
                Pradesh 530016
                <br />
                <strong>Phone:</strong> 8919643730 / 9866804503 <br />
                <strong>Email:</strong>{" "}
                vetpawpharmapvtltd@gmail.com
              </p>
            </div>

            <div className="footer-links">
              <h4 className="text-xl font-semibold mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <i className="bx bx-chevron-right text-blue-400"></i>{" "}
                  <Link
                    href="/"
                    className="hover:text-blue-400 transition duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right text-blue-400"></i>{" "}
                  <Link
                    href="#about"
                    className="hover:text-blue-400 transition duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right text-blue-400"></i>{" "}
                  <Link
                    href="/"
                    className="hover:text-blue-400 transition duration-300"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right text-blue-400"></i>{" "}
                  <Link
                    href="/"
                    className="hover:text-blue-400 transition duration-300"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right text-blue-400"></i>{" "}
                  <Link
                    href="/"
                    className="hover:text-blue-400 transition duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-info">
              <h4 className="text-xl font-semibold mb-3">
                About Veterinary Medicine Manufacturers
              </h4>
              <p className="text-sm leading-relaxed">
                At Veterinary Medicine Manufacturers, we are
                committed to improving animal health and
                well-being through innovative veterinary
                medicines and solutions.
              </p>
              <div className="flex space-x-4 mt-3">
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-500 transition duration-300"
                >
                  <i className="bx bxl-facebook text-2xl"></i>
                </a>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-500 transition duration-300"
                >
                  <i className="bx bxl-linkedin text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;