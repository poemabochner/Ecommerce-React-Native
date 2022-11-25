import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet } from "react-native";
import api from "../../services/api";

export const AtualizarProdutos = ({ route }) => {
  const navigation = useNavigation();
  const [nome, setNome] = useState(route.params.nome);
  const [descricao, setDescricao] = useState(route.params.descricao);
  const [valor, setValor] = useState(route.params.valor);
  const [qtdEstoque, setQtdEstoque] = useState(route.params.qtdEstoque);
  const [imagem, setImagem] = useState(route.params.imagem);
  const [listProdutos, setListProdutos] = useState([])

  const item = route.params.id;
  console.log(item)
  console.log(valor)

  //update
  const updateProdutos = async (item) => {
    const novoProduto = {
      nome: nome,
      descricao: descricao,
      valor: valor,
      qtdEstoque: qtdEstoque,
      imagem: imagem
    };

    const { data } = await api.put("/produtos/" + item , novoProduto);
    console.log(data);
      const updateProdutos = listProdutos.map(produto => {
        if(produto.id == data.id){
          return data
        }
        return produto
      })
      navigation.navigate('Produtos1')
      setListProdutos(updateProdutos)

  }
  

  return (
    <View style={styles.container}>

      <ScrollView>
        <View style={styles.container2}>
          <Text style={styles.texto}>Atualizar Produto</Text>
          <TextInput
            style={styles.textImput}
            placeholder="    Nome"
            onChangeText={setNome}
            value={nome}
          />
          <TextInput
            style={styles.textImput}
            placeholder="    Descrição"
            onChangeText={setDescricao}
            value={descricao}
          />
          <TextInput
            style={styles.textImput}
            keyboardType="numeric"
            placeholder="    Valor"
            onChangeText={setValor}
            value={valor}
          />
          <TextInput
            style={styles.textImput}
            placeholder="    Estoque"
            onChangeText={setQtdEstoque}
            value={qtdEstoque}
          />
          <TextInput
            style={styles.textImput}
            placeholder="    Imagem"
            onChangeText={setImagem}
            value={imagem}
          />
          <TouchableOpacity style={styles.buttonEntrar} onPress={() => updateProdutos(item)}>
            <Text style={styles.textoEntrar}>Atualizar Produto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCadastrar}

          >
            <Text style={styles.textoCadastrar} onPress={() => navigation.goBack()}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginLeft: 15
  },

  container2: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderWidth: 2,
    borderColor: "silver",
  },

  textImput: {
    borderWidth: 1,
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  textoCadastro: {
    fontSize: 2,
    marginBottom: 10,
  },
  texto: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 20,
  },
  buttonEntrar: {
    backgroundColor: "green",
    width: "90%",
    height: 60,
    borderRadius: 15,
    marginBottom: 20,
  },
  buttonCadastrar: {
    backgroundColor: "lightblue",
    width: "80%",
    height: 50,
    borderRadius: 15,
  },

  textoEntrar: {
    padding: 15,
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  textoCadastrar: {
    padding: 15,
    textAlign: "center",
    color: "#141414",
    fontSize: 15,
  },

  textoCondicoes: {
    padding: 15,
    color: "#141414",
    fontSize: 13,
  },
});
