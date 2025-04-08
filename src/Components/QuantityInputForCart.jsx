import { useState } from "react";



function QuantityInputForCart({currentValue, productID, updateFunction}) {

    const [value, setValue] = useState(currentValue);

    const increase = () => {

      setValue((prev) => prev + 1);

      updateFunction(productID, (value + 1));

    };
  
    const decrease = () => {

      setValue((prev) => Math.max(1, prev - 1)); // Prevent negative values

      if (!(Math.max(1, value) === 1)){

        updateFunction(productID, (Math.max(1, value - 1)));

      }


    };
  
    return (
      <div className="relative flex items-start justify-center">
        <button
          onClick={decrease}
          className="absolute left-1 top-0 bg-gray-100 p-2.5 text-center text-sm text-white transition-all hover:bg-gray-300 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#000000" className="w-4 h-4">
            <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
          </svg>
        </button>
  
        <input
          type="number"
          value={value}
          readOnly
          className="w-1/2 text-center bg-gray-200 py-2 placeholder:text-slate-400 text-slate-700 text-sm transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
  
        <button
          onClick={increase}
          className="absolute right-1 top-0 bg-gray-100 p-2.5 text-center text-sm text-white transition-all hover:bg-gray-300 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#000000" className="w-4 h-4">
            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
          </svg>
        </button>
      </div>
    );

}

export default QuantityInputForCart