"use client";
import { useState } from "react";

export interface VehicleMake {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}
interface Props {
  type?: VehicleMake[];
  model?: string[];
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setMakeId?: React.Dispatch<React.SetStateAction<string>>;
  setYear?: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown = ({ type, model, setState, setMakeId, setYear }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setState(true);
    if (type && setMakeId) setMakeId(event.target.value);
    else if (model && setYear) {
      setYear(event.target.value);
    }
  };

  return (
    <div className="relative w-40 lg:w-48">
      <select
        id="options"
        value={selectedOption}
        onChange={handleSelectChange}
        className={`${type ? "bg-[#fafafa] text-[#1e69ac]" : "bg-[#1e69ac] text-[#fafafa]"} block w-full  border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500 focus:border-blue-500 p-4`}
      >
        <option value="" disabled className="text-[#000]">
          {` Select a ${type ? "type" : "model"}`}
        </option>{" "}
        {type?.map((element, index) => {
          return (
            <option value={element.MakeId} key={index}>
              {element.MakeName}
            </option>
          );
        })}
        {model?.map((element, index) => {
          return (
            <option
              value={element}
              key={index}
              className={`${model ?? "text-[#fafafa]"}`}
            >
              {element}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
