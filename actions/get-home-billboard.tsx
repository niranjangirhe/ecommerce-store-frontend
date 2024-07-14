import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards/homepage`;

const getHomepageBillboard = async (): Promise<Billboard> => {
  const response = await fetch(`${URL}`);
  const data = await response.json();
  return data;
};

export default getHomepageBillboard;
