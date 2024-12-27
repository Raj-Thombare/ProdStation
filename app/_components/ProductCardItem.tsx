import { Card } from "@/components/ui/card";
import { ProductType } from "@/lib/types";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  product: ProductType;
  key: number;
};

const ProductCardItem = ({ product }: Props) => {
  return (
    <div>
      <Card className='p-3'>
        <Image
          src={product.image}
          alt={product.image}
          width={400}
          height={300}
        />
        <div>
          <h2 className='font-bold text-xl'>{product?.name}</h2>
          <h2 className='font-bold text-2xl text-yellow-500'>
            {product?.price}
          </h2>
          <div className='mt-3 md:flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <Image
                src={product?.user?.image}
                alt='user'
                height={20}
                width={20}
                className='rounded-full'
              />
              <h2 className='text-sm text-gray-400'>{product?.user?.name}</h2>
            </div>
            <Button size='sm' className='mt-2'>
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductCardItem;
