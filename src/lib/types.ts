export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  fabric: string;
  color: string;
  size: string;
  createdAt: string;
};

export type InventoryItemWithRelations = InventoryItem;
