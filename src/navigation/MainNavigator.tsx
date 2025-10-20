import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { MainStackParamList } from '../types';
import { COLORS } from '../constants';

// Import screens (we'll create these later)
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import CustomerListScreen from '../screens/customers/CustomerListScreen';
import CustomerDetailsScreen from '../screens/customers/CustomerDetailsScreen';
import AddCustomerScreen from '../screens/customers/AddCustomerScreen';
import EditCustomerScreen from '../screens/customers/EditCustomerScreen';
import AddLeadScreen from '../screens/leads/AddLeadScreen';
import EditLeadScreen from '../screens/leads/EditLeadScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<MainStackParamList>();

// Customer Stack Navigator
const CustomerStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.light.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Customers" 
        component={CustomerListScreen}
        options={{ title: 'Customers' }}
      />
      <Stack.Screen 
        name="CustomerDetails" 
        component={CustomerDetailsScreen}
        options={{ title: 'Customer Details' }}
      />
      <Stack.Screen 
        name="AddCustomer" 
        component={AddCustomerScreen}
        options={{ title: 'Add Customer' }}
      />
      <Stack.Screen 
        name="EditCustomer" 
        component={EditCustomerScreen}
        options={{ title: 'Edit Customer' }}
      />
      <Stack.Screen 
        name="AddLead" 
        component={AddLeadScreen}
        options={{ title: 'Add Lead' }}
      />
      <Stack.Screen 
        name="EditLead" 
        component={EditLeadScreen}
        options={{ title: 'Edit Lead' }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.light.primary,
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Icon name="dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Customers"
        component={CustomerStackNavigator}
        options={{
          title: 'Customers',
          tabBarIcon: ({ color, size }) => (
            <Icon name="people" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;