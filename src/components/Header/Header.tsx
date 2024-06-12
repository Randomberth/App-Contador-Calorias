import { Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image } from 'react-native'
import { stackInfo } from '../../const/Data'
import React from 'react'


const Header = () => {

  const { canGoBack, goBack } = useNavigation();

  return (
    <View className='flex-row justify-center items-center m-6'>
        <View className='flex w-2/4 justify-center items-center'>
            <Text className='text-xl font-semibold'>Hello {stackInfo.name}</Text>
            <Text className='text-lg font-semibold text-slate-500'>Welcom back to your goal</Text>
        </View>
        <View className='flex w-2/4 justify-center '>
        { canGoBack() ? (
      <Button 
            icon={<Icon name="arrow-left" size={24}  color= 'white' type='font-awesome' />}  onPress={goBack} 
            containerStyle={{
              width:50,
              alignSelf:'center',
              right:27
            }}
            buttonStyle={{
              borderWidth: 0,
              borderColor: 'transparent',
              borderRadius: 20,
            }}
        />): undefined}
      
            <Image 
                className='absolute right-3 '
                source={require('../../../assets/me.png')} /> 
        </View>
    </View>
  )
}

export default Header;