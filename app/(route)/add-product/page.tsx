"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUpload from "./_components/ImageUpload";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { ProductData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

type FormDataType = {
  image: string | File;
  file: File | string;
  message: string;
  data: ProductData;
};

const AddProduct = () => {
  const categoryOptions = [
    "Electronics",
    "Phones",
    "Laptops",
    "Cameras",
    "Clothing",
    "Jewelry",
    "Furniture",
    "Decor",
    "Skincare",
    "Books",
    "Gym Equipment",
    "Board Games",
    "Cars",
  ];

  const [formData, setFormData] = useState<FormDataType>({
    image: "",
    file: new File([], ""),
    message: "",
    data: {
      title: "",
      price: 0,
      category: "",
      description: "",
      about: "",
      message: "",
      userEmail: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        userEmail: user?.primaryEmailAddress?.emailAddress || "",
      },
    }));
  }, [user]);

  const handleInputChange = <T extends string | File | number>(
    fieldName: keyof FormDataType | keyof FormDataType["data"],
    fieldValue: T
  ) => {
    setFormData((prev) => {
      if (fieldName in prev.data) {
        return {
          ...prev,
          data: {
            ...prev.data,
            [fieldName]: fieldValue,
          },
        };
      }
      return {
        ...prev,
        [fieldName]: fieldValue,
      };
    });
  };

  const onAddProductBtnClick = async () => {
    setLoading(true);

    const formDataObj = new FormData();
    formDataObj.append("image", formData.image as Blob);
    formDataObj.append("file", formData.file);
    formDataObj.append("message", formData.message);
    formDataObj.append("data", JSON.stringify(formData.data));

    const result = await axios.post("/api/products", formDataObj, {
      headers: {
        "Content-Type": "Multipart/form-data",
      },
    });

    setLoading(false);

    if (result) {
      toast("Added new product successfully!");
      router.push("/dashboard");
    }
  };

  return (
    <div className='mt-10'>
      <h2 className='text-3xl font-bold'>Add New Product</h2>
      <p>Start adding product details to sell your item</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
        <div className='flex flex-col gap-5'>
          <ImageUpload
            onImageSelect={(e) => {
              const file = e.target.files && e.target.files[0];
              handleInputChange("image", file || "");
            }}
          />
          <div>
            <h4>Upload file which you want to sell</h4>
            <Input
              type='file'
              name='file'
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                  handleInputChange("file", file);
                }
              }}
            />
          </div>
          <div>
            <h4>Message to user</h4>
            <Textarea
              name='message'
              placeholder='Write thank you message to user'
              onChange={(e) => handleInputChange("message", e.target.value)}
            />
          </div>
        </div>
        {/* right side */}
        <div className='flex flex-col flex-grow'>
          <div>
            <h4>Product Title</h4>
            <Input
              name='title'
              placeholder='Add product name'
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
          <div>
            <h4>Price</h4>
            <Input
              name='price'
              type='number'
              placeholder='Add product price'
              onChange={(e) =>
                handleInputChange("price", Number(e.target.value))
              }
            />
          </div>
          <div>
            <h4>Category</h4>
            <Select
              onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select Category' />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category, idx) => (
                  <SelectItem key={idx} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h4>Description</h4>
            <Textarea
              name='description'
              placeholder='Add product description'
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <div>
            <h4>About Product (Optional)</h4>
            <Textarea
              name='about'
              placeholder='Add product information'
              onChange={(e) => handleInputChange("about", e.target.value)}
            />
          </div>
          <Button
            onClick={onAddProductBtnClick}
            className='mt-4'
            disabled={loading}>
            {loading ? <Loader2Icon className='animate-spin' /> : "Add Product"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
