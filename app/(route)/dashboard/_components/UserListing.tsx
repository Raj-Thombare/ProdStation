"use client";

import ProductCardItem from "@/app/_components/ProductCardItem";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const UserListing = (props: Props) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    user && getUserProductList();
  }, [user]);

  const getUserProductList = async () => {
    const { data } = await axios.get(
      "/api/products?email=" + user?.primaryEmailAddress?.emailAddress
    );
    setProductList(data.result);
    setLoading(false);
  };

  return (
    <div className='mt-5'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-xl'>Listing</h2>
        <Link href={"/add-product"}>
          <Button>+ Add New Product</Button>
        </Link>
      </div>

      <div>
        {!loading && productList?.length === 0 && (
          <h2 className='font-medium text-2xl mt-10 text-center text-gray-300'>
            No products Found
          </h2>
        )}

        {loading && (
          <div className='flex justify-center items-center animate-spin'>
            <LoaderCircle />
          </div>
        )}

        {!loading && productList?.length > 0 && (
          <div className='grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
            {productList.map((product, idx) => {
              return (
                <ProductCardItem key={idx} product={product} editable={true} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListing;
