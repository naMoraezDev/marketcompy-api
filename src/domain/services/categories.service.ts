import { categorySchema } from "../schemas/category.schema";
import { categoryListSchema } from "../schemas/category-list.schema";
import { categoryResponseSchema } from "../schemas/category-response.schema";

export namespace CategoriesServiceProtocol {
  export type UpdateParams = {
    slug: string;
    category: CategoryInput;
  };
  export type CreateParams = CategoryInput;
  export type CategoryInput = Omit<typeof categorySchema._type, "id" | "slug">;
}

export interface CategoriesServiceProtocol {
  delete(slug: string): Promise<void>;
  list(): Promise<typeof categoryListSchema._type>;
  get(slug: string): Promise<typeof categoryResponseSchema._type>;
  update(params: CategoriesServiceProtocol.UpdateParams): Promise<void>;
  create(params: CategoriesServiceProtocol.CreateParams): Promise<string>;
}
