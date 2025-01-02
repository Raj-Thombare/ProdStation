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
  setCart: Dispatch<SetStateAction<ProductType[]>>;
  addToCart: (product: ProductType) => void;
  removeFromCart: (product: ProductType) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  const [cart, setCart] = useState<ProductType[]>([]);

  useEffect(() => {
    user && getCartItems();
  }, [user]);

  const getCartItems = async () => {
    const result = await axios.get(
      `/api/cart?email=${user?.primaryEmailAddress?.emailAddress}`
    );
    setCart(result.data);
  };

  const addToCart = async (product: ProductType) => {
    await axios.post(`/api/cart`, {
      productId: product?.id,
      email: user?.primaryEmailAddress?.emailAddress,
    });

    setCart((cart) => [...cart, product]);
    toast("Added to cart");
  };

  const removeFromCart = async (product: ProductType) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
    await axios.delete(`/api/cart?recordId=${product?.id}`);
    toast("Item Removed");
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
