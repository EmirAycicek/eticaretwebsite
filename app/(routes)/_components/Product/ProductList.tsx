"use client";

import React, { useEffect, useState } from "react";
import { getProducts } from "@/actions/getProducts";
import { Product } from "@/constans/type";
import HomeProductSkeleton from "../Skeleton/HomeProductSkeleton";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts(
          "/products?sort[0]=id:desc&filters[isTop]=true&pagination[start]=0&oagination[limit]=8&populate=*"
        );
        setProduct(products);
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        <HomeProductSkeleton />
      ) : (
        <div className="mt-10 container">
          <h2 className="textone font-semibold text-2xl lg:text-3xl">
            Short By Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8 mb-8">
            {product.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
