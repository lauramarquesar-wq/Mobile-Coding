import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';

export default function SymptomsScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [customSymptom, setCustomSymptom] = useState('');
 
  const [symptoms, setSymptoms] = useState({
    headache: false,
    cramps: false,
    bloating: false,
    fatigue: false,
    acne: false,
    other: false,
  });

  const toggleSymptom = (key) => {
    setSymptoms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const moods = [
    { label: 'Ótimo', icon: 'smile', color: '#6DB06D' },
    { label: 'Bem', icon: 'smile', color: '#A3C6A3' },
    { label: 'Normal', icon: 'meh', color: '#D2A87A' },
    { label: 'Mal', icon: 'frown', color: '#EFA9BA' },
    { label: 'Muito Mal', icon: 'frown', color: '#D9534F' },
  ];

  const last7Days = [
    { day: 'Sex', icon: 'smile', color: '#6DB06D' },
    { day: 'Sáb', icon: 'smile', color: '#A3C6A3' },
    { day: 'Dom', icon: 'meh', color: '#D2A87A' },
    { day: 'Seg', icon: 'frown', color: '#EFA9BA' },
    { day: 'Ter', icon: 'smile', color: '#A3C6A3' },
    { day: 'Qua', icon: 'meh', color: '#D2A87A' },
    { day: 'Qui', icon: 'frown', color: '#EFA9BA' },
  ];

  const handleSave = () => {
    alert('Registro salvo com sucesso!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} color={COLORS.textDark} />
        </TouchableOpacity>

        <Text style={styles.title}>Como você está?</Text>

        <View style={styles.moodContainer}>
          {moods.map((mood, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.moodBox, 
                selectedMood === mood.label && { borderColor: mood.color, backgroundColor: '#FFF' }
              ]}
              onPress={() => setSelectedMood(mood.label)}
            >
              <Feather name={mood.icon} size={24} color={selectedMood === mood.label ? mood.color : COLORS.textLight} />
              <Text style={[styles.moodLabel, selectedMood === mood.label && { color: mood.color, fontWeight: '600' }]}>
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sintomas</Text>

          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleSymptom('headache')}>
            <View style={[styles.checkbox, symptoms.headache && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>Dor de cabeça</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleSymptom('cramps')}>
            <View style={[styles.checkbox, symptoms.cramps && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>Cólica</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleSymptom('bloating')}>
            <View style={[styles.checkbox, symptoms.bloating && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>Inchaço</Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleSymptom('fatigue')}>
            <View style={[styles.checkbox, symptoms.fatigue && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>Cansaço</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleSymptom('acne')}>
            <View style={[styles.checkbox, symptoms.acne && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>Acne</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleSymptom('other')}>
            <View style={[styles.checkbox, symptoms.other && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>Outro</Text>
          </TouchableOpacity>

          {symptoms.other && (
            <TextInput
              style={styles.input}
              placeholder="Descreva seu sintoma"
              placeholderTextColor={COLORS.textLight}
              value={customSymptom}
              onChangeText={setCustomSymptom}
            />
          )}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Registro</Text>
        </TouchableOpacity>

        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Histórico dos últimos 7 dias</Text>
          <View style={styles.historyRow}>
            {last7Days.map((item, index) => (
              <View key={index} style={styles.historyDayCell}>
                <Text style={styles.historyDayText}>{item.day}</Text>
                <Feather name={item.icon} size={18} color={item.color} style={{ marginTop: 6 }} />
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: 20, paddingTop: 20 },
  backButton: { marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.textDark, textAlign: 'center', marginBottom: 24 },
  moodContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  moodBox: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 12,
    width: '18%',
    aspectRatio: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  moodLabel: { fontSize: 11, color: COLORS.textDark, marginTop: 6, textAlign: 'center' },
  card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 20, marginBottom: 24 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 16 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: COLORS.textLight, marginRight: 12 },
  checkboxChecked: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  checkboxLabel: { fontSize: 16, color: COLORS.textDark },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
    marginTop: 8,
    color: COLORS.textDark,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  historySection: { alignItems: 'center', marginBottom: 20 },
  historyTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textDark, marginBottom: 16 },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  historyDayCell: { alignItems: 'center', flex: 1 },
  historyDayText: { fontSize: 13, color: COLORS.textLight },
});
