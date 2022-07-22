import "./App.css";

import { useCallback, useEffect, useState } from "react";

import { Circles } from "./components/Circles";

const App = () => {
  const [data, setData] = useState([10, 20, 30, 40, 50, 60, 70, 80]);

  const updateData = useCallback(() => {
    const count = 5 + Math.round(Math.random() * 15);
    const values = [];
    for (let i = 0; i < count; i++) {
      values[i] = 10 + Math.round(Math.random() * 70);
    }
    setData(values);
  }, []);

  const Button = () => (
    <button
      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      onClick={updateData}
    >
      Update Data
    </button>
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Circles data={data} />
      <Button />
    </>
  );
};

export default App;
