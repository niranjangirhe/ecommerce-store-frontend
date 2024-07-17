"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import useCart from "@/hooks/use-cart";
import Container from "@/components/ui/container";

const OrderPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const cart = useCart();

  const searchParams = useSearchParams();
  const removeAll = useCart((state) => state.removeAllItems);
  let toastShown = false;
  useEffect(() => {
    if (searchParams.get("success") && !toastShown) {
      toast.success("Order placed successfully");
      removeAll();
      setOrderId(searchParams.get("orderId") || "");
      setIsOrderPlaced(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      toastShown = true;
    }

    if (searchParams.get("canceled")) {
      toast.error("Error placing order. Please try again.");
      // eslint-disable-next-line react-hooks/exhaustive-deps
      toastShown = true;
      setOrderId(searchParams.get("orderId") || "");
    }

    if (
      !searchParams.get("success") &&
      !searchParams.get("canceled") &&
      !toastShown
    ) {
      toast.error("Something went wrong. Please try again.");
      // eslint-disable-next-line react-hooks/exhaustive-deps
      toastShown = true;
    }
  }, [removeAll, searchParams]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-Shantell_Sans text-5xl font-bold text-black">
            {isOrderPlaced && orderId ? "Sweet!" : "Dang it!"}
          </h1>
          <h2 className="text-xl font-semibold text-black">
            {isOrderPlaced && orderId
              ? "Time to do a happy dance!"
              : "Looks like we hit a snag. Want to try again?"}
          </h2>
          <div className="mt-12 lg:items-start">
            <div>
              <p className="text-neutral-500 text-xl">
                {orderId
                  ? isOrderPlaced
                    ? "Your order has been placed successfully."
                    : `Payment failed. Please try again. If amount is deducted please raise a query`
                  : "Something went wrong"}
              </p>
              {orderId && (
                <>
                  <p className="mt-4 text-neutral-500">
                    Your order ID is:{" "}
                    <span className="font-semibold">{orderId}</span>
                  </p>
                  <p className=" text-neutral-500">
                    Please note this order ID for future reference and tracking.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderPage;
