

"use client";

import { useState } from "react";
import PollOptionInput from "./PollOptionInput";

interface PollSettings {
  multipleChoice: boolean;
  requireLogin: boolean;
  endDate?: string;
}

interface CreatePollFormProps {
  onCreate: (data: {
    title: string;
    description?: string;
    options: string[];
    settings: PollSettings;
  }) => void;
}

export default function CreatePollForm({ onCreate }: CreatePollFormProps) {
  const [tab, setTab] = useState<"basic" | "settings">("basic");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [settings, setSettings] = useState<PollSettings>({
    multipleChoice: false,
    requireLogin: true,
    endDate: undefined,
  });
  const [error, setError] = useState<string | null>(null);

  function handleAddOption() {
    if (options.length < 10) setOptions([...options, ""]);
  }
  function handleRemoveOption(idx: number) {
    if (options.length > 2) setOptions(options.filter((_, i) => i !== idx));
  }
  function handleOptionsChange(newOptions: string[]) {
    setOptions(newOptions);
  }
  function handleTabSwitch(tab: "basic" | "settings") {
    setTab(tab);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Poll title is required.");
      return;
    }
    if (options.filter(Boolean).length < 2) {
      setError("At least 2 options are required.");
      return;
    }
    setError(null);
    onCreate({ title, description, options: options.filter(Boolean), settings });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6">
      <div className="flex gap-4 mb-6">
        <button type="button" className={`font-semibold px-4 py-2 rounded ${tab === "basic" ? "bg-primary text-white" : "bg-gray-100"}`} onClick={() => handleTabSwitch("basic")}>Basic Info</button>
        <button type="button" className={`font-semibold px-4 py-2 rounded ${tab === "settings" ? "bg-primary text-white" : "bg-gray-100"}`} onClick={() => handleTabSwitch("settings")}>Settings</button>
      </div>
      {tab === "basic" && (
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="poll-title">Poll Title *</label>
            <input id="poll-title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="poll-description">Description</label>
            <textarea id="poll-description" value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows={2} />
          </div>
          <PollOptionInput
            options={options}
            onChange={handleOptionsChange}
            onAdd={handleAddOption}
            onRemove={handleRemoveOption}
          />
        </div>
      )}
      {tab === "settings" && (
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={settings.multipleChoice} onChange={e => setSettings(s => ({ ...s, multipleChoice: e.target.checked }))} />
              Allow users to select multiple options
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={settings.requireLogin} onChange={e => setSettings(s => ({ ...s, requireLogin: e.target.checked }))} />
              Require users to be logged in to vote
            </label>
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="poll-end-date">Poll End Date</label>
            <input id="poll-end-date" type="date" value={settings.endDate || ""} onChange={e => setSettings(s => ({ ...s, endDate: e.target.value }))} className="border rounded px-3 py-2" />
          </div>
        </div>
      )}
      {error && <div className="text-red-500 font-medium mt-4">{error}</div>}
      <div className="flex justify-between mt-8">
        <a href="/" className="text-gray-500 hover:underline">Cancel</a>
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded font-semibold shadow hover:bg-primary/90 transition">Create Poll</button>
      </div>
    </form>
  );
}
