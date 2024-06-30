"use client";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface Order {
  id: string;
  quantity: number;
}

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAllItems);
  let toastShown = false;

  useEffect(() => {
    console.log("useEffect");

    if (searchParams.get("success") && !toastShown) {
      toast.success("Order placed successfully");
      removeAll();
      toastShown = true;
    }

    if (searchParams.get("canceled")) {
      toast.error("Error placing order. Please try again.");
    }
  }, [removeAll, searchParams]);

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const totalQuantity = items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const handleCheckout = async () => {
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
        }
      );

      window.location = response.data.url;
    } catch (error) {
      console.error(error);
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
          disabled={items.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Summary;
