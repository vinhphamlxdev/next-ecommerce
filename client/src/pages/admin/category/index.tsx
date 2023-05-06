import * as React from "react";
import AddCategory from "@/Admin/components/AddCategory";
import Input from "@/Admin/components/Input";
import LayoutAdmin from "@/Admin/components/layout";
import { BiSave } from "react-icons/bi";

export interface CategoryProps {}

export default function Category(props: CategoryProps) {
  return (
    <LayoutAdmin>
      <div className="admin-category mt-5 flex flex-col gap-y-4">
        <AddCategory />
        <div className="p-3 flex shadow-lg flex-col gap-y-4 bg-white rounded-lg">
          <h3 className="font-medium text-xl ">All Category</h3>
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col all-category gap-y-5 bg-white px-3 py-2 shadow-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                  <span className="text-gray-500 text-base">1)</span>
                  <i className="bi bi-pencil text-saveBg text-base cursor-pointer"></i>
                </div>
                <button className="delete-category ">
                  <i className="bi text-red-500 text-xl cursor-pointer bi-trash"></i>
                </button>
              </div>
              <form className="flex flex-col gap-y-5">
                <div className="category-name">
                  <input
                    className="px-3 w-full text-gray-500 py-3 bg-[#edede9]"
                    value="Quan kaki"
                    type="text"
                  />
                </div>
                <div className="category-desc">
                  <textarea
                    className="bg-[#edede9] outline-none py-4 px-3 text-sm text-gray-600 w-full resize-y"
                    name=""
                  ></textarea>
                </div>
                <div className="btn-add-category flex justify-center items-center">
                  <button className="add-category   shadow-md  hover:opacity-80 transition-all bg-saveBg px-3 text-sm   py-2 rounded-md text-white gap-x-1 flex justify-center items-center">
                    <BiSave></BiSave>
                    <span>Save</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
