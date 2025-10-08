'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Image from 'next/image';
import { CheckCircle2, Loader2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { submitGiftRequest } from '@/app/actions';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  employeeId: z.string().min(1, { message: 'Employee ID is required.' }),
  phone: z.string().regex(/^\d{10}$/, { message: 'Please enter a valid 10-digit phone number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  pincode: z.string().regex(/^\d{6}$/, { message: 'Please enter a valid 6-digit pincode.' }),
  gift: z.string(),
});

type FormData = z.infer<typeof formSchema>;

interface DeliveryFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  gift: ImagePlaceholder;
  onClaimSuccess: () => void;
}

export default function DeliveryForm({ isOpen, onOpenChange, gift, onClaimSuccess }: DeliveryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      employeeId: '',
      phone: '',
      email: '',
      pincode: '',
      gift: gift.description,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      onClaimSuccess();
    }
  }, [isSuccess, onClaimSuccess]);

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    const result = await submitGiftRequest(values);
    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
    } else {
      // Basic error handling, you could use react-hot-toast here
      alert('Submission failed. Please try again.');
    }
  }
  
  const handleClose = () => {
    onOpenChange(false);
    // Delay resetting state to avoid flash of content during closing animation
    setTimeout(() => {
        form.reset();
        setIsSuccess(false);
    }, 300);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] overflow-hidden p-0">
        {!isSuccess ? (
          <>
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl font-headline">Claim Your Gift</DialogTitle>
              <DialogDescription>
                You've selected the "{gift.description}". Please fill out your details for delivery.
              </DialogDescription>
            </DialogHeader>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center space-x-4 mb-6">
                <Image
                  src={gift.imageUrl}
                  alt={gift.description}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div className="font-semibold text-lg">{gift.description}</div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="employeeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee ID</FormLabel>
                        <FormControl>
                          <Input placeholder="EMP12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="9876543210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode</FormLabel>
                          <FormControl>
                            <Input placeholder="110001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField control={form.control} name="gift" render={({ field }) => <Input type="hidden" {...field} />} />

                  <DialogFooter className="pt-4">
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        'Submit Claim'
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold font-headline mb-2">Success!</h2>
            <p className="text-muted-foreground mb-6">
              Your gift claim has been submitted. You will receive your Diwali Delight soon!
            </p>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
