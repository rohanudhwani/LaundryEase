import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementQuantity, incrementQuantity } from '../CartReducer'
import { decrementQty, incrementQty } from '../ProductReducer'

const DressItem = ({ item }) => {

    if (!item) {
        // If item is undefined, you can handle it accordingly, e.g., return null or an error message.
        return null;
    }
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart.cart)

    const addItemToCart = () => {
        dispatch(addToCart(item))
        dispatch(incrementQty(item.quantity))
    }

    
    return (
        <View>
            <Pressable style={{ backgroundColor: "#F8F8F8", borderRadius: 8, padding: 10, flexDirection: 'row', alignItems: "center", justifyContent: "space-between", margin: 14 }}>
                <View>
                    <Image source={{ uri: item.image }} style={{ width: 70, height: 70 }} />
                </View>

                <View>
                    <Text style={{ width: 83, fontSize: 15, marginBottom: 7, fontWeight: "500" }}>{item.name}</Text>
                    <Text style={{ width: 60, fontSize: 14, color: "gray" }}>₹{item.price}</Text>
                </View>

                {cart.some((cartItem) => cartItem.id === item.id) ? (
                    <Pressable
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                        }}
                    >
                        <Pressable
                            onPress={() => {
                                dispatch(decrementQuantity(item)); // cart
                                dispatch(decrementQty(item)); // product
                            }}
                            style={{
                                width: 26,
                                height: 26,
                                borderRadius: 13,
                                borderColor: "#BEBEBE",
                                backgroundColor: "#E0E0E0",
                                justifyContent: "center",
                                alignContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "#088F8F",
                                    paddingHorizontal: 6,
                                    fontWeight: "600",
                                    textAlign: "center",
                                }}
                            >
                                -
                            </Text>
                        </Pressable>

                        <Pressable>
                            <Text
                                style={{
                                    fontSize: 19,
                                    color: "#088F8F",
                                    paddingHorizontal: 8,
                                    fontWeight: "600",
                                }}
                            >
                                {item.quantity}
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => {
                                dispatch(incrementQuantity(item)); // cart
                                dispatch(incrementQty(item)); //product
                            }}
                            style={{
                                width: 26,
                                height: 26,
                                borderRadius: 13,
                                borderColor: "#BEBEBE",
                                backgroundColor: "#E0E0E0",
                                justifyContent: "center",
                                alignContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "#088F8F",
                                    paddingHorizontal: 6,
                                    fontWeight: "600",
                                    textAlign: "center",
                                }}
                            >
                                +
                            </Text>
                        </Pressable>
                    </Pressable>

                ) : (
                    <Pressable style={{ width: 80 }} onPress={addItemToCart}>
                        <Text style={{
                            borderColor: "gray", borderRadius: 6,
                            borderWidth: 0.8, marginVertical: 10,
                            color: "#088F8F", textAlign: "center",
                            padding: 5, fontSize: 17, fontWeight: "bold"
                        }}>Add</Text>
                    </Pressable>


                )}

            </Pressable>
        </View>
    )
}

export default DressItem

const styles = StyleSheet.create({})