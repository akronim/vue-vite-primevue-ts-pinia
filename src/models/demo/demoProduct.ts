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
