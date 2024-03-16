"use client";
import { activeCountryState } from "@/lib/ui";
import { Avatar, SelectItem as Item, Select } from "@nextui-org/react";
export default function SelectItem({ countries, onChange }) {
  const handleSelectionChange = (e) => {
    onChange(e.target.value);
    activeCountryState.set(e.target.value);
  };

  return (
    <Select
      aria-label="country"
      placeholder="Select a country"
      onChange={handleSelectionChange}
      classNames={{
        base: "w-full ",
        popoverContent: "w-fit",
        label: "bg-transparent",
        trigger:
          "bg-transparent shadow-none w-[30px] hover:!bg-transparent p-0",
        value: "opacity-0",
      }}
      autoFocus
      labelPlacement = {"inside"}
    >
      {countries?.map((value) => {
        return (
          <Item
            key={value.code}
            startContent={
              <Avatar
                alt="Argentina"
                className="w-6 h-6"
                src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${value.code.toUpperCase()}.svg`}
              />
            }
          >
            {value.code}
          </Item>
        );
      })}
    </Select>
  );
}
