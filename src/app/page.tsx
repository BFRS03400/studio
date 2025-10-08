'use client';

import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ImageSwiper from '@/components/image-swiper';
import GiftGrid from '@/components/gift-grid';
import DeliveryForm from '@/components/delivery-form';

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<ImagePlaceholder | null>(null);

  const handleGiftSelect = (gift: ImagePlaceholder) => {
    setSelectedGift(gift);
    setIsFormOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-in fade-in-0 duration-1000">
          <ImageSwiper />
          <GiftGrid onGiftSelect={handleGiftSelect} />
        </div>
      </main>
      <Footer />
      {selectedGift && (
        <DeliveryForm
          isOpen={isFormOpen}
          onOpenChange={setIsFormOpen}
          gift={selectedGift}
        />
      )}
    </div>
  );
}
