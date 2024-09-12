import { ProductImage } from "@/constans/type";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface ProductImagesProps {
  images: {
    data: ProductImage[]; // 'images.data' bir ProductImage dizisidir.
  };
}

const ProductImages = ({ images }: ProductImagesProps) => {
  // images.data'nın boş olup olmadığını kontrol edelim
  if (!images?.data || images.data.length === 0) {
    return <p>No images available</p>;
  }

  const hasmultipleImages = images.data.length > 1;

  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.data.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                width={500}
                alt={`Image ${index + 1}`}
                height={200}
                unoptimized={true}
                src={process.env.NEXT_PUBLIC_BACKEND_URL + image.attributes.url}
                className="rounded-3xl scale-95 w-full group-hover:scale-100 transition-all duration-700"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {hasmultipleImages && <CarouselPrevious className="left-0" />}
        {hasmultipleImages && <CarouselNext className="right-0" />}
      </Carousel>
    </>
  );
};

export default ProductImages;
