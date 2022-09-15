import React from "react";
import {
  Button,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
} from "react-native";
import { Item } from "./components/Item/Item";

export interface IItem {
  id: number;
  text: string;
  check: boolean;
}

export const App: React.FC = () => {
  const [list, setList] = React.useState<IItem[]>([]);
  const [text, setText] = React.useState<string>("");

  const onHandleChangeText = (text: any) => {
    setText(() => text);
  };

  const onHandleAdd = () => {
    setList((v) => [
      ...v,
      {
        id: new Date().getTime(),
        text,
        check: false,
      },
    ]);
    setText(() => "");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.contentTitleContainer}>
          <Text style={styles.title}>Notas</Text>
        </View>
        <View style={styles.container1}>
          <TextInput
            placeholder="Agregar una nota"
            style={styles.inputContainer1}
            selectionColor="#e2e2e2"
            placeholderTextColor="#212121"
            onChangeText={onHandleChangeText}
            value={text}
          />
          <Button title="Add" color="#212121" onPress={onHandleAdd} />
        </View>
        <View style={styles.container2}>
          <FlatList
            data={list}
            renderItem={({ item }) => {
              return (
                <Item
                  key={item.id}
                  title={item.text}
                  onCheck={(v) =>
                    setList((l) => [
                      ...l.filter((i) => i !== item),
                      { ...item, check: v },
                    ])
                  }
                  check={item.check}
                  onDelete={() =>
                    setList((l) => [...l.filter((i) => i !== item)])
                  }
                />
              );
            }}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentTitleContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  inputContainer1: {
    width: "80%",
    borderBottomColor: "#212121",
    borderBottomWidth: 1,
    height: 40,
    color: "#212121",
  },
  container2: {
    padding: 16,
  },
});
