import { useState, useEffect } from 'react';
import { FoodService } from '../services/food-service';
import Food from '../../../db/models/Food';

export function useFoodBank(foods: Food[]) {
  const [search, setSearch] = useState('');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [bulkSelections, setBulkSelections] = useState<Set<string>>(new Set());
  const [selectionVersion, setSelectionVersion] = useState(0);

  const filteredFoods = foods.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isSelectionMode && bulkSelections.size === 0) {
      setIsSelectionMode(false);
    }
  }, [bulkSelections.size, isSelectionMode]);

  const deleteFood = async (id: string) => {
    await FoodService.delete(id);
  };

  const clearSelection = () => {
    setBulkSelections(new Set());
    setIsSelectionMode(false);
  };

  const deleteSelectedFoods = async () => {
    await Promise.all(Array.from(bulkSelections).map((id) => FoodService.delete(id)));
    clearSelection();
  };

  const favoriteSelectedFoods = async () => {
    await FoodService.toggleFavorites(Array.from(bulkSelections), true);
    setSelectionVersion((v) => v + 1);
  };

  const unfavoriteSelectedFoods = async () => {
    await FoodService.toggleFavorites(Array.from(bulkSelections), false);
    setSelectionVersion((v) => v + 1);
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
    clearSelection,
    filteredFoods,
    deleteFood,
    deleteSelectedFoods,
    favoriteSelectedFoods,
    unfavoriteSelectedFoods,
    selectionVersion,
  };
}
