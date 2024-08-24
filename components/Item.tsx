import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";

const Item = ({ title, include, exclude, onFire }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalMode, setModalMode] = useState<"input" | "results" | null>(null);
  const [includeText, setIncludeText] = useState<string>(include);
  const [excludeText, setExcludeText] = useState<string>(exclude);
  const [results, setResults] = useState<any[]>([]);

  const handleToggle = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const handleFire = async () => {
    const searchResults = await onFire(includeText, excludeText);
    setResults(searchResults);
    setModalMode("results");
  };

  const handleCloseModal = () => {
    setModalMode(null);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.resultItem}>
      <Text style={styles.resultTitle}>{item.name}</Text>
      <Text>Rent: {item.totalRent}</Text>
      <Text>Area: {item.rentalSpace}</Text>
      <Text>MoveIn: {item.moveInDate}</Text>
    </View>
  );

  return (
    <>
      <TouchableOpacity onPress={() => setModalMode("input")}>
        <View style={styles.item}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{title}</Text>
            <Switch value={isEnabled} onValueChange={handleToggle} />
          </View>
          <Text style={styles.filterText}>+: {includeText}</Text>
          <Text style={styles.filterText}>-: {excludeText}</Text>
        </View>
      </TouchableOpacity>

      {/* input modal */}
      <Modal
        visible={modalMode !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={() => handleCloseModal()}
      >
        <TouchableWithoutFeedback
          onPress={modalMode === "input" ? handleCloseModal : null}
        >
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={null}>
              <View style={styles.modalContent}>
                {modalMode === "input" ? (
                  <>
                    <Text style={styles.modalTitle}>{title}</Text>

                    <TextInput
                      style={styles.input}
                      placeholder="Include Keyword"
                      value={includeText}
                      onChangeText={setIncludeText}
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Exclude Keyword"
                      value={excludeText}
                      onChangeText={setExcludeText}
                    />

                    <View style={styles.buttonRow}>
                      <Button title="Close" onPress={handleCloseModal} />
                      <Button
                        title="Fire Now"
                        onPress={handleFire}
                        color="red"
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <Text style={styles.modalTitle}>Results</Text>

                    {/* Display results if any */}
                    {results.length > 0 ? (
                      <FlatList
                        data={results}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()} // Use index as key
                      />
                    ) : (
                      <Text>No results found.</Text>
                    )}

                    <Button
                      title="Close"
                      onPress={handleCloseModal}
                      // color="red"
                    />
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
  },
  headerRow: {
    flexDirection: "row", // Align title and toggle button in a row
    justifyContent: "space-between", // Space between title and toggle button
    alignItems: "center", // Center the items vertically
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  filterText: {
    fontSize: 14,
    color: "#666", // Lighter color for the smaller text
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Item;
