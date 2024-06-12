import { View, Text, ScrollView } from 'react-native'
import { StatusBar } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../../components/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { PostImageNAvigationProps } from '../../types/TypesRoutes';
import { Button, Icon } from '@rneui/themed';
import { Meal } from '../../types/Types';
import useFoodStorage from '../../hooks/useFoodStorage';
import WindowsFood from '../../components/WindowsFood';
import MealItem from '../../components/MealItem';
import { TodayCalories } from '../../types/Types';
import Screen2Provider from '../../context/Screen2Provider';
import { Screen2Context } from '../../context/Screen2Context';

StatusBar.setBackgroundColor('#dadad8', true);
const recomendedCaloriesPerDay = 2000;
const flag="Screen1"

const Screen1 = () => {
const { navigate } = useNavigation<PostImageNAvigationProps>();
const [TodayFoodState, setTodayFoodState] = useState<Meal[] | undefined>([])
const [DataTodayCalories, setDataTodayCalories] = useState<TodayCalories>()
const { TodayFoodStateG, setTodayFoodStateG } = useContext(Screen2Context);
const { onGetTodayFood } = useFoodStorage();

useFocusEffect(useCallback(
  ()=>{
    GetTodayFood().catch();
  },
  []),);

const handleScreen2 = () => {
  navigate('Screen2');
}

const functionDataTodayCalories = (meals : Meal[]) => {
  try {
    const consumedCaloriesCalc = meals.reduce(
      (acum, current) => acum + Number(current.Calories),
      0,
    );
    const remainingCaloriesCalc = recomendedCaloriesPerDay - consumedCaloriesCalc;
    const percentageCalc        = (consumedCaloriesCalc / recomendedCaloriesPerDay) * 100;

    setDataTodayCalories({
      recomendedCalories: recomendedCaloriesPerDay,
      consumedCalories  : consumedCaloriesCalc,
      remainingCalories : remainingCaloriesCalc,
      percentage        : percentageCalc,
    
    });

  } catch (error) {
    console.log(error);
  }
}

const GetTodayFood = useCallback(async() => {
  try {
    const TodayFood = (await onGetTodayFood()) as Meal[];
    setTodayFoodState(TodayFood);
    functionDataTodayCalories(TodayFood);
    
  } catch (error) {
    console.log(error);
  }
}, [onGetTodayFood] )

//console.log("Today Array Food Focus",TodayFoodState);

  return (
    <Screen2Provider >
      <View className='flex-1 bg-zinc-300'>
        <Header/>
        <View className='flex-row justify-center items-center mt-2 ml-5 mr-10'>
          <View className='flex w-3/4 justify-center items-center'>
              <Text className='absolute left-4  text-2xl font-semibold'>CALORIES</Text>
          </View>
            <View className='flex w-1/4 h-20 justify-center '>
            <Button 
                  icon={<Icon name="plus-circle" size={24}  color= 'white' type='font-awesome' />}  onPress={handleScreen2 } 
                  containerStyle={{
                    position:'absolute',
                    width:50,
                    top:20,
                    right:2
                  }}
                  buttonStyle={{
                    backgroundColor:'#09c116',
                    borderWidth: 0,
                    borderColor: 'transparent',
                    borderRadius: 20,
                  }}
              />
            </View>
          </View>
          <WindowsFood {...DataTodayCalories} autoRefresh={GetTodayFood}/>
          <ScrollView className='flex w-full h-[60%]'>
              {TodayFoodState?.map(meal => <MealItem 
              key={`MyMealItem${meal.Key}`} 
              {...meal} 
              flag={flag} 
              RefreshScreen1={GetTodayFood}
              RefreshScreen2={()=>{}}
               />)} 
          </ScrollView>
      </View> 
    </Screen2Provider>
  )
}

export default Screen1;