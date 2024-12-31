"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ProductDetailsType } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SimilarProducts from "./_components/SimilarProducts";

type Props = {};

const page = (props: Props) => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetailsType>();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    const result = await axios.get(`/api/products?id=${productId}`);
    setProduct(result.data);
  };

  return (
    product && (
      <div className='mt-10'>
        <h2 className='cursor-pointer'>BACK</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-10'>
          <Card className='flex items-center justify-center max-h-[402px] h-[402px] overflow-hidden'>
            <Image
              src={product?.imageUrl}
              alt={product?.title || "image"}
              width={400}
              height={400}
              className='max-h-[400px] max-w-full object-contain'
              priority
            />
          </Card>

          <div className='flex flex-col gap-5'>
            <div>
              <h2 className='font-bold text-2xl'>{product?.title}</h2>
              <Badge className='text-black'>{product?.category}</Badge>
            </div>
            <h2 className='font-bold text-3xl text-yellow-600'>
              Rs. {product.price}
            </h2>
            <p className='text-gray-500'>
              The {product.category} will send to your registered email address
              once you purchase this digital content
            </p>
            <Button className='w-full' size='lg'>
              Add to cart
            </Button>
            <div>
              <Accordion type='single' collapsible>
                <AccordionItem value='item-1'>
                  <AccordionTrigger>Description</AccordionTrigger>
                  <AccordionContent className='max-h-40 overflow-y-auto'>
                    {product?.description}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                  <AccordionTrigger>About product</AccordionTrigger>
                  <AccordionContent className='max-h-40 overflow-y-auto'>
                    {product?.about}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        <div className='mt-10'>
          <SimilarProducts category={product?.category} />
        </div>
      </div>
    )
  );
};

export default page;
