import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

interface GiftGridProps {
  onGiftSelect: (gift: ImagePlaceholder) => void;
}

export default function GiftGrid({ onGiftSelect }: GiftGridProps) {
  const giftImages = PlaceHolderImages.filter((img) =>
    img.id.startsWith('gift')
  );

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
          Choose Your Diwali Gift
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Select a gift from the options below to claim your Diwali delight.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {giftImages.map((gift) => (
          <Card
            key={gift.id}
            className="overflow-hidden cursor-pointer group transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:shadow-primary/20"
            onClick={() => onGiftSelect(gift)}
          >
            <CardContent className="p-0">
              <div className="aspect-square overflow-hidden">
                <Image
                  src={gift.imageUrl}
                  alt={gift.description}
                  width={250}
                  height={250}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  data-ai-hint={gift.imageHint}
                />
              </div>
            </CardContent>
            <CardFooter className="p-3 bg-background/80 backdrop-blur-sm">
                <p className="font-semibold text-sm text-center w-full truncate">{gift.description}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
