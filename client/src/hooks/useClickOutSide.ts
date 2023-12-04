// import { useState, useEffect, useRef } from "react";
"use client";

import { useEffect, useRef, useState } from "react";

export default function useClickOutSide() {
  const [show, setShow] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutSide(e: MouseEvent) {
      e.preventDefault();
      if (
        menuRef.current &&
        popupRef.current &&
        !popupRef.current.contains(e.target as HTMLDivElement) &&
        !menuRef.current.contains(e.target as HTMLDivElement)
      ) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);
  return { show, setShow, popupRef, menuRef };
}
