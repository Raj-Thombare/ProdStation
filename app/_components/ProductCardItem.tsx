import { Card } from "@/components/ui/card";
import { ProductType } from "@/lib/types";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon } from "lucide-react";
import ProductEditableOption from "./ProductEditableOption";

type Props = {
  product: ProductType;
  key: number;
  editable?: boolean;
};

const ProductCardItem = ({ product, editable = false }: Props) => {
  return (
    <div>
      <Card className='p-3'>
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={400}
          height={300}
          priority
        />
        <div>
          <h2 className='font-bold text-xl'>{product?.title}</h2>
          <h2 className='font-bold text-2xl text-yellow-500'>
            Rs. {product?.price}
          </h2>
          <div className='mt-3 md:flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <Image
                src={product?.user?.image || "/user.jpeg"}
                alt='product'
                height={20}
                width={20}
                className='rounded-full'
              />
              <h2 className='text-sm text-gray-400'>{product?.user?.name}</h2>
            </div>
            {!editable ? (
              <Button size='sm' className='mt-2'>
                Add to Cart
              </Button>
            ) : (
              <ProductEditableOption>
                <MoreVerticalIcon className='cursor-pointer' />
              </ProductEditableOption>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductCardItem;
