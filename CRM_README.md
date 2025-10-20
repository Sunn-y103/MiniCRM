# Mini CRM Mobile Application

## 📱 Features

### ✅ Implemented Features

#### 🔐 Authentication System
- **User Registration**: Create new accounts with validation
- **User Login**: Secure authentication with JWT tokens
- **Persistent Sessions**: AsyncStorage integration for session management
- **Demo Credentials**:
  - Admin: `admin@example.com` / `password123`
  - User: `user@example.com` / `password123`

#### 👥 Customer Management
- **Customer List**: Paginated list with search functionality
- **Customer Details**: Comprehensive customer information view
- **CRUD Operations**: Add, Edit, Delete customers
- **Search & Filter**: Real-time customer search by name, email, or company

#### 🎯 Lead Management
- **Lead Tracking**: Manage leads with different statuses (New, Contacted, Converted, Lost)
- **Lead Association**: Link leads to specific customers
- **Status Updates**: Easy lead status management
- **Value Tracking**: Monitor deal values and conversion rates

#### 📊 Analytics Dashboard
- **Interactive Charts**: Pie and bar charts using react-native-chart-kit
- **Key Metrics**: Total leads, conversion rates, deal values
- **Status Distribution**: Visual representation of lead status breakdown
- **Real-time Updates**: Pull-to-refresh functionality

#### 🎨 Modern UI/UX
- **Material Design**: Using React Native Paper components
- **Responsive Design**: Optimized for various screen sizes
- **Clean Interface**: Intuitive navigation with bottom tabs
- **Loading States**: Proper loading indicators and error handling

## 🛠 Tech Stack

### Core Technologies
- **React Native** (0.82.0) - Mobile app framework
- **TypeScript** - Type safety and better developer experience
- **React Navigation** - Navigation system with stack and tab navigators

### State Management
- **Redux Toolkit** - Predictable state container
- **React Redux** - React bindings for Redux
- **AsyncStorage** - Local data persistence

### UI/UX
- **React Native Paper** - Material Design components
- **React Native Vector Icons** - Icon library
- **React Native Chart Kit** - Data visualization

### Form Handling & Validation
- **Formik** - Form management
- **Yup** - Schema validation

### API & Networking
- **Axios** - HTTP client
- **Mock Services** - Development-ready mock API responses

## 📁 Project Structure

```
MiniCRMApp/
├── src/
│   ├── components/          # Reusable UI components
│   ├── constants/          # App constants and configuration
│   ├── navigation/         # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── MainNavigator.tsx
│   ├── screens/            # Screen components
│   │   ├── auth/          # Authentication screens
│   │   ├── customers/     # Customer management screens
│   │   ├── dashboard/     # Dashboard and analytics
│   │   └── leads/         # Lead management screens
│   ├── services/          # API services and HTTP client
│   │   ├── api.ts         # Base API configuration
│   │   ├── authService.ts # Authentication API calls
│   │   ├── customerService.ts # Customer API calls
│   │   └── leadService.ts # Lead API calls
│   ├── store/             # Redux store configuration
│   │   ├── authSlice.ts   # Authentication state
│   │   ├── customerSlice.ts # Customer state
│   │   ├── leadSlice.ts   # Lead state
│   │   ├── hooks.ts       # Typed Redux hooks
│   │   └── index.ts       # Store configuration
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── android/               # Android-specific code
├── ios/                   # iOS-specific code
└── App.tsx               # Root component
```

## 🚀 Getting Started

### Prerequisites

Ensure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) for your target platform(s).

**Required:**
- Node.js >= 18
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development on macOS)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MiniCRMApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the Application

1. **Start Metro Bundler**
   ```bash
   npx react-native start
   ```

2. **Run on Android**
   ```bash
   npx react-native run-android
   ```

3. **Run on iOS** (macOS only)
   ```bash
   npx react-native run-ios
   ```

## 🔧 Configuration

### API Configuration

The app uses mock services for development. To connect to a real API:

1. Update `src/constants/index.ts`:
   ```typescript
   export const API_BASE_URL = 'https://your-api-endpoint.com/api';
   ```

2. Replace mock implementations in service files with actual API calls.

### Environment Variables

Create a `.env` file in the root directory:
```
API_BASE_URL=https://your-api-endpoint.com/api
API_TIMEOUT=10000
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## 📱 Demo Credentials

For testing the application, use these demo accounts:

- **Admin User**: 
  - Email: `admin@example.com`
  - Password: `password123`
  - Role: Admin (full access)

- **Regular User**:
  - Email: `user@example.com` 
  - Password: `password123`
  - Role: User (limited access)

## 🎯 Implementation Highlights

### Architecture Decisions
- **Clean Architecture**: Separation of concerns with services, state management, and UI layers
- **Type Safety**: Full TypeScript implementation for better maintainability
- **Scalable State Management**: Redux Toolkit with normalized state structure
- **Responsive Design**: Adaptive layouts for different screen sizes

### Performance Optimizations
- **Lazy Loading**: Screens and components loaded on demand
- **Memoization**: React.memo and useMemo for expensive operations
- **Efficient Re-renders**: Optimized Redux selectors
- **Image Optimization**: Proper image handling and caching

### Security Features
- **Token Management**: Secure JWT token handling
- **Input Validation**: Comprehensive form validation
- **Error Boundaries**: Graceful error handling
- **Secure Storage**: Sensitive data protection

## 🔄 API Integration

The app is designed to work with RESTful APIs. Mock services are provided for development:

### Authentication Endpoints
- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Token refresh

### Customer Management
- `GET /customers` - List customers (with pagination & search)
- `POST /customers` - Create customer
- `GET /customers/:id` - Get customer details
- `PUT /customers/:id` - Update customer
- `DELETE /customers/:id` - Delete customer

### Lead Management
- `GET /leads` - List leads (with filtering)
- `POST /leads` - Create lead
- `GET /leads/:id` - Get lead details
- `PUT /leads/:id` - Update lead
- `DELETE /leads/:id` - Delete lead
- `GET /customers/:id/leads` - Get customer leads

### Analytics
- `GET /dashboard/stats` - Dashboard statistics

## 🎨 Customization

### Theme Configuration
Modify `src/constants/index.ts` to customize colors and styling:

```typescript
export const COLORS = {
  light: {
    primary: '#6200EE',      // Main brand color
    secondary: '#03DAC6',    // Secondary accent
    background: '#FFFFFF',   // Background color
    // ... other colors
  },
};
```

### Adding New Features
1. Create new screen components in appropriate folders
2. Add navigation routes in navigator files
3. Create Redux slices for state management
4. Implement API services
5. Add TypeScript types

## 🚨 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

3. **iOS build issues**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Dependencies issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Debug Mode
Shake the device or press `Cmd+D` (iOS) / `Cmd+M` (Android) to access the debug menu.

## 📈 Future Enhancements

### Potential Improvements
- **Push Notifications**: Real-time updates and reminders
- **Offline Support**: Local data caching and sync
- **Advanced Analytics**: More detailed reporting and insights
- **Dark Mode**: Complete dark theme implementation
- **Internationalization**: Multi-language support
- **Advanced Search**: Full-text search and filters
- **File Management**: Document and image attachments
- **Calendar Integration**: Appointment and follow-up scheduling

### Performance Enhancements
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: WebP support and lazy loading
- **Bundle Analysis**: Optimize app bundle size
- **Caching Strategy**: Implement advanced caching mechanisms

## 👨‍💻 Development Team

Developed as part of the **Dev Innovations Labs** React Native Developer Assessment.

### Key Features Implemented

✅ Authentication system with persistent sessions  
✅ Customer management with CRUD operations  
✅ Lead tracking and management  
✅ Interactive analytics dashboard  
✅ Responsive UI with Material Design  
✅ Form validation and error handling  
✅ Search and filtering capabilities  
✅ Mock API integration ready for backend  
✅ Clean architecture and code organization  
✅ TypeScript implementation  
✅ Redux state management  
✅ Navigation system  

## 📝 License

This project is developed for assessment purposes and is not intended for commercial use.

---

**Built with ❤️ using React Native**