"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import axios from "axios";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

interface Order {
  id: string;
  quantity: number;
}

const Summary = () => {
  const items = useCart((state) => state.items);

  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const totalQuantity = items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const handleCheckout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const orders: Order[] = items.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
      };
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          orders,
          checkoutUrl: `${window.location.origin}/checkout`,
        }
      );

      window.location = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="mt-16 rounded-lg
  bg-gray-50 px-4 py-6 sm:p-6 
  lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-semibold text-gray-900">{`Order Summary (${totalQuantity} item${
        totalQuantity > 1 ? "s" : ""
      })`}</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
        <Button
          className="w-full mt-6"
          onClick={handleCheckout}
          disabled={isLoading || items.length === 0}
        >
          {isLoading ? (
            <div className="flex items-center justify-center w-full ">
              <Loader className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            "Checkout"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Summary;
