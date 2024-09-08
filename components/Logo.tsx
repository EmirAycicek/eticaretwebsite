import Link from "next/link";
import React from "react";
import { preload } from "react-dom";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  weight: "400",
  preload: false,
});

const Logo = () => {
  return (
    <Link href="/" className={`${pacifico.className} text-2xl`}>
      Shopping
    </Link>
  );
};

export default Logo;
