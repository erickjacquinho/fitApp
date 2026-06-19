import { database } from '../../../db';
import Meal from '../../../db/models/Meal';
import MealItem from '../../../db/models/MealItem';
import { MealDTO, ItemDTO } from '../types';

export class MealService {
  private static mealsCollection = database.get<Meal>('meals');
  private static mealItemsCollection = database.get<MealItem>('meal_items');

  static async createWithItems(mealData: MealDTO, items: ItemDTO[]): Promise<Meal> {
    if (!mealData.name || mealData.name.trim() === '') {
      throw new Error('ValidationError: Meal name is required');
    }
    return await database.write(async () => {
      const newMeal = await this.mealsCollection.create((meal) => {
        meal.name = mealData.name.trim();
        meal.quantity = mealData.quantity;
        meal.preparationState = mealData.preparationState;
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

  static async getAll(): Promise<Meal[]> {
    return await this.mealsCollection.query().fetch();
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
