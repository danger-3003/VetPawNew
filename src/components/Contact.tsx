/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Input from "./ui/Input";
import Button from "./ui/Button/AuthButton";
import { Loader } from "lucide-react";
import { Toaster } from "./ui/Toaster";

type ContactDetails = {
  name: string;
  email: string;
  number: string;
  Subject: string;
  Body: string;
};

function Contact() {
  const contactSection = useRef<HTMLDivElement | null>(null);
  const [disable, setDisable] = useState(false);
  const [details, setDetails] = useState<ContactDetails>({
    name: "",
    email: "",
    number: "",
    Subject: "",
    Body: "",
  });
  const [alert, setAlert] = useState<{ show: boolean; message: string; status: boolean }>({
    show: false,
    message: "",
    status: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisable(true);

    const data = {
      name: details.name,
      email: details.email,
      toMail: "vetpawpharma24@gmail.com",
      toName: "VetPaw Pharma Pvt. Ltd.",
      phone: details.number,
      subject: details.Subject,
      message: details.Body,
    };

    try {
      const res = await axios.post("https://api.qrdcard.com/api/url/sendmail", data);
      if (res) {
        setDetails({
          name: "",
          email: "",
          number: "",
          Subject: "",
          Body: "",
        });
        setAlert({
          show: true,
          status: true,
          message: res?.data?.message,
        });
        setTimeout(() => {
          setAlert({ show: false, status: true, message: "" });
        }, 2500);
      }
    } catch (err) {
      setAlert({
        show: true,
        status: false,
        message: "Error in sending mail",
      });
      setTimeout(() => {
        setAlert({ show: false, status: false, message: "" });
      }, 2500);
    } finally {
      setDisable(false);
    }
  };

  return (
    <>
      <Toaster
        status={alert?.status}
        message={alert?.message}
        showToast={alert?.show}
      />
      <div
        ref={contactSection}
        className="flex items-center justify-center flex-col gap-10 pt-28 pb-10 w-full px-5"
      >
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-red-500 dark:text-white text-3xl font-semibold sm:text-4xl md:text-5xl text-center w-full mb-10">
            Contact Us
          </h1>
          <div className="flex items-start justify-between gap-5 flex-col sm:flex-row">
            <div className="basis-[60%]">
              <h2 className="text-orange-400 text-xl font-medium sm:text-2xl md:text-3xl mb-5 md:mb-10">
                Get in Touch with VetPaw
              </h2>
              <p className="text-text text-sm sm:text-base">
                We are here to help you and your animals thrive. Whether you have questions about our products,
                need veterinary advice, or want to join our growing community, we'd love to hear from you.
              </p>
              <div>
                <p className="text-orange-400 text-lg font-medium sm:text-xl mt-7 mb-5">Reach Us For</p>
                <ul className="list-disc list-inside text-text">
                  <li>Product information & usage guidance</li>
                  <li>Bulk orders & veterinarian's requests</li>
                  <li>Any concern or feedback</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-end w-full basis-[40%]">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-96 sm:w-72 md:w-80 p-3 sm:p-5 rounded-lg border border-gray-300 dark:border-zinc-600">
                <Input
                  label="Name"
                  type="text"
                  placeholder="Your Name"
                  value={details.name}
                  required
                  onChange={(e) => setDetails({ ...details, name: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="Your Email"
                  value={details.email}
                  required
                  onChange={(e) => setDetails({ ...details, email: e.target.value })}
                />
                <Input
                  label="Mobile Number"
                  type="number"
                  placeholder="Your mobile number"
                  value={details.number}
                  required
                  onChange={(e) => setDetails({ ...details, number: e.target.value })}
                />
                <Input
                  label="Subject"
                  type="text"
                  placeholder="Subject"
                  value={details.Subject}
                  required
                  onChange={(e) => setDetails({ ...details, Subject: e.target.value })}
                />
                <Input
                  label="Message"
                  type="text"
                  placeholder="Your Message"
                  value={details.Body}
                  required
                  onChange={(e) => setDetails({ ...details, Body: e.target.value })}
                />
                <div className="flex justify-center mt-5">
                  <Button type="submit" className="max-w-40 w-40" disabled={disable}>
                    {
                      disable ?
                        <Loader width={16} className="animate-spin" />
                        :
                        "Submit"
                    }
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="w-full h-72 md:h-96">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.3586945984193!2d83.2925253743658!3d17.72773028321861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3943247abeba5b%3A0x6f2779f6196e92f6!2sSree%20Kanya%20Movie%20Theatre!5e0!3m2!1sen!2sin!4v1738231626827!5m2!1sen!2sin"
            style={{ border: 0 }}
            loading="eager"
          ></iframe>
        </div>
      </div >
    </>
  );
}

export default Contact;
