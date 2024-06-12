import * as Progress from 'react-native-progress';
import { View, Text } from 'react-native'
import React, { FC, useEffect } from 'react'
import { TodayCalories } from '../../types/Types';

type FwindowsFood = TodayCalories & {
    autoRefresh: () => void;
}
const WindowsFood: FC<FwindowsFood> = ( {
  recomendedCalories = 0,
  consumedCalories = 0,
  remainingCalories = 0,
  percentage = 0,
  autoRefresh,
 } ) => {
  const CirclePercentage = ( percentage * 0.01 )
  useEffect(() => {
    autoRefresh();
  }, [])

  return (
    <View className='flex-row w-full h-[27%] bg-slate-300' >
        <View className='flex items-center justify-center w-2/4 h-full ' >
        <Progress.Circle 
            size={160}
            borderColor='transparent'
            indeterminate={false}
            progress={CirclePercentage}
            color='#007400'
            unfilledColor='#a4ffff'
            showsText={true}  
            textStyle={{fontWeight:'bold'}}
            thickness={8}
        />
        </View>
        <View className='flex-row w-2/4 h-full ' >
          <View className='w-2/4 h-full'>
            <Text className='mt-5 ml-3 text-3xl semi-bold ' >Today</Text>
            <Text className='mt-4 ml-2 text-xl font-bold' >Total: </Text>
            <Text className='mt-3 ml-2 text-xl font-bold' >Consumed: </Text>
            <Text className='mt-3 ml-2 text-xl font-bold' >Calories: </Text>
          </View>
          <View className='w-2/4 h-full'>
            <Text className=' mt-16 ml-7 text-xl font-bold' >{recomendedCalories}</Text>
            <Text className=' mt-3 ml-7 text-xl font-bold' >{consumedCalories}</Text>
            <Text className=' mt-3 ml-7 text-xl font-bold' >{remainingCalories}</Text>
          </View>
        </View>
    </View>
  )
}

export default WindowsFood;