import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker,
} from "react-native";
import axios from "axios";

const EditarTarefaScreen = ({ route, navigation }) => {
  const tarefaId = route.params.taskId;
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pendente");

  const handleEditTask = async () => {
    if (!description) {
      alert("A descrição é obrigatória.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/tarefas/${tarefaId}`,
        {
          description,
          status,
        }
      );

      if (response.status === 200) {
        alert("Tarefa atualizada com sucesso!");
        navigation.goBack();
      }
    } catch (error) {
      alert("Ocorreu um erro ao atualizar a tarefa.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Tarefa</Text>

      <TextInput
        style={styles.input}
        placeholder="Descrição da Tarefa"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Status:</Text>
      <Picker
        selectedValue={status}
        style={styles.picker}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        <Picker.Item label="Pendente" value="pendente" />
        <Picker.Item label="Completa" value="completa" />
      </Picker>

      <Button title="Salvar Alterações" onPress={handleEditTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
});

export default EditarTarefaScreen;
