import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'

const OrderScreen = () => {
  return (
    <SafeAreaView>
      <LottieView autoPlay loop={false} speed={0.7} source={require("../assets/thumbs.json")} style={{height:360, width:300, alignSelf:"center", marginTop:40, justifyContent:"center"}} />
      <Text style={{marginTop:40, fontSize:19, fontWeight:"600", textAlign:"center"}} >Your order has been placed</Text>

      <LottieView autoPlay loop={false} speed={0.7} source={require("../assets/sparkle.json")} style={{height:300, width:300, position:"absolute", top:100, alignSelf:"center"}}/>
    </SafeAreaView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})