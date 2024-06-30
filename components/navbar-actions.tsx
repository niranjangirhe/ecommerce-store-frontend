"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();

  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        className="flex items-center px-4 py-2"
        onClick={() => {
          router.push("/cart");
        }}
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;
