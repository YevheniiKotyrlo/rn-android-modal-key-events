import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

function KeyTarget({
  label,
  testID,
}: {
  readonly label: string;
  readonly testID: string;
}) {
  const [lastKey, setLastKey] = useState('none');

  return (
    <View
      focusable
      onKeyDown={event => setLastKey(event.nativeEvent.key)}
      style={styles.target}
      testID={testID}>
      <Text>
        {label}, last key: {lastKey}
      </Text>
    </View>
  );
}

function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.screen}>
      <KeyTarget label="Outside the Modal" testID="outside-target" />
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.button}
        testID="open-modal">
        <Text>Open the Modal</Text>
      </Pressable>
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.screen}>
          <KeyTarget label="Inside the Modal" testID="inside-target" />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 16,
    padding: 48,
  },
  target: {
    borderWidth: 1,
    padding: 16,
  },
  button: {
    borderWidth: 1,
    padding: 16,
  },
});

export default App;
