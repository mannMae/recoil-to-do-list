import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO",
  "DOING",
  "DONE",
}

export const categoriesList = atom<string[]>({
  key:"categoriesSelector",
  default:["TO_DO", "DOING", "DONE"],
})

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

const getToDoList = () =>{
  const toDoList = localStorage.getItem("toDoList")
  if( toDoList === null) {return ;}
  return JSON.parse(toDoList)
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: getToDoList(),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    localStorage.setItem("toDoList", JSON.stringify(toDos));
    console.log(get(categoriesList));
    return toDos.filter((toDo) => toDo.category === category);
  },
});
