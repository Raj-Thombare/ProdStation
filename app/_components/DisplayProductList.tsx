import React from "react";
import ProductCardItem from "./ProductCardItem";
import { ProductType } from "@/lib/types";

const DisplayProductList = ({ products }: { products: ProductType[] }) => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-5'>
      {products.length > 0
        ? products.map((product: ProductType, idx: number) => {
            return <ProductCardItem key={idx} product={product} />;
          })
        : [...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className='w-full h-[250px] bg-slate-200 rounded-lg animate-pulse'></div>
          ))}
    </div>
  );
};

export default DisplayProductList;