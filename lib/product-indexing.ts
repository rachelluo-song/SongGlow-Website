import type { Product } from "@/lib/catalog";

/**
 * Exact-part pages that earned at least one Google Search impression during
 * 2026-07-05..2026-10-02. Keep this list deliberately small: catalog rows are
 * RFQ references, not public inventory or ecommerce offers.
 *
 * Match on section + part slug rather than category slug so category naming
 * cleanups do not accidentally de-index a page that already has search demand.
 */
const SEARCH_VALIDATED_PARTS = new Set<string>([
  "components:25CHV100M6.3X8",
  "components:25CZE330M10X9",
  "components:25PKV330M8X10.5",
  "components:35PHV270M10X10.5",
  "components:35PJV390M10X12.5",
  "components:35PKV470M10X12.5",
  "components:35PLV150M10X10.5",
  "components:403I35D25M00000",
  "components:445C33D24M00000",
  "components:445I23D12M00000",
  "components:445I23D25M00000",
  "components:63PEV56M10X10.5",
  "components:63PKV56M8X10.5",
  "components:AB26TRB-32.768KHZ-T",
  "components:ABM3-16.000MHZ-D2Y-T",
  "components:ABM7-12.000MHZ-D2Y-T",
  "components:ABM7-20.000MHZ-D2Y-T",
  "components:ABM7-25.000MHZ-D2Y-T",
  "components:ABM8-25.000MHZ-B2-T",
  "components:ABM8-27.120MHZ-10-D1G-T",
  "components:ABM8-272-T3",
  "components:AC0402FR-07100KL",
  "components:AC0402FR-07100RL",
  "components:AC0402FR-0710KL",
  "components:AC0402FR-071KL",
  "components:AC0402FR-074K7L",
  "components:AC0603FR-070RL",
  "components:AC0603FR-0710KL",
  "components:AC0603FR-0710RL",
  "components:AC0805FR-07360RL",
  "components:AXGD10402KR",
  "components:B41580A8159M000",
  "components:CM315D32768DZFT",
  "components:CM315D32768DZYT",
  "components:CM315D32768HZFT",
  "components:CM7V-T1A-32.768KHZ-6PF-20PPM-TA-QC",
  "components:CM8V-T1A-32.768KHZ-9PF-20PPM-TB-QA",
  "components:CS06654-32M",
  "components:CS10820-24M",
  "components:EEE-FK1J101P",
  "components:HCM4912000000ABJT",
  "components:LNCD1-24M",
  "components:RC0201FR-0710KL",
  "components:RC0201FR-0747KL",
  "components:RC0402FR-07100KL",
  "components:RC0402FR-07100RL",
  "components:RC0402FR-0710KL",
  "components:RC0402FR-0712KL",
  "components:RC0402FR-071KL",
  "components:RC0402FR-0720RL",
  "components:RC0402FR-0722KL",
  "components:RC0402FR-0724K9L",
  "components:RC0402FR-0727RL",
  "components:RC0402FR-072K7L",
  "components:RC0402FR-07499RL",
  "components:RC0402FR-074K7L",
  "components:RC0603FR-07100RL",
  "components:RC0603FR-0710KL",
  "components:RC0603FR-0715KL",
  "components:RC0603FR-073K3L",
  "components:RC0603FR-07560RL",
  "components:RC0603JR-07100KL",
  "components:RC0805FR-075K1L",
  "components:RT0603BRD07100KL",
  "components:SRP4020TA-2R2M",
  "components:STDMUS2-32.768K",
  "hardware:BH-SS-SHCS-5-16-18-1-2-316",
  "hardware:DS-RED-13x51",
  "hardware:DS-RED-13x64",
  "hardware:FMT-0.03-3-4-99",
  "hardware:FW-BLK-304-1-4-1",
  "hardware:FW-DELRIN-M4",
  "hardware:FW-PTFE-1-4-1-4",
  "hardware:FW-PTFE-M3",
  "hardware:FW-PTFE-M4",
  "hardware:LP-SHCS-M8-60-PART-BLK",
  "hardware:OCRT-3-15",
  "hardware:OR-BN-S50-128",
  "hardware:OR-BN-S50-250",
  "hardware:OR-BN-S50-266",
  "hardware:OR-BN-S50-271",
  "hardware:OR-BN-S50-278",
  "hardware:OR-BN-S50-34x3",
  "hardware:OR-BN-S50-44x3",
  "hardware:OR-EPDM-002-70A",
  "hardware:OR-EPDM-17x2-70A",
  "hardware:OR-PU-017-70A",
  "hardware:OR-PU-249-70A",
  "hardware:OR-PU-258-70A",
  "hardware:PP-316-M6-20mm-316-2",
  "hardware:PP-SS-SHCS-M3-6-BLK-304",
  "hardware:SF-ACR-3-10",
  "hardware:SHCS-M12-60-PART-BLK",
  "hardware:SHCS-M3-10-BLK",
  "hardware:SM-304-8-3-4-304",
  "hardware:TR-316-1-4-20-3FT",
  "hardware:TR-AL-1-4-20-1FT",
  "hardware:TR-AL-3-8-16-3FT",
  "hardware:TR-AL-3-8-16-6FT",
  "hardware:TR-BR-1-4-20-1FT",
  "hardware:ULP-SHCS-10-24-3-4-BLK",
  "hardware:ZN-THIN-M8x1.25",
]);

const MIN_EDITORIAL_DESCRIPTION_LENGTH = 160;
const MIN_EDITORIAL_SPEC_COUNT = 3;

function productKey(product: Product): string {
  return `${product.section}:${product.part_number
    .replace(/[^A-Za-z0-9._~]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
}

/**
 * A product page is indexable when Google has already shown it in Search, or
 * when an editor has supplied meaningful unique copy plus structured specs.
 * The catalog remains fully accessible to users; non-selected detail pages use
 * noindex,follow and stay out of XML sitemaps.
 */
export function shouldIndexProduct(product: Product): boolean {
  if (SEARCH_VALIDATED_PARTS.has(productKey(product))) return true;

  const description = product.description?.trim() ?? "";
  const specCount = Object.keys(product.specs ?? {}).length;
  return (
    description.length >= MIN_EDITORIAL_DESCRIPTION_LENGTH &&
    specCount >= MIN_EDITORIAL_SPEC_COUNT
  );
}
