import { pick, type Locale, type Localized, defaultLocale } from './locale'

export type ProductCategory =
  | 'foil'
  | 'steel-tubular'
  | 'aluminum-tubular'
  | 'ptc'
  | 'mica'
  | 'wire'

export interface ProductSpec {
  label: string
  value: string
}

interface ProductCopy {
  name: string
  summary: string
  description: string
  specs: ProductSpec[]
  options: string[]
  typicalUses: string[]
  imageAlt: string
}

interface ProductRecord {
  model: string
  slug: string
  category: ProductCategory
  image: string
  gallery?: string[]
  voltage: string
  power: string
  material: string
  temperature: string
  copy: Localized<ProductCopy>
}

export interface Product extends ProductCopy {
  model: string
  slug: string
  category: ProductCategory
  image: string
  gallery: string[]
  voltage: string
  power: string
  material: string
  temperature: string
}

export const categoryLabels: Localized<Record<ProductCategory, string>> = {
  en: {
    foil: 'Aluminum Foil',
    'steel-tubular': 'Steel Tubular',
    'aluminum-tubular': 'Aluminum Tubular',
    ptc: 'Silicone PTC',
    mica: 'Mica Plate',
    wire: 'Silicone Wire',
  },
}

export const categoryOrder: ProductCategory[] = [
  'foil',
  'steel-tubular',
  'aluminum-tubular',
  'ptc',
  'mica',
  'wire',
]

const records: ProductRecord[] = [
  {
    model: 'AH-F001',
    slug: 'aluminum-foil-heating-element',
    category: 'foil',
    image: '/images/products/aluminum-foil.jpg',
    voltage: '12 / 24 / 220 V',
    power: '1 W – 2 kW',
    material: 'Aluminum foil, PET/PVC insulation',
    temperature: 'Confirmed per drawing',
    copy: {
      en: {
        name: 'Aluminum Foil Heating Element',
        summary:
          'Thin aluminum foil heater with PET/PVC insulation, supplied as sheet or custom die-cut shapes.',
        description:
          'A flat, low-profile heating element that bonds to a surface and spreads heat across the foil. Shape, wattage and lead position are set from your drawing, with optional adhesive backing for direct mounting.',
        specs: [
          { label: 'Model', value: 'AH-F001' },
          { label: 'Voltage', value: '12 / 24 / 220 V' },
          { label: 'Power range', value: '1 W – 2 kW' },
          { label: 'Construction', value: 'Aluminum foil with PET/PVC insulation' },
          { label: 'Form', value: 'Sheet or custom die-cut' },
          { label: 'Option', value: 'Adhesive backing' },
        ],
        options: ['Sheet or custom die-cut outline', 'Adhesive backing', 'PET or PVC insulation', 'Custom lead length and termination'],
        typicalUses: ['Refrigerator and freezer defrost', 'Cold-cabinet surface heating', 'Equipment panel and enclosure heating'],
        imageAlt:
          'Aluminum foil heating element with serpentine heating tube, label and two insulated lead wires',
      },
    },
  },
  {
    model: 'TH-S001',
    slug: 'steel-tubular-heating-element',
    category: 'steel-tubular',
    image: '/images/products/steel-tubular.jpg',
    voltage: '12 – 240 V',
    power: '50 – 2000 W',
    material: 'Carbon steel or 304 stainless steel',
    temperature: 'Confirmed per drawing',
    copy: {
      en: {
        name: 'Steel Tubular Heating Element',
        summary:
          'Formed tubular heater in 6, 8 or 10 mm diameter, in carbon steel or 304 stainless steel.',
        description:
          'A metal-sheathed tubular element bent to the shape of your cavity or evaporator. Diameter, wattage, sheath material and lead configuration are defined per drawing; flange or bracket mounting is optional.',
        specs: [
          { label: 'Model', value: 'TH-S001' },
          { label: 'Diameter', value: '6 / 8 / 10 mm' },
          { label: 'Voltage', value: '12 – 240 V' },
          { label: 'Power range', value: '50 – 2000 W' },
          { label: 'Sheath material', value: 'Carbon steel or 304 stainless steel' },
          { label: 'Option', value: 'Flange / bracket' },
        ],
        options: ['6, 8 or 10 mm tube diameter', 'Carbon steel or 304 stainless steel sheath', 'Flange or bracket', 'Custom bend shape and leads'],
        typicalUses: ['Refrigerator and freezer defrost', 'Air-conditioning and evaporator heating', 'Appliance and equipment heating'],
        imageAlt:
          'Several bent steel tubular heating elements with insulated leads and connectors',
      },
    },
  },
  {
    model: 'TH-A001',
    slug: 'aluminum-tubular-heating-element',
    category: 'aluminum-tubular',
    image: '/images/products/aluminum-tubular.jpg',
    voltage: '12 – 240 V',
    power: '30 – 1500 W',
    material: '6063 aluminum',
    temperature: 'Confirmed per drawing',
    copy: {
      en: {
        name: 'Aluminum Tubular Heating Element',
        summary:
          'Formed tubular heater in 6, 8 or 10 mm diameter with a 6063 aluminum sheath.',
        description:
          'A lightweight tubular element for refrigeration and appliance defrost layouts. Optional anodizing and mounting tabs are available, and the bend pattern follows your drawing.',
        specs: [
          { label: 'Model', value: 'TH-A001' },
          { label: 'Diameter', value: '6 / 8 / 10 mm' },
          { label: 'Voltage', value: '12 – 240 V' },
          { label: 'Power range', value: '30 – 1500 W' },
          { label: 'Sheath material', value: '6063 aluminum' },
          { label: 'Option', value: 'Anodizing / mounting tabs' },
        ],
        options: ['6, 8 or 10 mm tube diameter', 'Anodizing', 'Mounting tabs', 'Custom bend shape and leads'],
        typicalUses: ['Refrigerator and freezer defrost', 'Cold-cabinet evaporator heating', 'Appliance heating layouts'],
        imageAlt:
          'Large serpentine aluminum tubular heating element with black insulated leads and terminals',
      },
    },
  },
  {
    model: 'PTC-S001',
    slug: 'silicone-encapsulated-ptc-heating-element',
    category: 'ptc',
    image: '/images/products/ptc-silicone.jpg',
    voltage: '12 / 24 / 230 V',
    power: 'Per drawing',
    material: 'Full silicone encapsulation',
    temperature: '40 – 180 °C constant-temperature range',
    copy: {
      en: {
        name: 'Silicone-Encapsulated PTC Heating Element',
        summary:
          'Self-regulating PTC heater with full silicone encapsulation, custom leads and mounting holes.',
        description:
          'PTC elements limit their own temperature, which suits constant-temperature heating. The silicone-encapsulated version is built with custom lead configuration and mounting holes to fit your assembly.',
        specs: [
          { label: 'Model', value: 'PTC-S001' },
          { label: 'Voltage', value: '12 / 24 / 230 V' },
          { label: 'Temperature range', value: '40 – 180 °C constant-temperature' },
          { label: 'Encapsulation', value: 'Full silicone' },
          { label: 'Leads', value: 'Custom' },
          { label: 'Mounting', value: 'Custom holes' },
        ],
        options: ['Target constant temperature within 40–180 °C', 'Custom lead length and termination', 'Custom mounting holes', 'Silicone encapsulation outline'],
        typicalUses: ['Constant-temperature heating modules', 'Small appliance heating', 'Equipment warming'],
        imageAlt:
          'Bench test setup with multi-channel power meters and two finned PTC heater strips under test',
      },
    },
  },
  {
    model: 'MH-M001',
    slug: 'mica-heating-plate',
    category: 'mica',
    image: '/images/products/mica-plate.jpg',
    voltage: '12 – 230 V',
    power: '10 – 800 W',
    material: 'Natural mica',
    temperature: 'Up to 500 °C',
    copy: {
      en: {
        name: 'Mica Heating Plate',
        summary:
          'Natural mica heating plate for temperatures up to 500 °C, cut to custom shapes.',
        description:
          'A thin, flat heater built on natural mica for higher-temperature applications. Outline, hole pattern, wattage and lead terminations are set from your drawing.',
        specs: [
          { label: 'Model', value: 'MH-M001' },
          { label: 'Voltage', value: '12 – 230 V' },
          { label: 'Power range', value: '10 – 800 W' },
          { label: 'Max temperature', value: 'Up to 500 °C' },
          { label: 'Base material', value: 'Natural mica' },
          { label: 'Shape', value: 'Custom' },
        ],
        options: ['Custom outline and cut-outs', 'Mounting hole pattern', 'Lead length and termination', 'Wattage per drawing'],
        typicalUses: ['Small appliance heating plates', 'Equipment and tooling heating', 'High-temperature flat heating'],
        imageAlt:
          'Round mica heating plate with three mounting holes and three insulated lead wires',
      },
    },
  },
  {
    model: 'SH-W001',
    slug: 'silicone-insulated-heating-wire',
    category: 'wire',
    image: '/images/products/silicone-wire.jpg',
    voltage: '12 / 24 / 230 V',
    power: '5 – 30 W/m',
    material: 'Silicone insulation, single or dual core',
    temperature: '-60 to 200 °C',
    copy: {
      en: {
        name: 'Silicone Insulated Heating Wire',
        summary:
          'Flexible heating wire with silicone insulation, single or dual core, in custom lead configurations.',
        description:
          'A flexible heating cable that can be routed along a path or wrapped around a part. Linear power density, core type, length and lead ends are specified per project.',
        specs: [
          { label: 'Model', value: 'SH-W001' },
          { label: 'Voltage', value: '12 / 24 / 230 V' },
          { label: 'Linear power', value: '5 – 30 W/m' },
          { label: 'Temperature range', value: '-60 to 200 °C' },
          { label: 'Core', value: 'Single or dual' },
          { label: 'Leads', value: 'Custom' },
        ],
        options: ['Single or dual core', 'Linear power 5–30 W/m', 'Custom length', 'Custom lead ends'],
        typicalUses: ['Freeze protection and trace heating', 'Equipment and enclosure heating', 'Custom cable-style heating'],
        imageAlt:
          'Coil of white silicone insulated heating wire with a red lead and black terminations',
      },
    },
  },
]

function localize(record: ProductRecord, locale: Locale): Product {
  const { copy, ...rest } = record
  return { ...rest, gallery: record.gallery ?? [record.image], ...pick(copy, locale) }
}

export function getProducts(locale: Locale = defaultLocale): Product[] {
  return records.map((r) => localize(r, locale))
}

export function getProductBySlug(slug: string, locale: Locale = defaultLocale): Product | undefined {
  const record = records.find((r) => r.slug === slug)
  return record ? localize(record, locale) : undefined
}

export function getProductByCategory(category: ProductCategory, locale: Locale = defaultLocale): Product | undefined {
  const record = records.find((r) => r.category === category)
  return record ? localize(record, locale) : undefined
}

export function isProductCategory(value: string | undefined): value is ProductCategory {
  return !!value && (categoryOrder as string[]).includes(value)
}
