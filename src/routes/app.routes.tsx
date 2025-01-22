import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import FinshOrder from "../pages/FinshOrder";

export type StackParamsList = {
  Dashboard: undefined;
  Order: {
    number: number | string;
    order_id: string;
  };
  FinshOrder: {
    number: number | string;
    order_id: string;
  }
}

const Stack = createNativeStackNavigator<StackParamsList>();


function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FinshOrder"
        component={FinshOrder}
        options={{
          title: 'Finalizando',
          headerStyle: {
            backgroundColor: '#18181b',
          },
          headerTintColor: '#fff'
        }}
      />
    </Stack.Navigator>
  )
}

export default AppRoutes;