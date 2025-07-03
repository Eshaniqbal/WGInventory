export type Category = {
  id: string;
  name: string;
};

export type Vendor = {
  id: string;
  name: string;
  contact: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  categoryId: string;
  vendorId: string;
  quantity: number;
  price: number;
  fabric: string;
  color: string;
  size: string;
  createdAt: string;
};

export type InventoryItemWithRelations = InventoryItem & {
  category: Category;
  vendor: Vendor;
};
