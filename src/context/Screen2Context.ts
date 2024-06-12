import { createContext } from "react";
import { Meal } from "../types/Types";

  
export interface SearchContext {
    SearchFood: string;
    setSearchFood: (SearchInput: string) => void
    ArrayFoodGlobal: Meal[] | undefined;
    setArrayFoodGlobal: (ArrayFood: Meal[] | []) => void
    TodayFoodStateG: Meal[] | undefined;
    setTodayFoodStateG: (ArrayFood: Meal[] | []) => void
}

export const Screen2Context = createContext<SearchContext>(
    {
     SearchFood:"",
     setSearchFood: () => {},
     ArrayFoodGlobal:[],
     setArrayFoodGlobal: () => {},
     TodayFoodStateG:[],
     setTodayFoodStateG: () => {}
    },
);
 