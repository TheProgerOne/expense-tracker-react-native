import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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

  const pieChartData = [
    {
      key: 1, 
      amount: totalIncomes, 
      svg: { fill: totalIncomes >= totalExpenses ? '#4caf50' : '#8bc34a' }, 
      category: 'Income',
      iconName: 'trending-up-outline' 
    },
    {
      key: 2,
      amount: totalExpenses,
      svg: { fill: totalExpenses <= totalIncomes ? '#f44336' : '#e53935' }, // Dynamic coloring
      category: 'Expenses',
      iconName: 'trending-down-outline' // Ionicons name
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financial Overview</Text>
      <PieChartComponent data={pieChartData} width={width * 0.8} height={width * 0.8} />
      <View style={styles.summaryContainer}>
        <Ionicons name="trending-up-outline" size={24} color="#4caf50" />
        <Text style={styles.summary}>Total Income: {totalIncomes} T</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Ionicons name="trending-down-outline" size={24} color="#f44336" />
        <Text style={styles.summary}>Total Expenses: {totalExpenses} T</Text>
      </View>
      <Text style={styles.recommendations}>{recommendations}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  summary: {
    fontSize: 18,
    marginLeft: 10,
    color: '#555',
  },
  recommendations: {
    marginTop: 30,
    fontStyle: 'italic',
    color: '#888',
  },
});

export default OverviewScreen;
