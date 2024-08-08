import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { saveTask, getTask, updateTask } from "../../api/Task_api";

const AddTask = ({ navigation, route }) => {
  const [task, setTask] = useState({
    title: "",
    client_id: "",
    description_: "",
    date_: new Date(),
    start_time: new Date(),
    end_time: new Date(),
    assigned_to: "",
    status_: "Pendiente",
  });

  const [editing, setEditing] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleChange = (name, value) => {
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await updateTask(route.params.taskId, task);
      } else {
        await saveTask(task);
      }
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving task", error);
    }
  };

  useEffect(() => {
    if (route.params && route.params.taskId) {
      navigation.setOptions({ title: "Editar Asignación" });
      setEditing(true);
      (async () => {
        const task = await getTask(route.params.taskId);
        // Asegúrate de que las fechas sean instancias de Date
        setTask({
          ...task,
          date_: new Date(task.date_),
          start_time: new Date(task.start_time),
          end_time: new Date(task.end_time),
        });
      })();
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editing ? "Editar Asignación" : "Nueva Asignación"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={task.title}
        onChangeText={(value) => handleChange("title", value)}
      />

      <Picker
        selectedValue={task.client_id}
        style={styles.picker}
        onValueChange={(value) => handleChange("client_id", value)}
      >
        <Picker.Item label="Cliente 1" value="1" />
        <Picker.Item label="Cliente 2" value="2" />
        <Picker.Item label="Cliente 3" value="3" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={task.description_}
        onChangeText={(value) => handleChange("description_", value)}
      />

      <Button
        title="Selecciona una fecha"
        onPress={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={task.date_}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            handleChange("date_", selectedDate || task.date_);
          }}
        />
      )}

      <Button
        title="Hora de inicio"
        onPress={() => setShowStartTimePicker(true)}
      />
      {showStartTimePicker && (
        <DateTimePicker
          value={task.start_time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowStartTimePicker(false);
            handleChange("start_time", selectedTime || task.start_time);
          }}
        />
      )}

      <Button title="Hora de fin" onPress={() => setShowEndTimePicker(true)} />
      {showEndTimePicker && (
        <DateTimePicker
          value={task.end_time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowEndTimePicker(false);
            handleChange("end_time", selectedTime || task.end_time);
          }}
        />
      )}

      <Picker
        selectedValue={task.assigned_to}
        style={styles.picker}
        onValueChange={(value) => handleChange("assigned_to", value)}
      >
        <Picker.Item label="Asignado 1" value="7" />
        <Picker.Item label="Asignado 2" value="9" />
      </Picker>

      <Picker
        selectedValue={task.status_}
        style={styles.picker}
        onValueChange={(value) => handleChange("status_", value)}
      >
        <Picker.Item label="Pendiente" value="Pendiente" />
        <Picker.Item label="En proceso" value="En proceso" />
        <Picker.Item label="Terminada" value="Terminada" />
      </Picker>
      <Button
        title={editing ? "Actualizar" : "Guardar"}
        onPress={handleSubmit}
        disabled={
          !task.title ||
          !task.client_id ||
          !task.description_ ||
          !task.date_ ||
          !task.start_time ||
          !task.end_time ||
          !task.assigned_to ||
          !task.status_
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: "1%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
});

export default AddTask;
