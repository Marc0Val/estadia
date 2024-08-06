import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import TaskItem from "../items/TasksItem";
import { getTasks } from "../../api/Task_api";

const TasksTable = ({ selectedDate }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Función para cargar las tareas
  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks", error);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar las tareas cuando el componente se monta
  useEffect(() => {
    loadTasks();
  }, []);

  // Función para filtrar las tareas por la fecha seleccionada
  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date_);
    return taskDate.toDateString() === selectedDate.toDateString();
  });

  // Función para renderizar cada ítem de la lista
  const renderItem = ({ item }) => {
    return <TaskItem task={item} />;
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Hora</Text>
          <Text style={styles.tableHeaderCell}>Cliente</Text>
          <Text style={styles.tableHeaderCell}>Actividad</Text>
          <Text style={styles.tableHeaderCell}>Accion</Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id_task.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 10,
    flex: 1,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  refreshButton: {
    padding: 10,
  },
  flatListContent: {
    flexGrow: 1,
  },
});

export default TasksTable;
