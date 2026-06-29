import { database } from '../../../db';
import Meal from '../../../db/models/Meal';
import MealItem from '../../../db/models/MealItem';
import { MealDTO, ItemDTO } from '../types';
import { capitalizeWords } from '../../../lib/utils';
export class MealService {
  private static mealsCollection = database.get<Meal>('meals');
  private static mealItemsCollection = database.get<MealItem>('meal_items');

  static async createWithItems(mealData: MealDTO, items: ItemDTO[], targetDate: string = new Date().toISOString().split('T')[0]): Promise<Meal> {
    if (!mealData.name || mealData.name.trim() === '') {
      throw new Error('ValidationError: Meal name is required');
    }
    return await database.write(async () => {
      const newMeal = this.mealsCollection.prepareCreate((meal) => {
        meal.name = capitalizeWords(mealData.name);
        meal.quantity = mealData.quantity;
        meal.preparationState = mealData.preparationState;
        meal.orderIndex = Date.now(); // default ordering
        meal.targetDate = targetDate;
      });

      const mealItemRecords = items.map((item) => 
        this.mealItemsCollection.prepareCreate((mealItem) => {
          mealItem.mealId = newMeal.id;
          mealItem.foodId = item.foodId;
          mealItem.quantity = item.quantity;
        })
      );

      await database.batch(newMeal, ...mealItemRecords);

      return newMeal;
    });
  }

  static async updateWithItems(mealId: string, mealData: MealDTO, items: ItemDTO[]): Promise<Meal> {
    if (!mealData.name || mealData.name.trim() === '') {
      throw new Error('ValidationError: Meal name is required');
    }
    const meal = await this.mealsCollection.find(mealId);
    const existingItems = await meal.items.fetch();

    return await database.write(async () => {
      const mealUpdate = meal.prepareUpdate((m) => {
        m.name = capitalizeWords(mealData.name);
        m.quantity = mealData.quantity;
        m.preparationState = mealData.preparationState;
      });

      const recordsToBatch: any[] = [mealUpdate];

      const existingItemsMap = new Map<string, MealItem>();
      existingItems.forEach((item) => {
        existingItemsMap.set(item.foodId, item);
      });

      const newFoodIds = new Set(items.map((item) => item.foodId));

      existingItems.forEach((item) => {
        if (!newFoodIds.has(item.foodId)) {
          recordsToBatch.push(item.prepareMarkAsDeleted());
        }
      });

      items.forEach((newItem) => {
        const existingItem = existingItemsMap.get(newItem.foodId);
        if (existingItem) {
          if (existingItem.quantity !== newItem.quantity) {
            recordsToBatch.push(
              existingItem.prepareUpdate((item) => {
                item.quantity = newItem.quantity;
              })
            );
          }
        } else {
          recordsToBatch.push(
            this.mealItemsCollection.prepareCreate((mealItem) => {
              mealItem.mealId = meal.id;
              mealItem.foodId = newItem.foodId;
              mealItem.quantity = newItem.quantity;
            })
          );
        }
      });

      await database.batch(...recordsToBatch);

      return meal;
    });
  }

  static async updateBasicInfo(mealId: string, name: string, preparationState: string): Promise<Meal> {
    if (!name || name.trim() === '') {
      throw new Error('ValidationError: Meal name is required');
    }
    const meal = await this.mealsCollection.find(mealId);
    return await database.write(async () => {
      return await meal.update((m) => {
        m.name = capitalizeWords(name);
        m.preparationState = preparationState.trim();
      });
    });
  }

  static async addItemToMeal(mealId: string, foodId: string, quantity: number = 100): Promise<void> {
    await database.write(async () => {
      await this.mealItemsCollection.create((mealItem) => {
        mealItem.mealId = mealId;
        mealItem.foodId = foodId;
        mealItem.quantity = quantity;
      });
    });
  }

  static async removeItemFromMeal(mealItemId: string): Promise<void> {
    const mealItem = await this.mealItemsCollection.find(mealItemId);
    await database.write(async () => {
      await mealItem.markAsDeleted();
    });
  }

  static async updateItemInMeal(mealItemId: string, quantity: number): Promise<void> {
    const mealItem = await this.mealItemsCollection.find(mealItemId);
    await database.write(async () => {
      await mealItem.update((item) => {
        item.quantity = quantity;
      });
    });
  }

  static async getAll(): Promise<Meal[]> {
    return await this.mealsCollection.query().fetch();
  }

  static async updateMealOrder(orderedIds: string[]): Promise<void> {
    await database.write(async () => {
      const mealsToUpdate = await Promise.all(
        orderedIds.map(async (id, index) => {
          const meal = await this.mealsCollection.find(id);
          return meal.prepareUpdate((m) => {
            m.orderIndex = index;
          });
        })
      );
      await database.batch(...mealsToUpdate);
    });
  }

  static async delete(id: string): Promise<void> {
    const meal = await this.mealsCollection.find(id);
    const mealItems = await meal.items.fetch();
    
    await database.write(async () => {
      await database.batch(
        meal.prepareMarkAsDeleted(),
        ...mealItems.map((item) => item.prepareMarkAsDeleted())
      );
    });
  }
}
