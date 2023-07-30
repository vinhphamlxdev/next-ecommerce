import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "@/service/CategoryApi";
import { ICategory, ICategoryResponse } from "@/types/interface";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import usePaginationAndFilters, {
  FiltersState,
  PaginationState,
} from "@/hooks/usePaginationAndFilters";
export interface IFilterByCategoryProps {
  filters: any;
  onChangeCategory: (slug: string) => void;
}

export default function FilterByCategory({
  filters,
  onChangeCategory,
}: IFilterByCategoryProps) {
  const router = useRouter();
  const { query } = router;
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );

  const { data } = useQuery({
    queryKey: ["categorys"],
    queryFn: () =>
      getAllCategory({
        itemsPerpage: 1,
      }),
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <StyledFilterCategory className="flex gap-y-4 flex-col">
      {data?.categorys?.length > 0 &&
        data?.categorys?.map((category: ICategory) => {
          return (
            <div key={category.id} className="flex ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={category.slug === selectedCategory}
                    onChange={() => {
                      onChangeCategory(category.slug as string);
                      setSelectedCategory(category.slug as string);
                      const queryParams = { ...query };
                      if (category.slug) {
                        queryParams.category = category.slug;
                      } else {
                        delete queryParams.category;
                      }
                      router.push({
                        pathname: router.pathname,
                        query: queryParams,
                      });
                    }}
                  />
                }
                label={category.name}
              />
            </div>
          );
        })}
    </StyledFilterCategory>
  );
}
const StyledFilterCategory = styled.div`
  .css-j204z7-MuiFormControlLabel-root .MuiFormControlLabel-label {
    text-transform: capitalize;
    user-select: none;
  }
  .MuiCheckbox-root {
    color: #b7b7a4;
    /* color: #f9a825; */
    padding: 4px;
  }
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked,
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate {
    /* color: #f9a825; */
    color: #b7b7a4;
  }
`;
