'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
} from '@/components/ui/drawer';
import { AddProductForm } from './AddProductForm';

export function AddProductDrawer() {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction='top'>
      <DrawerTrigger asChild>
        <Button>Add Product</Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-3xl mx-auto p-6">
        <DrawerHeader>
          <DrawerTitle>Add a New Product</DrawerTitle>
          <DrawerDescription>Fill out product details below.</DrawerDescription>
        </DrawerHeader>
        <AddProductForm onSuccess={() => setOpen(false)} />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
