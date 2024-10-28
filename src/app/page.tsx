"use client";
import Image from "next/image";
import car from "/public/car.png";
import Dropdown, { VehicleMake } from "./components/Dropdown";
import { useEffect, useState } from "react";
import Link from "next/link";

const years = [
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
];
export default function Home() {
  const [typeState, setTypeState] = useState<boolean>(false);
  const [modelState, setModelState] = useState<boolean>(false);
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [makeId, setMakeId] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json",
        );

        if (!response.ok) {
          throw new Error("There was an error fetching the data");
        }

        const data = await response.json();
        setMakes(data.Results);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchVehicleMakes();
  }, []);

  return (
    <section className="grid grid-cols-2 w-full h-screen relative">
      <div className="bg-[#1e69ac] h-full relative">
        <p className="absolute left-0 top-1/2 transform -translate-y-1/4 -translate-x-1/3 -rotate-90 text-white opacity-20 text-5xl 2xl:text-[80px] font-bold hidden lg:block">
          Explore, Find, Drive
        </p>
        <div className="absolute bottom-36 right-10">
          <Dropdown
            type={makes}
            setState={setTypeState}
            setMakeId={setMakeId}
          />
        </div>
      </div>
      <div className="bg-[#fafafa] h-full relative">
        <div className="absolute bottom-36 left-10 flex gap-16">
          <Dropdown model={years} setState={setModelState} setYear={setYear} />
          <Link
            href={`result/${makeId}/${year}`}
            className={`absolute -bottom-20 -left-24 sm:relative sm:left-0 sm:bottom-0 px-12 lg:px-20 py-2 rounded-md text-white duration-500 flex justify-center items-center ${typeState && modelState ? "bg-[#24bb7c] hover:bg-[#20855b]" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Next
          </Link>
        </div>
      </div>
      <Image
        src={car}
        alt="blue car"
        width={500}
        className="absolute top-[30%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 2xl:w-[800px]"
      />
    </section>
  );
}
