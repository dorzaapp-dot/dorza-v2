"use client";

import { useState } from "react";
import { Copy, Download } from "lucide-react";
import type { OnboardState, OnboardAction } from "@/lib/types";
import { generateMarkdown } from "@/lib/generateMarkdown";

interface Props {
  state: OnboardState;
  dispatch: React.Dispatch<OnboardAction>;
}

export default function StepReview({ state, dispatch }: Props) {
  const [copied, setCopied] = useState(false);
  const markdown = generateMarkdown(state);

  const update = (field: keyof OnboardState, value: unknown) =>
    dispatch({ type: "UPDATE_FIELD", field, value });

  function copyToClipboard() {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function downloadMarkdown() {
    const safeName = (state.businessName || "Client").replace(/[^a-zA-Z0-9]/g, "_");
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Dorza_${safeName}_Intake.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5">
      <h2 className="font-display font-bold text-2xl text-dark">
        Review & export
      </h2>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Notes
        </label>
        <textarea
          rows={3}
          value={state.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Any additional notes"
          className="w-full px-4 py-3 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Completed by
        </label>
        <input
          type="text"
          value={state.completedBy}
          onChange={(e) => update("completedBy", e.target.value)}
          className="w-full h-12 px-4 border border-border rounded-btn text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div className="bg-surface border border-border rounded-card p-4 max-h-96 overflow-auto">
        <pre className="text-xs text-dark font-mono whitespace-pre-wrap leading-relaxed">
          {markdown}
        </pre>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={copyToClipboard}
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 bg-primary hover:bg-primary-dark text-white font-semibold rounded-btn transition-colors"
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Copy markdown"}
        </button>
        <button
          type="button"
          onClick={downloadMarkdown}
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 border border-border text-dark font-semibold rounded-btn hover:bg-surface transition-colors"
        >
          <Download size={16} />
          Download .md
        </button>
      </div>
    </div>
  );
}
