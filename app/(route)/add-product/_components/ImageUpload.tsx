"use client";

import React, { useState } from "react";
import Image from "next/image";

const ImageUpload = ({
  onImageSelect,
}: {
  onImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [image, setImage] = useState<String | ArrayBuffer | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onImageSelect(event);
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const render = new FileReader();
    render.onloadend = () => {
      setImage(render.result);
    };
    render.readAsDataURL(file);
  };

  return (
    <div>
      <h2>Upload Product Image</h2>
      <input
        type='file'
        id='imageUpload'
        name='image'
        className='hidden'
        onChange={handleFileChange}
      />
      <label htmlFor='imageUpload'>
        <div className='p-10 flex justify-center items-center cursor-pointer border-dashed border-2 border-black bg-slate-200'>
          {image ? (
            <Image
              src={image as string}
              className='object-contain h-[200px]'
              width={300}
              height={300}
              alt='image'
            />
          ) : (
            <Image
              src='/image.png'
              alt='image'
              width={70}
              height={70}
              className='opacity-35'
            />
          )}
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;
