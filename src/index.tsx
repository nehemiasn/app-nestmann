import { useFonts } from "expo-font";
import React from "react";
import {
  Button,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { Typography } from "./components/Base";
import { Item } from "./components/Item/Item";
import { colors } from "./utils/constants";

export interface IItem {
  id: number;
  text: string;
  check: boolean;
}

export const App: React.FC = () => {
  const [loaded] = useFonts({
    "OpenSans-Regular": require("../assets/fonts/OpenSans/OpenSans-Regular.ttf"),
    "OpenSans-Light": require("../assets/fonts/OpenSans/OpenSans-Light.ttf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans/OpenSans-Bold.ttf"),
    "OpenSans-SemiBold": require("../assets/fonts/OpenSans/OpenSans-SemiBold.ttf"),
    "OpenSans-ExtraBold": require("../assets/fonts/OpenSans/OpenSans-ExtraBold.ttf"),
  });
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

  if (!loaded) {
    return <></>;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.contentTitleContainer}>
          <Typography style={styles.title}>Notas</Typography>
        </View>
        <View style={styles.container1}>
          <TextInput
            placeholder="Agregar una nota"
            style={styles.inputContainer1}
            selectionColor={colors.colorSelection}
            placeholderTextColor={colors.colorPrimary}
            onChangeText={onHandleChangeText}
            value={text}
          />
          <Button
            title="Add"
            color={colors.colorPrimary}
            onPress={onHandleAdd}
          />
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
    backgroundColor: "black",
    margin: 16,
    padding: 16,
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: colors.colorTextLight,
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  inputContainer1: {
    width: "80%",
    borderBottomColor: colors.colorPrimary,
    borderBottomWidth: 1,
    height: 40,
    color: colors.colorPrimary,
  },
  container2: {
    padding: 16,
  },
});
