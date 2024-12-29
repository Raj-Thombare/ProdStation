"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const UserListing = (props: Props) => {
  const [listing, setListing] = useState([]);

  return (
    <div className='mt-5'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-xl'>Listing</h2>
        <Link href={"/add-product"}>
          <Button>+ Add New Product</Button>
        </Link>
      </div>

      <div>
        {listing?.length == 0 && (
          <h2 className='font-medium text-2xl mt-10 text-center text-gray-300'>
            No Listing Found
          </h2>
        )}
      </div>
    </div>
  );
};

export default UserListing;
