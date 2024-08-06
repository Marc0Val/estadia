import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import ServicesItem from "../items/ServicesItem";
import { getServices } from "../../api/Services_api";

const ServicesTable = () => {
  const [services, setServices] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // función para cargar los servicios
  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
      console.log(data);
    } catch (error) {
      console.error("Error loading services", error);
    } finally {
      setLoading(false);
    }
  };

  // efecto para cargar los servicios cuando el componente se monta
  useEffect(() => {
    loadServices();
  }, []);

  // función para renderizar cada ítem de la lista
  const renderItem = ({ item }) => {
    return <ServicesItem service={item} />;
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadServices();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Código</Text>
          <Text style={styles.tableHeaderCell}>Nombre</Text>
          <Text style={styles.tableHeaderCell}>Precio</Text>
          <Text style={styles.tableHeaderCell}>Acción</Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_service.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f8ff",
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  tableHeaderCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default ServicesTable;
