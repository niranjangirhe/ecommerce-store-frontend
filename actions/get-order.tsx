import { Order } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

const getOrder = async (id: string, phone: string): Promise<Order> => {
  const response = await fetch(`${URL}/${id}?phone=${phone}`);
  const data = await response.json();
  return data;
};

export default getOrder;
