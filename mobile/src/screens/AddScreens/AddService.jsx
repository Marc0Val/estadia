import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { saveService } from "../../api/Services_api";

const AddService = ({ navigation }) => {
  const [service, setService] = useState({
    name_: "",
    category_id: "",
    sale_price: "",
    description_: "",
    sat_unit: "",
    sat_code: "",
  });
  const handleChange = (name, value) => {
    setService({ ...service, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      !service.name_ ||
      !service.category_id ||
      !service.sale_price ||
      !service.description_
    ) {
      Alert.alert("Error", "Por favor, rellene todos los campos obligatorios.");
      return;
    }

    try {
      await saveService(service);
      navigation.navigate("Servicios");
      console.log("Service saved", service);
    } catch (error) {
      console.error("Error saving service", error);
    }
  };

  const isFormValid = () => {
    return (
      service.name_ &&
      service.category_id &&
      service.sale_price &&
      service.description_
    );
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agregar Servicio</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={service.name_}
        onChangeText={(text) => handleChange("name_", text)}
      />
      <Picker
        selectedValue={service.category_id}
        style={styles.picker}
        onValueChange={(itemValue) => handleChange("category_id", itemValue)}
      >
        <Picker.Item label="Categoría 1" value="1" />
        <Picker.Item label="Categoría 2" value="2" />
        <Picker.Item label="Categoría 3" value="3" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Precio de venta"
        value={service.sale_price}
        onChangeText={(text) => handleChange("sale_price", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={service.description_}
        onChangeText={(text) => handleChange("description_", text)}
      />
      <Text style={styles.infoTitle}>Información SAT</Text>
      <TextInput
        style={styles.input}
        placeholder="Unidad SAT"
        value={service.sat_unit}
        onChangeText={(text) => handleChange("sat_unit", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Código SAT"
        value={service.sat_code}
        onChangeText={(text) => handleChange("sat_code", text)}
      />
      <Button
        title="Guardar"
        onPress={handleSubmit}
        disabled={!isFormValid()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: "1%",
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "red",
  },
  container: {
    padding: 20,
    width: "100%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    margin: 12,
  },
  infoTitle: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    margin: 12,
  },
});

export default AddService;
