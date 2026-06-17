import { database } from '../../../db';
import Meal from '../../../db/models/Meal';
import MealItem from '../../../db/models/MealItem';
import { MealDTO, ItemDTO } from '../types';

export class MealService {
  private static mealsCollection = database.get<Meal>('meals');
  private static mealItemsCollection = database.get<MealItem>('meal_items');

  static async createWithItems(mealData: MealDTO, items: ItemDTO[]): Promise<Meal> {
    return await database.write(async () => {
      const newMeal = await this.mealsCollection.create((meal) => {
        meal.name = mealData.name;
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
    await database.write(async () => {
      // MealItems should be handled (cascading or manual)
      // Since we don't have automatic cascade in WatermelonDB for preparing delete, we should find items first
      const items = await this.mealItemsCollection.query().fetch(); // Filtered by meal_id would be better
      // Better to use Query or associations
      const mealItems = await meal.items.fetch();
      
      await database.batch(
        meal.prepareMarkAsDeleted(),
        ...mealItems.map((item: any) => item.prepareMarkAsDeleted())
      );
    });
  }
}
