"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/lib/types";
import ProductCardItem from "./ProductCardItem";
import axios from "axios";

type Props = {};

const ProductsList = (props: Props) => {
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    try {
      const response = await axios.get("/api/products?limit=9");
      const products = response.data?.result;
      setProductList(products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return (
    <div>
      <h2 className='font-bold text-lg flex justify-between items-center'>
        Featured
        <span>
          <Button>View All</Button>
        </span>
      </h2>

      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-5'>
        {productList.length > 0
          ? productList.map((product, idx) => {
              return <ProductCardItem key={idx} product={product} />;
            })
          : [...Array(9)].map((_, idx) => (
              <div
                key={idx}
                className='w-full h-[250px] bg-slate-200 rounded-lg animate-pulse'></div>
            ))}
      </div>
    </div>
  );
};

export default ProductsList;
