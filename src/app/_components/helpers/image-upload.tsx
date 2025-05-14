'use client';

import React, { useRef, useState } from 'react';
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
import { ImagePlus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  images: z.array(z.string()).min(1, 'Upload at least one image'),
});

export type MultiImageFormValues = z.infer<typeof formSchema>;

type UploadImage = {
  id: string;
  url: string;
  loading: boolean;
};

const MultiImageUpload = () => {
  const [images, setImages] = useState<UploadImage[]>([]);
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

  const onUploadStart = () => {
    const id = uuidv4();
    setImages((prev) => [...prev, { id, url: '', loading: true }]);
    return id;
  };

  const onSuccess = (res: any) => {
    const url = res.url;
    setImages((prev) => {
      const index = prev.findIndex((img) => img.loading && img.url === '');
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], url, loading: false };
        return updated;
      }
      return prev;
    });

    form.setValue('images', [...form.getValues('images'), url]);
  };

  const onError = (err: any) => {
    console.error('ImageKit upload error:', err);
  };

  const onSubmit = (values: MultiImageFormValues) => {
    localStorage.setItem('images', JSON.stringify(values.images));
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
                  <div className="flex h-32 flex-col gap-2">
                    <label className="w-fit cursor-pointer border p-2 rounded-md text-sm flex items-center gap-1">
                      <ImagePlus className="w-4 h-4" />
                      Upload
                      <IKUpload
                        fileName="multi-upload.jpg"
                        folder="/multi-upload"
                        multiple
                        useUniqueFileName={true}
                        isPrivateFile={false}
                        onUploadStart={onUploadStart}
                        onSuccess={onSuccess}
                        onError={onError}
                        className="hidden" 
                      />
                    </label>


                    <ScrollArea className="h-28 rounded border p-2">
                      <div className="grid grid-cols-6 gap-2">
                        {images.map((img) => (
                          <div
                            key={img.id}
                            className="w-16 h-16 rounded-md border bg-white shadow-sm flex items-center justify-center overflow-hidden"
                          >
                            {img.loading ? (
                              <div className="w-5 h-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
                            ) : (
                              <img
                                src={img.url}
                                alt="uploaded"
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4">
            Submit Images
          </Button>
        </form>
      </Form>
    </ImageKitProvider>
  );
};

export default MultiImageUpload;
