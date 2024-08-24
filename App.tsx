import React from "react";
import { SafeAreaView, FlatList, StyleSheet, StatusBar } from "react-native";
import Item from "./components/Item";
import { handleFireHouseOfNations } from "./requests/onFire";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "House of Nations",
    include: "",
    exclude: "Lichtenberg",
    handleFire: handleFireHouseOfNations,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Placeholder 1",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Placeholder 2",
  },
];

// type ItemProps = { title: string };

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            include={item.include}
            exclude={item.exclude}
            onFire={item.handleFire}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default App;
