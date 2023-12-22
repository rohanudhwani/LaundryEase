import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../Firebase'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'

const ProfileSceen = () => {

    const user = auth.currentUser;
    const navigation = useNavigation()

    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace("Login")
        }).catch((error) => {
            console.log(error.message)
            })
    }


  return (
    <SafeAreaView style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Pressable style={{marginVertical:10}}>
        <Text>Welcome {user.email}</Text>
      </Pressable>

      <Pressable onPress={signOutUser} style={{marginVertical:10}}>
        <Text>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default ProfileSceen

const styles = StyleSheet.create({})