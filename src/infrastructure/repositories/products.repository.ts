import { firebaseAdmin } from "../firebase/admin";
import { productListSchema } from "../../domain/schemas/product-list.schema";
import { ProductsServiceProtocol } from "../../domain/services/products.service";

export class ProductsRepository implements ProductsServiceProtocol {
  public async create(params: ProductsServiceProtocol.CreateParams) {
    try {
      const id = `${params.category
        .trim()
        .toLowerCase()
        .replace(/ /g, "")
        .replace(/[^\w-]+/g, "")
        .slice(0, 4)
        .toUpperCase()}-${crypto
        .getRandomValues(new Uint32Array(1))[0]
        .toString()}`;
      const slug = params.name
        .trim()
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      await firebaseAdmin
        .app()
        .firestore()
        .collection("products")
        .doc(id)
        .set({ id, slug, ...params });
      return `Product with slug ${slug} was created successfully.`;
    } catch (error) {
      throw new Error("Error creating product.");
    }
  }

  public async get(slug: string) {
    try {
      const productRef = await firebaseAdmin
        .app()
        .firestore()
        .collection("products")
        .where("slug", "==", slug)
        .get();
      const productData = productRef.docs[0].data();
      return {
        cached: false,
        data: productData as ProductsServiceProtocol.Product,
      };
    } catch (error) {
      throw new Error("Error getting product.");
    }
  }

  public async update(params: ProductsServiceProtocol.UpdateParams) {
    try {
      const productRef = await firebaseAdmin
        .app()
        .firestore()
        .collection("products")
        .where("slug", "==", params.slug)
        .get();
      const id = productRef.docs[0].id;
      await firebaseAdmin
        .app()
        .firestore()
        .collection("products")
        .doc(id)
        .update({ ...params.product });
    } catch (error) {
      throw new Error("Error updating product.");
    }
  }

  public async delete(slug: string) {
    try {
      const productRef = await firebaseAdmin
        .app()
        .firestore()
        .collection("products")
        .where("slug", "==", slug)
        .get();
      const id = productRef.docs[0].id;
      await firebaseAdmin
        .app()
        .firestore()
        .collection("products")
        .doc(id)
        .delete();
    } catch (error) {
      throw new Error("Error deleting product.");
    }
  }

  public async listByCategory(params: ProductsServiceProtocol.ListParams) {
    try {
      const page = Number(params.query.page || 1);
      const limit = Number(params.query.limit || 10);
      const snapshot = firebaseAdmin.app().firestore().collection("products");
      const totalCount = (await snapshot.count().get()).data().count;
      const offset = (page - 1) * limit;
      if (params.slug === "all") {
        const products = await snapshot.offset(offset).limit(limit).get();
        return {
          totalCount,
          page,
          count: products.docs.length,
          cached: false,
          data: products.docs.map((doc) =>
            doc.data()
          ) as (typeof productListSchema._type)["data"],
        };
      }
      const products = await firebaseAdmin
        .app()
        .firestore()
        .collection("products")
        .where("category", "==", params.slug)
        .offset(offset)
        .limit(limit)
        .get();
      return {
        totalCount,
        page,
        count: products.docs.length,
        cached: false,
        data: products.docs.map((doc) =>
          doc.data()
        ) as (typeof productListSchema._type)["data"],
      };
    } catch (error) {
      throw new Error("Error getting products.");
    }
  }
}
