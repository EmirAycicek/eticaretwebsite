import { Product } from "@/constans/type";
import { useProductFormStore } from "@/hooks/useForm";
import React, { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Minus, PlusIcon } from "lucide-react";
import Link from "next/link";

interface ProductFormProps {
  product: Product;
  btnVisible?: boolean;
}

const ProductForm = ({ product, btnVisible }: ProductFormProps) => {
  const {
    decrementQuantity,
    incrementQuantity,
    quantity,
    selectedColor,
    selectedSize,
    setColor,
    setSize,
    reset,
  } = useProductFormStore();

  useEffect(() => {
    reset();
  }, [product]);

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  const handleSizeChange = (size: string) => {
    setSize(size);
  };

  const totalPrice = (quantity * product?.attributes?.sellingPrice).toFixed(2);

  console.log("Quantity" + quantity);
  console.log("Size" + selectedSize);
  console.log("Color" + selectedColor);
  console.log("totalPrice" + totalPrice);

  return (
    <>
      <div className="flex flex-row">
        <Select onValueChange={handleColorChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Color" />
          </SelectTrigger>
          <SelectContent>
            {product?.attributes?.colors?.data?.map((color) => (
              <SelectItem value={color?.attributes?.name}>
                {color?.attributes?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleSizeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            {product?.attributes?.sizes?.data?.map((sizes) => (
              <SelectItem value={sizes?.attributes?.name}>
                {sizes?.attributes?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-row items-center gap-4 mt-8">
        <Button size="xs" disabled={quantity === 1} onClick={decrementQuantity}>
          <Minus />
        </Button>
        <h2>{quantity}</h2>
        <Button onClick={incrementQuantity} size="xs">
          <PlusIcon />
        </Button>
        {totalPrice}
      </div>

      <div className="flex flex-row gap-2 mt-8  ">
        <Button variant="destructive" className="rounded-2xl">
          Add To Card
        </Button>

        {btnVisible && (
          <Button asChild className="rounded-2xl">
            <Link href={`product/${product?.attributes?.slug}`}> Detail </Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default ProductForm;
