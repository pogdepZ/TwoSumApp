import React, { useState } from 'react';

// 1. Di chuyển InputField ra ngoài component SumCalculator
// 2. Sửa prop để nhận 'onChange'
const InputField = ({ value, onChange, valid, placeholder }) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      // Gọi prop 'onChange' đã được truyền vào
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-2 pr-10 border rounded-lg shadow-sm focus:outline-none
        ${valid === false ? 'border-red-500' : valid === true ? 'border-green-500' : 'border-gray-300'}
      `}
    />
    {valid === true && (
      <span className="absolute right-3 top-2 text-green-600 font-bold">✓</span>
    )}
    {valid === false && (
      <span className="absolute right-3 top-2 text-red-600 font-bold">✗</span>
    )}
  </div>
);

export default function SumCalculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [sum, setSum] = useState(null);
  const [error, setError] = useState('');
  const [valid1, setValid1] = useState(null);
  const [valid2, setValid2] = useState(null);

  const isValidNumber = (value) => /^-?\d*\.?\d*$/.test(value);

  // Hàm helper này vẫn giữ nguyên, rất tốt!
  const handleInput = (value, setValue, setValid) => {
    setValue(value);
    setSum(null);
    setError('');

    if (value.trim() === '') {
      setValid(null);
      return;
    }

    if (isValidNumber(value)) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleCalculate = () => {
    if (!valid1 || !valid2 || num1.trim() === '' || num2.trim() === '') {
      setError('Input must be valid numbers.');
      return;
    }
    setSum(parseFloat(num1) + parseFloat(num2));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sum Calculator
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number 1</label>
            {/* 3. Truyền một hàm mũi tên cho prop 'onChange' */}
            <InputField
              value={num1}
              valid={valid1}
              placeholder="Example: 10"
              onChange={(value) => handleInput(value, setNum1, setValid1)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number 2</label>
            {/* 3. Truyền một hàm mũi tên cho prop 'onChange' */}
            <InputField
              value={num2}
              valid={valid2}
              placeholder="Example: 20"
              onChange={(value) => handleInput(value, setNum2, setValid2)}
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full px-4 py-3 mt-6 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Calculate Sum
        </button>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          {error && <p className="text-lg font-medium text-red-600">{error}</p>}
          {sum !== null && !error && (
            <p className="text-lg font-medium text-gray-900">
              Result: <span className="font-bold text-2xl text-green-600">{sum}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}