import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { categoryProps } from "../../pages/Order";

interface ModalPickerProps {
  options: categoryProps[];
  handleCloseModal: () => void;
  selectedItem: (item: categoryProps) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export function ModalPicker({ options, handleCloseModal, selectedItem }: ModalPickerProps) {

  function onPressItem(item: categoryProps) {
    selectedItem(item);
    handleCloseModal();
  }

  const option = options.map((item, index) => (
    <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
      <Text style={styles.item}>
        {item?.name}
      </Text>
    </TouchableOpacity>

  ))

  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {option}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: WIDTH - 40,
    height: HEIGHT / 2,
    backgroundColor: '#3f3f46',
    borderWidth: 1,
    borderColor: '#881337',
    borderRadius: 4,
  },
  option: {
    alignItems: 'flex-start',
    borderTopWidth: 0.8,
    borderTopColor: '#881337',
    backgroundColor: '#27272a',
  },
  item: {
    margin: 18,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ccc',
    textTransform: 'capitalize'
  }
})