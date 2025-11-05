import React, { useState } from 'react';
import './App.css';
import './output.css'

function SumCalculator() {

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [sum, setSum] = useState(null);
  const [error, setError] = useState('');

 
  const handleCalculate = () => {
    setSum(null);
    setError('');
    if (num1.trim() === '' || num2.trim() === '') {
      setError('Please enter both numbers.');
      return; 
    }
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

  
    if (isNaN(n1) || isNaN(n2)) {
      setError('Inputs must be valid numbers');
      return; 
    }
    setSum(n1 + n2);
  };

  const createInput = (value, setValue, placeholder, ariaLabel) => (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        setError('');
        setSum(null);
      }}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sum Calculator
        </h1>
        <div className="space-y-4">
          <div>
            <label htmlFor="num1" className="block text-sm font-medium text-gray-700 mb-1">
              Number 1
            </label>
            {createInput(num1, setNum1, 'Example: 10', 'Number 1')}
          </div>
          <div>
            <label htmlFor="num2" className="block text-sm font-medium text-gray-700 mb-1">
              Number 2
            </label>
            {createInput(num2, setNum2, 'Example: 20', 'Number 2')}
          </div>
        </div>
        <button
          onClick={handleCalculate}
          className="w-full px-4 py-3 mt-6 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Calculate Sum
        </button>
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          {error && (
            <p className="text-lg font-medium text-red-600" aria-live="polite">
              {error}
            </p>
          )}
          {sum !== null && !error && (
            <p className="text-lg font-medium text-gray-900" aria-live="polite">
              Result: <span className="font-bold text-2xl text-green-600">{sum}</span>
            </p>
          )}
          {sum === null && !error && (
             <p className="text-lg text-gray-500">
              Input two numbers to calculate their sum.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SumCalculator;
