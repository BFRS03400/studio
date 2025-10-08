'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ImageSwiper() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const swiperImages = PlaceHolderImages.filter((img) =>
    img.id.startsWith('swiper')
  );

  return (
    <section className="py-12">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {swiperImages.map((image) => (
            <CarouselItem key={image.id}>
              <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
                <CardContent className="p-0">
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    <div className="aspect-video md:aspect-[2.4/1] overflow-hidden relative">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4" />
        <CarouselNext className="absolute right-4" />
      </Carousel>
    </section>
  );
}
