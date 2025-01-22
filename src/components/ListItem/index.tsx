import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface ItemProps {
  data: {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
  };
  deleteItem: (item_id: string) => void;
}

export function ListItem({ data, deleteItem }: ItemProps) {

  function handleDeleteItem() {
    deleteItem(data.id);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.item}>{data.amount} - {data.name}</Text>
      <TouchableOpacity onPress={handleDeleteItem}>
        <Feather name="trash-2" size={28} color="#c3004d" />
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#262626',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: '#c3004d'
  },
  item: {
    color: '#fff'
  }
})