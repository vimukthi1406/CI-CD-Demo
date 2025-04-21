import { useState } from "react";
import Layout from "../components/layout";

// Define a proper type for the bill breakdown
type BillBreakdown = {
  fixedCharge: number;
  energyCharge: number;
  fuelAdjustment: number;
};

// Sri Lankan electricity tariff structure as of 2025
const electricityRates = {
  residential: {
    fixedCharge: [
      { maxUnits: 30, charge: 120 },
      { maxUnits: 60, charge: 240 },
      { maxUnits: 90, charge: 360 },
      { maxUnits: 120, charge: 480 },
      { maxUnits: 180, charge: 600 },
      { maxUnits: Infinity, charge: 960 }
    ],
    unitCharge: [
      { maxUnits: 30, rate: 8 },
      { maxUnits: 60, rate: 10 },
      { maxUnits: 90, rate: 16 },
      { maxUnits: 120, rate: 50 },
      { maxUnits: 180, rate: 50 },
      { maxUnits: Infinity, rate: 75 }
    ]
  },
  commercial: {
    fixedCharge: [
      { maxUnits: 100, charge: 600 },
      { maxUnits: 300, charge: 1500 },
      { maxUnits: Infinity, charge: 3000 }
    ],
    unitCharge: [
      { maxUnits: 100, rate: 21 },
      { maxUnits: 300, rate: 23 },
      { maxUnits: Infinity, rate: 28 }
    ]
  },
  industrial: {
    fixedCharge: [
      { maxUnits: 300, charge: 1200 },
      { maxUnits: Infinity, charge: 3000 }
    ],
    unitCharge: [
      { maxUnits: 300, rate: 19 },
      { maxUnits: Infinity, rate: 22 }
    ]
  },
  religious: {
    fixedCharge: [
      { maxUnits: Infinity, charge: 240 }
    ],
    unitCharge: [
      { maxUnits: 30, rate: 4 },
      { maxUnits: 90, rate: 5 },
      { maxUnits: 120, rate: 6 },
      { maxUnits: 180, rate: 7.5 },
      { maxUnits: Infinity, rate: 9 }
    ]
  }
};

// Helper function to calculate electricity bill
const calculateSriLankanBill = (
  units: number,
  type: string
): { total: number; breakdown: BillBreakdown } => {
  if (isNaN(units) || units < 0) {
    return {
      total: 0,
      breakdown: { fixedCharge: 0, energyCharge: 0, fuelAdjustment: 0 }
    };
  }

  const tariff = electricityRates[type as keyof typeof electricityRates];

  // Calculate fixed charge
  let fixedCharge = 0;
  for (const tier of tariff.fixedCharge) {
    if (units <= tier.maxUnits) {
      fixedCharge = tier.charge;
      break;
    }
  }

  // Calculate energy charge
  let energyCharge = 0;
  let remainingUnits = units;
  let lastMaxUnits = 0;

  for (const tier of tariff.unitCharge) {
    const tierUnits = Math.min(remainingUnits, tier.maxUnits - lastMaxUnits);
    if (tierUnits > 0) {
      energyCharge += tierUnits * tier.rate;
      remainingUnits -= tierUnits;
    }
    lastMaxUnits = tier.maxUnits;
    if (remainingUnits <= 0) break;
  }

  // Fuel adjustment charge (approximate 15% of energy charge)
  const fuelAdjustment = energyCharge * 0.15;

  // Total bill amount
  const total = fixedCharge + energyCharge + fuelAdjustment;

  return {
    total,
    breakdown: {
      fixedCharge,
      energyCharge,
      fuelAdjustment
    }
  };
};

export default function Home() {
  const [units, setUnits] = useState("");
  const [type, setType] = useState("residential");
  const [bill, setBill] = useState<{ total: number; breakdown: BillBreakdown } | null>(null);

  const handleCalculate = () => {
    const calculatedBill = calculateSriLankanBill(parseFloat(units), type);
    setBill(calculatedBill);
  };

  return (
    <div
      className="min-h-screen w-full bg-fixed"
      style={{
        backgroundImage: "url('https://wallpaperaccess.com/full/8884386.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <Layout>
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-xl">
              <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Sri Lanka Electricity Bill Calculator
              </h1>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Consumption (Units)
                </label>
                <input
                  type="number"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  placeholder="Enter units consumed"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Consumer Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="religious">Religious & Charitable</option>
                </select>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Calculate Bill
              </button>

              {bill !== null && (
                <div className="mt-6 p-4 border rounded-md bg-white">
                  <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
                    Electricity Bill Breakdown
                  </h2>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Fixed Charge:</span>
                      <span>Rs. {bill.breakdown.fixedCharge.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Energy Charge:</span>
                      <span>Rs. {bill.breakdown.energyCharge.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Fuel Adjustment:</span>
                      <span>Rs. {bill.breakdown.fuelAdjustment.toFixed(2)}</span>
                    </div>

                    <div className="pt-2 border-t border-gray-300 flex justify-between font-bold text-lg">
                      <span><h2>Total Amount:</h2></span>
                      <span><h3>Rs. {bill.total.toFixed(2)}</h3></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
