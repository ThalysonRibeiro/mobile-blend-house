import { useContext, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";


export default function Signin() {

  const { signIn, loadingAuth } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {

    if (!email || !password) {
      return;
    }
    await signIn({ email, password })
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/logo-blend-house.webp')} resizeMode="contain" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#737373"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#737373"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={25} color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18181b',
  },
  logo: {
    marginBottom: 18,
    width: 300,
    height: 100
  },
  inputContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14,

  },
  input: {
    width: '95%',
    height: 50,
    backgroundColor: '#262626',
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: '#fff'
  },
  button: {
    width: '95%',
    height: 50,
    backgroundColor: '#c3004d',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
})