import React, { useContext, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../App';
import { COLORS } from '../utils/theme';

export default function AlarmScreen({ navigation }) {
  const { reminderTime, setReminderTime, contraceptiveName, setContraceptiveName } = useContext(AppContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [localName, setLocalName] = useState(contraceptiveName);

  const handleSaveSettings = async () => {
    try {
      setContraceptiveName(localName);
      await AsyncStorage.setItem('@contraceptive_name', localName);
      await AsyncStorage.setItem('@reminder_time', reminderTime);
      alert('Configurações atualizadas!');
      navigation.goBack();
    } catch (e) {
      alert('Erro ao salvar alterações.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={28} color={COLORS.textDark} />
          </TouchableOpacity>
          
          <Text style={styles.title}>Configurações</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Nome do seu método</Text>
            <View style={styles.inputContainer}>
              <Feather name="edit-2" size={18} color={COLORS.textLight} style={{ marginRight: 10 }} />
              <TextInput
                style={styles.input}
                value={localName}
                onChangeText={setLocalName}
                placeholder="Nome do anticoncepcional"
                placeholderTextColor={COLORS.textLight}
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Horário do lembrete</Text>
            <View style={styles.timeDisplay}>
              <Text style={styles.timeText}>{reminderTime}</Text>
            </View>
          </View>

          <View style={[styles.card, styles.rowCard]}>
            <Text style={styles.labelNotification}>Receber notificações</Text>
            <Switch
              trackColor={{ false: "#d3d3d3", true: COLORS.primary }}
              thumbColor={"#f4f3f4"}
              onValueChange={setNotificationsEnabled}
              value={notificationsEnabled}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 24, paddingTop: 40 },
  backButton: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.textDark, textAlign: 'center', marginBottom: 32 },
  card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 20, marginBottom: 16 },
  rowCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 15, color: COLORS.textDark, marginBottom: 12, fontWeight: '500' },
  labelNotification: { fontSize: 15, color: COLORS.textDark, fontWeight: '500' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 10, paddingHorizontal: 12, height: 46, borderWidth: 1, borderColor: COLORS.border },
  input: { flex: 1, color: COLORS.textDark, fontSize: 16 },
  timeDisplay: { alignItems: 'center', marginVertical: 8 },
  timeText: { fontSize: 36, color: COLORS.textDark, fontWeight: '300' },
  saveButton: { backgroundColor: COLORS.primary, borderRadius: 12, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 16, marginBottom: 30 },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
