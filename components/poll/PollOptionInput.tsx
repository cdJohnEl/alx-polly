import React from "react";

interface PollOptionInputProps {
  options: string[];
  onChange: (options: string[]) => void;
  onAdd: () => void;
  onRemove: (idx: number) => void;
}

export default function PollOptionInput({ options, onChange, onAdd, onRemove }: PollOptionInputProps) {
  return (
    <div>
      <label className="block font-medium mb-1">Options *</label>
      {options.map((opt, idx) => (
        <div key={idx} className="flex gap-2 mb-2">
          <input
            type="text"
            value={opt}
            onChange={e => {
              const newOptions = [...options];
              newOptions[idx] = e.target.value;
              onChange(newOptions);
            }}
            className="w-full border rounded px-3 py-2"
            required
            aria-label={`Option ${idx + 1}`}
          />
          {options.length > 2 && (
            <button type="button" className="text-red-500 font-bold" onClick={() => onRemove(idx)} aria-label={`Remove option ${idx + 1}`}>-</button>
          )}
        </div>
      ))}
      <button type="button" className="mt-2 px-3 py-1 bg-gray-200 rounded" onClick={onAdd} aria-label="Add option">Add Option</button>
    </div>
  );
}
