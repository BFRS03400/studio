'use server';

import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  employeeId: z.string().min(1),
  phone: z.string().regex(/^\d{10}$/),
  email: z.string().email(),
  pincode: z.string().regex(/^\d{6}$/),
  gift: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export async function submitGiftRequest(data: FormData) {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // Here you would implement the logic to send data to Google Drive.
  // For now, we'll just log it to the server console to simulate success.
  console.log('New Gift Request Submitted:');
  console.log(validation.data);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true };
}
