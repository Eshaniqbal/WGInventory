import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { InventoryItem, InventoryItemWithRelations } from './types';

// --- Inventory Item Functions ---
export async function getInventoryItems(): Promise<InventoryItemWithRelations[]> {
  const db = await getDb();
  const items = await db.collection("inventory").find({}).toArray();
  
  return items
    .map(item => ({
      ...item,
      id: item._id.toString(),
      _id: undefined,
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addInventoryItem(item: Omit<InventoryItem, 'id' | 'createdAt'>): Promise<InventoryItem> {
  const db = await getDb();
  const newItem = {
    ...item,
    createdAt: new Date().toISOString(),
  };
  const result = await db.collection("inventory").insertOne(newItem);
  return { ...newItem, id: result.insertedId.toString() };
}

export async function updateInventoryItem(id: string, data: Partial<Omit<InventoryItem, 'id' | 'createdAt'>>): Promise<InventoryItem | null> {
  const db = await getDb();
  await db.collection("inventory").updateOne({ _id: new ObjectId(id) }, { $set: data });
  const updated = await db.collection("inventory").findOne({ _id: new ObjectId(id) });
  return updated ? { ...updated, id: updated._id.toString(), _id: undefined } : null;
}

export async function deleteInventoryItem(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection("inventory").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

// Dashboard stats
export async function getProductCount() {
  const db = await getDb();
  return db.collection("inventory").countDocuments();
}

export async function getLowStockCount(threshold = 10) {
  const db = await getDb();
  return db.collection("inventory").countDocuments({ quantity: { $lt: threshold } });
}
