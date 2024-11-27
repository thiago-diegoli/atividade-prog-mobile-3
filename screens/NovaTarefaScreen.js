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

const NovaTelaScreen = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pendente");

  const handleAddTask = async () => {
    if (!description) {
      alert("Erro", "A descrição é obrigatória.");
      return;
    }

    try {
      // Faça o POST da nova tarefa
      const response = await axios.post("http://localhost:3000/tarefas", {
        description,
        status,
      });

      if (response.status === 201) {
        alert("Sucesso", "Tarefa cadastrada com sucesso!");
        setDescription(""); // Limpa o campo de descrição
        setStatus("pendente"); // Reseta o status
        navigation.goBack(); // Retorna à tela anterior após adicionar a tarefa
      }
    } catch (error) {
      alert("Erro", "Ocorreu um erro ao cadastrar a tarefa.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Nova Tarefa</Text>

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

      <Button title="Cadastrar Tarefa" onPress={handleAddTask} />
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

export default NovaTelaScreen;
