import { productSchema } from "../schemas/product.schema";
import { productListSchema } from "../schemas/product-list.schema";
import { productResponseSchema } from "../schemas/product-response.schema";

export namespace ProductsServiceProtocol {
  export type UpdateParams = {
    slug: string;
    product: ProductInput;
  };
  export type CreateParams = ProductInput;
  export type ListParams = {
    slug: string;
    query: { page?: string; limit?: string };
  };
  export type Product = typeof productSchema._type;
  export type ProductInput = Omit<typeof productSchema._type, "id" | "slug">;
}

export interface ProductsServiceProtocol {
  delete(slug: string): Promise<void>;
  listByCategory(
    params: ProductsServiceProtocol.ListParams
  ): Promise<typeof productListSchema._type>;
  get(slug: string): Promise<typeof productResponseSchema._type>;
  update(params: ProductsServiceProtocol.UpdateParams): Promise<void>;
  create(params: ProductsServiceProtocol.CreateParams): Promise<string>;
}
