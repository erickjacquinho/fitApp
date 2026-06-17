import { Q } from '@nozbe/watermelondb';
import { database } from '../../../db';
import Food from '../../../db/models/Food';
import { FoodDTO } from '../types';

export class FoodService {
  private static collection = database.get<Food>('foods');

  static async create(data: FoodDTO): Promise<Food> {
    return await database.write(async () => {
      return await this.collection.create((food) => {
        food.name = data.name;
        food.preparationWeight = data.preparationWeight;
        food.description = data.description;
        food.protein = data.protein;
        food.carbohydrates = data.carbohydrates;
        food.fat = data.fat;
        food.calories = data.calories;
      });
    });
  }

  static async update(id: string, data: Partial<FoodDTO>): Promise<Food> {
    const food = await this.collection.find(id);
    return await database.write(async () => {
      return await food.update((f) => {
        if (data.name !== undefined) f.name = data.name;
        if (data.preparationWeight !== undefined) f.preparationWeight = data.preparationWeight;
        if (data.description !== undefined) f.description = data.description;
        if (data.protein !== undefined) f.protein = data.protein;
        if (data.carbohydrates !== undefined) f.carbohydrates = data.carbohydrates;
        if (data.fat !== undefined) f.fat = data.fat;
        if (data.calories !== undefined) f.calories = data.calories;
      });
    });
  }

  static async delete(id: string): Promise<void> {
    const food = await this.collection.find(id);
    await database.write(async () => {
      await food.markAsDeleted(); // or destroyPermanently()
    });
  }

  static async getAll(): Promise<Food[]> {
    return await this.collection.query().fetch();
  }

  static async search(query: string): Promise<Food[]> {
    return await this.collection
      .query(Q.where('name', Q.like(`%${Q.sanitizeLikeString(query)}%`)))
      .fetch();
  }
}
