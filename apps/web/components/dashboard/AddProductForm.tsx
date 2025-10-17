'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { Switch } from '../ui/switch';
import { uploadImagesToCloudinary } from '../lib/cloudinary';
import useSWR from 'swr';

const productSchema = z.object({
  name: z.string().min(1),
  available: z.boolean().default(true),
  faceIdAvailable: z.boolean().default(false),
  trueToneAvailable: z.boolean().default(false),
  specification: z.string().optional(),
  images: z.array(z.url()).min(1),
  categoryId: z.uuid(),
  colors: z.array(z.string()).min(1),
  brandId: z.uuid(),
  stock: z.number().int().min(0),
  rams: z.array(z.string()).min(1),
  roms: z.array(z.string()).min(1),
  condition: z.enum(['Refurbished', 'Fairly used']),
  batteryHealth: z.number().min(0).max(100).optional(),
  price: z.number().min(1),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function AddProductForm() {
  const { data: categories } = useSWR('/categories');
  const { data: brands } = useSWR('/brands');
  const { data: colors } = useSWR('/colors');
  const { data: rams } = useSWR('/rams');
  const { data: roms } = useSWR('/roms');

  console.log(categories)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      available: true,
      images: [],
      colors: [],
      rams: [],
      roms: [],
    },
  });

  const [previewImages, setPreviewImages] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    form.setValue('images', files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const dummyCategories = [
    { id: '6a0d5b15-8b26-4e5d-92db-1f1a1aee5a10', name: 'iPhone' },
    { id: 'ec1e4b9b-5b26-41b2-8e5d-2f2a7f2d8b11', name: 'Samsung' },
  ];

  const dummyBrands = [
    { id: '8f1a3b2c-9d2f-45a6-8b0d-1a2c4f3e5b9d', name: 'Apple' },
    { id: '5d4b1a8c-7e9f-43c1-8a6d-3e7b5c2d9f1a', name: 'Samsung' },
  ];

  const onSubmit = async (values: ProductFormValues) => {
    try {
      setLoading(true);

      console.log(values);
      // Upload images to Cloudinary
      //   const imageUrls = await uploadImagesToCloudinary(values.images);

      // Send to backend
      //   const payload = {
      //     ...values,
      //     images: imageUrls,
      //   };

      //   await axios.post('https://your-backend-url.com/products', payload);

      alert('✅ Product created!');
      form.reset();
      setPreviewImages([]);
    } catch (error) {
      console.error(error);
      alert('❌ Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                  <Input type="number" placeholder="1700000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Stock */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="10" {...field} />
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
                  <Input type="number" placeholder="90" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-1 justify-between items-center">
            {/* Category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dummyCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dummyBrands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Select
                    value={field.value}
                    onValueChange={(value) =>
                      field.onChange(value as ProductFormValues['condition'])
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Refurbished">Refurbished</SelectItem>
                      <SelectItem value="Fairly used">Fairly used</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-1 justify-between items-center">
            {/* Category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dummyCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <FormLabel>Ram</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Ram" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dummyBrands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <FormLabel>Rom</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) =>
                      field.onChange(value as ProductFormValues['condition'])
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Rom" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Refurbished">32gb</SelectItem>
                      <SelectItem value="Fairly used"></SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                  alt="preview"
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
                <FormLabel>Specification (JSON)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='{"screenSize":"6.5 inches"}'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save Product
          </Button>
        </form>
      </Form>
    </div>
  );
}
