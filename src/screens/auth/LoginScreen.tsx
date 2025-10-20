import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {
  TextInput,
  Button,
  Title,
  Text,
  Card,
  HelperText,
  ActivityIndicator,
} from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthStackParamList, LoginCredentials } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser, clearError } from '../../store/authSlice';
import { VALIDATION, COLORS } from '../../constants';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(VALIDATION.EMAIL_REGEX, 'Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(VALIDATION.MIN_PASSWORD_LENGTH, `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`)
    .required('Password is required'),
});

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert('Login Error', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleLogin = async (values: LoginCredentials) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      // Navigation is handled automatically by the auth state change
    } catch (err) {
      // Error is handled by useEffect above
    }
  };

  const initialValues: LoginCredentials = {
    email: '',
    password: '',
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Title style={styles.title}>Welcome to MiniCRM</Title>
          <Text style={styles.subtitle}>Sign in to your account</Text>

          <Card style={styles.card}>
            <Card.Content>
              <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isValid,
                }) => (
                  <View>
                    <TextInput
                      label="Email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      mode="outlined"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      error={touched.email && !!errors.email}
                      style={styles.input}
                      disabled={isLoading}
                    />
                    <HelperText type="error" visible={touched.email && !!errors.email}>
                      {errors.email}
                    </HelperText>

                    <TextInput
                      label="Password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      mode="outlined"
                      secureTextEntry={!showPassword}
                      right={
                        <TextInput.Icon
                          icon={showPassword ? 'eye-off' : 'eye'}
                          onPress={() => setShowPassword(!showPassword)}
                        />
                      }
                      error={touched.password && !!errors.password}
                      style={styles.input}
                      disabled={isLoading}
                    />
                    <HelperText type="error" visible={touched.password && !!errors.password}>
                      {errors.password}
                    </HelperText>

                    <Button
                      mode="contained"
                      onPress={handleSubmit}
                      style={styles.loginButton}
                      disabled={!isValid || isLoading}
                      loading={isLoading}
                    >
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </View>
                )}
              </Formik>
            </Card.Content>
          </Card>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Register')}
              disabled={isLoading}
            >
              Sign Up
            </Button>
          </View>

          <View style={styles.demoCredentials}>
            <Text style={styles.demoTitle}>Demo Credentials:</Text>
            <Text style={styles.demoText}>Admin: admin@example.com / password123</Text>
            <Text style={styles.demoText}>User: user@example.com / password123</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.light.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    elevation: 4,
  },
  input: {
    marginBottom: 8,
  },
  loginButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
    color: '#666',
  },
  demoCredentials: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.light.primary,
    marginBottom: 5,
  },
  demoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
});

export default LoginScreen;