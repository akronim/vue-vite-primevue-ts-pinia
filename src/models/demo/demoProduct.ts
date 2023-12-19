type InventoryStatus = `IN STOCK` | `LOW STOCK` | `OUT OF STOCK`;

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
    code: `a1b2c3d4`,
    name: `Fitness Tracker`,
    description: `Track your daily activities and monitor fitness goals`,
    price: 29.99,
    category: `Fitness`,
    quantity: 40,
    inventoryStatus: `IN STOCK`
  },
  {
    id: `2`,
    code: `b5c6d7e8`,
    name: `Wireless Earbuds`,
    description: `Compact and wireless earbuds for on-the-go listening`,
    price: 39.99,
    category: `Electronics`,
    quantity: 50,
    inventoryStatus: `OUT OF STOCK`
  },
  {
    id: `3`,
    code: `c8d9e0f1`,
    name: `Yoga Pants`,
    description: `Comfortable yoga pants for your workout sessions`,
    price: 24.99,
    category: `Clothing`,
    quantity: 30,
    inventoryStatus: `IN STOCK`
  },
  {
    id: `4`,
    code: `d2e3f4g5`,
    name: `Smart Water Bottle`,
    description: `Stay hydrated with a smart water bottle`,
    price: 19.99,
    category: `Fitness`,
    quantity: 20,
    inventoryStatus: `LOW STOCK`
  },
  {
    id: `5`,
    code: `e6f7g8h9`,
    name: `Phone Stand`,
    description: `Adjustable phone stand for hands-free use`,
    price: 12.99,
    category: `Accessories`,
    quantity: 25,
    inventoryStatus: `IN STOCK`
  },
  {
    id: `6`,
    code: `f0g1h2i3`,
    name: `Portable Blender`,
    description: `Blend your favorite smoothies on the go`,
    price: 34.99,
    category: `Electronics`,
    quantity: 15,
    inventoryStatus: `IN STOCK`
  },
  {
    id: `7`,
    code: `g4h5i6j7`,
    name: `Running Jacket`,
    description: `Lightweight jacket for your running sessions`,
    price: 49.99,
    category: `Clothing`,
    quantity: 20,
    inventoryStatus: `OUT OF STOCK`
  },
  {
    id: `8`,
    code: `h8i9j0k1`,
    name: `Fitness Gloves`,
    description: `Protective gloves for weightlifting and fitness`,
    price: 14.99,
    category: `Fitness`,
    quantity: 35,
    inventoryStatus: `IN STOCK`
  },
  {
    id: `9`,
    code: `i2j3k4l5`,
    name: `Smartwatch`,
    description: `Track your daily activities with a smartwatch`,
    price: 89.99,
    category: `Electronics`,
    quantity: 10,
    inventoryStatus: `LOW STOCK`
  },
  {
    id: `10`,
    code: `j5k6l7m8`,
    name: `Sunglasses`,
    description: `Stylish sunglasses for a trendy look`,
    price: 29.99,
    category: `Accessories`,
    quantity: 25,
    inventoryStatus: `IN STOCK`
  },
  {
    id: `11`,
    code: `k9l0m1n2`,
    name: `Running Shoes`,
    description: `High-performance running shoes for runners`,
    price: 79.99,
    category: `Clothing`,
    quantity: 15,
    inventoryStatus: `OUT OF STOCK`
  },
  {
    id: `12`,
    code: `l3m4n5o6`,
    name: `Wireless Mouse`,
    description: `Convenient wireless mouse for your computer`,
    price: 19.99,
    category: `Electronics`,
    quantity: 30,
    inventoryStatus: `IN STOCK`
  },
  {
    id: `13`,
    code: `m6n7o8p9`,
    name: `Fitness Mat`,
    description: `Comfortable mat for yoga and fitness exercises`,
    price: 24.99,
    category: `Fitness`,
    quantity: 18,
    inventoryStatus: `LOW STOCK`
  },
  {
    id: `14`,
    code: `n0o1p2q3`,
    name: `Travel Backpack`,
    description: `Spacious backpack for your travel adventures`,
    price: 49.99,
    category: `Accessories`,
    quantity: 22,
    inventoryStatus: `IN STOCK`
  },
  {
    id: `15`,
    code: `o4p5q6r7`,
    name: `Fitness Tracker Band`,
    description: `Track your fitness goals with a stylish band`,
    price: 19.99,
    category: `Fitness`,
    quantity: 28,
    inventoryStatus: `IN STOCK`
  },
  {
    id: `16`,
    code: `p8q9r0s1`,
    name: `Bluetooth Headphones`,
    description: `High-quality Bluetooth headphones for immersive audio`,
    price: 69.99,
    category: `Electronics`,
    quantity: 12,
    inventoryStatus: `OUT OF STOCK`
  },
  {
    id: `17`,
    code: `q2r3s4t5`,
    name: `Fashionable Hat`,
    description: `Stylish hat for a fashionable look`,
    price: 14.99,
    category: `Accessories`,
    quantity: 25,
    inventoryStatus: `IN STOCK`
  },
  {
    id: `18`,
    code: `r6s7t8u9`,
    name: `Fitness Resistance Bands`,
    description: `Add resistance to your workout with these bands`,
    price: 16.99,
    category: `Fitness`,
    quantity: 20,
    inventoryStatus: `LOW STOCK`
  },
  {
    id: `19`,
    code: `t0u1v2w3`,
    name: `Wireless Charging Pad`,
    description: `Convenient charging pad for Qi-enabled devices`,
    price: 29.99,
    category: `Electronics`,
    quantity: 15,
    inventoryStatus: `OUT OF STOCK`
  },
  {
    id: `20`,
    code: `u4v5w6x7`,
    name: `Accessories Organizer`,
    description: `Organize your accessories with this stylish organizer`,
    price: 19.99,
    category: `Accessories`,
    quantity: 25,
    inventoryStatus: `IN STOCK`
  }
]


