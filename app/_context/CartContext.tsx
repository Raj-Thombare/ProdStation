"use client";

import { ProductType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useContext,
} from "react";
import { toast } from "sonner";

interface CartContextType {
  cart: ProductType[];
  totalAmount: number;
  setCart: Dispatch<SetStateAction<ProductType[]>>;
  addToCart: (product: ProductType) => void;
  removeFromCart: (product: ProductType) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  totalAmount: 0,
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  const [cart, setCart] = useState<ProductType[]>([]);

  useEffect(() => {
    if (user) {
      getCartItems();
    } else {
      setCart([]);
    }
  }, [user]);

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const totalAmount = calculateTotalAmount();

  const getCartItems = async () => {
    const result = await axios.get(
      `/api/cart?email=${user?.primaryEmailAddress?.emailAddress}`
    );
    setCart(result.data);
  };

  const addToCart = async (product: ProductType) => {
    try {
      const response = await axios.post(`/api/cart`, {
        productId: product?.id,
        email: user?.primaryEmailAddress?.emailAddress,
      });

      if (response.status === 200 || response.status === 201) {
        setCart(response.data);
        toast.success("Item added to cart");
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item. Please try again.");
    }
  };

  const removeFromCart = async (product: ProductType) => {
    const previousCart = [...cart];
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));

    try {
      const response = await axios.delete(`/api/cart?recordId=${product?.id}`);
      toast.success("Item removed from cart");
      if (response.status !== 200) throw new Error("Failed to remove item");
    } catch (error) {
      console.error("Error removing item:", error);
      setCart(previousCart);
      toast.error("Failed to remove item. Please try again.");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
