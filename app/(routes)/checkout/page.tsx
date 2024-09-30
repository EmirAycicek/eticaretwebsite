"use client";

import { DeleteToCart } from "@/actions/cart/deleteToCart";
import useCartStore from "@/hooks/useCartStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CartItem from "../_components/Menu/CartItem";
import CheckoutForm from "../_components/CheckoutForm";

const CheckoutPage = () => {
  const { items, fetchItem } = useCartStore();
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();

  let jwt = "";
  let user = "";
  let userId = "";

  try {
    if (typeof window != "undefined") {
      jwt = localStorage.getItem("jwt") || "";
      user = localStorage.getItem("user") || "";

      if (user) {
        const userObj = JSON.parse(user);
        userId = userObj.id;
      }
    }
  } catch (error) {
    console.error("form", error);
  }

  useEffect(() => {
    fetchItem(userId, jwt);
  }, [fetchItem]);

  useEffect(() => {
    let total = 0;
    items.forEach((element) => {
      total += element.amount;
    });
    setSubTotal(parseInt(total.toFixed(2)));
  }, [items]);

  const onDeleteItem = async (id: any) => {
    await DeleteToCart(jwt, id);
    fetchItem(userId, jwt);
  };

  return (
    <div className="container mt-8 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-4 bgone border borderone rounded-md lg:h-screen">
          <CheckoutForm />
        </div>

        <div className="col-span-1 bgone borderone justify-center items-center rounded-md h-screen">
          {items.map((item) => (
            <CartItem key={item.id} item={item} onDeleteItem={onDeleteItem} />
          ))}

          <div className="flex border border-one justify-center items-center">
            SubTotal : ${subTotal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
