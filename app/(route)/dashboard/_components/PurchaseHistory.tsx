"use client";

import DisplayProductList from "@/app/_components/DisplayProductList";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const PurchaseHistory = (props: Props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getPurchaseHistory();
  }, []);
  const getPurchaseHistory = async () => {
    const result = await axios.get("/api/order");
    setProducts(result.data);
  };
  return (
    <div>
      <h2 className='font-bold text-3xl mt-5'>Purchase History</h2>
      <DisplayProductList products={products} purchase={true} />
    </div>
  );
};

export default PurchaseHistory;
