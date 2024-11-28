import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Picker,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("todos");

  const BASE_URL = "http://localhost:3000/tarefas";

  const fetchTasks = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/${taskId}`);
      alert("Tarefa deletada!");
      fetchTasks();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      alert("Não foi possível deletar a tarefa.");
    }
  };

  const editTask = (taskId) => {
    navigation.navigate("EditarTarefa", { taskId });
  };

  const addTask = () => {
    navigation.navigate("AdicionarTarefa");
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  const filterTasks = (status) => {
    setFilterStatus(status);
    if (status === "todos") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === status));
    }
  };

  const renderStatusDot = (status) => {
    switch (status) {
      case "completa":
        return { backgroundColor: "green", width: 12, height: 12 };
      case "pendente":
        return { backgroundColor: "yellow", width: 12, height: 12 };
      default:
        return { backgroundColor: "gray", width: 12, height: 12 };
    }
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <View style={[styles.statusDot, renderStatusDot(item.status)]} />
      <Text style={styles.taskText}>{item.description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => editTask(item.id)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Adicionar Tarefa" onPress={addTask} />

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por Status:</Text>
        <Picker
          selectedValue={filterStatus}
          style={styles.picker}
          onValueChange={(itemValue) => filterTasks(itemValue)}
        >
          <Picker.Item label="Todos" value="todos" />
          <Picker.Item label="Completa" value="completa" />
          <Picker.Item label="Pendente" value="pendente" />
        </Picker>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Nenhuma tarefa disponível.</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  filterContainer: {
    marginVertical: 10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  statusDot: {
    borderRadius: 50,
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#999",
  },
});

export default HomeScreen;
