
export interface Collection {
  id: number | string;
  name: string;
  season: string;
  itemCount: number;
  status: 'active' | 'draft' | 'archived';
  image: string;
  discount?: string;
}

let collections: Collection[] = [
  { id: 1, name: 'صيف 2025', season: 'الصيف', itemCount: 45, status: 'active', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400' },
  { id: 2, name: 'ملابس العيد', season: 'موسم', itemCount: 20, status: 'draft', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400' },
  { id: 3, name: 'تصفية الشتاء', season: 'الشتاء', itemCount: 120, status: 'active', image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400', discount: '50%' },
  { id: 4, name: 'اكسسوارات رجالي', season: 'طوال العام', itemCount: 35, status: 'active', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400' },
];

export const fetchCollections = async (): Promise<Collection[]> => {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate latency
  return [...collections];
};

export const saveCollection = async (collection: Collection): Promise<Collection> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const index = collections.findIndex(c => c.id === collection.id);
  if (index >= 0) {
    collections[index] = collection;
    return collection;
  } else {
    const newCollection = { ...collection, id: Date.now() };
    collections.unshift(newCollection);
    return newCollection;
  }
};

export const deleteCollection = async (id: number | string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  collections = collections.filter(c => c.id !== id);
};
