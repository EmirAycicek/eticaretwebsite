"use client";

import React, { useEffect, useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";
import useCartStore from "@/hooks/useCartStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CartItem from "./CartItem";
import { DeleteToCart } from "@/actions/cart/deleteToCart";

interface CartProps {
  jwt: string;
  userId: string;
}

const Cart = ({ userId, jwt }: CartProps) => {
  const { items, fetchItem } = useCartStore();
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchItem(userId, jwt);
  }, [fetchItem]);

  useEffect(() => {
    let total = 0;
    items.forEach((element) => {
      total = total + element.amount;
    });

    setSubTotal(parseInt(total.toFixed(2)));
  }, [items]);

  const onDeleteItem = async (id: any) => {
    await DeleteToCart(jwt, id);
    fetchItem(userId, jwt);
  };
  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative cursor-pointer">
          <span className="absolute bg-mycolor3 text-mycolor1 text-xs font-semibold rounded-xl items-center justify-center text-center -right-2 -top-1 w-5 h-5">
            {items.length}
          </span>
          <ShoppingBag />
        </div>
      </SheetTrigger>
      <SheetContent className="bgone">
        <SheetHeader>
          <SheetTitle>Your Shopping Cart</SheetTitle>
          <SheetDescription>
            Here are the items currently in your cart.
          </SheetDescription>

          <div>
            {items.length === 0 ? (
              <p>Your cart is Empty</p>
            ) : (
              <ul>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onDeleteItem={onDeleteItem}
                  />
                ))}
              </ul>
            )}
          </div>

          <SheetClose asChild>
            <div className="absolute w-[90%] bottom-6 flex-col">
              <h2 className="text-lg justify-between">
                Sub Total <span>${subTotal}</span>
              </h2>

              <div>
                <Button
                  disabled={items.length == 0}
                  onClick={() => router.push(jwt ? "/checkout" : "/login")}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </SheetClose>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
