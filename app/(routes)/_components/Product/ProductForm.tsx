import { Product } from "@/constans/type";
import { useProductFormStore } from "@/hooks/useForm";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Minus, PlusIcon } from "lucide-react";
import Link from "next/link";
import { AddToCart } from "@/actions/cart/addToCart";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import useCartStore from "@/hooks/useCartStore";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  product: Product;
  btnVisible?: boolean;
}

const ProductForm = ({ product, btnVisible }: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const fetchItems = useCartStore((state: any) => state.fetchItems);

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

  let jwt = "";
  let user = "";
  let userId = "";

  try {
    jwt = localStorage.getItem("jwt") || "";
    user = localStorage.getItem("user") || "";

    if (user) {
      const userObj = JSON.parse(user);
      userId = userObj.id;
    }
  } catch (error) {
    console.error("form", error);
  }

  const onAddCart = async () => {
    if (!userId && !jwt) {
      router.push("/login");
    }

    if (!selectedColor || !selectedSize) {
      toast({
        title: "Color and Size required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const data = {
        data: {
          quantity: quantity,
          amount: totalPrice,
          size: selectedSize,
          color: selectedColor,
          products: product.id,
          users_permissions_user: userId,
          userId: userId,
        },
      };
      console.log(data.data);

      await AddToCart(data, jwt);
      toast({
        title: "Add to Cart ",
        variant: "success",
      });
      fetchItems(userId, jwt);
    } catch (error) {
      console.log("form aadaasd", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row space-x-3">
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
        <Button
          variant="destructive"
          className="rounded-2xl"
          onClick={onAddCart}
        >
          {loading ? <Loader2Icon className="animate-spin" /> : "Add To Card"}
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
