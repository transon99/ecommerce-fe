import React from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { CiSearch } from "react-icons/ci";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";

type SearchInputProps = {};

const SearchInput = (props: SearchInputProps) => {
  return (
    <div className="flex flex-col ">
      <form className="relative mx-auto flex w-full max-w-lg items-center justify-between rounded-full border shadow-lg">
        <CiSearch className="absolute left-2 block h-5 w-5 text-gray-400" />
        <input
          type="name"
          name="search"
          className=" w-full rounded-full py-3 pr-40 pl-12 outline-none focus:ring-2"
          placeholder="City, Address, Zip :"
        />
        <Button className="absolute right-0 mr-1 inline-flex items-center justify-center rounded-full ">
          Search
        </Button>
      </form>
      {/* <div className="p-4 overflow-auto  z-99999">Hello</div> */}
    </div>
  );
};

export default SearchInput;
