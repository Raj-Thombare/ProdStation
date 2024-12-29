import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserListing from "./_components/UserListing";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className='mt-16'>
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <Tabs defaultValue='listing' className='mt-5'>
        <TabsList>
          <TabsTrigger value='listing'>Listing</TabsTrigger>
          <TabsTrigger value='purchase'>Purchase</TabsTrigger>
        </TabsList>
        <TabsContent value='listing'>
          <UserListing />
        </TabsContent>
        <TabsContent value='purchase'>Your Purchases history</TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
