import React, { useState } from "react";

const TemperatureCalculator = () => {
  const [inputCelsius, setInputCelsius] = useState<number | "">("");
  const [inputFahrenheit, setInputFahrenheit] = useState<number | "">("");
  const [inputKelvin, setInputKelvin] = useState<number | "">("");

  const [celsius, setCelsius] = useState<number | "">("");
  const [fahrenheit, setFahrenheit] = useState<number | "">("");
  const [kelvin, setKelvin] = useState<number | "">("");

  const handleConvert = () => {
    if (inputCelsius !== "") {
      const celsiusValue = Number(inputCelsius);
      setCelsius(celsiusValue);
      setFahrenheit(Number(((celsiusValue * 9) / 5 + 32).toFixed(2)));
      setKelvin(Number((celsiusValue + 273.15).toFixed(2)));
    } else if (inputFahrenheit !== "") {
      const fahrenheitValue = Number(inputFahrenheit);
      setFahrenheit(fahrenheitValue);
      setCelsius(Number((((fahrenheitValue - 32) * 5) / 9).toFixed(2)));
      setKelvin(
        Number((((fahrenheitValue - 32) * 5) / 9 + 273.15).toFixed(2))
      );
    } else if (inputKelvin !== "") {
      const kelvinValue = Number(inputKelvin);
      setKelvin(kelvinValue);
      setCelsius(Number((kelvinValue - 273.15).toFixed(2)));
      setFahrenheit(
        Number((((kelvinValue - 273.15) * 9) / 5 + 32).toFixed(2))
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-gray-200  mt-10">
      <div className="space-y-6">
        {/* Celsius Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Celsius
          </label>
          <input
            type="number"
            value={inputCelsius}
            onChange={(e) =>
              setInputCelsius(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-gray-900"
            placeholder="Enter Celsius"
          />
        </div>

        {/* Fahrenheit Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fahrenheit
          </label>
          <input
            type="number"
            value={inputFahrenheit}
            onChange={(e) =>
              setInputFahrenheit(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-gray-900"
            placeholder="Enter Fahrenheit"
          />
        </div>

        {/* Kelvin Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kelvin
          </label>
          <input
            type="number"
            value={inputKelvin}
            onChange={(e) =>
              setInputKelvin(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-gray-900"
            placeholder="Enter Kelvin"
          />
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition text-lg font-medium shadow-md"
        >
          Convert
        </button>

        {/* Results */}
        {celsius !== "" && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-inner">
            <h2 className="text-xl font-bold text-blue-700 mb-4">
              Conversion Results:
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Celsius:</span> {celsius}°C
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Fahrenheit:</span> {fahrenheit}°F
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Kelvin:</span> {kelvin}K
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemperatureCalculator;
