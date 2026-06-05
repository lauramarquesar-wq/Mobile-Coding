import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../App';
import { COLORS } from '../utils/theme';

export default function WelcomeScreen({ navigation }) {
  const { 
    userName, setUserName, 
    reminderTime, setReminderTime, 
    contraceptiveMethod, setContraceptiveMethod,
    contraceptiveName, setContraceptiveName 
  } = useContext(AppContext);

  const handleStart = async () => {
    if (userName.trim() !== '' && contraceptiveName.trim() !== '') {
      try {
        await AsyncStorage.setItem('@user_name', userName);
        await AsyncStorage.setItem('@reminder_time', reminderTime);
        await AsyncStorage.setItem('@contraceptive_method', contraceptiveMethod);
        await AsyncStorage.setItem('@contraceptive_name', contraceptiveName);
        navigation.replace('Home');
      } catch (e) {
        alert('Erro ao salvar suas configurações.');
      }
    } else {
      alert('Por favor, preencha seu nome e o nome do anticoncepcional.');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style ={styles.iconlamp}> 💡 </Text>
          <Text style={styles.title}>Bem-vinda(o) ao Lumi</Text>
          <Text style={styles.subtitle}>Seu lembrete de cuidado</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.labelSection}>Nome:</Text>
          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color={COLORS.textLight} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor={COLORS.textLight}
              value={userName}
              onChangeText={setUserName}
            />
          </View>

          <Text style={styles.labelSection}>Nome do Anticoncepcional:</Text>
          <View style={styles.inputContainer}>
            <Feather name="activity" size={20} color={COLORS.textLight} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="nome"
              placeholderTextColor={COLORS.textLight}
              value={contraceptiveName}
              onChangeText={setContraceptiveName}
            />
          </View>

          <Text style={styles.labelSection}>Horário do Alarme:</Text>
          <View style={styles.inputContainer}>
            <Feather name="clock" size={20} color={COLORS.textLight} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="08:30"
              placeholderTextColor={COLORS.textLight}
              value={reminderTime}
              onChangeText={setReminderTime}
            />
          </View>

          <Text style={styles.labelSection}>Frequência:</Text>
          <View style={styles.rowButtons}>
            <TouchableOpacity 
              style={[styles.selectorButton, contraceptiveMethod === 'mensal' && styles.selectorActive]}
              onPress={() => setContraceptiveMethod('mensal')}
            >
              <Text style={[styles.selectorText, contraceptiveMethod === 'mensal' && styles.textActive]}>Mensal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.selectorButton, contraceptiveMethod === 'trimensal' && styles.selectorActive]}
              onPress={() => setContraceptiveMethod('trimensal')}
            >
              <Text style={[styles.selectorText, contraceptiveMethod === 'trimensal' && styles.textActive]}>Trimensal</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  iconlamp: { fontSize:44, marginRight:16, textAlign:'center',},
  container: { flex: 1, backgroundColor: COLORS.background, padding: 24 },
  header: { alignItems: 'center', marginBottom: 24, marginTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.textDark, marginTop: 16 },
  subtitle: { fontSize: 14, color: COLORS.textLight, marginTop: 8 },
  form: { width: '100%' },
  labelSection: { fontSize: 14, color: COLORS.textDark, marginBottom: 6, fontWeight: '500' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
    height: 50,
  },
  icon: { marginRight: 12 },
  input: { flex: 1, color: COLORS.textDark, fontSize: 16 },
  rowButtons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  selectorButton: { flex: 1, backgroundColor: COLORS.card, padding: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: 'transparent', marginRight: 8 },
  selectorActive: { borderColor: COLORS.primary, backgroundColor: '#FFF' },
  selectorText: { color: COLORS.textLight, fontWeight: '500' },
  textActive: { color: COLORS.primary, fontWeight: 'bold' },
  button: { backgroundColor: COLORS.primary, borderRadius: 12, height: 54, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
});
