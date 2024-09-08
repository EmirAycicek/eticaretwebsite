"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const formSchema = z.object({
  userName: z.string().min(2, {
    message: "Email must be at least 2 characters",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters",
  }),
});

const CreateUserPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-3/5">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="textone">User Name</FormLabel>
              <FormControl>
                <Input placeholder="User Name" type="text" {...field} />
              </FormControl>

              <FormMessage className="validationLogin" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="textone">Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>

              <FormMessage className="validationLogin" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="textone">Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>

              <FormMessage className="validationLogin" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
      <div className="mt-8">
        <Label className="flex flex-col items-center">
          Already Account
          <Link href="/login" className="text-mycolor3 font-semibold mt-5">
            Click Here to Login Page
          </Link>
        </Label>
      </div>
    </Form>
  );
};

export default CreateUserPage;
