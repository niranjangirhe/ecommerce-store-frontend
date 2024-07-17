import getOrder from "@/actions/get-order";
import OrderTrackerForm from "./order-tracker-form";
import OrderDetails from "./order-details";

export default async function OrderTrackerServer({
  orderId,
  phoneLastFour,
}: {
  orderId: string;
  phoneLastFour: string;
}) {
  let order = null;
  let error = null;

  if (orderId && phoneLastFour) {
    try {
      order = await getOrder(orderId, phoneLastFour);
    } catch (err) {
      error =
        "Unable to find the order. Please check your details and try again.";
    }
  }

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Order Tracker</h1>
      <OrderTrackerForm />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {order && <OrderDetails order={order} />}
    </div>
  );
}
