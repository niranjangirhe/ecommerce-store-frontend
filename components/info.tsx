"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import IconButton from "./ui/icon-button";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const isAlreadyInCart = cart.isInCart(data.id);
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {data.name}
      </h1>
      <p className="mt-3 text-lg text-gray-500">{data.description}</p>
      <div className="mt-6 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black">Size:</h3>
        <div>
          {data.size.name} | {data.size.value}
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black">Color:</h3>
        <div>
          {data.color.name} |{" "}
          <div
            className="w-4 h-4 rounded-full inline-block align-middle border border-gray-600"
            style={{ backgroundColor: data.color.value }}
          />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        {isAlreadyInCart ? (
          <>
            <IconButton
              className="bg-black"
              icon={
                <Minus
                  className="text-white"
                  size={15}
                  onClick={() => cart.decrementQuantity(data.id)}
                />
              }
            />
            <span>Qty {cart.getQuantity(data.id)}</span>
            <IconButton
              className="bg-black"
              icon={
                <Plus
                  className="text-white"
                  size={15}
                  onClick={() => cart.addItem(data)}
                />
              }
            />
          </>
        ) : (
          <Button
            className="flex items-center gap-x-2"
            onClick={() => cart.addItem(data)}
          >
            Add to Cart
            <ShoppingCart size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Info;
