import { Product } from "@/constans/type";
import React from "react";

interface ProductItemProps {
  product: Product;
}

const ProductModal = ({ product }: ProductItemProps) => {
  return <div>{product?.id}</div>;
};

export default ProductModal;
