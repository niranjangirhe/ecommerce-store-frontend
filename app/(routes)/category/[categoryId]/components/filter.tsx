"use client";

import qs from "query-string";

import { Size, Color } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";

interface FilterProps {
  valueKey: string;
  name: string;
  data: (Size | Color)[];
}

const Filter: React.FC<FilterProps> = ({ valueKey, name, data }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams.get(valueKey);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  const onClick = (id: string) => {
    setIsLoading(true);
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url, { scroll: false });
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          <>
            <div className="flex items-center justify-center w-full ">
              <Loader className="w-10 h-10 animate-spin" />
            </div>
          </>
        ) : (
          <>
            {data.map((item) => (
              <div key={item.id} className="flex items-center">
                <Button
                  className={cn(
                    "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                    selectedValue === item.id && "bg-black text-white"
                  )}
                  onClick={() => onClick(item.id)}
                  disabled={isLoading}
                >
                  {item.name}
                </Button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Filter;
