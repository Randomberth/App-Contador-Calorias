import { Button, Icon } from '@rneui/themed'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Meal } from '../../types/Types'
import useFoodStorage from '../../hooks/useFoodStorage'
import { MY_TODAY_FOOD_KEY, MY_FOOD_KEY } from '../../hooks/useFoodStorage'

type TypeMealItem = Meal & {
  flag: string;
  RefreshScreen1: () => void;
  RefreshScreen2: () => void;
}

const MealItem: FC<TypeMealItem> = ( { 
  Key,
  Calories,
  Name, 
  Portion, 
  flag, 
  RefreshScreen1,
  RefreshScreen2,
}) => {
  const [TodayFood, setTodayFood] = useState<Meal[] | undefined>([])
  const { onTodayFood, onGetTodayFood, onDeleteFood, onDeleteFoodT } = useFoodStorage();
  const colorButton = flag==='Screen1' ? '#e20301' : '#09c116';
  
  useEffect(() => {
    GetTodayFood(); 
  }, [])
  
  const putTodayFood = async() => {
    try {
      await onTodayFood({
        Calories,
        Name,
        Portion
      });
      Alert.alert("Food Added with succes!")
    } catch (error) {
      console.log(error);
    }
  }

  const GetTodayFood = async() => {
    try {
      const TodayFood = await onGetTodayFood();
      setTodayFood(TodayFood);
    } catch (error) {
      
    }
  }

  let actionScreen: () => void;

  if (flag==="Screen1") {
    actionScreen = async() => {
      await onDeleteFoodT(Key, MY_TODAY_FOOD_KEY);
      RefreshScreen1();
      Alert.alert('Deleted food in daily record');
    };
  } else {
    actionScreen = async () => {
      await putTodayFood();
    };
  }

  const deleteFoodForKey = async() => {
    try {
      await onDeleteFoodT(Key, MY_FOOD_KEY)
      RefreshScreen2();
      Alert.alert('Deleted food in principal');
      
    } catch (error) {
      console.log(error);
      
    }
  }
  
  
  return (
    <TouchableOpacity className='flex-row ml-auto mr-auto mt-3 w-[85%] h-24 bg-slate-200 rounded-3xl'
      onLongPress={flag==='Screen2' ? deleteFoodForKey : ()=> {} }
      delayLongPress={1500}
      activeOpacity={0.3}
      >
        <View className='w-2/4 h-full '>
            <Text className='text-2xl font-bold mt-3 ml-6'>{Name}</Text>
            <Text className='text-lg ml-6 mt-2'>{Portion}</Text>
        </View>
        <View className='w-2/4 h-full '>
        <Button 
              icon={<Icon name={ flag==='Screen1' ? "trash" : "plus-circle"} size={24}  color= 'white' type='font-awesome' />}
              onPress={actionScreen} 
              containerStyle={{
                width:40,
                marginTop:10,
                marginLeft:95,
              }}
              buttonStyle={{
                backgroundColor:colorButton,
                borderWidth: 0,
                borderColor: 'transparent',
                borderRadius: 50,
              }}
          />
            
            <Text className='text-2xl font-bold ml-[90] mt-2'>{Calories}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default MealItem;