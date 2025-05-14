'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ImageKitProvider, IKUpload } from 'imagekitio-next';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';

import { Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';

const formSchema = z.object({
  images: z.array(z.string()).min(1, 'Upload at least one image'),
});

export type MultiImageFormValues = z.infer<typeof formSchema>;

const MultiImageUpload = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const form = useForm<MultiImageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
    },
  });

  const authenticator = async () => {
    const response = await axios.get('/api/imagekit-auth');
    const { signature, expire, token } = response.data;
    return { signature, expire, token };
  };

  const handleSuccess = (res: any) => {
    const url = res.url;
    setImageUrls((prev) => [...prev, url]);
    form.setValue('images', [...form.getValues('images'), url]);
  };

  const handleError = (err: any) => {
    console.error('ImageKit upload error:', err);
  };

  const onSubmit = (values: MultiImageFormValues) => {
    localStorage.setItem("images",JSON.stringify(imageUrls))
    console.log('Submitted images:', values.images);
  };

  return (
    <ImageKitProvider
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!}
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL!}
      authenticator={authenticator}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel>Upload Images</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <IKUpload
                      fileName="multi-upload.jpg"
                      folder="/multi-upload"
                      multiple
                      useUniqueFileName={true}
                      isPrivateFile={false}
                      onSuccess={handleSuccess}
                      onError={handleError}
                      className="px-4 py-2 rounded cursor-pointer text-sm"
                    />
                    <ScrollArea className="h-32 rounded border p-2">
                      <div className="grid grid-cols-3 gap-2">
                        {imageUrls.map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            alt={`uploaded-${i}`}
                            className="w-full h-24 object-cover rounded"
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={uploading}>
            Submit Images
          </Button>
        </form>
      </Form>
    </ImageKitProvider>
  );
};

export default MultiImageUpload;
