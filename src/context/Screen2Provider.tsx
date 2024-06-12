import React, { useState, useContext } from 'react'
import { Screen2Context } from './Screen2Context'
import { Meal, TodayCalories } from '../types/Types'

export const Screen2Provider = ({children}: any) => {
  const [SearchFood, setSearchFood] = useState<string>('')
  const [ArrayFoodGlobal, setArrayFoodGlobal] = useState<Meal[]>([])
  const [TodayFoodStateG, setTodayFoodStateG] = useState<Meal[] | undefined>([])
 
  return (
    <Screen2Context.Provider value = {{ SearchFood, setSearchFood, ArrayFoodGlobal, setArrayFoodGlobal, TodayFoodStateG, setTodayFoodStateG } }>
    {children}
    </Screen2Context.Provider> 

  )
}

export default Screen2Provider;
  