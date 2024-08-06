import { firebaseAdmin } from "../firebase/admin";
import { categorySchema } from "../../domain/schemas/category.schema";
import { categoryListSchema } from "../../domain/schemas/category-list.schema";
import { CategoriesServiceProtocol } from "../../domain/services/categories.service";

export class CategoriesRepository implements CategoriesServiceProtocol {
  public async create(params: CategoriesServiceProtocol.CreateParams) {
    try {
      const id = crypto.randomUUID();
      const slug = params.name
        .trim()
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      await firebaseAdmin
        .app()
        .firestore()
        .collection("categories")
        .doc(id)
        .set({ id, slug, ...params });
      return `Category with slug ${slug} was created successfully.`;
    } catch (error) {
      throw new Error("Error creating category.");
    }
  }

  public async get(slug: string) {
    try {
      const category = await firebaseAdmin
        .app()
        .firestore()
        .collection("categories")
        .where("slug", "==", slug)
        .get();
      return {
        cached: false,
        data: category.docs[0].data() as typeof categorySchema._type,
      };
    } catch (error) {
      throw new Error("Error getting category.");
    }
  }

  public async list() {
    try {
      const categories = await firebaseAdmin
        .app()
        .firestore()
        .collection("categories")
        .get();
      return {
        cached: false,
        data: categories.docs.map((doc) =>
          doc.data()
        ) as (typeof categoryListSchema._type)["data"],
      };
    } catch (error) {
      throw new Error("Error getting categories.");
    }
  }

  public async update(params: CategoriesServiceProtocol.UpdateParams) {
    try {
      const category = await firebaseAdmin
        .app()
        .firestore()
        .collection("categories")
        .where("slug", "==", params.slug)
        .get();
      await firebaseAdmin
        .app()
        .firestore()
        .collection("categories")
        .doc(category.docs[0].id)
        .update({ ...params.category });
    } catch (error) {
      throw new Error("Error updating category.");
    }
  }

  public async delete(slug: string) {
    try {
      const category = await firebaseAdmin
        .app()
        .firestore()
        .collection("categories")
        .where("slug", "==", slug)
        .get();
      const id = category.docs[0].id;
      await firebaseAdmin
        .app()
        .firestore()
        .collection("categories")
        .doc(id)
        .delete();
    } catch (error) {
      throw new Error("Error deleting product.");
    }
  }
}
