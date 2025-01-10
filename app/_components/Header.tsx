import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useCart } from "../_context/CartContext";
import CartList from "./CartList";

const Header = () => {
  const MenuList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Explore",
      path: "/explore",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
  ];

  const { cart } = useCart();

  return (
    <div className='flex justify-between items-center p-4 px-10 md:px-32 lg:px-48 bg-primary border-b-2 border-black'>
      <Link href='/'>
        <h2 className='font-bold text-xl bg-black text-primary px-2 p-1 rounded-sm border'>
          <span className='hidden md:inline'>PRODSTATION</span>
          <span className='md:hidden'>PS</span>
        </h2>
      </Link>
      <ul className=' gap-5 hidden md:flex'>
        {MenuList.map((menu, idx) => {
          return (
            <Link href={`${menu.path}`} key={idx}>
              <li className='px-2 p-1 cursor-pointer hover:underline'>
                {menu?.name}
              </li>
            </Link>
          );
        })}
      </ul>

      <div className='flex gap-5 items-center'>
        <CartList>
          <div className='flex items-center hover:cursor-pointer'>
            <ShoppingBag />
            <Badge className='text-white bg-black hover:bg-black rounded-full py-1'>
              {cart?.length}
            </Badge>
          </div>
        </CartList>
        <Link href='/dashboard'>
          <Button className='bg-red-500 hover:bg-red-600'>
            <span className='hidden md:inline'>Start Selling</span>
            <span className='md:hidden'>Sell</span>
          </Button>
        </Link>

        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <Link href='/sign-in'>
            <Button className='bg-green-600 hover:bg-green-500'>Sign In</Button>
          </Link>
        </SignedOut>
      </div>
    </div>
  );
};

export default Header;
