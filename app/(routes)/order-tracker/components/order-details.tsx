import ProductList from "@/components/product-list";
import Currency from "@/components/ui/currency";
import { Order, OrderStatus } from "@/types";

const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case "Created":
      return "bg-gray-500";
    case "Processing":
      return "bg-orange-500";
    case "Shipped":
      return "bg-blue-500";
    case "Delivered":
      return "bg-green-500";
    case "Canceled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export default function OrderDetails({ order }: { order: Order }) {
  return (
    <div className="mt-6 space-y-5">
      <div>
        <h2 className="text-xl font-semibold mb-2">Order Details:</h2>
        <div className="flex items-center space-x-2 mb-2">
          <div
            className={`w-4 h-4 rounded-full ${getStatusColor(order.status)}`}
          />
          <span className="text-lg font-medium">{order.status}</span>
        </div>
        <p>
          <strong>Order ID:</strong> {order.id}
        </p>
        <p>
          <strong>Total Amount:</strong>{" "}
          <span className="inline-block">
            <Currency value={order.totalAmount} />
          </span>
        </p>
        <p>
          <strong>Name:</strong> {order.name}
        </p>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Phone:</strong> {order.phone}
        </p>
        <p>
          <strong>Address:</strong> {order.address}, {order.city}, {order.state}{" "}
          {order.postalCode}, {order.country}
        </p>
      </div>
      <div>
        <ProductList
          title="Order Items:"
          items={order.orderItems.map((item) => ({
            ...item.product,
            quantity: item.quantity,
          }))}
        />
      </div>
    </div>
  );
}
