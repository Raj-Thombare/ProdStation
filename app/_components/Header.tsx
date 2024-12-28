import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import React from "react";

const Header = () => {
  const MenuList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Store",
      path: "/store",
    },
    {
      name: "Explore",
      path: "/explore",
    },
  ];
  return (
    <div className='flex justify-between items-center p-4 px-10 md:px-32 lg:px-48 bg-primary border-b-2 border-black'>
      <h2 className='font-bold text-lg bg-black text-white px-2 p-1'>
        ProdStation
      </h2>
      <ul className='flex gap-5'>
        {MenuList.map((menu, idx) => {
          return (
            <li
              key={idx}
              className='px-2 p-1 cursor-pointer hover:border-2 border-white'>
              {menu?.name}
            </li>
          );
        })}
      </ul>

      <div className='flex gap-5 items-center'>
        <ShoppingBag />
        <Button className='bg-red-500 hover:bg-red-600'>Start Selling</Button>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
