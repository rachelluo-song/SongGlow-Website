"use client";

export default function PrintChecklistButton() {
  return (
    <button
      type="button"
      className="btn btn-navy btn-lg quote-checklist-print-button"
      onClick={() => window.print()}
      data-analytics-event="BOM Quote Checklist Printed"
      data-analytics-location="hero"
    >
      Print or Save as PDF
    </button>
  );
}
