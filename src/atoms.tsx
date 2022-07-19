import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
export interface ICategory {
  addCategory: string;
}
export interface ICategories {
  text: string;
  id: number;
  category: string;
}
export const categoriesState = atom<ICategories[]>({
  key: "categories",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
