import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AppContext } from '../App';
import { COLORS } from '../utils/theme';

export default function HomeScreen({ navigation }) {
  const { userName, pillTakenToday, setPillTakenToday, contraceptiveName} = useContext(AppContext);

  const getTodayDate = () => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date().toLocaleDateString('pt-BR', options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {userName || 'Maria'}!</Text>
        <Text style={styles.date}>{getTodayDate()}</Text>
      </View>

      <View style={styles.mainCard}>
        <View style={styles.cardHeader}>
          <Feather name="lightbulb" size={40} color="#D2A87A" />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{contraceptiveName || 'Anticoncepcional'}
              </Text>
              {pillTakenToday && <Text style={styles.statusText}>Tomado ✓</Text>}
            </View>
        </View>

        <TouchableOpacity 
          style={[styles.actionButton, pillTakenToday && styles.actionButtonDisabled]} 
          onPress={() => setPillTakenToday(true)}
          disabled={pillTakenToday}
        >
          <Text style={styles.actionButtonText}>
            {pillTakenToday ? 'Registrada' : 'Marcar como Tomada'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
       <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('History')}>
          <Feather name="calendar" size={28} color="#D2A87A" />
          <Text style={styles.menuText}>Meu Histórico</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Alarms')}>
          <Feather name="bell" size={28} color="#D2A87A" />
          <Text style={styles.menuText}>Lembretes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Symptoms')}>
          <Feather name="activity" size={28} color="#D2A87A" />
          <Text style={styles.menuText}>Sintomas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 24, paddingTop: 60 },
  header: { marginBottom: 32 },
  greeting: { fontSize: 28, fontWeight: 'bold', color: COLORS.textDark },
  date: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },
  mainCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  cardTextContainer: { marginLeft: 16 },
  cardTitle: { fontSize: 18, color: COLORS.textDark, fontWeight: '500' },
  statusText: { color: '#6DB06D', fontSize: 14, marginTop: 4, fontWeight: '500' },
  actionButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonDisabled: { backgroundColor: COLORS.green },
  actionButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  menuContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  menuItem: {
    backgroundColor: COLORS.card,
    width: '31%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  menuText: { fontSize: 12, color: COLORS.textDark, marginTop: 8, textAlign: 'center' },
});
