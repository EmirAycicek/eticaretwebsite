"use client";

import { getProducts } from "@/actions/getProducts";
import { Product } from "@/constans/type";
import React, { useEffect, useState } from "react";
import ProductDetailSkeleton from "../../_components/Skeleton/ProductDetailSkeleton";
import ProductImages from "../../_components/Product/ProductImages";
import ProductForm from "../../_components/Product/ProductForm";
import RecentProduct from "../../_components/Product/RecentProduct";

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const [productDetail, setProductDetail] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProducts(
          `/products?filters[slug][$eq]=${params.slug}&populate=*`
        );
        setProductDetail(product);
        console.log(productDetail);
      } catch (error) {
        console.error("Failed product slug ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <>
      {loading ? (
        <ProductDetailSkeleton />
      ) : (
        <div className="mt-10 container">
          {productDetail.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8 "
            >
              <div>
                <ProductImages images={product?.attributes?.images} />
              </div>

              <div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-3xl font-semibold textone">
                    {product?.attributes?.name}
                  </h2>
                  <h2 className="text-3xl font-semibold text-mycolor3 dark:text-mycolor5">
                    {product?.attributes?.category?.data?.attributes?.name}
                  </h2>
                  <p>{product?.attributes?.description}</p>

                  <div className="flex gap-3">
                    {product?.attributes?.sellingPrice && (
                      <h2 className="font-bold text-mycolor3 text-3xl">
                        ${product?.attributes?.sellingPrice}
                      </h2>
                    )}

                    <h2
                      className={
                        product?.attributes?.sellingPrice
                          ? "line-through text-gray-500"
                          : undefined
                      }
                    >
                      ${product?.attributes?.mrp}
                    </h2>
                  </div>
                  <ProductForm product={product} btnVisible={false} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <RecentProduct />
    </>
  );
};

export default ProductDetailPage;
