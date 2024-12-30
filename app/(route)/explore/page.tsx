"use client";

import DisplayProductList from "@/app/_components/DisplayProductList";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/lib/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const limit = 6;

  useEffect(() => {
    getProductList(offset);
  }, []);

  const getProductList = async (offset_: number) => {
    const { data } = await axios.post("/api/all-products", {
      params: { limit, offset: offset_ },
    });

    if (offset_ === 0) {
      setProductList(data.result);
    } else {
      setProductList((prev) => [...prev, ...data.result]);
    }
  };

  const handleLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    getProductList(newOffset);
  };

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-2xl'>Explore</h2>
      <DisplayProductList products={productList} />
      <div className='flex items-center justify-center mt-10'>
        <Button onClick={handleLoadMore}>Load More</Button>
      </div>
    </div>
  );
};

export default page;
