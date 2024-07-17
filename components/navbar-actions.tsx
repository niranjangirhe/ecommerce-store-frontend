"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();
  const pathname = usePathname();

  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Link
        href={"/order-tracker"}
        className={cn(
          "text-sm font-medium transition-colors hover:text-black",
          pathname === "/track"
            ? "text-black font-semibold"
            : "text-neutral-500"
        )}
      >
        Track Order
      </Link>
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
