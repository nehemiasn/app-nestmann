import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckBox, DeleteButton } from "../Base";

interface ItemProps {
  title: string;
  check?: boolean;
  onCheck?: (value: boolean) => void;
  onDelete?: () => void;
}

export const Item: React.FC<ItemProps> = (props) => {
  const { title, check, onCheck, onDelete } = props;

  return (
    <View style={styles.component}>
      <CheckBox check={check} onCheck={onCheck} />
      <View style={styles.contentTextComponent}>
        <Text style={styles.textComponent}>{title}</Text>
      </View>
      <DeleteButton
        onPress={onDelete}
        modal={{
          title: "Eliminar nota",
          message: "¿Seguro quieres eliminar esta nota?",
          onCancel: () => {},
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#212121",
    borderRadius: 10,
    padding: 16,
  },
  contentTextComponent: {
    flex: 1,
    marginHorizontal: 16,
  },
  textComponent: {
    color: "#ffffff",
  },
  contentCheckboxComponent: {
    flex: 0.2,
    flexDirection: "row",
  },
});
