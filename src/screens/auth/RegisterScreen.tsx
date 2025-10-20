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
} from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthStackParamList, RegisterData } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUser, clearError } from '../../store/authSlice';
import { VALIDATION, COLORS } from '../../constants';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .matches(VALIDATION.EMAIL_REGEX, 'Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(VALIDATION.MIN_PASSWORD_LENGTH, `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`)
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert('Registration Error', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleRegister = async (values: RegisterData) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      // Navigation is handled automatically by the auth state change
    } catch (err) {
      // Error is handled by useEffect above
    }
  };

  const initialValues: RegisterData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Title style={styles.title}>Create Account</Title>
          <Text style={styles.subtitle}>Join MiniCRM today</Text>

          <Card style={styles.card}>
            <Card.Content>
              <Formik
                initialValues={initialValues}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}
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
                      label="Full Name"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      mode="outlined"
                      autoCapitalize="words"
                      error={touched.name && !!errors.name}
                      style={styles.input}
                      disabled={isLoading}
                    />
                    <HelperText type="error" visible={touched.name && !!errors.name}>
                      {errors.name}
                    </HelperText>

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

                    <TextInput
                      label="Confirm Password"
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      mode="outlined"
                      secureTextEntry={!showConfirmPassword}
                      right={
                        <TextInput.Icon
                          icon={showConfirmPassword ? 'eye-off' : 'eye'}
                          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                      }
                      error={touched.confirmPassword && !!errors.confirmPassword}
                      style={styles.input}
                      disabled={isLoading}
                    />
                    <HelperText type="error" visible={touched.confirmPassword && !!errors.confirmPassword}>
                      {errors.confirmPassword}
                    </HelperText>

                    <Button
                      mode="contained"
                      onPress={handleSubmit}
                      style={styles.registerButton}
                      disabled={!isValid || isLoading}
                      loading={isLoading}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </View>
                )}
              </Formik>
            </Card.Content>
          </Card>

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              disabled={isLoading}
            >
              Sign In
            </Button>
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
  registerButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  signInText: {
    fontSize: 16,
    color: '#666',
  },
});

export default RegisterScreen;