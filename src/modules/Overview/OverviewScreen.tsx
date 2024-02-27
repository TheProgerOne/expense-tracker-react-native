import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PieChartComponent from './component/PieChartComponent';
import { useFinancials } from '../../FinancialContext';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const OverviewScreen = () => {
  const { totalExpenses, totalIncomes } = useFinancials();
  const [recommendations, setRecommendations] = useState('');

  useEffect(() => {
    const newRecommendations = totalIncomes > totalExpenses ? 'Great! You’re saving more than you spend.' : 'Consider reviewing your expenses.';
    setRecommendations(newRecommendations);
  }, [totalIncomes, totalExpenses]);

  const difference = totalIncomes - totalExpenses;

  const pieChartData = [
    {
      key: 1,
      amount: totalIncomes,
      svg: { fill: '#4caf50' },
      category: 'Income',
      iconName: 'trending-up-outline'
    },
    {
      key: 2,
      amount: totalExpenses,
      svg: { fill: '#f44336' },
      category: 'Expenses',
      iconName: 'trending-down-outline'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financial Overview</Text>
      <PieChartComponent data={pieChartData} width={width * 0.8} height={width * 0.8} />
      <SummaryCard iconName="trending-up-outline" color="#4caf50" title="Total Income" amount={totalIncomes} />
      <SummaryCard iconName="trending-down-outline" color="#f44336" title="Total Expenses" amount={totalExpenses} />
      <DifferenceCard difference={difference} />
      <Text style={styles.recommendations}>{recommendations}</Text>
    </View>
  );
};

const SummaryCard = ({ iconName, color, title, amount }) => (
  <View style={[styles.summaryCard, { borderColor: color }]}>
    <Ionicons name={iconName} size={24} color={color} />
    <Text style={[styles.summaryText, { color }]}>{title}: {amount} T</Text>
  </View>
);

const DifferenceCard = ({ difference }) => {
  const isPositive = difference >= 0;
  const color = isPositive ? '#4caf50' : '#f44336';
  const title = isPositive ? 'Net Savings' : 'Net Overrun';

  return (
    <View style={[styles.differenceCard, { borderColor: color }]}>
      <Ionicons name={isPositive ? 'wallet-outline' : 'alert-circle-outline'} size={24} color={color} />
      <Text style={[styles.differenceText, { color }]}>
        {title}: {Math.abs(difference)} T
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  summaryText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '500',
  },
  differenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 2,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  differenceText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  recommendations: {
    marginTop: 20,
    fontStyle: 'italic',
    color: '#888',
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});

export default OverviewScreen;
