import React, { useState, useEffect } from "react";
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
import { saveProduct, getProduct, updateProduct } from "../../api/Products_api";

const AddProduct = ({ navigation, route }) => {
  const [product, setProduct] = useState({
    name_: "",
    category_id: "1",
    unit: "Por definir",
    description_: "",
    sale_price: "1",
    model: "",
    factory_code: "",
    supplier_id: "4",
    manufacturer_brand: "",
    reorder_point: "1",
    initial_stock: "1",
    minimum_stock: "1",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (name, value) => {
    if (
      name === "sale_price" ||
      name === "reorder_point" ||
      name === "initial_stock" ||
      name === "minimum_stock"
    ) {
      const numericValue = value.replace(/[^0-9.]/g, "");
      setProduct({ ...product, [name]: numericValue });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      Alert.alert("Error", "Por favor, rellene todos los campos obligatorios.");
      return;
    }

    try {
      if (!editing) {
        await saveProduct(product);
      } else {
        await updateProduct(route.params.productId, product);
      }
      navigation.navigate("Productos");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo guardar el producto.");
    }
  };

  const isFormValid = () => {
    const { name_, category_id, unit, description_, sale_price, supplier_id } =
      product;
    return (
      name_ && category_id && unit && description_ && sale_price && supplier_id
    );
  };

  useEffect(() => {
    if (route.params && route.params.productId) {
      navigation.setOptions({ title: "Editar Producto" });
      setEditing(true);
      (async () => {
        const product = await getProduct(route.params.productId);
        setProduct(product);
      })();
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>
        {editing ? "Editar Producto" : "Nuevo Producto"}
      </Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={product.name_}
          onChangeText={(text) => handleChange("name_", text)}
        />
        <Picker
          style={styles.picker}
          selectedValue={product.category_id}
          onValueChange={(itemValue) => handleChange("category_id", itemValue)}
        >
          <Picker.Item label="Categoria 1" value="1" />
          <Picker.Item label="Categoria 2" value="2" />
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={product.unit}
          onValueChange={(itemValue) => handleChange("unit", itemValue)}
        >
          <Picker.Item label="Por definir" value="Por definir" />
          <Picker.Item label="Unidad" value="Unidad" />
          <Picker.Item label="Conjunto" value="Conjunto" />
          <Picker.Item label="Cubeta" value="Cubeta" />
          <Picker.Item label="Grama" value="Grama" />
          <Picker.Item label="Galon" value="Galon" />
          <Picker.Item label="Kilogramo" value="Kilogramo" />
          <Picker.Item label="Kit" value="Kit" />
          <Picker.Item label="Metro cuadrado" value="Metro cuadrado" />
          <Picker.Item label="Metro cubico" value="Metro cubico" />
          <Picker.Item label="Metro" value="Metro" />
          <Picker.Item label="Onza" value="Onza" />
          <Picker.Item label="Pieza" value="Pieza" />
          <Picker.Item label="Rollo" value="Rollo" />
          <Picker.Item label="Tramo" value="Tramo" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={product.description_}
          onChangeText={(text) => handleChange("description_", text)}
        />
        <Text style={styles.label}>Precio de venta:</Text>
        <TextInput
          style={styles.input}
          placeholder="Precio de venta"
          value={product.sale_price}
          onChangeText={(text) => handleChange("sale_price", text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          value={product.model}
          onChangeText={(text) => handleChange("model", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Código de fábrica"
          value={product.factory_code}
          onChangeText={(text) => handleChange("factory_code", text)}
        />
        <Picker
          style={styles.picker}
          selectedValue={product.supplier_id}
          onValueChange={(itemValue) => handleChange("supplier_id", itemValue)}
        >
          <Picker.Item label="Proveedor 4" value="4" />
          <Picker.Item label="Proveedor 5" value="5" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Marca del fabricante"
          value={product.manufacturer_brand}
          onChangeText={(text) => handleChange("manufacturer_brand", text)}
        />
        <Text style={styles.label}>Punto de pedido</Text>
        <TextInput
          style={styles.input}
          placeholder="Punto de pedido"
          value={product.reorder_point}
          onChangeText={(text) => handleChange("reorder_point", text)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Stock inicial</Text>
        <TextInput
          style={styles.input}
          placeholder="Stock inicial"
          value={product.initial_stock}
          onChangeText={(text) => handleChange("initial_stock", text)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Stock mínimo</Text>
        <TextInput
          style={styles.input}
          placeholder="Stock mínimo"
          value={product.minimum_stock}
          onChangeText={(text) => handleChange("minimum_stock", text)}
          keyboardType="numeric"
        />
        <Text style={styles.infoTitle}>Más información</Text>
        <TextInput
          style={styles.input}
          placeholder="SKU"
          value={product.sku}
          onChangeText={(text) => handleChange("sku", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Código SAT"
          value={product.sat_code}
          onChangeText={(text) => handleChange("sat_code", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Unidad SAT"
          value={product.sat_unit}
          onChangeText={(text) => handleChange("sat_unit", text)}
        />

        <Button
          title={editing ? "Actualizar" : "Guardar"}
          onPress={handleSubmit}
          disabled={!isFormValid()}
        />
      </View>
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

export default AddProduct;
