import { StyleSheet, Text, View, SafeAreaView, Alert, Pressable, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import Carousel from '../components/Carousel'
import Services from '../components/Services'
import DressItem from '../components/DressItem'




const HomeScreen = () => {

    const [displayCurrentAddress, setSisplayCurrentAddress] = useState('Wait, we are fetching you location...')

    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false)

    useEffect(() => {
        checkIfLocationEnabled()
        getCurrentLocation()
    }, [])

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync()
        if (!enabled) {
            Alert.alert(
                'Location Service not enabled',
                'Please enable your location services to continue',
                [{ text: 'OK' }],
                { cancelable: false }
            )
        } else {
            setLocationServicesEnabled(enabled)
        }
    
    }

    const getCurrentLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync()

        if(status !== "granted") {
            Alert.alert(
                'Permission denied',
                'Please enable your location services to continue',
                [{ text: 'OK' }],
                { cancelable: false }
            )
        }

        const {coords} = await Location.getCurrentPositionAsync()

        if(coords) {
            const {latitude, longitude} = coords
            let response = await Location.reverseGeocodeAsync({latitude, longitude})
            for(let item of response) {
                let address = `${item.name}, ${item.city}, ${item.postalCode}, ${item.country}`
                setSisplayCurrentAddress(address)
                break
            }
        }
    }

    const services = [
        {
          id: "0",
          image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
          name: "shirt",
          quantity: 0,
          price: 10,
        },
        {
          id: "11",
          image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
          name: "T-shirt",
          quantity: 0,
          price: 10,
        },
        {
          id: "12",
          image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
          name: "dresses",
          quantity: 0,
          price: 10,
        },
        {
          id: "13",
          image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
          name: "jeans",
          quantity: 0,
          price: 10,
        },
        {
          id: "14",
          image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
          name: "Sweater",
          quantity: 0,
          price: 10,
        },
        {
          id: "15",
          image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
          name: "shorts",
          quantity: 0,
          price: 10,
        },
        {
          id: "16",
          image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
          name: "Sleeveless",
          quantity: 0,
          price: 10,
        },
      ];


  return (
    <ScrollView style={{backgroundColor: '#F0F0F0', flex:1}}>
        <View style={{flexDirection: 'row', alignItems: 'center', padding:10 }}>
            <MaterialIcons name="location-on" size={30} color="#fd5c63" />
            <View>
                <Text style={{ fontSize: 18, fontWeight: "600"}}>Home</Text>
                <Text>{displayCurrentAddress}</Text>
            </View>

            <Pressable style={{marginLeft:'auto', marginRight:7}}>
                <Image style={{width: 50, height:50, borderRadius:20}} source={{uri:"https://lh3.googleusercontent.com/-PyCd43npZm8/AAAAAAAAAAI/AAAAAAAAAAA/AFNEGgJLlzktrC8P2knXBTsPxdbCeg-OCA/photo.jpg?sz=46"}} />
            </Pressable>
        </View> 

        <View style={{padding:10, margin:10, flexDirection:"row", alignItems:"center", justifyContent:'space-between', borderWidth: 0.8, borderColor: "#C0C0C0", borderRadius:7}}>
            <TextInput placeholder="Search for items or More" />
            <Feather name="search" size={24} color="#fd5c63"/>
        </View>

        <Carousel />
        <Services />

        {/* Render the products */}
        {services.map((item, index) => (
            <DressItem item={item} key={index} />
        ))}
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})