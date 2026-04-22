import React from "react";

export function IncrementAndDegrementBtns({ counter, setCounter }) {
  const handleDecrement = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
      <button
        className="w-10 h-10 flex items-center justify-center bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80 transition-colors text-xl"
        onClick={handleIncrement}
      >
        +
      </button>
      <span className="w-12 h-10 flex items-center justify-center border-x border-gray-300 font-semibold text-lg">
        {counter}
      </span>
      <button
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xl"
        onClick={handleDecrement}
        disabled={counter <= 1}
      >
        −
      </button>
    </div>
  );
}
