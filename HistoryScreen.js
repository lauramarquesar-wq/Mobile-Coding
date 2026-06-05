import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AppContext } from '../App';
import { COLORS } from '../utils/theme';

export default function HistoryScreen({ navigation }) {
  const { contraceptiveMethod } = useContext(AppContext);
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const monthsBr = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const changeMonth = (direction) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };

  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: '', status: 'empty' });
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
      let status = 'taken';
      
      if (contraceptiveMethod === 'trimensal') {
        if (day === 1 && month % 3 === 0) {
          status = 'missed'; 
        } else if (day % 4 === 0) {
          status = 'future';
        }
      } else {
       
        if (day % 7 === 0) status = 'future';
        if (day === 28) status = 'missed';
      }

      days.push({ day: day.toString(), status });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const getStyleForStatus = (status) => {
    switch (status) {
      case 'taken': return styles.circleTaken;
      case 'missed': return styles.circleMissed;
      case 'future': return styles.circleFuture;
      default: return styles.circleEmpty;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} color={COLORS.textDark} />
        </TouchableOpacity>
        
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Feather name="chevron-left" size={22} color={COLORS.textDark} />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>{monthsBr[month]} {year}</Text>
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Feather name="chevron-right" size={22} color={COLORS.textDark} />
          </TouchableOpacity>
        </View>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>
          Método Ativo: Anticoncepcional {contraceptiveMethod === 'mensal' ? 'Mensal' : 'Trimensal'}
        </Text>
      </View>

      <View style={styles.weekDaysContainer}>
        {weekDays.map((day, index) => (
          <Text key={index} style={styles.weekDayText}>{day}</Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {calendarDays.map((item, index) => (
          <View key={index} style={styles.dayCell}>
            {item.day !== '' && (
              <View style={[styles.dayCircle, getStyleForStatus(item.status)]}>
                <Text style={styles.dayText}>{item.day}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {contraceptiveMethod === 'mensal' 
            ? 'Histórico: 24 pílulas registradas este mês' 
            : 'Histórico: Acompanhamento de ciclo trimensal'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20, paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  monthSelector: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, paddingHorizontal: 16 },
  monthTitle: { fontSize: 20, fontWeight: '500', color: COLORS.textDark },
  badgeContainer: { backgroundColor: COLORS.card, alignSelf: 'center', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginBottom: 24 },
  badgeText: { fontSize: 13, color: COLORS.textDark, fontWeight: '500' },
  weekDaysContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  weekDayText: { flex: 1, textAlign: 'center', fontSize: 14, color: COLORS.textDark },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
  dayCell: { width: '14.28%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  dayCircle: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  circleTaken: { backgroundColor: '#D4E5D4' },
  circleMissed: { backgroundColor: '#F3C4D1' },
  circleFuture: { backgroundColor: '#F0F0F0' },
  circleEmpty: { backgroundColor: 'transparent' },
  dayText: { fontSize: 15, color: COLORS.textDark },
  footer: { marginTop: 'auto', marginBottom: 40, alignItems: 'center' },
  footerText: { fontSize: 15, color: COLORS.textDark, fontWeight: '500' },
});
