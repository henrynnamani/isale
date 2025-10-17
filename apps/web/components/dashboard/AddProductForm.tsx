'use client';

import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useSWR from 'swr';
import { axiosInstance } from '@/app/layout';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Switch } from '../ui/switch';
import { Button } from '@/components/ui/button';

const productSchema = z.object({
  name: z.string().min(1),
  available: z.boolean().default(true),
  faceIdAvailable: z.boolean().default(false),
  trueToneAvailable: z.boolean().default(false),
  specification: z.string().optional(),
  images: z.array(z.string()).min(1), // we'll replace with URLs after upload
  categoryId: z.string().min(1),
  colors: z.string(),
  brandId: z.string().min(1),
  rams: z.string(),
  roms: z.string(),
  condition: z.enum(['Refurbished', 'Fairly used']),
  batteryHealth: z.string(),
  price: z.string().min(1),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function AddProductForm() {
  const { data: categories } = useSWR('/categories');
  const { data: brands } = useSWR('/brands');
  const { data: colors } = useSWR('/colors');
  const { data: rams } = useSWR('/rams');
  const { data: roms } = useSWR('/roms');

  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      available: true,
      faceIdAvailable: false,
      trueToneAvailable: false,
      specification: '',
      images: [], // placeholder, will override
      categoryId: '',
      colors: '',
      brandId: '',
      rams: '',
      roms: '',
      condition: 'Refurbished',
      batteryHealth: undefined,
      price: '',
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    setFiles(selected);
    const previews = selected.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      setLoading(true);

      // 1. Upload images if you have an upload endpoint
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });

      const uploadRes = await axiosInstance.post(
        '/cloudinary/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const uploadedUrls: string[] = uploadRes.data.urls;
      // (adjust according to your backend response)

      // 2. Build the final payload to send to create product
      const payload = {
        ...values,
        images: uploadedUrls,
        colors: [values.colors],
        rams: [values.rams],
        roms: [values.roms],
        price: Number(values.price),
      };

      console.log(payload);
      // 3. Call your backend endpoint to create product
      const createRes = await axiosInstance.post('/products', payload);
      console.log('Created product:', createRes.data);

      alert('✅ Product created!');
      form.reset();
      setFiles([]);
      setPreviewImages([]);
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 overflow-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="iPhone 11 Pro Max" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Battery Health */}
          <FormField
            control={form.control}
            name="batteryHealth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Battery Health (%)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.data?.map((cat) => (
                        <SelectItem key={cat.id} value={String(cat.id)}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Brand */}
          <FormField
            control={form.control}
            name="brandId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands?.data?.map((b) => (
                        <SelectItem key={b.id} value={String(b.id)}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Condition */}
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) =>
                      field.onChange(value as ProductFormValues['condition'])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Refurbished">Refurbished</SelectItem>
                      <SelectItem value="Fairly used">Fairly used</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Colors (multi select) */}
          <FormField
            control={form.control}
            name="colors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colors</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select colors" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors?.data?.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* RAMs */}
          <FormField
            control={form.control}
            name="rams"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RAMs</FormLabel>
                <FormControl>
                  <Select
                    value={field.value.toString()}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select RAMs" />
                    </SelectTrigger>
                    <SelectContent>
                      {rams?.data?.map((r) => (
                        <SelectItem key={r.id} value={String(r.id)}>
                          {r.size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ROMs */}
          <FormField
            control={form.control}
            name="roms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ROMs</FormLabel>
                <FormControl>
                  <Select
                    value={field.value.toString()}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ROMs" />
                    </SelectTrigger>
                    <SelectContent>
                      {roms?.data?.map((r) => (
                        <SelectItem key={r.id} value={String(r.id)}>
                          {r.size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Switches */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Available</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="trueToneAvailable"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>True Tone</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faceIdAvailable"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Face ID</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Image Upload */}
          <FormItem>
            <FormLabel>Upload Images</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </FormControl>
            <div className="flex flex-wrap gap-2 mt-2">
              {previewImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`preview-${i}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          </FormItem>

          {/* Specification */}
          <FormField
            control={form.control}
            name="specification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specification (JSON string)</FormLabel>
                <FormControl>
                  <Textarea placeholder='{"key":"value"}' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Save Product'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
