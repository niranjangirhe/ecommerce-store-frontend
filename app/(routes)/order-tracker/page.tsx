import { Suspense } from "react";
import OrderTrackerServer from "./components/order-tracker-server";
import Container from "@/components/ui/container";
import Loader from "@/components/ui/loader";

export default function OrderTrackerPage({
  searchParams,
}: {
  searchParams: { orderId?: string; phoneLastFour?: string };
}) {
  const { orderId = "", phoneLastFour = "" } = searchParams;

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Track Order</h1>
          <div className="mt-12 lg:items-start">
            <Suspense fallback={<Loader />}>
              <OrderTrackerServer
                orderId={orderId}
                phoneLastFour={phoneLastFour}
              />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}
