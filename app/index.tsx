import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const index = () => {
    console.log("index")
  return <Redirect href={'./(tabs)/Home'}/>
}

export default index