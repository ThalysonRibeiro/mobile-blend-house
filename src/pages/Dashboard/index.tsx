import { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { StackParamsList } from "../../routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { api } from "../../services/api";

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [number, setNumber] = useState('');


  async function openOrde() {
    if (!number) {
      return;
    }

    const response = await api.post('/order', {
      table: Number(number),
      // name:
    })
    // console.log(response.data);


    navigation.navigate('Order', {
      number: number,
      order_id: response.data.id
    });

    setNumber('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>

      <TextInput
        placeholder="Numero da mesa"
        placeholderTextColor="#737373"
        style={styles.input}
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity style={styles.button} onPress={openOrde}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#18181b',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'
  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor: '#262626',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#fff'
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#c3004d',
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
})