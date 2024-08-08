import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/logo.png";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    setLoading(true);

    // Simulación de la lógica de inicio de sesión
    setTimeout(() => {
      setLoading(false);
      if (username === "admin" && password === "1234") {
        console.log("Inicio de sesión exitoso");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Nombre de usuario o contraseña incorrectos");
      }
    }, 2000);
  };

  const handleEnterApp = () => {
    navigation.navigate("Home");
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Recuperar contraseña",
      "Instrucciones para recuperar la contraseña han sido enviadas a tu correo electrónico"
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <TextInput
          placeholder="Nombre de usuario"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <>
            <Button title="Iniciar Sesión" onPress={handleLogin} />
            <Button
              title="Ingresar a la App"
              onPress={handleEnterApp}
              color="#28a745"
            />
          </>
        )}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ffffff", // Blanco más brillante
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  forgotPassword: {
    marginTop: 15,
    color: "#007bff",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
