import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'



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


  return (
    <SafeAreaView>
      <Text>{displayCurrentAddress}</Text>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})