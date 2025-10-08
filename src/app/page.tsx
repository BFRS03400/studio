'use client';

import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ImageSwiper from '@/components/image-swiper';
import GiftGrid from '@/components/gift-grid';
import DeliveryForm from '@/components/delivery-form';
import { Card, CardContent } from '@/components/ui/card';
import { Gift } from 'lucide-react';

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<ImagePlaceholder | null>(null);
  const [hasClaimedGift, setHasClaimedGift] = useState(false);

  useEffect(() => {
    const giftClaimed = localStorage.getItem('diwaliGiftClaimed') === 'true';
    if (giftClaimed) {
      setHasClaimedGift(true);
    }
  }, []);

  const handleGiftSelect = (gift: ImagePlaceholder) => {
    setSelectedGift(gift);
    setIsFormOpen(true);
  };

  const handleClaimSuccess = () => {
    localStorage.setItem('diwaliGiftClaimed', 'true');
    setHasClaimedGift(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-in fade-in-0 duration-1000">
          <ImageSwiper />
          {hasClaimedGift ? (
             <section className="py-12">
                <Card className="text-center p-8 md:p-12">
                    <CardContent className="flex flex-col items-center">
                        <Gift className="w-16 h-16 text-primary mb-4" />
                        <h2 className="text-2xl md:text-3xl font-bold font-headline">You've Already Claimed Your Gift!</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Happy Diwali! Your gift is on its way.
                        </p>
                    </CardContent>
                </Card>
             </section>
          ) : (
            <GiftGrid onGiftSelect={handleGiftSelect} />
          )}
        </div>
      </main>
      <Footer />
      {selectedGift && (
        <DeliveryForm
          isOpen={isFormOpen}
          onOpenChange={setIsFormOpen}
          gift={selectedGift}
          onClaimSuccess={handleClaimSuccess}
        />
      )}
    </div>
  );
}
