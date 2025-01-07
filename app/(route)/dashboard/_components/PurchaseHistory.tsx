"use client";

import DisplayProductList from "@/app/_components/DisplayProductList";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const PurchaseHistory = (props: Props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPurchaseHistory();
  }, []);
  const getPurchaseHistory = async () => {
    const result = await axios.get("/api/order");
    setProducts(result.data);
    setLoading(false);
  };
  return (
    <div>
      <h2 className='font-bold text-3xl mt-5'>Purchase History</h2>
      {!loading && products?.length === 0 ? (
        <h2 className='font-medium text-2xl mt-10 text-center text-gray-300'>
          No products purchased yet!
        </h2>
      ) : (
        <DisplayProductList products={products} purchase={true} />
      )}
    </div>
  );
};

export default PurchaseHistory;
