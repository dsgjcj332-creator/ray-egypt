export interface Collection {
  id: string;
  name: string;
  season: string;
  status: 'draft' | 'active' | 'archived';
  discount: number;
  itemCount: number;
  image: string;
  createdAt: string;
}

export async function fetchCollections(): Promise<Collection[]> {
  // Mock data
  return [
    {
      id: '1',
      name: 'صيف 2025',
      season: 'الصيف',
      status: 'active',
      discount: 20,
      itemCount: 45,
      image: 'https://images.unsplash.com/photo-1556821552-5f63b1c2c723?w=400',
      createdAt: '2025-01-01'
    }
  ];
}

export async function saveCollection(collection: Collection): Promise<Collection> {
  return collection;
}

export async function deleteCollection(id: string): Promise<void> {
  // Mock delete
}
