export type CategorySeoContent = {
  title: string;
  metaDescription: string;
  h1: string;
  heading: string;
  intro: string[];
  rfqDetails: string[];
  faq: Array<{ question: string; answer: string }>;
  /** Exact part pages surfaced from real Search Console demand. */
  featuredPartNumbers?: string[];
};

const DOCUMENTATION_ANSWER =
  "Tell us the required channel, certificate, lot, or date-code information with the RFQ. We will ask potential sources and confirm what is available for that specific quote. Documentation varies by supplier and part and is not guaranteed for every line.";

const AVAILABILITY_ANSWER =
  "No. SongGlow's catalog is a specification and RFQ reference, not an availability list. Send the manufacturer part number, requested quantity, and target date so we can search potential sources and compare suitable quotations.";

const RECEIVING_ANSWER =
  "After ordered parts reach us, we visually check external packaging condition and visible order or label information, then photograph the packaging and labels for the customer. This does not include X-ray, decapsulation, electrical testing, or laboratory authentication.";

const CATEGORY_SEO: Record<string, CategorySeoContent> = {
  "aluminum-electrolytic-capacitors": {
    title: "Aluminum Electrolytic Capacitor Supplier & RFQ | SongGlow",
    metaDescription:
      "Submit aluminum electrolytic capacitor part numbers and quantities for supplier search, quote comparison, lead-time review, and available source documentation.",
    h1: "Aluminum Electrolytic Capacitor Sourcing & RFQ",
    heading: "Source aluminum electrolytic capacitors for your production BOM",
    intro: [
      "SongGlow helps OEM and EMS teams source aluminum electrolytic capacitors by manufacturer part number and requested quantity. Use the catalog to review listed specifications, then send the exact requirement for supplier search and quote comparison.",
      "For a useful RFQ, identify the electrical and mechanical constraints that matter to the design. Capacitance and rated voltage alone are rarely enough to confirm a suitable part.",
    ],
    rfqDetails: [
      "Manufacturer and complete part number",
      "Capacitance, rated voltage, and tolerance",
      "ESR, ripple-current, and temperature requirements",
      "Radial, SMD, snap-in, or other mounting and package constraints",
      "Requested quantity, target date, and approved alternate policy",
    ],
    faq: [
      {
        question: "What should I include in an aluminum electrolytic capacitor RFQ?",
        answer:
          "Include the full manufacturer part number, quantity, target date, capacitance, voltage, tolerance, ESR or ripple-current limits, temperature rating, package dimensions, and mounting style. Tell us whether alternates may be researched or only the specified part is acceptable.",
      },
      {
        question: "Does this aluminum electrolytic capacitor catalog show current availability?",
        answer: AVAILABILITY_ANSWER,
      },
      {
        question: "Can SongGlow provide capacitor source documentation?",
        answer: DOCUMENTATION_ANSWER,
      },
    ],
  },
  "ceramic-capacitors": {
    title: "Ceramic Capacitor & MLCC Supplier RFQ | SongGlow",
    metaDescription:
      "Send ceramic capacitor and MLCC requirements for supplier search, quantity and lead-time comparison, competitive RFQ, and available source documentation.",
    h1: "Ceramic Capacitor & MLCC Sourcing",
    heading: "Ceramic capacitor sourcing by part number and specification",
    intro: [
      "SongGlow supports ceramic capacitor and multilayer ceramic capacitor RFQs for production BOMs. We search potential sources for the specified part and quantity, compare suitable quotations, and present alternates separately when the customer permits alternate research.",
      "MLCC selection can change with dielectric, case size, bias behavior, and temperature range. The original manufacturer part number remains the clearest starting point for sourcing.",
    ],
    rfqDetails: [
      "Manufacturer and complete part number",
      "Capacitance, rated voltage, tolerance, and dielectric",
      "Case size, termination, mounting, and temperature range",
      "Automotive or other application-specific requirements",
      "Requested quantity, target date, and alternate restrictions",
    ],
    faq: [
      {
        question: "What specifications matter when sourcing an MLCC?",
        answer:
          "Provide capacitance, rated voltage, tolerance, dielectric such as C0G/NP0, X7R, or X5R, case size, temperature range, and any automotive or termination requirements. The full manufacturer part number helps avoid an unsuitable match.",
      },
      {
        question: "Does the ceramic capacitor catalog confirm availability?",
        answer: AVAILABILITY_ANSWER,
      },
      {
        question: "What receiving check does SongGlow perform?",
        answer: RECEIVING_ANSWER,
      },
    ],
  },
  "tvs-diodes": {
    title: "TVS Diode Supplier & Sourcing RFQ | SongGlow",
    metaDescription:
      "Submit TVS diode part numbers and quantities for supplier search, quote comparison, lead-time review, alternates, and available source documentation.",
    h1: "TVS Diode Sourcing & RFQ",
    heading: "Source transient voltage suppressor diodes for your BOM",
    intro: [
      "SongGlow helps procurement teams source TVS diodes by manufacturer part number and requested quantity. We compare potential sources and suitable quotations while keeping the requested electrical and package requirements visible.",
      "A TVS alternate must be reviewed against the application rather than matched by package alone. Any alternate candidate is presented separately for customer engineering approval.",
    ],
    rfqDetails: [
      "Manufacturer and complete part number",
      "Unidirectional or bidirectional configuration",
      "Working standoff, breakdown, and clamping voltage",
      "Peak pulse power or current and package style",
      "Requested quantity, target date, and qualification requirements",
    ],
    faq: [
      {
        question: "What information is needed for a TVS diode RFQ?",
        answer:
          "Send the full manufacturer part number, quantity, target date, polarity configuration, working standoff voltage, breakdown and clamping limits, peak pulse rating, package, and any automotive or qualification requirements.",
      },
      {
        question: "Can SongGlow suggest an alternate TVS diode?",
        answer:
          "We can research potential alternates when requested, but voltage behavior, pulse rating, capacitance, package, and application requirements must be reviewed by the customer's engineering team. No alternate is substituted without approval.",
      },
      {
        question: "Does the TVS diode catalog show current availability?",
        answer: AVAILABILITY_ANSWER,
      },
    ],
  },
  crystals: {
    title: "Quartz Crystal Supplier & Sourcing RFQ | SongGlow",
    metaDescription:
      "Send quartz crystal part numbers and quantities for supplier search, frequency and package review, quote comparison, and available source documentation.",
    h1: "Quartz Crystal Sourcing & RFQ",
    heading: "Quartz crystal sourcing for production requirements",
    intro: [
      "SongGlow helps customers source quartz crystals by exact manufacturer part number, frequency, package, and requested quantity. Listed specifications support RFQ preparation but do not represent current availability.",
      "Frequency alone does not make two crystals interchangeable. Load capacitance, tolerance, stability, ESR, drive level, package, and operating temperature can all affect the circuit.",
    ],
    rfqDetails: [
      "Manufacturer and complete part number",
      "Frequency, load capacitance, tolerance, and stability",
      "ESR, drive level, and operating temperature",
      "Package size, mounting, and qualification requirements",
      "Requested quantity, target date, and alternate restrictions",
    ],
    faq: [
      {
        question: "What specifications are required for a quartz crystal RFQ?",
        answer:
          "Include the full manufacturer part number, frequency, load capacitance, frequency tolerance and stability, ESR, operating temperature, package size, quantity, and target date. Tell us whether alternate research is permitted.",
      },
      {
        question: "Can two crystals with the same frequency be substituted?",
        answer:
          "Not automatically. Load capacitance, ESR, tolerance, stability, drive level, package, and temperature requirements must also match the circuit. Any alternate candidate requires customer engineering approval.",
      },
      {
        question: "Does the quartz crystal catalog confirm availability?",
        answer: AVAILABILITY_ANSWER,
      },
    ],
  },
  "crystals-oscillators-resonators-oscillators": {
    title: "Crystal Oscillator Supplier & RFQ | SongGlow",
    metaDescription:
      "Submit crystal oscillator part numbers and quantities for supplier search, specification review, competitive RFQ, and available source documentation.",
    h1: "Crystal Oscillator Sourcing & RFQ",
    heading: "Source crystal oscillators by exact electrical requirement",
    intro: [
      "SongGlow supports crystal oscillator RFQs for OEM and EMS production BOMs. We search potential sources for the specified manufacturer part number and requested quantity and compare suitable quote options.",
      "Oscillator matching should account for frequency, supply voltage, output format, stability, package, temperature range, and enable behavior. Alternate candidates are not treated as approved replacements.",
    ],
    rfqDetails: [
      "Manufacturer and complete part number",
      "Frequency, supply voltage, output type, and stability",
      "Package size, enable function, and operating temperature",
      "Jitter, phase-noise, or qualification requirements where relevant",
      "Requested quantity, target date, and alternate policy",
    ],
    faq: [
      {
        question: "What should I include in a crystal oscillator RFQ?",
        answer:
          "Provide the full manufacturer part number, frequency, supply voltage, output type, stability, package, operating temperature, enable requirements, quantity, and target date. Include jitter or qualification limits where the application depends on them.",
      },
      {
        question: "Can SongGlow research oscillator alternates?",
        answer:
          "Yes, when requested. We present potential candidates separately, and the customer's engineering team must confirm electrical, timing, package, and application suitability before approval.",
      },
      {
        question: "What documentation is available for oscillator orders?",
        answer: DOCUMENTATION_ANSWER,
      },
    ],
  },
  "chip-resistor": {
    title: "Chip Resistor Supplier & Sourcing RFQ | SongGlow",
    metaDescription:
      "Send chip resistor and SMD resistor part numbers for supplier search, specification and quantity review, quote comparison, and source documentation requests.",
    h1: "Chip Resistor & SMD Resistor Sourcing",
    heading: "Chip resistor sourcing for production BOM quantities",
    intro: [
      "SongGlow helps customers source chip resistors by manufacturer part number and requested quantity. We compare suitable supplier quotations while keeping the approved resistance, tolerance, power, package, and temperature requirements clear.",
      "For alternates, package size is only one constraint. Power derating, temperature coefficient, maximum working voltage, pulse behavior, and qualification requirements may also matter.",
    ],
    rfqDetails: [
      "Manufacturer and complete part number",
      "Resistance, tolerance, and temperature coefficient",
      "Power rating, maximum voltage, and package size",
      "Pulse, automotive, or other qualification requirements",
      "Requested quantity, target date, and approved alternates",
    ],
    featuredPartNumbers: [
      "RC0402FR-07100RL",
      "RC0402FR-0710KL",
      "RC0402FR-074K7L",
      "RC0603FR-073K3L",
      "RC0603FR-0710KL",
    ],
    faq: [
      {
        question: "What information is required for a chip resistor RFQ?",
        answer:
          "Include the full part number, resistance, tolerance, temperature coefficient, power rating, case size, maximum working voltage, quantity, target date, and any pulse or automotive requirements.",
      },
      {
        question: "Can a chip resistor be matched by resistance and case size alone?",
        answer:
          "Not always. Tolerance, power rating, temperature coefficient, working voltage, pulse handling, termination, and qualification requirements may differ. Customer engineering approval is required for any alternate.",
      },
      {
        question: "Does the chip resistor catalog show current availability?",
        answer: AVAILABILITY_ANSWER,
      },
    ],
  },
  "fixed-inductors": {
    title: "Fixed Inductor Supplier & Sourcing RFQ | SongGlow",
    metaDescription:
      "Submit fixed inductor part numbers and quantities for supplier search, electrical and package review, quote comparison, and available source documentation.",
    h1: "Fixed Inductor Sourcing & RFQ",
    heading: "Source fixed and power inductors for your BOM",
    intro: [
      "SongGlow supports fixed inductor sourcing by exact manufacturer part number and requested quantity. We search potential sources and compare suitable quotations for customer review.",
      "Inductance value and package size do not fully define an inductor. Rated current, saturation current, DCR, shielding, tolerance, self-resonant frequency, and temperature behavior can affect suitability.",
    ],
    rfqDetails: [
      "Manufacturer and complete part number",
      "Inductance, tolerance, DCR, and self-resonant frequency",
      "Rated current, saturation current, and shielding",
      "Package, mounting, temperature, and qualification requirements",
      "Requested quantity, target date, and alternate policy",
    ],
    faq: [
      {
        question: "What specifications should an inductor RFQ include?",
        answer:
          "Provide the full part number, inductance, tolerance, DCR, rated and saturation current, shielding, self-resonant frequency, package, operating temperature, quantity, and target date.",
      },
      {
        question: "Can SongGlow research a replacement fixed inductor?",
        answer:
          "We can research potential candidates when requested, but electrical, thermal, mechanical, and EMI behavior must be reviewed and approved by the customer's engineering team.",
      },
      {
        question: "What receiving check is included?",
        answer: RECEIVING_ANSWER,
      },
    ],
  },
  "ferrite-beads": {
    title: "Ferrite Bead Supplier & Sourcing RFQ | SongGlow",
    metaDescription:
      "Send ferrite bead part numbers and quantities for supplier search, impedance and current review, quote comparison, and available source documentation.",
    h1: "Ferrite Bead Sourcing & RFQ",
    heading: "Ferrite bead sourcing by impedance, current, and package",
    intro: [
      "SongGlow helps OEM and EMS teams source ferrite beads by manufacturer part number and requested production quantity. We compare potential sources and suitable quotations without treating catalog listings as current availability.",
      "A ferrite bead should be reviewed across its impedance curve, current rating, DC resistance, package, and operating conditions rather than matched on a single impedance value.",
    ],
    rfqDetails: [
      "Manufacturer and complete part number",
      "Impedance and the measurement frequency",
      "Rated current, DC resistance, and package size",
      "Operating temperature and qualification requirements",
      "Requested quantity, target date, and alternate restrictions",
    ],
    faq: [
      {
        question: "What information is needed for a ferrite bead RFQ?",
        answer:
          "Include the full part number, impedance and measurement frequency, rated current, DC resistance, case size, operating temperature, quantity, target date, and any automotive or qualification requirements.",
      },
      {
        question: "Can ferrite beads be matched by impedance alone?",
        answer:
          "No. The impedance curve, current derating, DC resistance, package, temperature, and application noise spectrum can affect performance. Alternate candidates require engineering approval.",
      },
      {
        question: "Does the ferrite bead catalog confirm availability?",
        answer: AVAILABILITY_ANSWER,
      },
    ],
  },
  "connectors-interconnects-headers-male-pins": {
    title: "Male Pin Header Connector Supplier RFQ | SongGlow",
    metaDescription:
      "Submit male pin header connector part numbers and quantities for supplier search, pitch and configuration review, quote comparison, and source documentation.",
    h1: "Male Pin Header Connector Sourcing",
    heading: "Source male pin headers by exact configuration",
    intro: [
      "SongGlow supports male pin header connector RFQs by manufacturer part number, configuration, and requested quantity. We search potential sources and compare suitable quote options for OEM and EMS production requirements.",
      "Pitch and position count are only the starting point. Row count, mounting style, orientation, contact length, plating, insulator height, current rating, and packaging can determine whether a connector fits the assembly.",
    ],
    rfqDetails: [
      "Manufacturer and complete part number",
      "Pitch, positions, rows, and contact layout",
      "Through-hole or surface mount and vertical or right-angle orientation",
      "Contact length, plating, insulator height, and electrical ratings",
      "Requested quantity, target date, and packaging requirements",
    ],
    faq: [
      {
        question: "What should I include in a male pin header RFQ?",
        answer:
          "Provide the full manufacturer part number, pitch, number of positions and rows, mounting style, orientation, contact length, plating, insulator height, current rating, packaging, quantity, and target date.",
      },
      {
        question: "Can two pin headers with the same pitch be substituted?",
        answer:
          "Not automatically. Position count, row spacing, contact length, mounting, orientation, plating, insulator dimensions, electrical rating, and board footprint must be checked by the customer's engineering team.",
      },
      {
        question: "What documentation can SongGlow request?",
        answer: DOCUMENTATION_ANSWER,
      },
    ],
  },
};

export function getCategorySeo(slug: string): CategorySeoContent | undefined {
  return CATEGORY_SEO[slug];
}
