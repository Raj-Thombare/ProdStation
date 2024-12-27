"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Products from "../_mockData/Products";
import { ProductType } from "@/lib/types";
import ProductCardItem from "./ProductCardItem";

type Props = {};

const ProductsList = (props: Props) => {
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    setProductList(Products);
  }, []);
  return (
    <div>
      <h2 className='font-bold text-lg flex justify-between items-center'>
        Featured
        <span>
          <Button>View All</Button>
        </span>
      </h2>

      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-5'>
        {productList.map((product, idx) => {
          return <ProductCardItem key={idx} product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductsList;
