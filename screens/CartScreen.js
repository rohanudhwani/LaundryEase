import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const route = useRoute();
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
    const navigation = useNavigation();


  return (
    <>
        <ScrollView style={{marginTop:50}}>
            <Text></Text>
        </ScrollView>
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({})