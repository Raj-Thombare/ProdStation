"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/lib/types";
import ProductCardItem from "./ProductCardItem";
import axios from "axios";
import Link from "next/link";
import DisplayProductList from "./DisplayProductList";

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
      <h2 className='font-bold text-2xl flex justify-between items-center'>
        Featured
        <span>
          <Link href='/explore'>
            <Button>View All</Button>
          </Link>
        </span>
      </h2>
      <DisplayProductList products={productList} />
    </div>
  );
};

export default ProductsList;
