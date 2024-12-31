"use client";

import DisplayProductList from "@/app/_components/DisplayProductList";
import SortProducts from "@/app/_components/SortProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductDetailsType } from "@/lib/types";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

interface SortType {
  label: string;
  field: string;
  order: string;
}

const page = () => {
  const [productList, setProductList] = useState<ProductDetailsType[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [sort, setSort] = useState<SortType>({
    label: "Newest",
    field: "id",
    order: "desc",
  });
  const limit = 6;

  useEffect(() => {
    getProductList(offset);
  }, []);

  useEffect(() => {
    if (sort) {
      setProductList([]);
      getProductList(0);
    }
  }, [sort]);

  const getProductList = async (offset_: number) => {
    const { data } = await axios.post("/api/all-products", {
      params: {
        limit,
        offset: offset_,
        searchText: searchInput,
        sort: sort ?? [],
      },
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

      <div className='mt-5 mb-5 flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <Input
            placeholder='Search'
            className='w-80'
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            onClick={() => {
              getProductList(0);
              setProductList([]);
            }}>
            <Search />
            Search
          </Button>
        </div>
        <SortProducts onSortChange={(value) => setSort(JSON.parse(value))} />
      </div>
      <DisplayProductList products={productList} />
      <div className='flex items-center justify-center mt-10'>
        <Button onClick={handleLoadMore}>Load More</Button>
      </div>
    </div>
  );
};

export default page;
