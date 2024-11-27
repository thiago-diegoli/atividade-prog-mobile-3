import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Picker, // Importando o Picker para selecionar o filtro
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("todos"); // Filtro inicial

  const BASE_URL = "http://localhost:3000/tarefas";

  // Função para buscar as tarefas do backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setTasks(response.data); // Atualiza a lista de tarefas
      setFilteredTasks(response.data); // Inicialmente mostra todas as tarefas
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  // Função para deletar uma tarefa
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/${taskId}`);
      alert("Tarefa deletada!");
      fetchTasks(); // Atualiza a lista após a deleção
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      alert("Não foi possível deletar a tarefa.");
    }
  };

  // Função para editar uma tarefa
  const editTask = (taskId) => {
    navigation.navigate("EditarTarefa", { taskId });
  };

  // Função para adicionar uma nova tarefa
  const addTask = () => {
    navigation.navigate("AdicionarTarefa");
  };

  // Usar o useFocusEffect para garantir que as tarefas sejam carregadas sempre que a tela for focada
  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  // Função para filtrar as tarefas com base no status selecionado
  const filterTasks = (status) => {
    setFilterStatus(status); // Atualiza o status do filtro
    if (status === "todos") {
      setFilteredTasks(tasks); // Exibe todas as tarefas
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === status)); // Filtra por status
    }
  };

  // Função para renderizar o estilo da bolinha de status
  const renderStatusDot = (status) => {
    switch (status) {
      case "completa":
        return { backgroundColor: "green", width: 12, height: 12 }; // Bolinha verde
      case "pendente":
        return { backgroundColor: "yellow", width: 12, height: 12 }; // Bolinha amarela
      default:
        return { backgroundColor: "gray", width: 12, height: 12 }; // Bolinha cinza
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

      {/* Seletor de filtro */}
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

      {/* Lista de tarefas filtradas */}
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
    borderRadius: 50, // Para a bolinha ser redonda
    marginRight: 10, // Espaço entre a bolinha e o texto
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
