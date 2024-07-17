"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { Input } from "@headlessui/react";
import React, { useState } from "react";

export default function OrderTrackerForm() {
  const [orderId, setOrderId] = useState("");
  const [phoneLastFour, setPhoneLastFour] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && phoneLastFour.length === 4 && /^\d+$/.test(phoneLastFour)) {
      router.push(
        `/order-tracker?orderId=${orderId}&phoneLastFour=${phoneLastFour}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <Input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="Enter Order ID"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      />
      <Input
        type="text"
        value={phoneLastFour}
        onChange={(e) => setPhoneLastFour(e.target.value)}
        placeholder="Last 4 digits of phone number"
        maxLength={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      />
      <Button className="mt-2" type="submit">
        Track Order
      </Button>
    </form>
  );
}
