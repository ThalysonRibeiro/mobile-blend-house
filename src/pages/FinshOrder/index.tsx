import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { api } from "../../services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";


type RouteDetailParams = {
  FinshOrder: {
    number: number | string;
    order_id: string;
  }
}

type FinshOrderRouteProp = RouteProp<RouteDetailParams, 'FinshOrder'>

export default function FinshOrder() {

  const route = useRoute<FinshOrderRouteProp>();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();


  async function handleFinsh() {
    try {
      await api.put('/order/send', {
        order_id: route.params?.order_id
      });

      navigation.popToTop();

    } catch (error) {
      console.log("Erro ao finalizar", error);

    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
      <Text style={styles.title}>Mesa <Text style={styles.numeroMesa}>{route.params?.number}</Text></Text>

      <TouchableOpacity style={styles.button} onPress={handleFinsh}>
        <Text style={styles.textButton}>Finalizar pedido</Text>
        <Feather name="shopping-cart" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b',
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alert: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  numeroMesa: {
    color: '#c3004d',
    fontSize: 35
  },
  button: {
    backgroundColor: '#c3004d',
    flexDirection: 'row',
    width: '65%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  textButton: {
    fontSize: 18,
    marginRight: 8,
    fontWeight: 'bold',
    color: '#fff',
  },
})