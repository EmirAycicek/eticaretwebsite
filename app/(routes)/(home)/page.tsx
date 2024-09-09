"use client";

import { useToast } from "@/hooks/use-toast";
import Slider from "../_components/Slider";
import CategoryList from "../_components/CategoryList";

export default function Home() {
  const { toast } = useToast();

  return (
    <>
      <Slider />
      <CategoryList />
    </>
  );
}
