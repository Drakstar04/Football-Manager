import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import MatchScreen from './screen/MatchScreen';
import MatchWindow from './components/MatchWindow';
import { StatusBar } from 'expo-status-bar';

// --- Écran de remplacement pour les onglets non implémentés ---
function PlaceholderScreen({ route }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Écran : {route.params.label}</Text>
    </View>
  );
}

// ─── Home Stack (Navigation pour l'onglet principal) ──────────────────────────────────
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
    // Le header personnalisé (AppHeader) a été retiré car le composant n'est pas fourni.
    // React Navigation utilisera le header par défaut.
    >
      {/* J'ai remplacé "MatchsList" par "MatchScreen" pour correspondre à vos fichiers */}
      <Stack.Screen name="MatchsList" component={MatchScreen} options={{ headerShown: false }} />
      {/* J'ai remplacé "MatchSimulator" par "MatchWindow" pour correspondre à vos fichiers */}
      <Stack.Screen name="MatchSimulator" component={MatchWindow} options={{ title: "Simulateur de Match" }} />
    </Stack.Navigator>
  );
}

// ─── Bottom Tab Navigator (Menu principal en bas) ──────────────────────────────────────
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#f0f0f0',
          height: 60,
          paddingBottom: 0,
        },
        tabBarIcon: ({ focused, color }) => {
          const icons = {
            Home:      focused ? 'home'     : 'home-outline',
            Favorites: focused ? 'heart'    : 'heart-outline',
            New:       'add-circle', // Icône centrale, toujours pleine
            Videos:    focused ? 'videocam' : 'videocam-outline',
            Profile:   focused ? 'person'   : 'person-outline',
          };
          
          // Style spécial pour le bouton central "New"
          const iconColor = route.name === 'New' ? '#7C3AED' : color;
          const iconSize = route.name === 'New' ? 40 : 26;
          const containerSize = route.name === 'New' ? 45 : 30;

          return (
            <View style={{ width: containerSize, height: containerSize, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name={icons[route.name]} size={iconSize} color={iconColor} 
                style={{ width: iconSize, height: iconSize, textAlign: 'center', lineHeight: iconSize }} 
              />
            </View>
          );
        },
      })}
    >
      {/* L'onglet "Home" contient maintenant toute la navigation "Stack" */}
      <Tab.Screen name="Home" component={HomeStack} />
      
      {/* Les autres onglets utilisent un écran de remplacement */}
      <Tab.Screen name="Favorites" component={PlaceholderScreen} initialParams={{ label: 'Favoris' }} />
      <Tab.Screen
        name="New"
        component={PlaceholderScreen} // Ce composant n'est jamais affiché grâce au listener ci-dessous
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Empêche l'action par défaut (changer d'onglet)
            e.preventDefault();
            // Navigue vers l'écran du simulateur dans le Stack de l'onglet Home
            navigation.navigate('Home', { screen: 'MatchSimulator' });
          },
        })} />
      <Tab.Screen name="Videos" component={PlaceholderScreen} initialParams={{ label: 'Vidéos' }} />
      <Tab.Screen name="Profile" component={PlaceholderScreen} initialParams={{ label: 'Profil' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark"/>
      <TabNavigator />
    </NavigationContainer>
  );
}