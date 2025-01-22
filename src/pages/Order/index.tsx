import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, FlatList } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/ListItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

type RouteDetailParams = {
  Order: {
    number: number | string;
    order_id: string;
  };
}

export type categoryProps = {
  id: string;
  name: string;
}
type ProductProps = {
  id: string;
  name: string;
}
type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
}

type OorderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {
  const route = useRoute<OorderRouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [category, setCategory] = useState<categoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<categoryProps | undefined>();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>();
  const [modalProductVisible, setModalProductVisible] = useState(false);

  const [amount, setAmount] = useState('1');
  const [items, setItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    async function loadInfo() {
      const response = await api.get('/category');

      setCategory(response.data);
      setCategorySelected(response.data[0]);

    }
    loadInfo();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/category/product', {
        params: {
          category_id: categorySelected?.id
        }
      })
      setProducts(response.data);
      setProductSelected(response.data[0]);

    }
    loadProducts();
  }, [categorySelected])


  async function handleCloseOrder() {
    try {
      await api.delete('/order', {
        params: {
          order_id: route.params?.order_id
        }
      });

      navigation.goBack();

    } catch (error) {
      console.log(error);
      return;
    }
  }

  function handleChangeCategory(item: categoryProps) {
    setCategorySelected(item);
  }

  function handleChangeProduct(item: categoryProps) {
    setProductSelected(item);
  }

  async function handleAdd() {
    const response = await api.post('/order/add', {
      order_id: route.params?.order_id,
      product_id: productSelected?.id,
      amount: Number(amount),
    })

    const data = {
      id: response.data.id,
      product_id: productSelected?.id as string,
      name: productSelected?.name as string,
      amount: amount,
    }

    setItems(oldArray => [...oldArray, data]);
  }

  async function handleDeleteItem(item_id: string) {
    await api.delete('/order/remove', {
      params: {
        item_id: item_id
      }
    })
    const removeItems = items.filter(item => {
      return (item.id !== item_id);
    });

    setItems(removeItems);
  }

  function handleFinshOrder() {
    navigation.navigate('FinshOrder', {
      number: route.params?.number,
      order_id: route.params?.order_id,
    });
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Mesa <Text style={styles.numeroMesa}>{route.params.number}</Text>
        </Text>
        {items.length === 0 && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Feather name="trash-2" size={28} color="#c3004d" />
          </TouchableOpacity>
        )}
      </View>

      {category.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
          <Text style={{ color: '#fff' }}>{categorySelected?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
          <Text style={{ color: '#fff' }}>{productSelected?.name}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidades</Text>
        <TextInput
          style={[styles.input, { width: '60%', textAlign: 'center' }]}
          placeholderTextColor="#737373"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
          disabled={items.length === 0}
          onPress={handleFinshOrder}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={handleChangeCategory}
        />
      </Modal>


      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleChangeProduct}
        />
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b',
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%'
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 14,
  },
  numeroMesa: {
    color: '#c3004d',
    fontSize: 35
  },
  input: {
    backgroundColor: '#262626',
    borderRadius: 4,
    width: '100%',
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
    color: '#fff',
    fontSize: 20,
  },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  qtdText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  buttonAdd: {
    width: '20%',
    backgroundColor: '#059669',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#c3004d',
    borderRadius: 4,
    height: 40,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})