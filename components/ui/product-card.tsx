"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Expand, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };
  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 "
    >
      <div className="space-y-3">
        <div className="aspect-square rounded-xl bg-gray-100 relative">
          <Image
            fill
            src={product.images[0].url}
            alt={product.name}
            className="aspect-square rounded-md object-cover"
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-6 justify-center">
              <IconButton
                onClick={handleClick}
                icon={<Expand size={20} className="text-gray-600" />}
              />
              <IconButton
                onClick={() => {}}
                icon={<ShoppingCart size={20} className="text-gray-600" />}
              />
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-lg">{product.name}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-md text-gray-500">{product.category.name}</p>
          <Currency value={product.price} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
