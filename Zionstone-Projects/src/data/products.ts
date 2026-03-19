export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  slug: string;
  emoji: string;
  shipsInDays: number;
  twoDayEligible: boolean;
  rating: number;
  reviews: number;
  description?: string;
  features?: string[];
  inventory?: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Fender Stratocaster Player",
    brand: "Fender",
    price: 849,
    originalPrice: 999,
    category: "guitars-basses",
    slug: "fender-stratocaster-player",
    emoji: "🎸",
    shipsInDays: 2,
    twoDayEligible: true,
    rating: 4.8,
    reviews: 1247,
    description: "The Fender Player Stratocaster delivers classic Strat tone and feel at an accessible price. Features an alder body, maple neck with modern C profile, and three Player Series single-coil pickups.",
    features: [
      "Alder body with gloss finish",
      "Maple neck with modern C profile",
      "22 frets with synthetic bone nut",
      "3x Player Series single-coil Strat pickups",
      "2-point synchronized tremolo",
      "Chrome hardware"
    ],
    inventory: 15
  },
  {
    id: "2",
    name: "Gibson Les Paul Standard 50s",
    brand: "Gibson",
    price: 2499,
    category: "guitars-basses",
    slug: "gibson-les-paul-standard",
    emoji: "🎸",
    shipsInDays: 2,
    twoDayEligible: true,
    rating: 4.9,
    reviews: 892,
    description: "The Gibson Les Paul Standard 50s captures the legendary tone and craftsmanship of the original. Features a mahogany body with AA maple top, mahogany neck with rounded profile, and Burstbucker pickups.",
    features: [
      "Mahogany body with AA maple top",
      "Mahogany neck with rounded 50s profile",
      "Rosewood fretboard with trapezoid inlays",
      "Burstbucker 1 (neck) and Burstbucker 2 (bridge) pickups",
      "ABR-1 bridge and stopbar tailpiece",
      "Grover Rotomatic tuners"
    ],
    inventory: 5
  },
  {
    id: "3",
    name: "Korg Minilogue XD",
    brand: "Korg",
    price: 599,
    category: "keyboards-synths",
    slug: "korg-minilogue-xd",
    emoji: "🎹",
    shipsInDays: 2,
    twoDayEligible: true,
    rating: 4.7,
    reviews: 2341,
    description: "The Minilogue XD is a four-voice polyphonic analog synthesizer that delivers the authentic sound of analog synthesis with modern digital enhancements. Features a 16-step sequencer and 200 preset programs.",
    features: [
      "4-voice polyphonic analog synthesizer",
      "2VCO + multi-engine per voice",
      "16-step sequencer with motion recording",
      "200 program memories",
      "OLED display for real-time visualization",
      "16-voice polyphony when chained"
    ],
    inventory: 23
  },
  {
    id: "4",
    name: "Moog Subsequent 37",
    brand: "Moog",
    price: 1599,
    category: "keyboards-synths",
    slug: "moog-subsequent-37",
    emoji: "🎹",
    shipsInDays: 2,
    twoDayEligible: true,
    rating: 4.8,
    reviews: 456,
    description: "The Subsequent 37 is a paraphonic analog synthesizer that combines a duoSample voices, 37-key semi-weighted keyboard, and a intuitive interface for powerful sound design.",
    features: [
      "37-key semi-weighted keyboard",
      "2 oscillators + noise per voice",
      "Moog Ladder Filter and SSM filter",
      "256 presets",
      "Arpeggiator and step sequencer",
      "Effects: distortion, Fidelity, and Phaser"
    ],
    inventory: 8
  },
  {
    id: "5",
    name: "Focusrite Scarlett 2i2 3rd Gen",
    brand: "Focusrite",
    price: 169,
    originalPrice: 199,
    category: "recording-gear",
    slug: "focusrite-scarlett-2i2",
    emoji: "🎤",
    shipsInDays: 2,
    twoDayEligible: true,
    rating: 4.8,
    reviews: 3421,
    description: "The industry-standard USB audio interface. Features two of Focusrite's best Scarlett mic preamps, high-performance 24-bit/192kHz converters, and Air mode for enhanced high frequencies.",
    features: [
      "2 3rd Gen Scarlett mic preamps",
      "Air mode with Presence and Harmonic Drive",
      "24-bit/192kHz audio conversion",
      "Direct Monitor switch",
      "MIDI I/O",
      "USB-C connectivity"
    ],
    inventory: 45
  },
  {
    id: "6",
    name: "Universal Audio Apollo Twin X Duo",
    brand: "Universal Audio",
    price: 1299,
    category: "recording-gear",
    slug: "ua-apollo-twin-x",
    emoji: "🎤",
    shipsInDays: 2,
    twoDayEligible: true,
    rating: 4.9,
    reviews: 2134,
    description: "The Apollo Twin X is a desktop interface with elite-class A/D and D/A conversion, two Unison mic preamps, and HEXA Core processing for tracking through UAD powered plug-ins in real-time.",
    features: [
      "HEXA Core processing (6 cores/6 DSP)",
      "2 Unison mic preamps",
      "24-bit/192kHz elite-class A/D and D/A conversion",
      "Thunderbolt 3 connection",
      "UAD Powered Plug-ins bundle included",
      "Real-time tracking through UAD plug-ins"
    ],
    inventory: 12
  },
  {
    id: "7",
    name: "Shure SM7B",
    brand: "Shure",
    price: 399,
    category: "recording-gear",
    slug: "shure-sm7b",
    emoji: "🎙️",
    shipsInDays: 2,
    twoDayEligible: true,
    rating: 4.9,
    reviews: 5678,
    description: "The legendary cardioid dynamic microphone. Ideal for broadcast, podcasting, and studio recording. Features smooth, warm, and extended frequency response with excellent rejection.",
    features: [
      "Cardioid dynamic cartridge",
      "50Hz - 20kHz frequency response",
      "Slug: -59.0 dB V/Pa/1mA",
      "Internal air-suspension shock isolation",
      "Cardioid polar pattern",
      "Includes A7WS detachable ryton screen"
    ],
    inventory: 67
  },
  {
    id: "8",
    name: "Audio-Technica ATH-M50x",
    brand: "Audio-Technica",
    price: 149,
    originalPrice: 189,
    category: "audio-equipment",
    slug: "ath-m50x",
    emoji: "🎧",
    shipsInDays: 2,
    twoDayEligible: true,
    rating: 4.8,
    reviews: 8765,
    description: "The critically acclaimed M50x headphones deliver exceptional clarity throughout an extended frequency range. Features 45mm large-aperture drivers with rare earth magnets and copper-clad aluminum wire voice coils.",
    features: [
      "45mm large-aperture drivers",
      "Rare earth magnets and CCAW voice coils",
      "15Hz - 28kHz frequency response",
      "Collapsible design",
      "Three detachable cables included",
      "Ear coupling: Circumaural"
    ],
    inventory: 89
  },
  {
    id: "9",
    name: "Yamaha HS8 Studio Monitors",
    brand: "Yamaha",
    price: 499,
    category: "audio-equipment",
    slug: "yamaha-hs8",
    emoji: "🔊",
    shipsInDays: 2,
    twoDayEligible: true,
    rating: 4.7,
    reviews: 2341,
    description: "The HS8 is a 2-way bass-reflex studio monitor featuring an 8-inch cone woofer and 1-inch dome tweeter. Delivers incredibly flat response and high resolution for accurate mixing.",
    features: [
      "8-inch cone woofer + 1-inch dome tweeter",
      "22Hz - 30kHz frequency response",
      "75W LF + 45W HF bi-amp system",
      "Room control and high-trim response controls",
      "XLR and TRS inputs",
      "Low resonance MDF enclosure"
    ],
    inventory: 34
  },
  {
    id: "10",
    name: "Roland TD-17KVX V-Drums",
    brand: "Roland",
    price: 1599,
    category: "drums-percussion",
    slug: "roland-td-17kvx",
    emoji: "🥁",
    shipsInDays: 3,
    twoDayEligible: false,
    rating: 4.6,
    reviews: 567,
    description: "The TD-17KVX is a flagship V-Drums kit with mesh heads and advanced Prismatic Sound Modeling. Features 50 drum kits, 100 coach functions, and Bluetooth connectivity.",
    features: [
      "12\" snare and four 10\" tom pads with mesh heads",
      "VH-10 floating hi-hat with foot control",
      "KD-10 kick drum with tower",
      "CY-12C crash and CY-13R ride cymbals",
      "50 drum kits built on Prismatic Sound Modeling",
      "Bluetooth audio streaming"
    ],
    inventory: 6
  },
  {
    id: "11",
    name: "Nord Stage 3 88",
    brand: "Nord",
    price: 3799,
    category: "keyboards-synths",
    slug: "nord-stage-3",
    emoji: "🎹",
    shipsInDays: 2,
    twoDayEligible: true,
    rating: 4.9,
    reviews: 452,
    description: "The Nord Stage 3 88 is a premium performance keyboard with Triple Sensor piano mechanics, Nord's latest piano and synth engines, and a comprehensive effects section.",
    features: [
      "88-key Triple Sensor piano action",
      "Nord Piano Library and Nord Sample Library",
      "Nord Lead A1 synth engine",
      "Nord C2D organ engine with rotary simulation",
      "OLED display for program overview",
      "Extended MIDI controller functionality"
    ],
    inventory: 3
  },
  {
    id: "12",
    name: "Fender Jazz Bass Player",
    brand: "Fender",
    price: 899,
    category: "guitars-basses",
    slug: "fender-jazz-bass",
    emoji: "🎸",
    shipsInDays: 2,
    twoDayEligible: true,
    rating: 4.8,
    reviews: 1234,
    description: "The Player Jazz Bass delivers the classic J-Bass tone and playability. Features an alder body, maple neck, and dual Player Series single-coil jazz bass pickups.",
    features: [
      "Alder body",
      "Maple neck with modern C profile",
      "22 frets with synthetic bone nut",
      "2x Player Series single-coil Jazz Bass pickups",
      "4-saddle standard bridge",
      "Chrome hardware"
    ],
    inventory: 18
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  return products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

// Product template for adding new products:
// {
//   id: "NEW_ID",
//   name: "Product Name",
//   brand: "Brand Name",
//   price: 999,
//   originalPrice: 1299, // Optional - for discounts
//   category: "guitars-basses", // See categories below
//   slug: "product-slug",
//   emoji: "🎸", // See emoji guide below
//   shipsInDays: 2,
//   twoDayEligible: true,
//   rating: 4.5,
//   reviews: 123,
//   description: "Product description here...",
//   features: ["Feature 1", "Feature 2", "Feature 3"],
//   inventory: 10
// }

// Categories:
// - guitars-basses
// - keyboards-synths
// - recording-gear
// - audio-equipment
// - drums-percussion

// Emoji icons:
// 🎸 Guitar
// 🎹 Keyboard/Synth
// 🎤 Microphone/Interface
// 🎙️ Studio Mic
// 🎧 Headphones
// 🔊 Speakers
// 🥁 Drums
// 🎛️ DJ/Mixer
