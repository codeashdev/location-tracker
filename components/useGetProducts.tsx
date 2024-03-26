import { useState, useEffect } from 'react';
import { getStoredProducts } from '@/storage/asyncstorage';

export function useStoredProducts() {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedProducts = await getStoredProducts();
        if (storedProducts) {
          // Parse the JSON string back to an array
          setProducts(JSON.parse(storedProducts));
        }
      } catch (error) {
        console.error('Error fetching stored products:', error);
      }
    };

    fetchData();
  }, []);

  return { products, setProducts };
}

