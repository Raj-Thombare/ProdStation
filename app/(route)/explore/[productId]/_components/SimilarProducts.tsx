import DisplayProductList from "@/app/_components/DisplayProductList";
import { ProductDetailsType } from "@/lib/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SimilarProducts = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<ProductDetailsType[]>([]);

  useEffect(() => {
    getSimilarProducts();
  }, []);

  const getSimilarProducts = async () => {
    const res = await axios.get(`/api/products?category=${category}`);
    setProducts(res.data.result);
  };

  return (
    <div>
      <h2 className='font-bold text-xl'>Similar Products</h2>
      <div>
        <DisplayProductList products={products} />
      </div>
    </div>
  );
};

export default SimilarProducts;
