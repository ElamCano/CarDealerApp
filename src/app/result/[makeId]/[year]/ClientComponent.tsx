"use client";
import React, { Suspense, useEffect, useState } from "react";

interface ClientComponentProps {
  makeId: string;
  year: string;
}

const ClientComponent = ({ makeId, year }: ClientComponentProps) => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
        );

        if (!response.ok) {
          throw new Error("There was an error fetching the data");
        }

        const data = await response.json();
        setVehicles(data.Results);
        console.log(data.Results);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchVehicleMakes();
  }, []);
  const Loading = () => <div>Loading...</div>;

  return (
    <section className="flex flex-col w-full bg-[#fafafa] p-8 rounded-md gap-10">
      <h1 className="text-4xl font-semibold text-[#1e69ac]">
        {vehicles[0] && vehicles[0].Make_Name}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full ">
        {vehicles.map((element, index) => {
          return (
            <Suspense fallback={<Loading />} key={index}>
              <div className="flex flex-col items-center text-black bg-slate-200 cursor-pointer rounded-lg hover:scale-105 duration-300">
                <h1 className="w-full bg-gradient-to-r from-[#1e69ac] to-[#a8d0e6] font-semibold p-2 rounded-md">
                  Model: {element.Model_ID}
                </h1>
                <p className="p-2">
                  <span className="font-semibold">Name: </span>
                  {element.Model_Name}
                </p>
              </div>
            </Suspense>
          );
        })}
      </div>
    </section>
  );
};

export default ClientComponent;
