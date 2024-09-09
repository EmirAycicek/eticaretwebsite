"use client";

import { useToast } from "@/hooks/use-toast";
import Slider from "../_components/Slider";

export default function Home() {
  const { toast } = useToast();

  return (
    <>
      <Slider />
    </>
  );
}
