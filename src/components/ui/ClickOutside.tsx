"use client";

import React, { useRef, useEffect } from "react";
import { ClickOutsideProps } from "../types/types";



function ClickOutside({ onClickOutside, children }: ClickOutsideProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(event.target as Node)) {
        onClickOutside(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClickOutside]);

  return <div ref={sectionRef}>{children}</div>;
}

export default ClickOutside;
