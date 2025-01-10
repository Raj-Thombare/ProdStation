import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className='bg-green-700 p-10 md:px-28 lg:px-36'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 pt-20'>
        <div>
          <h2 className='font-extrabold text-5xl text-white'>
            Welcome to ProdStation. Your Marketplace for Everything!
          </h2>
          <p className='text-gray-200 mt-3'>
            Join a thriving community of buyers and sellers making connections
            and discovering opportunities every day
          </p>
          <div className='flex gap-5 mt-8'>
            <Link href={"/explore"}>
              <Button size='lg'>Explore</Button>
            </Link>
            <Link href={"/dashboard"}>
              <Button size='lg' className='bg-red-500 hover:bg-red-600'>
                Sell
              </Button>
            </Link>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <Image
            src={"/pc2.png"}
            alt='pc'
            width={300}
            height={300}
            className='scale-x-[-1]'
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
