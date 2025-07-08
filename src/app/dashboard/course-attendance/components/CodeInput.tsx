import React from 'react';

interface CodeInputProps {
    value: string;
    onChange: (value: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter the check-in code provided by your instructor
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter code"
            />
        </div>
    );
};

export default CodeInput;