"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchBar({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <input
        onChange={(event) => handleSearch(event.target.value)}
        type="text"
        placeholder={placeholder}
        className="bg-white border-2 border-sky-400 text-white p-2 rounded-lg w-1/2"
        defaultValue={searchParams.get("query")?.toString()}
      />
      <button className=" p-2 rounded-lg">
        <MagnifyingGlassIcon className="h-7 w-7 text-sky-400" />
      </button>
    </div>
  );
}
