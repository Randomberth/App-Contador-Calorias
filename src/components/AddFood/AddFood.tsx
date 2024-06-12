import { Button, Icon, Input } from '@rneui/themed'
import { View, Text } from 'react-native'
import React, { FC, useContext, useEffect, useState } from 'react'
import { Screen2Context } from '../../context/Screen2Context'
import useFoodStorage from '../../hooks/useFoodStorage'
import { Meal } from '../../types/Types'
import { MY_FOOD_KEY } from '../../hooks/useFoodStorage'

const AddFood = ( ) => {
  const [SearchFoodLocal, setSearchFoodLocal] = useState<string>('')
  const { SearchFood, setSearchFood, ArrayFoodGlobal, setArrayFoodGlobal } = useContext(Screen2Context) ;
  const { onGetFood } = useFoodStorage();

  useEffect(() => {
    setSearchFood(SearchFoodLocal)
    LoadFoodDinamic();
  }, [SearchFoodLocal])



  const LoadFoodDinamic = async () => {
    try {
      const result = await onGetFood(MY_FOOD_KEY);
      setArrayFoodGlobal(result.filter((item: Meal) => item.Name.includes(SearchFood)));
    } catch (error) {
      console.log(error);
      setArrayFoodGlobal([]);
    }
  }
  
  

  return (
    <View className='flex-col w-full '>
        <View className='flex-row'>
          <View className='ml-2 mt-4 w-[70%] h-30' >
              <Input className='ml-2' placeholder='apples, fries, soda...' value={SearchFoodLocal} onChangeText={(text:string) => setSearchFoodLocal(text)} ></Input>
          </View>
          <Button 
              className='w-1/3'
              title={"Search"}
              onPress={()=> console.log("Search")}
              titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#333237' }}
              containerStyle={{
                width:80,
                alignSelf:'flex-end',
                bottom:22,
                right:-6
              }}
              buttonStyle={{
                backgroundColor:'#1ae842',
                borderWidth: 0,
                borderColor: 'transparent',
                borderRadius: 20,
              }}
            />  
            </View>          
    </View>
  )
}

export default AddFood