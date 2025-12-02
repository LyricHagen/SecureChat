// src/screens/ChatScreen.tsx
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { encryptMessage, decryptMessage } from "../encryption";

const chatId = "global";

const ChatScreen = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Encrypt the message before sending
    const encryptedText = encryptMessage(input);

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: encryptedText,
      timestamp: Date.now(),
    });

    setInput("");
  };

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({
        id: doc.id,
        // Decrypt the message when displaying
        text: decryptMessage(doc.data().text),
      })));
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.message}>{item.text}</Text>
        )}
        contentContainerStyle={{ padding: 12 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20", // dark background
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#23242a",
    marginBottom: 20,
    backgroundColor: "#23242a",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 8,
    color: "#fff",
    backgroundColor: "#23242a",
  },
  message: {
    padding: 10,
    backgroundColor: "#23242a",
    borderRadius: 6,
    marginBottom: 8,
    alignSelf: "flex-start",
    color: "#fff",
  },
});
