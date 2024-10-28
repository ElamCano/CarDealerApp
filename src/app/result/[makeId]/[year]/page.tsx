import ClientComponent from "./ClientComponent";
export async function generateStaticParams(): Promise<{ params: Params }[]> {
  const res = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json",
  );
  const data = await res.json();
  const makes = data.Results;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 9 }, (_, i) => currentYear - i);

  return makes.flatMap((make: any) =>
    years.map((year) => ({
      params: {
        makeId: make.MakeId.toString(),
        year: year.toString(),
      },
    })),
  );
}

interface Params {
  makeId: string;
  year: string;
}

const ResultPage = async ({ params }: { params: Params }) => {
  const { makeId, year } = params;

  return (
    <div className="flex flex-col gap-10 h-auto w-full bg-[#1e69ac] text-[#fafafa] p-10">
      <h1 className="text-4xl font-semibold">Make ID: {makeId}</h1>
      <h2 className="text-2xl font-medium">Year: {year}</h2>
      <ClientComponent makeId={makeId} year={year} />
    </div>
  );
};

export default ResultPage;
