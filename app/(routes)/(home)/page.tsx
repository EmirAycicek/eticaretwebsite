"use client";

import Slider from "../_components/Slider";
import CategoryList from "../_components/CategoryList";
import ProductList from "../_components/Product/ProductList";

export default function Home() {
  return (
    <>
      <Slider />
      <CategoryList />
      <ProductList />
    </>
  );
}
