"use client";

import { X } from "lucide-react";
import Image from "next/image";

import { Product } from "@/types";
import useCart from "@/hooks/use-cart";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";

interface CartItemProps {
  data: Product & { quantity: number };
}
const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const router = useRouter();

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt={data.name + " image"}
          className="object-cover object-center cursor-pointer"
          onClick={() => router.push(`/product/${data.id}`)}
          sizes="100%"
        />
      </div>
      <div className="relative flex-1 ml-4 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton
            onClick={() => cart.removeItem(data.id)}
            icon={<X size={15} />}
          />
        </div>

        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500 h-fit">{data.color.name}</p>
            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4 h-fit">
              {data.size.name}
            </p>
          </div>
          <hr className="my-4 sm:col-span-2" />

          <div>
            <p className="text-sm text-gray-500">Price</p>
            <Currency value={data.price} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Quantity</p>
            <div className="flex items-center mt-1">
              <button
                onClick={() => cart.decrementQuantity(data.id)}
                className="text-gray-500"
              >
                -
              </button>
              <p className="text-black mx-2">{data.quantity}</p>
              <button
                onClick={() => cart.addItem(data)}
                className="text-gray-500"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
