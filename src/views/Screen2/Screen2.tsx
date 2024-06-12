import Screen2Provider from '../../context/Screen2Provider';
import { Alert, View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import { Button, Icon, Input } from '@rneui/themed';
import ModalFood from '../../components/ModalFood';
import useFoodStorage from '../../hooks/useFoodStorage';
import { Meal } from '../../types/Types';
import MealItem from '../../components/MealItem';
import { MY_FOOD_KEY } from '../../hooks/useFoodStorage';

const flag="Screen2"

const Screen2 = () => { 
  const [Visible, setVisible] = useState<boolean>(false)
  const [ArrayFood, setArrayFood] = useState<Meal[]>([])
  const [SearchFoodLocal, setSearchFoodLocal] = useState<string>('')
  const { onGetFood, onDeleteFood } = useFoodStorage();

  useEffect(() => {
    LoadFoodDinamic().catch(null);
  }, [Visible, SearchFoodLocal])

  const handleModalClose = async (shouldUpdate?:boolean)=> {
      setVisible(false)
  }
  
  const LoadFoodDinamic = async () => {
    try {
      const result = await onGetFood(MY_FOOD_KEY);
      setArrayFood(result.filter((item: Meal) => item.Name.toLocaleLowerCase().includes(SearchFoodLocal.toLocaleLowerCase())));
    } catch (error) {
      console.log(error);
      setArrayFood([]);
    }
  }

  const resetStorage = async(KeyToReset: string) => {
    try {
      onDeleteFood(KeyToReset)
      LoadFoodDinamic();
      Alert.alert("Record deleted")      
    } catch (error) {
      console.log(error);
    }
  }
    
  return (
    <Screen2Provider>
      <View className='flex-1 bg-slate-500'>
        <View className=' flex w-full'>
          <Header/>
          <View className='flex-row w-full mt-6'>
            <Text className='text-2xl font-bold m-4 ml-6' >Add Food</Text>
            <Button 
                icon={<Icon name="plus-circle" size={24}  color= 'white' type='font-awesome' />}  onPress={()=> setVisible(true) } 
                containerStyle={{
                  position:'absolute',
                  width:50,
                  top:8,
                  right:26
                }}
                buttonStyle={{
                  backgroundColor:'#09c116',
                  borderWidth: 0,
                  borderColor: 'transparent',
                  borderRadius: 20,
                }}
            />
          </View>
          <View className='flex-col w-full '>
                <View className='flex-row'>
                  <View className='ml-2 mt-4 w-[70%] h-30' >
                    <Input className='ml-2' placeholder='apples, fries, soda...' value={SearchFoodLocal} onChangeText={(text:string) => setSearchFoodLocal(text)} ></Input>
                   </View>
                  <Button 
                      className='w-1/3'
                      title={"Reset All"}
                      onLongPress={() => resetStorage(MY_FOOD_KEY)}
                      delayLongPress={3000}
                      titleStyle={{ fontWeight: 'bold', fontSize: 16, color:'#F4ECEE' }}
                      containerStyle={{
                        width:80,
                        alignSelf:'flex-end',
                        bottom:22,
                        right:-6
                      }}
                      buttonStyle={{
                        backgroundColor:'#e20301',
                        borderWidth: 0,
                        borderColor: 'transparent',
                        borderRadius: 20,
                      }}
                    />  
                </View>          
          </View>
          <ScrollView className='flex w-full h-[60%]'>
            {ArrayFood?.map(meal => <MealItem 
            key={`MyMealItem${meal.Key}`} 
            {...meal} 
            flag={flag} 
            RefreshScreen1={()=>{}}
            RefreshScreen2={LoadFoodDinamic}
             />)} 
          </ScrollView>
          <ModalFood visible={Visible} onclose={handleModalClose}/>
        </View>
        <View className='flex w-[90%] h-8 mt-4 ml-auto mr-auto items-center justify-center bg-red-600 rounded-2xl'>
          <Text className='text-lg text-slate-300'>Warning: long press the item you want to delete!!! </Text>
      </View>
      </View>
    </Screen2Provider>
  )
}

export default Screen2;