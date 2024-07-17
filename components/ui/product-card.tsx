"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
  product: Product;
  quantity?: number;
}

const ProductCard = ({ product, quantity }: ProductCardProps) => {
  const router = useRouter();
  const previewModal = usePreviewModal();
  const cart = useCart();

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(product);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(product);
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
            sizes="100%"
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-6 justify-center">
              <IconButton
                onClick={onPreview}
                icon={<Expand size={20} className="text-gray-600" />}
              />
              <IconButton
                onClick={onAddToCart}
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
      {quantity && (
        <div className="flex items-center justify-between">
          <p className="text-md text-gray-500">Quantity</p>
          <p className="text-md font-semibold">{quantity}</p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
