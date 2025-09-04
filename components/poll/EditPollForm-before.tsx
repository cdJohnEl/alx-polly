"use client";
import { useState, useEffect } from "react";
import { Poll, PollSettings } from "@/lib/types";

interface EditPollFormProps {
  poll: Poll;
  onSave: (updatedPoll: Poll) => void;
  onCancel: () => void;
}

export default function EditPollForm({ poll, onSave, onCancel }: EditPollFormProps) {
  const [tab, setTab] = useState<"basic" | "settings">("basic");
  const [title, setTitle] = useState(poll.title);
  const [description, setDescription] = useState(poll.description || "");
  const [options, setOptions] = useState(poll.options);
  const [settings, setSettings] = useState<PollSettings>(poll.settings);
  const [error, setError] = useState<string | null>(null);

  // Update form when poll prop changes
  useEffect(() => {
    setTitle(poll.title);
    setDescription(poll.description || "");
    setOptions(poll.options);
    setSettings(poll.settings);
  }, [poll]);

  function handleAddOption() {
    if (options.length < 10) setOptions([...options, ""]);
  }

  function handleRemoveOption(idx: number) {
    if (options.length > 2) setOptions(options.filter((_, i) => i !== idx));
  }

  function handleOptionChange(idx: number, value: string) {
    setOptions(options.map((opt, i) => (i === idx ? value : opt)));
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

    const updatedPoll: Poll = {
      ...poll,
      title: title.trim(),
      description: description.trim() || undefined,
      options: options.filter(Boolean),
      settings,
      updatedAt: new Date().toISOString(),
    };

    onSave(updatedPoll);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          className={`font-semibold px-4 py-2 rounded ${
            tab === "basic" ? "bg-primary text-white" : "bg-gray-100"
          }`}
          onClick={() => handleTabSwitch("basic")}
        >
          Basic Info
        </button>
        <button
          type="button"
          className={`font-semibold px-4 py-2 rounded ${
            tab === "settings" ? "bg-primary text-white" : "bg-gray-100"
          }`}
          onClick={() => handleTabSwitch("settings")}
        >
          Settings
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {tab === "basic" && (
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Poll Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={2}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Options *</label>
            {options.map((opt, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    className="text-red-500 font-bold px-2"
                    onClick={() => handleRemoveOption(idx)}
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleAddOption}
            >
              Add Option
            </button>
          </div>
        </div>
      )}

      {tab === "settings" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="multipleChoice"
              checked={settings.multipleChoice}
              onChange={(e) =>
                setSettings({ ...settings, multipleChoice: e.target.checked })
              }
            />
            <label htmlFor="multipleChoice" className="font-medium">
              Allow multiple choice voting
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="requireLogin"
              checked={settings.requireLogin}
              onChange={(e) =>
                setSettings({ ...settings, requireLogin: e.target.checked })
              }
            />
            <label htmlFor="requireLogin" className="font-medium">
              Require login to vote
            </label>
          </div>
          <div>
            <label className="block font-medium mb-1">End Date (Optional)</label>
            <input
              type="datetime-local"
              value={settings.endDate || ""}
              onChange={(e) =>
                setSettings({ ...settings, endDate: e.target.value || undefined })
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primary/90 transition"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
