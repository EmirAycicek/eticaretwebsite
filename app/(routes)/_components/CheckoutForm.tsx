"use client";

import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useCartStore from "@/hooks/useCartStore";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { createOrder } from "@/actions/cart/createOrder";
import { DeleteToCart } from "@/actions/cart/deleteToCart";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(2, { message: "Phone must be at least 2 characters." }),
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 characters." }),
  holdername: z
    .string()
    .min(2, { message: "Holder Name must be at least 2 characters." }),
  ccnumber: z
    .string()
    .regex(/^\d{16}$/, { message: "Credit Number must be 16 digits." }),
  month: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(1, { message: "Month is required." })
      .max(12, { message: "Month must be between 1 and 12." })
  ),
  year: z.preprocess(
    (val) => Number(val),
    z.number().min(new Date().getFullYear(), {
      message: "Year must be greater than or equal to the current year.",
    })
  ),
  cvc: z.string().regex(/^\d{3,4}$/, { message: "CVC must be 3 or 4 digits." }),
});

interface CheckoutFormProps {
  subtotal: number;
  userId: string;
  jwt: string;
}

const CheckoutForm = ({ subtotal, userId, jwt }: CheckoutFormProps) => {
  const { items, fetchItem } = useCartStore();

  const [response, setResponse] = useState(null);
  const toast = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Emir Ayçiçek",
      phone: "+90 555 222 111",
      address: "Sakarya Serdivan",
      holdername: "Emir",
      ccnumber: "5890040000000016",
      month: "04",
      year: "2026",
      cvc: "152",
    },
  });

  const onSubmit = async (data: any) => {
    const paymentCard = {
      cardHolderName: data.holdername,
      cardNumber: data.ccnumber,
      expireMonth: data.month,
      expireYear: data.year,
      cvc: data.cvc,
      registeredCard: "0",
    };

    const buyer = {
      id: "BY789",
      name: data.name,
      surname: "Doe",
      gsmNumber: data.phone,
      email: "john.doe@example.com",
      identityNumber: "74300864791",
      lastLoginDate: "2015-10-05 12:43:35",
      registrationDate: "2013-04-21 15:12:09",
      registrationAddress: data.address,
      ip: "85.111.48.37",
      city: "Sakarya",
      country: "Turkey",
      zipCode: "54000",
    };

    const shippingAddress = {
      contactName: data.name,
      city: "Sakarya",
      country: "Turkey",
      address: data.address,
      zipCode: "54000",
    };

    const billingAddress = {
      contactName: data.name,
      city: "Sakarya",
      country: "Turkey",
      address: data.address,
      zipCode: "54000",
    };

    const basketItems = [
      {
        id: "BI101",
        name: "Bioncular",
        category1: "Collectibles",
        category2: "Accessories",
        itemType: "PHYSICAL",
        price: subtotal,
      },
    ];

    const paymentData = {
      price: subtotal,
      paidPrice: subtotal,
      currency: "TRY",
      basketId: "BI101",
      paymentCard: paymentCard,
      buyer: buyer,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      basketItems: basketItems,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/api/payment",
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(response.data);
      console.log("response.data", response.data.status);

      if (response.data.status === "success") {
        const payload = {
          data: {
            name: data.name,
            address: data.address,
            phone: data.phone,
            userId: userId,
            subtotal: subtotal,
            paymentText: "Iyzcico",
            OrderItemList: items,
          },
        };

        await createOrder(payload, jwt);

        items.forEach((item, index) => {
          DeleteToCart(jwt, item.id).then((resp) => {});
        });

        toast.toast({
          variant: "success",
          title: "Order Success",
        });

        fetchItem(userId, jwt);

        router.push("/my-order");
      }

      console.log("checkoutForm response", response.data);
    } catch (error) {
      console.error("CheckoutForm", error);
    }
  };

  return (
    <div className="p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="border-b borderone text-2xl">Address</h2>
          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="textone">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage className="validationLogin" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="textone">Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+90 555 222 111" {...field} />
                  </FormControl>
                  <FormMessage className="validationLogin" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="textone">Address</FormLabel>
                <FormControl>
                  <Input placeholder="city street" {...field} />
                </FormControl>
                <FormMessage className="validationLogin" />
              </FormItem>
            )}
          />
          <div className="h-8"></div>
          <h2 className="border-b borderone text-2xl">Cart Information</h2>

          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="holdername"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="textone">Holdername</FormLabel>
                  <FormControl>
                    <Input placeholder="HolderName" {...field} />
                  </FormControl>
                  <FormMessage className="validationLogin" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ccnumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="textone">Credit Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Credit Number" {...field} />
                  </FormControl>
                  <FormMessage className="validationLogin" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="textone">Month</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Mont" {...field} />
                  </FormControl>
                  <FormMessage className="validationLogin" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="textone">Year</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Year" {...field} />
                  </FormControl>
                  <FormMessage className="validationLogin" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="textone">CVC</FormLabel>
                  <FormControl>
                    <Input placeholder="CVC" {...field} />
                  </FormControl>
                  <FormMessage className="validationLogin" />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
