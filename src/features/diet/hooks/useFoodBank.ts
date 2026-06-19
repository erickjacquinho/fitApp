import { useState } from 'react';
import { FoodService } from '../services/food-service';
import Food from '../../../db/models/Food';

export function useFoodBank(foods: Food[]) {
  const [search, setSearch] = useState('');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [bulkSelections, setBulkSelections] = useState<Set<string>>(new Set());

  const filteredFoods = foods.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteFood = async (id: string) => {
    await FoodService.delete(id);
  };

  const deleteSelectedFoods = async () => {
    await Promise.all(Array.from(bulkSelections).map((id) => FoodService.delete(id)));
    setBulkSelections(new Set());
    setIsSelectionMode(false);
  };

  const toggleBulkSelection = (id: string) => {
    setBulkSelections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return {
    search,
    setSearch,
    isSelectionMode,
    setIsSelectionMode,
    bulkSelections,
    toggleBulkSelection,
    filteredFoods,
    deleteFood,
    deleteSelectedFoods,
  };
}
