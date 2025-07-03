import type { Category, Vendor, InventoryItem, InventoryItemWithRelations } from './types';

let categories: Category[] = [
  { id: '1', name: 'Suits' },
  { id: '2', name: 'Kurtis' },
  { id: '3', name: 'Dupattas' },
];

let vendors: Vendor[] = [
  { id: '1', name: 'Fabricorp', contact: 'sales@fabricorp.com' },
  { id: '2', name: 'Weaveworld', contact: 'contact@weave.world' },
  { id: '3', name: 'Stitch & Co.', contact: 'support@stitch.co' },
];

let inventoryItems: InventoryItem[] = [
  { id: '1', name: 'Embroidered Anarkali Suit', categoryId: '1', vendorId: '1', quantity: 15, price: 120.00, fabric: 'Silk', color: 'Maroon', size: 'M', createdAt: new Date('2023-10-01T10:00:00Z').toISOString() },
  { id: '2', name: 'Printed Cotton Kurti', categoryId: '2', vendorId: '2', quantity: 5, price: 45.50, fabric: 'Cotton', color: 'Blue', size: 'L', createdAt: new Date('2023-10-05T14:30:00Z').toISOString() },
  { id: '3', name: 'Banarasi Dupatta', categoryId: '3', vendorId: '3', quantity: 30, price: 25.00, fabric: 'Banarasi Silk', color: 'Gold', size: 'Free', createdAt: new Date('2023-10-10T09:00:00Z').toISOString() },
  { id: '4', name: 'Chikankari Kurti', categoryId: '2', vendorId: '1', quantity: 8, price: 75.00, fabric: 'Georgette', color: 'White', size: 'S', createdAt: new Date('2023-10-12T11:20:00Z').toISOString() },
  { id: '5', name: 'Sharara Suit', categoryId: '1', vendorId: '2', quantity: 12, price: 150.00, fabric: 'Crepe', color: 'Pastel Green', size: 'XL', createdAt: new Date('2023-10-15T16:00:00Z').toISOString() },
];

const simulateDelay = () => new Promise(res => setTimeout(res, Math.random() * 500));

// --- Category Functions ---
export async function getCategories(): Promise<Category[]> {
  await simulateDelay();
  return [...categories];
}

export async function addCategory(category: Omit<Category, 'id'>): Promise<Category> {
  await simulateDelay();
  const newCategory: Category = { id: Date.now().toString(), ...category };
  categories.push(newCategory);
  return newCategory;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<Category | null> {
  await simulateDelay();
  const index = categories.findIndex(c => c.id === id);
  if (index === -1) return null;
  categories[index] = { ...categories[index], ...data };
  return categories[index];
}

export async function deleteCategory(id: string): Promise<boolean> {
  await simulateDelay();
  const initialLength = categories.length;
  categories = categories.filter(c => c.id !== id);
  // Also remove related inventory items
  inventoryItems = inventoryItems.filter(i => i.categoryId !== id);
  return categories.length < initialLength;
}

// --- Vendor Functions ---
export async function getVendors(): Promise<Vendor[]> {
  await simulateDelay();
  return [...vendors];
}

export async function addVendor(vendor: Omit<Vendor, 'id'>): Promise<Vendor> {
  await simulateDelay();
  const newVendor: Vendor = { id: Date.now().toString(), ...vendor };
  vendors.push(newVendor);
  return newVendor;
}

export async function updateVendor(id: string, data: Partial<Vendor>): Promise<Vendor | null> {
  await simulateDelay();
  const index = vendors.findIndex(v => v.id === id);
  if (index === -1) return null;
  vendors[index] = { ...vendors[index], ...data };
  return vendors[index];
}

export async function deleteVendor(id: string): Promise<boolean> {
  await simulateDelay();
  const initialLength = vendors.length;
  vendors = vendors.filter(v => v.id !== id);
  // Also remove related inventory items
  inventoryItems = inventoryItems.filter(i => i.vendorId !== id);
  return vendors.length < initialLength;
}

// --- Inventory Item Functions ---
export async function getInventoryItems(): Promise<InventoryItemWithRelations[]> {
  await simulateDelay();
  return inventoryItems
    .map(item => {
      const category = categories.find(c => c.id === item.categoryId);
      const vendor = vendors.find(v => v.id === item.vendorId);
      if (!category || !vendor) return null;
      return { ...item, category, vendor };
    })
    .filter((item): item is InventoryItemWithRelations => item !== null)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addInventoryItem(item: Omit<InventoryItem, 'id' | 'createdAt'>): Promise<InventoryItem> {
  await simulateDelay();
  const newItem: InventoryItem = { 
    id: Date.now().toString(), 
    ...item,
    createdAt: new Date().toISOString(),
  };
  inventoryItems.push(newItem);
  return newItem;
}

export async function updateInventoryItem(id: string, data: Partial<Omit<InventoryItem, 'id' | 'createdAt'>>): Promise<InventoryItem | null> {
  await simulateDelay();
  const index = inventoryItems.findIndex(i => i.id === id);
  if (index === -1) return null;
  inventoryItems[index] = { ...inventoryItems[index], ...data };
  return inventoryItems[index];
}

export async function deleteInventoryItem(id: string): Promise<boolean> {
  await simulateDelay();
  const initialLength = inventoryItems.length;
  inventoryItems = inventoryItems.filter(i => i.id !== id);
  return inventoryItems.length < initialLength;
}

// Dashboard stats
export async function getProductCount() {
    await simulateDelay();
    return inventoryItems.length;
}

export async function getLowStockCount(threshold = 10) {
    await simulateDelay();
    return inventoryItems.filter(item => item.quantity < threshold).length;
}

export async function getVendorCount() {
    await simulateDelay();
    return vendors.length;
}
