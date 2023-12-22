import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../Firebase'
import { doc, setDoc } from 'firebase/firestore'

const RegisterScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState("")

    const navigation = useNavigation()

    const register = () => {
        if (email === "" || password === "" || phone === "") {
            Alert.alert(
                "Invalid Details",
                "Please fill all the fields",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }

        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential._tokenResponse.email;
            const myUserUid = auth.currentUser.uid;

            setDoc(doc(db, "users", `${myUserUid}`), {
                email:user,
                phone:phone

            })
        })
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center", padding: 10 }}>
            <KeyboardAvoidingView>
                <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 100 }}>
                    <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>Register</Text>

                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>Create a new account</Text>
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

                    <View style={{ flexDirection: "row", alignItems: 'center', marginVertical: 10 }}>
                        <Feather name="phone" size={24} color="black" style={{ position: "absolute", top: 10, left: 10 }} />
                        <TextInput placeholder='Phone No.' value={phone} onChangeText={(text) => setPhone(text)} keyboardType="numeric" style={{ width: 300, borderWidth: 1, borderColor: "#bcbcbc", borderRadius: 10, paddingLeft: 40, paddingVertical: 10, fontSize: 18 }} />
                    </View>

                    <Pressable onPress={register} style={{ width: 200, backgroundColor: "#318CE7", padding: 15, borderRadius: 7, marginTop: 50, marginLeft: "auto", marginRight: "auto" }}>
                        <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>Register</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                        <Text style={{ textAlign: "center", fontSize: 17, color: "gray", fontWeight: "500" }}>Already have an account? Sign In</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})