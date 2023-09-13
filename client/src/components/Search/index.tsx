import LoadingButton from "@/Admin/components/Loading/LoadingButton";
import useDisabled from "@/hooks/useDisabled";
import { getProductByKeyword } from "@/pages/api/ProductApi";
import { IProduct } from "@/types/interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { BsFilterLeft } from "react-icons/bs";
import { toast } from "react-toastify";

export interface ISearchProps {
  setSearchResult: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export default function Search({ setSearchResult }: ISearchProps) {
  const [search, setSearch] = React.useState<string>("");
  const queryClient = useQueryClient();
  const { data, isLoading, mutate } = useMutation({
    mutationFn: (keyword: string) => getProductByKeyword(keyword),
    onSuccess: (data) => {
      console.log("data search:", data);
      queryClient.setQueryData(["search", search], data.products);
      setSearchResult(data?.products);
    },
    onError: (err: any) => {
      toast.warning(`${err?.response?.data}`);
    },
  });
  const handleChange = (event: any) => {
    const { value } = event.target;
    setSearch(value);
  };
  const handleSubmit = () => {
    if (!search) {
      return;
    }
    mutate(search);
  };
  React.useEffect(() => {
    const cachedSearchResults = queryClient.getQueryData<IProduct[]>([
      "search",
    ]);
    setSearchResult(cachedSearchResults || []);
  }, [queryClient]);

  const { isDisabled, disabledStyle } = useDisabled(isLoading);
  return (
    <div className="search-section rounded-md ">
      <div className="flex flex-col gap-y-3 ">
        <div className="flex gap-x-3 items-center">
          <BsFilterLeft className="text-gray-500"></BsFilterLeft>
          <div className=" font-medium  top-7 left-14 text-gray-500 text-xl">
            Tìm kiếm
          </div>
        </div>
        <div className="search-form flex relative overflow-hidden">
          <input
            value={search}
            onChange={handleChange}
            className="text-textPrimary flex-1 border-r-0 text-sm outline-none h-10 border border-gray-400 rounded-sm px-3 focus:border-bgPrimary"
            type="text"
            placeholder="Tìm kiếm theo..."
          />
          <button
            disabled={isDisabled}
            style={disabledStyle}
            type="submit"
            onClick={handleSubmit}
            className="text-white w-14 bg-bgPrimary px-3 transition-all rounded-sm h-10 hover:bg-secondary"
          >
            {isDisabled ? <LoadingButton /> : <span> Tìm</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
