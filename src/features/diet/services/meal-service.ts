import { database } from '../../../db';
import Meal from '../../../db/models/Meal';
import MealItem from '../../../db/models/MealItem';
import { MealDTO, ItemDTO } from '../types';

export class MealService {
  private static mealsCollection = database.get<Meal>('meals');
  private static mealItemsCollection = database.get<MealItem>('meal_items');

  static async createWithItems(mealData: MealDTO, items: ItemDTO[], targetDate: string = new Date().toISOString().split('T')[0]): Promise<Meal> {
    if (!mealData.name || mealData.name.trim() === '') {
      throw new Error('ValidationError: Meal name is required');
    }
    return await database.write(async () => {
      const newMeal = await this.mealsCollection.create((meal) => {
        meal.name = mealData.name.trim();
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

      await database.batch(...mealItemRecords);

      return newMeal;
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
        ...mealItems.map((item: any) => item.prepareMarkAsDeleted())
      );
    });
  }
}
