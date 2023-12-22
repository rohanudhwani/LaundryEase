import { StyleSheet, Text, View, SafeAreaView, Alert, Pressable, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import Carousel from '../components/Carousel'
import Services from '../components/Services'
import DressItem from '../components/DressItem'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../ProductReducer'
import { useNavigation } from '@react-navigation/native'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../Firebase'




const HomeScreen = () => {

    const cart = useSelector(state => state.cart.cart)

    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)
    const navigation = useNavigation()

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
          id: "1",
          image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
          name: "T-shirt",
          quantity: 0,
          price: 10,
        },
        {
          id: "2",
          image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
          name: "dresses",
          quantity: 0,
          price: 10,
        },
        {
          id: "3",
          image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
          name: "jeans",
          quantity: 0,
          price: 10,
        },
        {
          id: "4",
          image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
          name: "Sweater",
          quantity: 0,
          price: 10,
        },
        {
          id: "5",
          image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
          name: "shorts",
          quantity: 0,
          price: 10,
        },
        {
          id: "6",
          image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
          name: "Sleeveless",
          quantity: 0,
          price: 10,
        },
      ];

      const [items, setItems] = useState([])

    const product = useSelector((state) => state.product.product)
    const dispatch = useDispatch()
    useEffect(() => {
        if(product.length > 0) return;
        
        const fetchProducts = async () => {
            const colRef = collection(db, "types")
            const docsSnap = await getDocs(colRef)
            docsSnap.forEach((doc) => {
                items.push(doc.data())
            })
            items.map((service) => {
                dispatch(getProducts(service))
            })
        }
        fetchProducts()
    }, [])
    


  return (

    <>

        <ScrollView style={{backgroundColor: '#F0F0F0', flex:1, marginTop:20}}>
            <View style={{flexDirection: 'row', alignItems: 'center', padding:10 }}>
                <MaterialIcons name="location-on" size={30} color="#fd5c63" />
                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600"}}>Home</Text>
                    <Text>{displayCurrentAddress}</Text>
                </View>

                <Pressable onPress={() => navigation.navigate("Profile")} style={{marginLeft:'auto', marginRight:7}}>
                    <Image style={{width: 50, height:50, borderRadius:20}} source={{uri:"https://lh3.googleusercontent.com/a/ACg8ocKlmfi5NPiD1oMp68TCIiB8el5byw-Lntgnyp0DSs2NZ8SC=s396-c-no"}} />
                </Pressable>
            </View> 

            <View style={{padding:10, margin:10, flexDirection:"row", alignItems:"center", justifyContent:'space-between', borderWidth: 0.8, borderColor: "#C0C0C0", borderRadius:7}}>
                <TextInput placeholder="Search for items or More" />
                <Feather name="search" size={24} color="#fd5c63"/>
            </View>

            <Carousel />
            <Services />

            {/* Render the products */}
            {product.map((item, index) => (
                <DressItem item={item} key={index} />
            ))}
        </ScrollView>

        {total===0 ? (
            null
        ) : (
            <Pressable style={{backgroundColor:"#088F8F", padding:10, marginBottom:30, borderRadius:7, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <View>
                    <Text style={{fontSize:15,fontWeight:"600",color:"white"}}>{cart.length} items |  ₹ {total}</Text>
                    <Text style={{fontSize:15,fontWeight:"400",color:"white",marginVertical:6}}>Extra charges might apply</Text>
                </View>

                <Pressable onPress={() => navigation.navigate("PickUp")}>
                    <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Proceed to pickup</Text>
                </Pressable>
            </Pressable>
        )}
        
        
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})