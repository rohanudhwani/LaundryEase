import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center", padding: 10 }}>
      <KeyboardAvoidingView>
        <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 100 }}>
          <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>Sign In</Text>

          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>Sign In to your account</Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <MaterialCommunityIcons name="email-outline" size={24} color="black" style={{ position: "absolute", top: 10, left: 10 }} />
            <TextInput placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} style={{ width: 300, borderWidth: 1, borderColor: "#bcbcbc", borderRadius: 10, paddingLeft: 40, paddingVertical: 10, fontSize: 18 }} />
          </View>

          <View style={{ flexDirection: "row", alignItems: 'center', marginVertical: 10 }}>
            <Ionicons name="key-outline" size={24} color="black" style={{ position: "absolute", top: 10, left: 10 }} />
            <TextInput placeholder='Password' value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} style={{ width: 300, borderWidth: 1, borderColor: "#bcbcbc", borderRadius: 10, paddingLeft: 40, paddingVertical: 10, fontSize: 18 }} />
          </View>

          <Pressable style={{ width: 200, backgroundColor: "#318CE7", padding: 15, borderRadius: 7, marginTop: 50, marginLeft: "auto", marginRight: "auto" }}>
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>Login</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 17, color: "gray", fontWeight: "500" }}>Don't have an account? Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})