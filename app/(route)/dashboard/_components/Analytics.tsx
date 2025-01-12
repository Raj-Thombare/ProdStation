"use client";

import { Card } from "@/components/ui/card";
import { OrderType, ProductType, UserType } from "@/lib/types";
import { formatCurrencyINR } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { LoaderCircle } from "lucide-react";

type AnalyticsDataType = {
  orders: OrderType;
  products: ProductType;
  users: UserType;
};

const Analytics = () => {
  const [orderList, setOrderList] = useState<AnalyticsDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await axios.get<AnalyticsDataType[]>("/api/analytics");
      setOrderList(result.data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }

    setLoading(false);
  };

  const totalProductsSold = orderList.length;

  const totalAmount = orderList.reduce(
    (sum, item) => sum + item.products.price,
    0
  );

  return (
    <div>
      <h2 className='font-bold text-2xl mt-5'>Analytics</h2>
      {!loading && orderList.length > 0 ? (
        <div>
          <Card className='bg-primary p-5 mt-5'>
            <h2 className='font-bold text-xl'>
              Total Product Sell: {totalProductsSold}
            </h2>
            <h2 className='font-bold text-xl'>
              Total Amount: {formatCurrencyINR(totalAmount)}
            </h2>
          </Card>
          <div className='mt-5'>
            {orderList.map((item) => (
              <Card
                key={item.orders.id}
                className='p-5 mb-3 flex items-center md:items-start space-x-4 flex-col md:flex-row'>
                <div className='flex-1 flex justify-center items-center'>
                  <Image
                    src={item.products.imageUrl}
                    width={100}
                    height={100}
                    alt={item.products.title}
                    className='mx-auto'
                  />
                </div>

                <div className='flex-1 mb-4 md:mb-0'>
                  <h2 className='font-bold text-xl pb-4'>
                    {item.products.title}
                  </h2>
                  <div className='flex justify-center md:justify-start'>
                    <Badge>{item.products.category}</Badge>
                  </div>
                </div>

                <div className='flex-1 text-center mb-4 md:mb-0'>
                  <p className='text-xl font-bold'>
                    {formatCurrencyINR(item.products.price)}
                  </p>
                </div>

                <div className='flex-1 text-center md:text-right'>
                  <p className='font-bold'>{item.users.name}</p>
                  <p>({item.users.email})</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center animate-spin'>
          <LoaderCircle />
        </div>
      )}
    </div>
  );
};

export default Analytics;
