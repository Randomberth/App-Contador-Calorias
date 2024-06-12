import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal } from '../types/Types';
import { format } from 'date-fns';

export const MY_FOOD_KEY = '@MyFood:Key'
export const MY_TODAY_FOOD_KEY = '@MyTodayFood:Key'

const useFoodStorage = () => {

  const getKey = (length: number): string => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let fKey = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * caracteres.length);
        fKey += caracteres.charAt(index);
    }
    return fKey;
}

  const SaveParamFood = async(keyStorage:string, meal: Meal) => {
    try {
    const currentSavedFood = await AsyncStorage.getItem(keyStorage);
    let currentSavedFoodParsed = [];
    if (currentSavedFood !== null) {
          currentSavedFoodParsed = JSON.parse(currentSavedFood);
        }
        currentSavedFoodParsed.push(
          meal
        );
        const finalFoodToStringfy = JSON.stringify(currentSavedFoodParsed);
        await AsyncStorage.setItem(keyStorage, finalFoodToStringfy);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
  };

  const getParamStorage = async (keyStorage:string) => {
      try {
          const foodStorage = await AsyncStorage.getItem(keyStorage)
          if (foodStorage !== null){
              const foodStorageParsed = JSON.parse(foodStorage)
              return Promise.resolve(foodStorageParsed)
          }
      } catch (error) {
          return Promise.reject(error)
      }
  }

  const handleSaveFood = async ({ Calories, Name, Portion }: Meal) => {
    try {
        const Key = getKey(6)
        const response = await SaveParamFood(MY_FOOD_KEY, { Key, Calories, Name, Portion })
        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error)
      }
    
  };
  
  const handleSaveTodayFood = async ( { Calories, Name, Portion }: Meal ) => {
    try {
      const date = new Date();
      const Date_ = format(date, "yyyy-MM-dd");
      const Key = getKey(6);
      const response = await SaveParamFood(MY_TODAY_FOOD_KEY, { Key, Calories, Name, Portion, Date_ })
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error)
    }
  };

  const handleGetTodayFood = async() => {
    try {
      const date = new Date();
      const DateToday = format(date, "yyyy-MM-dd");
      const TodayFood = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);

      if (TodayFood !== null){
        const parsedFoods = JSON.parse(TodayFood) as Meal[];
        return Promise.resolve(parsedFoods.filter(meal => meal.Date_ &&  meal.Date_ === DateToday ))
      }
      
    } catch (error) {
      return Promise.reject(error)
      
    }
  }

  const removeParamStorage = async(keyStorage: string) => {
    try {
      await AsyncStorage.removeItem(keyStorage);
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
      
    }
  }

  const removeForItemParamFood = async(foodKey: string | undefined, keyStorage: string) => {
    try {
      const TodayFood = await getParamStorage(keyStorage);
      const filterItems = TodayFood?.filter((item : Meal) => {
          return item.Key !== foodKey
      });
      const filterItemsSTR = JSON.stringify(filterItems);

      await AsyncStorage.setItem(keyStorage, filterItemsSTR);
    } catch (error) {
      Promise.reject(error)
      
    }
  }
    return {
        onSaveFood     : handleSaveFood,
        onTodayFood    : handleSaveTodayFood,
        onGetFood      : getParamStorage,
        onGetTodayFood : handleGetTodayFood,
        onDeleteFood   : removeParamStorage,
        onDeleteFoodT  : removeForItemParamFood,
    }
}

export default useFoodStorage;