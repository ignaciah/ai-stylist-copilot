import { Product } from "./types";

export const PRODUCT_CATALOG: Product[] = [
  {
    id: "cleanser-01",
    name: "Gentle Aura Milk Cleanser",
    category: "cleanser",
    tags: ["hydrating", "sensitive", "morning"],
    price: 32,
    attributes: {
      skinType: ["dry", "sensitive", "normal"],
      concern: ["dryness", "redness"]
    },
    description: "A silky, non-foaming cleanser that maintains the skin's moisture barrier."
  },
  {
    id: "cleanser-02",
    name: "Pure Clarifying Gel",
    category: "cleanser",
    tags: ["deep-clean", "oil-control", "evening"],
    price: 28,
    attributes: {
      skinType: ["oily", "combination"],
      concern: ["acne", "oiliness"]
    },
    description: "A purifying gel with salicylic acid to decongest pores."
  },
  {
    id: "serum-01",
    name: "Celestial Hyaluronic Booster",
    category: "serum",
    tags: ["plumping", "hydration", "all-day"],
    price: 58,
    attributes: {
      skinType: ["all"],
      concern: ["dryness", "fine lines"]
    },
    description: "Multi-weight hyaluronic acid for deep hydration and instant plumping."
  },
  {
    id: "serum-02",
    name: "Lumina Bright Vitamin C",
    category: "serum",
    tags: ["brightening", "antioxidant", "morning"],
    price: 65,
    attributes: {
      skinType: ["all"],
      concern: ["dullness", "dark spots"]
    },
    description: "Stabilized Vitamin C to protect against environmental stressors and brighten tone."
  },
  {
    id: "serum-03",
    name: "Nightly Harmony Retinol",
    category: "serum",
    tags: ["anti-aging", "resurfacing", "evening"],
    price: 72,
    attributes: {
      skinType: ["normal", "oily", "combination"],
      concern: ["texture", "wrinkles"]
    },
    description: "Gentle encapsulated retinol to smooth texture and even out tone overnight."
  },
  {
    id: "moisturizer-01",
    name: "Velvet Cloud Barrier Cream",
    category: "moisturizer",
    tags: ["rich", "nourishing", "barrier-repair"],
    price: 45,
    attributes: {
      skinType: ["dry", "normal"],
      concern: ["dryness", "sensitivity"]
    },
    description: "Ceramide-rich moisturizer for long-lasting hydration and protection."
  },
  {
    id: "moisturizer-02",
    name: "Hydro-Light Glow Mist",
    category: "moisturizer",
    tags: ["lightweight", "oil-free", "refreshing"],
    price: 38,
    attributes: {
      skinType: ["oily", "combination"],
      concern: ["oiliness", "clogged pores"]
    },
    description: "A weightless water-gel moisturizer that provides hydration without shine."
  },
  {
    id: "sunscreen-01",
    name: "Solar Shield Invisible SPF 50",
    category: "sunscreen",
    tags: ["broad-spectrum", "no-white-cast", "morning"],
    price: 34,
    attributes: {
      skinType: ["all"],
      concern: ["sun-protection"]
    },
    description: "Total UV protection with a weightless, transparent finish."
  },
  {
    id: "lipstick-01",
    name: "Stellar Silk - Rose Petal",
    category: "lipstick",
    tags: ["satin", "soft-pink"],
    price: 24,
    attributes: {
      finish: "satin",
      shade: "Rose Petal"
    },
    description: "A nourishing satin lipstick in a universally flattering soft pink."
  },
  {
    id: "lipstick-02",
    name: "Midnight Matte - Deep Crimson",
    category: "lipstick",
    tags: ["bold", "long-wear"],
    price: 24,
    attributes: {
      finish: "matte",
      shade: "Deep Crimson"
    },
    description: "A high-pigment matte lipstick for a dramatic statement look."
  },
  {
    id: "eyes-01",
    name: "Aura Glow Highlighter Palette",
    category: "eyes",
    tags: ["shimmer", "versatile"],
    price: 42,
    attributes: {
      finish: "shimmer"
    },
    description: "Fine-milled pigments that add a celestial glow to eyes and cheekbones."
  },
  {
    id: "accessories-01",
    name: "Crystal Quartz Face Roller",
    category: "accessories",
    tags: ["depuffing", "self-care"],
    price: 29,
    attributes: {},
    description: "A cooling quartz roller to promote drainage and soothe the skin."
  }
];
