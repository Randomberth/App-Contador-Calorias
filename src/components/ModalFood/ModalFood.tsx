import { Modal, View, Text  } from 'react-native'
import { Button, Icon, Input } from '@rneui/themed'
import React, { FC, useContext, useEffect, useState } from 'react'
import useFoodStorage, { MY_FOOD_KEY, MY_TODAY_FOOD_KEY } from '../../hooks/useFoodStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';


type AddModalFood = {
    onclose: (shouldUpdate?:boolean)=> void;
    visible: boolean;
}

const ModalFood: FC<AddModalFood> = ({onclose, visible}) => {
    const [Calories, setCalories] = useState<string>('')
    const [Name, setName] = useState<string>('')
    const [Portion, setPortion] = useState<string>('')
    const { onSaveFood } = useFoodStorage()

    useEffect(() => {
       ResetForm();
    }, [visible]) 


    const HandleAddPress = async() => {
        try {
            await onSaveFood({
                Calories,
                Name,
                Portion
            })
            onclose(true);
        } catch (error) {
            console.log(error);
        }
      //  onclose();
    }

    function ResetForm(){
      setCalories('');
      setName('');
      setPortion('');

    }
    
    const clearFoodStorage = async () => {
        try {
            await AsyncStorage.removeItem(MY_FOOD_KEY);
            console.log("Datos de alimentos eliminados correctamente");
        } catch (error) {
            console.error("Error al intentar eliminar datos de alimentos:", error);
        }
    }
    
  return (
    <Modal visible={visible} onRequestClose={()=> onclose()} transparent>
        <View className='flex self-center items-center justify-center w-3/4 bg-slate-300 rounded-3xl mt-[45%]'>
        <Button 
                icon={<Icon name="close" size={24}  color= 'white' type='font-awesome' />} 
                onPress={()=> onclose()} 
                containerStyle={{
                margin:6, 
                width:50,
                left:100,
                }}
                buttonStyle={{
                backgroundColor:'#b60305',
                borderWidth: 0,
                borderColor: 'transparent',
                borderRadius: 20,
                }}
            />
        <Text className='text-2xl font-bold'>Add Food</Text>

        <View className='flex-row m-2 justify-center items-center w-full '>
            <View className='w-[70%] '>
                <Input 
                value={Calories} 
                keyboardType="numeric"
                onChangeText={(text: string) => setCalories(text)}
                inputStyle={{
                    width:20
                }}
                />
            </View>
            <View className='w-[20%] '>
                <Text className='text-lg font-bold'>CAL</Text>
            </View> 
        </View>            
        
        <View className='flex-row m-2 justify-center items-center w-full '>
            <View className='w-[70%] '>
                <Input
                value={Name} 
                onChangeText={(text: string) => setName(text)}
                inputStyle={{
                    width:20
                }}
                />
            </View>
            <View className='w-[20%] '>
                <Text className='text-lg font-bold'>Name</Text>
            </View> 
        </View>            

        <View className='flex-row mt-2 justify-center items-center w-full'>
            <View className='w-[70%] '>
                <Input  
                value={Portion} 
                onChangeText={(text: string) => setPortion(text)}
                inputStyle={{
                    width:20
                }}
                />
            </View>
            <View className='w-[20%]'>
                <Text className='text-lg font-bold'>Portion</Text>
            </View> 
        </View>            


        <Button 
                icon={<Icon name="plus-circle" size={24}  color= 'white' type='font-awesome' />}
                containerStyle={{
                margin:6,
                width:80,
                bottom:12
                }}
                buttonStyle={{
                backgroundColor:'#09c116',
                borderWidth: 0,
                borderColor: 'transparent',
                borderRadius: 20,
                }}
                title={" Add"}
                titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
                disabled={Calories.trim() === '' || Name.trim() ==='' || Portion.trim() ===''}
                onPress={HandleAddPress} 
            />
        </View>
    </Modal>
  )
}

export default ModalFood