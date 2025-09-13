"use client";

import React, { ReactNode, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface AOSWrapperProps {
  children: ReactNode;
}

const AOSWrapper: React.FC<AOSWrapperProps> = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 800, // static duration
      offset: 120,    // trigger point
    });
  }, []);

  return <div>{children}</div>;
};

export default AOSWrapper;  
