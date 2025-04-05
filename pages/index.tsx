import { useState } from "react";
import Layout from "../components/layout";  // Correct path to layout component
import { calculateBill } from "@/utils/calculateBill";  // Correct path to the utility

export default function Home() {
  const [units, setUnits] = useState("");
  const [type, setType] = useState("residential");
  const [bill, setBill] = useState<number | null>(null);

  const handleCalculate = () => {
    setBill(calculateBill(parseFloat(units), type));
  };

  return (
    <Layout>
      <input
        type="number"
        value={units}
        onChange={(e) => setUnits(e.target.value)}
        placeholder="Enter units"
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
      </select>
      <button onClick={handleCalculate}>Calculate</button>
      {bill !== null && <h2>Your Bill: ${bill.toFixed(2)}</h2>}
    </Layout>
  );
}
