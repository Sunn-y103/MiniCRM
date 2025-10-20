import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  ActivityIndicator,
  Appbar,
  Menu,
} from 'react-native-paper';
import { PieChart, BarChart } from 'react-native-chart-kit';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchDashboardStats } from '../../store/leadSlice';
import { logoutUser } from '../../store/authSlice';
import { DashboardStats } from '../../types';
import { COLORS, CHART_COLORS } from '../../constants';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading, error } = useAppSelector((state) => state.leads);
  
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, [dispatch]);

  const loadDashboardData = async () => {
    try {
      const result = await dispatch(fetchDashboardStats()).unwrap();
      setDashboardStats(result);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleLogout = () => {
    setMenuVisible(false);
    dispatch(logoutUser());
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const renderStatsCards = () => {
    if (!dashboardStats) return null;

    return (
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Title style={styles.statNumber}>{dashboardStats.totalLeads}</Title>
            <Paragraph style={styles.statLabel}>Total Leads</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Title style={styles.statNumber}>
              ${dashboardStats.totalValue.toLocaleString()}
            </Title>
            <Paragraph style={styles.statLabel}>Total Value</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Title style={styles.statNumber}>
              {dashboardStats.conversionRate}%
            </Title>
            <Paragraph style={styles.statLabel}>Conversion Rate</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Title style={styles.statNumber}>
              {dashboardStats.leadsByStatus.Converted}
            </Title>
            <Paragraph style={styles.statLabel}>Converted</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  };

  const renderPieChart = () => {
    if (!dashboardStats) return null;

    const pieData = Object.entries(dashboardStats.leadsByStatus)
      .filter(([_, value]) => value > 0)
      .map(([status, count], index) => ({
        name: status,
        population: count,
        color: CHART_COLORS[index % CHART_COLORS.length],
        legendFontColor: '#333333',
        legendFontSize: 12,
      }));

    if (pieData.length === 0) return null;

    return (
      <Card style={styles.chartCard}>
        <Card.Content>
          <Title style={styles.chartTitle}>Leads by Status</Title>
          <PieChart
            data={pieData}
            width={screenWidth - 80}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </Card.Content>
      </Card>
    );
  };

  const renderBarChart = () => {
    if (!dashboardStats) return null;

    const barData = {
      labels: Object.keys(dashboardStats.leadsByStatus),
      datasets: [
        {
          data: Object.values(dashboardStats.leadsByStatus),
        },
      ],
    };

    return (
      <Card style={styles.chartCard}>
        <Card.Content>
          <Title style={styles.chartTitle}>Lead Status Distribution</Title>
          <BarChart
            data={barData}
            width={screenWidth - 80}
            height={200}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </Card.Content>
      </Card>
    );
  };

  if (isLoading && !dashboardStats) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title={`Welcome, ${user?.name}`} />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action 
              icon="menu" 
              onPress={() => setMenuVisible(true)} 
            />
          }
        >
          <Menu.Item onPress={handleLogout} title="Logout" />
        </Menu>
      </Appbar.Header>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderStatsCards()}
        {renderPieChart()}
        {renderBarChart()}

        {error && (
          <Card style={styles.errorCard}>
            <Card.Content>
              <Paragraph style={styles.errorText}>{error}</Paragraph>
              <Button mode="outlined" onPress={loadDashboardData} style={styles.retryButton}>
                Retry
              </Button>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: (screenWidth - 48) / 2,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.light.primary,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  chartCard: {
    marginBottom: 16,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  errorCard: {
    marginTop: 16,
    backgroundColor: '#ffebee',
  },
  errorText: {
    color: COLORS.light.error,
    textAlign: 'center',
    marginBottom: 8,
  },
  retryButton: {
    alignSelf: 'center',
  },
});

export default DashboardScreen;