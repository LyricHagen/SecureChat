// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { auth } from "../firebase";
import { LinearGradient } from 'expo-linear-gradient';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Chat: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("Chat");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      navigation.replace("Chat");
    } catch (error: any) {
      Alert.alert("Guest Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Gradient SecureChat title */}
      <LinearGradient
        colors={["#6DD5FA", "#B993D6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientTitleContainer}
      >
        <Text style={styles.gradientTitle}>SecureChat</Text>
      </LinearGradient>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Continue as Guest" onPress={handleGuestLogin} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Register" onPress={() => navigation.navigate("Register")} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#181A20",
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: "#fff",
    backgroundColor: "#23242a",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  gradientTitleContainer: {
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 4,
  },
  gradientTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
