import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { handleNavigate } from "@/utils/Navigate";

const Footer = () => {

  const router = useRouter();
  const pathname = usePathname();

  const scrollOrNavigate = (id: string) => {
    if (typeof window === "undefined") return;

    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`Element with id '${id}' not found on home page.`);
      }
    } else {
      sessionStorage.setItem("scrollToId", id);
      router.push("/");
    }
  };

  return (
    <>
      <footer
        id="footer"
        className="bg-dark font-poppins text-white py-10 bg-[#191919] border-t border-orange-200"
      >
        <div className="container mx-auto px-4 mb-5 sm:mb-0">
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
                <strong>Phone:</strong> <a href="tel:+91 8919643730">8919643730</a> / <a href="tel:+91 9866804503">9866804503</a> <br />
                <strong>Email:</strong>{" "}
                <a href="mailto:vetpawpharmapvtltd@gmail.com">vetpawpharmapvtltd@gmail.com</a>
              </p>
            </div>

            <div className="footer-links">
              <h4 className="text-xl font-semibold mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <div
                    onClick={() => { scrollOrNavigate("homeSection") }}
                    className="hover:text-orange-300 transition duration-300 cursor-pointer"
                  >
                    Home
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => { scrollOrNavigate("aboutSection") }}
                    className="hover:text-orange-300 transition duration-300 cursor-pointer"
                  >
                    About Us
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => { handleNavigate("products") }}
                    className="hover:text-orange-300 transition duration-300 cursor-pointer"
                  >
                    Products
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => { scrollOrNavigate("gallerySection") }}
                    className="hover:text-orange-300 transition duration-300 cursor-pointer"
                  >
                    Gallery
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => { handleNavigate("contact") }}
                    className="hover:text-orange-300 transition duration-300 cursor-pointer"
                  >
                    Contact Us
                  </div>
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
                  className="text-orange-300 hover:text-blue-500 transition duration-300"
                >
                  <i className="bx bxl-facebook text-2xl"></i>
                </a>
                <a
                  href="#"
                  className="text-orange-300 hover:text-blue-500 transition duration-300"
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