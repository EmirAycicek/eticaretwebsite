"use client";

import { getSlider } from "@/actions/getSlider";
import type { Slider } from "@/constans/type";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import SliderSkeleton from "./Skeleton/SliderSkeleton";

const SliderComponent = () => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const sliders = await getSlider();
        setSliders(sliders);
        console.log(sliders);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  return (
    <div>
      {loading ? (
        <SliderSkeleton />
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {sliders.map((slider) => (
              <CarouselItem key={slider.id}>
                <Link href={`${slider.attributes.media.url}`}>
                  <Image
                    alt="slider"
                    unoptimized={true}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${slider?.attributes?.media?.data?.attributes?.url}`}
                    width={500} // Resim boyutlarına uygun genişlik ve yükseklik eklenmeli
                    height={300}
                    className="w-full h-[200px] md:h-[450px] object-cover"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      )}
    </div>
  );
};

export default SliderComponent;
