import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Searchbar,
  FAB,
  ActivityIndicator,
  Button,
  Chip,
  IconButton,
} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { MainStackParamList, Customer } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  fetchCustomers, 
  deleteCustomer, 
  setSearchQuery,
  clearError 
} from '../../store/customerSlice';
import { COLORS } from '../../constants';

type CustomerListScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Customers'>;

interface Props {
  navigation: CustomerListScreenNavigationProp;
}

const CustomerListScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { 
    customers, 
    isLoading, 
    error, 
    searchQuery, 
    currentPage, 
    totalPages 
  } = useAppSelector((state) => state.customers);

  const [refreshing, setRefreshing] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useFocusEffect(
    useCallback(() => {
      loadCustomers(1, localSearchQuery);
    }, [localSearchQuery])
  );

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const loadCustomers = (page: number = 1, search?: string) => {
    dispatch(fetchCustomers({ 
      page, 
      searchQuery: search || localSearchQuery 
    }));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCustomers(1);
    setRefreshing(false);
  };

  const handleSearch = (query: string) => {
    setLocalSearchQuery(query);
    dispatch(setSearchQuery(query));
    if (query !== searchQuery) {
      loadCustomers(1, query);
    }
  };

  const handleDeleteCustomer = (customer: Customer) => {
    Alert.alert(
      'Delete Customer',
      `Are you sure you want to delete ${customer.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            dispatch(deleteCustomer(customer.id));
          }
        },
      ]
    );
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !isLoading) {
      loadCustomers(currentPage + 1);
    }
  };

  const renderCustomerItem = ({ item }: { item: Customer }) => (
    <Card 
      style={styles.customerCard}
      onPress={() => navigation.navigate('CustomerDetails', { customerId: item.id })}
    >
      <Card.Content>
        <View style={styles.customerHeader}>
          <View style={styles.customerInfo}>
            <Title style={styles.customerName}>{item.name}</Title>
            <Paragraph style={styles.customerCompany}>{item.company}</Paragraph>
          </View>
          <View style={styles.customerActions}>
            <IconButton
              icon="pencil"
              size={20}
              onPress={() => navigation.navigate('EditCustomer', { customer: item })}
            />
            <IconButton
              icon="delete"
              size={20}
              iconColor={COLORS.light.error}
              onPress={() => handleDeleteCustomer(item)}
            />
          </View>
        </View>
        
        <View style={styles.customerDetails}>
          <Chip icon="email" style={styles.chip}>{item.email}</Chip>
          <Chip icon="phone" style={styles.chip}>{item.phone}</Chip>
        </View>
        
        <Paragraph style={styles.customerDate}>
          Created: {new Date(item.createdAt).toLocaleDateString()}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  const renderFooter = () => {
    if (!isLoading || customers.length === 0) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Title>No Customers Found</Title>
      <Paragraph>
        {searchQuery ? 'No customers match your search.' : 'Start by adding your first customer!'}
      </Paragraph>
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('AddCustomer')}
        style={styles.emptyStateButton}
      >
        Add Customer
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search customers..."
        onChangeText={handleSearch}
        value={localSearchQuery}
        style={styles.searchbar}
      />

      <FlatList
        data={customers}
        renderItem={renderCustomerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
        showsVerticalScrollIndicator={false}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddCustomer')}
      />

      {isLoading && customers.length === 0 && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchbar: {
    margin: 16,
    elevation: 2,
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 100,
  },
  customerCard: {
    marginBottom: 12,
    elevation: 2,
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  customerCompany: {
    fontSize: 14,
    color: COLORS.light.primary,
    fontWeight: '500',
  },
  customerActions: {
    flexDirection: 'row',
  },
  customerDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 4,
  },
  customerDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.light.primary,
  },
  footerLoader: {
    padding: 16,
    alignItems: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateButton: {
    marginTop: 16,
  },
});

export default CustomerListScreen;