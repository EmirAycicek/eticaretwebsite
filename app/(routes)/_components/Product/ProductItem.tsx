import { Product } from "@/constans/type";
import React from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductModal from "./ProductModal";
import ProductImages from "./ProductImages";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="group p-2 md:p-4 lg:p-6 lg:h-[500px] flex flex-col items-center justify-center gap-4 border borderone bgone rounded-xl hover:shadow-xl transition-all cursor-pointer duration-300">
      <ProductImages images={product?.attributes?.images} />
      <h2 className="font-bold text-lg">{product?.attributes?.name}</h2>
      <div className="flex gap-3">
        {product?.attributes?.sellingPrice && (
          <h2>${product?.attributes?.sellingPrice}</h2>
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
      <div className="flex flex-row gap-4">
        <Dialog>
          <DialogTrigger>
            <Button variant="destructive" className="rounded-2xl">
              Add to Cart
            </Button>
          </DialogTrigger>
          <DialogContent className="bgone sm:max-w-[900px]">
            <ProductModal product={product} />
          </DialogContent>
        </Dialog>

        <Button asChild className="rounded-2xl">
          <Link href={`/product/${product?.attributes?.slug}`}>Detail</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
