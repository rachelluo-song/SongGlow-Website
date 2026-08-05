"use client";

import { useEffect } from "react";
import { getInquiryAttribution } from "@/lib/attribution";

export default function InquiryAttribution() {
  useEffect(() => {
    getInquiryAttribution();
  }, []);

  return null;
}
