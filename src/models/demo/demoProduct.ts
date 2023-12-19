type InventoryStatus = `INSTOCK` | `LOWSTOCK` | `OUTOFSTOCK`;

export interface DemoProduct {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: InventoryStatus;
}

export const mockProducts: DemoProduct[] = [
  {
    id: `1`,
    code: `f230fh0g3`,
    name: `Organic Brown Rice`,
    description: `High-quality brown rice for a healthy diet`,
    price: 3.99,
    category: `Groceries`,
    quantity: 150,
    inventoryStatus: `INSTOCK`
  },
  {
    id: `2`,
    code: `7fdj45hq1`,
    name: `Wireless Bluetooth Earbuds`,
    description: `High-fidelity sound for on-the-go listening`,
    price: 49.99,
    category: `Electronics`,
    quantity: 30,
    inventoryStatus: `OUTOFSTOCK`
  },
  {
    id: `3`,
    code: `a2b4c1d8e9`,
    name: `Men's Leather Wallet`,
    description: `Genuine leather wallet with multiple card slots`,
    price: 29.99,
    category: `Fashion`,
    quantity: 50,
    inventoryStatus: `LOWSTOCK`
  },
  {
    id: `4`,
    code: `g8h2i3j4k`,
    name: `Organic Green Tea`,
    description: `Premium green tea for a refreshing experience`,
    price: 9.99,
    category: `Beverages`,
    quantity: 100,
    inventoryStatus: `INSTOCK`
  },
  {
    id: `5`,
    code: `l5m6n7o8p`,
    name: `Smart Home Security Camera`,
    description: `HD camera with motion detection for home security`,
    price: 89.99,
    category: `Home Security`,
    quantity: 10,
    inventoryStatus: `OUTOFSTOCK`
  },
  {
    id: `6`,
    code: `m9n0o8p9q`,
    name: `Women's Running Shoes`,
    description: `Comfortable and stylish shoes for active women`,
    price: 59.99,
    category: `Footwear`,
    quantity: 25,
    inventoryStatus: `LOWSTOCK`
  },
  {
    id: `7`,
    code: `p1q2r3s4t`,
    name: `Stainless Steel Water Bottle`,
    description: `Durable water bottle for hydration on the go`,
    price: 19.99,
    category: `Fitness`,
    quantity: 75,
    inventoryStatus: `INSTOCK`
  },
  {
    id: `8`,
    code: `s4t5u6v7w`,
    name: `Home Office Desk`,
    description: `Modern desk for a productive work environment`,
    price: 149.99,
    category: `Furniture`,
    quantity: 15,
    inventoryStatus: `OUTOFSTOCK`
  },
  {
    id: `9`,
    code: `v8w9x0y1z`,
    name: `Natural Hair Conditioner`,
    description: `Sulfate-free conditioner for healthy hair`,
    price: 14.99,
    category: `Beauty`,
    quantity: 40,
    inventoryStatus: `LOWSTOCK`
  },
  {
    id: `10`,
    code: `y2z3a4b5c`,
    name: `Gourmet Chocolate Assortment`,
    description: `Indulgent chocolates for a sweet treat`,
    price: 24.99,
    category: `Sweets`,
    quantity: 60,
    inventoryStatus: `INSTOCK`
  },
  {
    id: `11`,
    code: `b5c6d7e8f`,
    name: `Portable Outdoor Grill`,
    description: `Compact grill for outdoor cooking adventures`,
    price: 79.99,
    category: `Outdoor Living`,
    quantity: 20,
    inventoryStatus: `OUTOFSTOCK`
  },
  {
    id: `12`,
    code: `e9f0g8h9i`,
    name: `Professional DSLR Camera`,
    description: `Capture stunning moments with this high-quality camera`,
    price: 699.99,
    category: `Photography`,
    quantity: 5,
    inventoryStatus: `LOWSTOCK`
  },
  {
    id: `13`,
    code: `h1i2j3k4l`,
    name: `Yoga Mat with Carry Strap`,
    description: `Non-slip yoga mat for a comfortable workout`,
    price: 29.99,
    category: `Fitness`,
    quantity: 15,
    inventoryStatus: `INSTOCK`
  },
  {
    id: `14`,
    code: `k5l6m7n8o`,
    name: `Leather Messenger Bag`,
    description: `Stylish and spacious messenger bag for daily use`,
    price: 89.99,
    category: `Fashion`,
    quantity: 30,
    inventoryStatus: `OUTOFSTOCK`
  },
  {
    id: `15`,
    code: `n9o0p8q9r`,
    name: `Smart Home Thermostat`,
    description: `Energy-efficient thermostat for smart home control`,
    price: 129.99,
    category: `Home Automation`,
    quantity: 10,
    inventoryStatus: `LOWSTOCK`
  },
  {
    id: `16`,
    code: `q1r2s3t4u`,
    name: `Organic Avocado Oil`,
    description: `Cold-pressed avocado oil for culinary delights`,
    price: 16.99,
    category: `Groceries`,
    quantity: 40,
    inventoryStatus: `INSTOCK`
  },
  {
    id: `17`,
    code: `t5u6v7w8x`,
    name: `Bluetooth Wireless Speaker`,
    description: `Portable speaker with rich sound quality`,
    price: 39.99,
    category: `Electronics`,
    quantity: 50,
    inventoryStatus: `OUTOFSTOCK`
  },
  {
    id: `18`,
    code: `w9x0y1z2a`,
    name: `Vintage Leather Sofa`,
    description: `Timeless and comfortable sofa for your living room`,
    price: 499.99,
    category: `Furniture`,
    quantity: 8,
    inventoryStatus: `LOWSTOCK`
  },
  {
    id: `19`,
    code: `z3a4b5c6d`,
    name: `Herbal Tea Sampler`,
    description: `Variety of herbal teas for a relaxing experience`,
    price: 12.99,
    category: `Beverages`,
    quantity: 25,
    inventoryStatus: `INSTOCK`
  },
  {
    id: `20`,
    code: `c5d6e7f8g`,
    name: `Wireless Charging Pad`,
    description: `Convenient charging pad for Qi-enabled devices`,
    price: 29.99,
    category: `Electronics`,
    quantity: 12,
    inventoryStatus: `OUTOFSTOCK`
  }
]


