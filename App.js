import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
  Image,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LogementModule from './LogementModule';
import HotelsModule from './HotelsModule';
import ReparateursModule from './ReparateursModule';
import RestaurantsModule from './RestaurantsModule';
import RemorquageModule from './RemorquageModule';
import TravauxArtisansModule from './TravauxArtisansModule';
import MobilityScreen from './MobilityScreen';
import DocumentsScreen from './DocumentsScreen';
import SanteModule from './SanteModule';
import ProfileScreen from './ProfileScreen';
import SecurityScreen from './SecurityScreen';
import WasteScreen from './WasteScreen';
import NumerosUtilesScreen from './NumerosUtilesScreen';
import MapScreen from './servicesData';

const { width, height } = Dimensions.get('window');

// Composant Chatbot amélioré
const ChatbotScreen = ({ navigation, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant virtuel pour la ville de Bouaké. Comment puis-je vous aider aujourd'hui ? 😊",
      sender: 'bot',
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef();

  const quickResponses = [
    { id: 1, text: "Services disponibles", icon: "list-outline" },
    { id: 2, text: "Horaires d'ouverture", icon: "time-outline" },
    { id: 3, text: "Contact urgence", icon: "call-outline" },
    { id: 4, text: "Localisation services", icon: "location-outline" }
  ];

  const botResponses = {
    "services": "Voici les services disponibles à Bouaké :\n• Logement et immobilier\n• Hôtels et hébergements\n• Réparateurs et maintenance\n• Restaurants\n• Remorquage\n• Travaux et artisans\n• Santé et pharmacies\n\nQuel service vous intéresse ?",
    "horaires": "Les horaires des services municipaux :\n• Lundi - Vendredi: 8h00 - 17h00\n• Samedi: 8h00 - 12h00\n• Dimanche: Fermé\n\nServices d'urgence disponibles 24h/24.",
    "urgence": "Numéros d'urgence à Bouaké :\n🚨 Police: 110\n🚑 Pompiers: 180\n🏥 SAMU: 185\n📞 Mairie: +225 31 63 41 09",
    "localisation": "Pour localiser nos services, utilisez la carte interactive disponible dans l'application. Vous pouvez aussi me demander l'adresse d'un service spécifique.",
    "default": "Je comprends votre demande. Pouvez-vous préciser quel service vous recherchez ? Je peux vous aider avec les logements, hôtels, restaurants, services de santé, et bien plus encore !"
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: 'user',
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setIsTyping(true);

      setTimeout(() => {
        const botResponse = getBotResponse(inputText);
        const botMessage = {
          id: messages.length + 2,
          text: botResponse,
          sender: 'bot',
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('service') || message.includes('disponible')) {
      return botResponses.services;
    } else if (message.includes('horaire') || message.includes('heure')) {
      return botResponses.horaires;
    } else if (message.includes('urgence') || message.includes('police') || message.includes('pompier')) {
      return botResponses.urgence;
    } else if (message.includes('où') || message.includes('localisation') || message.includes('adresse')) {
      return botResponses.localisation;
    } else if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return "Bonjour ! Ravi de vous aider. Que puis-je faire pour vous aujourd'hui ?";
    } else if (message.includes('merci')) {
      return "Je vous en prie ! N'hésitez pas si vous avez d'autres questions. 😊";
    } else {
      return botResponses.default;
    }
  };

  const handleQuickResponse = (response) => {
    setInputText(response.text);
    handleSendMessage();
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.chatContainer}>
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={onClose} style={styles.chatBackButton}>
          <Ionicons name="chevron-down" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.chatHeaderInfo}>
          <Text style={styles.chatHeaderTitle}>Assistant Bouaké</Text>
          <Text style={styles.chatHeaderSubtitle}>En ligne</Text>
        </View>
        <View style={styles.chatHeaderAvatar}>
          <Ionicons name="chatbubbles" size={20} color="#FFF" />
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer,
            item.sender === 'user' ? styles.userMessage : styles.botMessage
          ]}>
            <Text style={[
              styles.messageText,
              item.sender === 'user' ? styles.userMessageText : styles.botMessageText
            ]}>
              {item.text}
            </Text>
            <Text style={[
              styles.messageTime,
              item.sender === 'user' ? styles.userMessageTime : styles.botMessageTime
            ]}>
              {item.time}
            </Text>
          </View>
        )}
        ListFooterComponent={
          isTyping ? (
            <View style={[styles.messageContainer, styles.botMessage]}>
              <View style={styles.typingIndicator}>
                <Text style={styles.typingText}>Assistant en train d'écrire...</Text>
              </View>
            </View>
          ) : null
        }
        style={styles.chatMessages}
        contentContainerStyle={styles.chatMessagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.quickResponsesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickResponses.map((response) => (
            <TouchableOpacity
              key={response.id}
              style={styles.quickResponseButton}
              onPress={() => handleQuickResponse(response)}
            >
              <Ionicons name={response.icon} size={16} color="#FF6B35" />
              <Text style={styles.quickResponseText}>{response.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatInputContainer}
      >
        <View style={styles.chatInputWrapper}>
          <TextInput
            style={styles.chatInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Tapez votre message..."
            placeholderTextColor="#7F8C8D"
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, inputText.trim() ? styles.sendButtonActive : null]}
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={20} color={inputText.trim() ? "#FFF" : "#7F8C8D"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Composant du bouton chatbot flottant amélioré
const ChatbotButton = ({ onPress }) => {
  const [showNotification, setShowNotification] = useState(true);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    return () => {
      pulse.stop();
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.chatbotButtonContainer}>
      {showNotification && (
        <Animated.View 
          style={[
            styles.chatbotNotification,
            { opacity: pulseAnim.interpolate({ inputRange: [1, 1.2], outputRange: [0.9, 1] }) }
          ]}
        >
          <Text style={styles.chatbotNotificationText}>
            Besoin d'aide ? Chattez avec moi ! 💬
          </Text>
        </Animated.View>
      )}
      <Animated.View style={[styles.chatbotButton, { transform: [{ scale: pulseAnim }] }]}>
        <TouchableOpacity onPress={onPress} style={styles.chatbotButtonInner}>
          <Ionicons name="chatbubbles" size={28} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

// Écrans principaux avec améliorations UI
const ServicesScreen = ({ navigation }) => {
  const services = [
    { name: 'Logement', icon: 'home-outline', color: '#FF6B35', screenName: 'logement' }, // Orange vif
    { name: 'Hôtels', icon: 'bed-outline', color: '#007BFF', screenName: 'hotels' }, // Bleu électrique
    { name: 'Réparateurs', icon: 'construct-outline', color: '#28A745', screenName: 'reparateurs' }, // Vert émeraude
    { name: 'Restaurants', icon: 'restaurant-outline', color: '#E74C3C', screenName: 'restaurants' }, // Rouge vif
    { name: 'Remorquage', icon: 'car-outline', color: '#F39C12', screenName: 'remorquages' }, // Orange doré
    { name: 'Mobile Money', icon: 'card-outline', color: '#8E44AD', screenName: 'travauxartisans' }, // Violet améthyste
    { name: 'Travaux/Artisans', icon: 'hammer-outline', color: '#17A2B8', screenName: 'travauxartisans' }, // Cyan
    { name: 'Santé', icon: 'medkit-outline', color: '#DC3545', screenName: 'sante' }, // Rouge cerise
    { name: 'Pharmacie', icon: 'medical-outline', color: '#20C997', screenName: 'pharmacie' } // Turquoise
  ];

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Services</Text>
      </View>
      
      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => {
              if (item.screenName && item.screenName !== 'mobilemoney') {
                navigation.navigate(item.screenName);
              } else {
                Alert.alert(`${item.name}`, 'Ce service sera bientôt disponible');
              }
            }}
            activeOpacity={0.8}
          >
            <View style={styles.serviceItemLeft}>
              <View style={[styles.serviceItemIcon, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={24} color="#FFF" />
              </View>
              <Text style={styles.serviceItemText}>{item.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#7F8C8D" />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.screenContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

// const MapScreen = ({ navigation }) => (
//   <SafeAreaView style={styles.screenContainer}>
//     <View style={[styles.screenHeader, { backgroundColor: '#28A745' }]}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <Ionicons name="arrow-back" size={24} color="#FFF" />
//       </TouchableOpacity>
//       <Text style={styles.screenTitle}>Carte</Text>
//     </View>
//     <View style={styles.screenContent}>
//       <View style={styles.developmentCard}>
//         <Ionicons name="map-outline" size={48} color="#28A745" style={styles.developmentIcon} />
//         <Text style={styles.developmentText}>Carte interactive des services autour de vous</Text>
//         <Text style={styles.developmentSubtext}>En cours de développement...</Text>
//       </View>
//     </View>
//   </SafeAreaView>
// );

// const AlertScreen = ({ navigation }) => (
//   <SafeAreaView style={styles.screenContainer}>
//     <View style={[styles.screenHeader, { backgroundColor: '#E74C3C' }]}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <Ionicons name="arrow-back" size={24} color="#FFF" />
//       </TouchableOpacity>
//       <Text style={styles.screenTitle}>Signalement</Text>
//     </View>
//     <View style={styles.screenContent}>
//       <View style={styles.developmentCard}>
//         <Ionicons name="alert-circle-outline" size={48} color="#E74C3C" style={styles.developmentIcon} />
//         <Text style={styles.developmentText}>Signaler un problème ou une urgence</Text>
//         <Text style={styles.developmentSubtext}>En cours de développement...</Text>
//       </View>
//     </View>
//   </SafeAreaView>
// );

// Composant principal amélioré
export default function BouakeSmartCity() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreServices, setShowMoreServices] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const mainServices = [
    {
      id: 1,
      title: 'Services de la ville',
      subtitle: 'Administration',
      icon: 'business-outline',
      color: '#FF6B35', // Orange vibrant
      bgColor: '#FFF4E6',
      action: 'services'
    },
    {
      id: 7,
      title: 'Documents',
      subtitle: 'Démarches Admin',
      icon: 'document-text-outline',
      color: '#007BFF', // Bleu électrique
      bgColor: '#E3F2FD',
      action: 'documents'
    },
    {
      id: 2,
      title: 'Mobilité',
      subtitle: 'Transport & Parking',
      icon: 'bus-outline',
      color: '#28A745', // Vert émeraude
      bgColor: '#E8F5E8',
      action: 'mobility'
    },
    {
      id: 6,
      title: 'Signalement',
      subtitle: 'Alertes & Problèmes',
      icon: 'shield-checkmark-outline',
      color: '#E74C3C', // Rouge vif
      bgColor: '#FFEBEE',
      action: 'alert'
    },
    {
      id: 8,
      title: 'Mon compte',
      subtitle: 'Espace Personnel',
      icon: 'person-outline',
      color: '#8E44AD', // Violet améthyste
      bgColor: '#F3E5F5',
      action: 'profile'
    },
    {
      id: 4,
      title: 'Déchets',
      subtitle: 'Collecte & Propreté',
      icon: 'trash-outline',
      color: '#17A2B8', // Cyan
      bgColor: '#E0F2F1',
      action: 'waste'
    },
  ];
  
  const additionalServices = [
    {
      id: 3,
      title: 'Réservations',
      subtitle: 'Hôtels & Services',
      icon: 'calendar-outline',
      color: '#DC3545', // Rouge cerise
      bgColor: '#FFEBEE',
      action: 'reservations'
    },
    {
      id: 5,
      title: 'Tourisme & Culture',
      subtitle: 'Découvrir Bouaké',
      icon: 'camera-outline',
      color: '#F39C12', // Orange doré
      bgColor: '#FFF8E1',
      action: 'tourism'
    },
  ];

  const handleServicePress = (action) => {
    setCurrentScreen(action);
  };

  const handleBottomNavigation = (screen) => {
    setCurrentScreen(screen);
  };

  const renderServiceCard = (service) => (
    <TouchableOpacity
      key={service.id}
      style={[styles.modernServiceCard, { backgroundColor: service.bgColor }]}
      onPress={() => handleServicePress(service.action)}
      activeOpacity={0.8}
    >
      <View style={styles.serviceCardHeader}>
        <View style={[styles.modernServiceIcon, { backgroundColor: service.color }]}>
          <Ionicons name={service.icon} size={24} color="#FFF" />
        </View>
        <Ionicons name="chevron-forward" size={16} color={service.color} />
      </View>
      <Text style={styles.modernServiceTitle}>{service.title}</Text>
      <Text style={styles.modernServiceSubtitle}>{service.subtitle}</Text>
    </TouchableOpacity>
  );

  if (showChatbot) {
    return (
      <ChatbotScreen 
        navigation={{ goBack: () => setShowChatbot(false) }}
        onClose={() => setShowChatbot(false)}
      />
    );
  }

  if (currentScreen !== 'home') {
    const screenComponents = {
      mobility: <MobilityScreen navigation={{ 
        goBack: () => setCurrentScreen('home'),
        navigate: (screen) => setCurrentScreen(screen)
      }} />,
      map: <MapScreen navigation={{ 
        goBack: () => setCurrentScreen('home'),
        navigate: (screen) => setCurrentScreen(screen)
      }} />,
      numeros: <NumerosUtilesScreen navigation={{ 
        goBack: () => setCurrentScreen('home'),
        navigate: (screen) => setCurrentScreen(screen)
      }} />,
      profile: <ProfileScreen navigation={{ 
        goBack: () => setCurrentScreen('home'),
        navigate: (screen) => setCurrentScreen(screen)
      }} />,
      alert: <SecurityScreen navigation={{ 
        goBack: () => setCurrentScreen('home'),
        navigate: (screen) => setCurrentScreen(screen)
      }} />,
      waste: <WasteScreen navigation={{ 
        goBack: () => setCurrentScreen('home'),
        navigate: (screen) => setCurrentScreen(screen)
      }} />,
      services: <ServicesScreen navigation={{ 
        goBack: () => setCurrentScreen('home'),
        navigate: (screen) => setCurrentScreen(screen)
      }} />,
      logement: <LogementModule navigation={{ 
        goBack: () => setCurrentScreen('services') 
      }} />,
      hotels: <HotelsModule navigation={{ 
        goBack: () => setCurrentScreen('services') 
      }} />,
      reparateurs: <ReparateursModule navigation={{ 
        goBack: () => setCurrentScreen('services') 
      }} />,
      restaurants: <RestaurantsModule navigation={{ 
        goBack: () => setCurrentScreen('services') 
      }} />,
      remorquages: <RemorquageModule navigation={{ 
        goBack: () => setCurrentScreen('services') 
      }} />,
      travauxartisans: <TravauxArtisansModule navigation={{ 
        goBack: () => setCurrentScreen('services') 
      }} />,
      sante: <SanteModule navigation={{ 
        goBack: () => setCurrentScreen('services') 
      }} />,
      map: <MapScreen navigation={{ goBack: () => setCurrentScreen('home') }} />,
      documents: <DocumentsScreen navigation={{ goBack: () => setCurrentScreen('home') }} />,
      alert: <SecurityScreen navigation={{ goBack: () => setCurrentScreen('home') }} />,
      profile: <ProfileScreen navigation={{ goBack: () => setCurrentScreen('home') }} />
    };
    
    return screenComponents[currentScreen] || screenComponents.services;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      <View style={styles.modernHeader}>
        <View style={styles.headerTop}>
          <View style={styles.logoSection}>
            <Image 
              source={require('./assets/bouake4.jpeg')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
            <View style={styles.logoTextContainer}>
              <Text style={styles.cityName}>Bouaké</Text>
              <Text style={styles.citySubtitle}>Ville intelligente</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#7F8C8D" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#7F8C8D" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un service..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#BDC3C7"
          />
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.welcomeContainer}>
          <View style={styles.modernWelcomeCard}>
            <Text style={styles.welcomeTitle}>Bienvenue à Bouaké ! 👋</Text>
            <Text style={styles.welcomeText}>
              Accédez facilement à tous les services de votre ville intelligente en quelques clics
            </Text>
            <View style={styles.welcomeStats}>
              <View style={styles.statBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statText}>Services 24/7</Text>
              </View>
              <View style={styles.statBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statText}>500K+ Citoyens</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.modernSectionTitle}>Services disponibles</Text>
          <View style={styles.modernServicesGrid}>
            {mainServices.map(renderServiceCard)}
          </View>

          {!showMoreServices && (
            <TouchableOpacity
              onPress={() => setShowMoreServices(true)}
              style={styles.seeMoreButton}
            >
              <Ionicons name="add" size={16} color="#7F8C8D" />
              <Text style={styles.seeMoreText}>Voir plus de services</Text>
            </TouchableOpacity>
          )}

          {showMoreServices && (
            <View style={styles.modernServicesGrid}>
              {additionalServices.map(renderServiceCard)}
            </View>
          )}
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.modernSectionTitle}>Actions rapides</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={[styles.modernQuickAction, styles.phoneAction]}
              onPress={() => handleServicePress('numeros')}
            >
              <Ionicons name="call-outline" size={24} color="#FFF" />
              <View style={styles.quickActionContent}>
                <Text style={styles.quickActionTitle}>Numéros utiles</Text>
                <Text style={styles.quickActionSubtitle}>Contacts d'urgence et services</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.modernQuickAction, styles.infoAction]}
              onPress={() => setShowChatbot(true)}
            >
              <Ionicons name="chatbubbles-outline" size={24} color="#FFF" />
              <View style={styles.quickActionContent}>
                <Text style={styles.quickActionTitle}>Assistant</Text>
                <Text style={styles.quickActionSubtitle}>Aide virtuelle</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ChatbotButton onPress={() => setShowChatbot(true)} />

      <View style={styles.bottomNavigation}>
        {[
          { icon: 'home-outline', label: 'Accueil', screen: 'home' },
          { icon: 'calendar-outline', label: 'Services', screen: 'services' },
          { icon: 'map-outline', label: 'Carte', screen: 'map' },
          { icon: 'alert-circle-outline', label: 'Alerte', screen: 'alert' },
          { icon: 'person-outline', label: 'Compte', screen: 'profile' }
        ].map((item) => (
          <TouchableOpacity
            key={item.screen}
            onPress={() => handleBottomNavigation(item.screen)}
            style={[
              styles.bottomNavItem,
              currentScreen === item.screen && styles.bottomNavItemActive
            ]}
          >
            <Ionicons 
              name={item.icon} 
              size={20} 
              color={currentScreen === item.screen ? '#FF6B35' : '#7F8C8D'} 
            />
            <Text style={[
              styles.bottomNavLabel,
              currentScreen === item.screen && styles.bottomNavLabelActive
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  // Header
  modernHeader: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 48,
    height: 48,
    marginRight: 12,
    borderRadius: 8,
  },
  logoTextContainer: {
    flex: 1,
  },
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  citySubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    backgroundColor: '#E74C3C',
    borderRadius: 4,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },

  // Content
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  // Welcome
  welcomeContainer: {
    marginVertical: 24,
  },
  modernWelcomeCard: {
    backgroundColor: '#4169E1',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
    marginBottom: 16,
  },
  welcomeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    backgroundColor: '#00FF7F',
    borderRadius: 3,
    marginRight: 8,
  },
  statText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },

  // Services
  servicesSection: {
    marginBottom: 32,
  },
  modernSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  modernServicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modernServiceCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  serviceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  modernServiceIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modernServiceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  modernServiceSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
  },

  // See More
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  seeMoreText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#7F8C8D',
  },

  // Quick Actions
  quickActionsSection: {
    marginBottom: 32,
  },
  quickActionsContainer: {
    gap: 12,
  },
  modernQuickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  alertAction: {
    backgroundColor: '#DC143C',
  },
  phoneAction: {
    backgroundColor: '#228B22',
  },
  infoAction: {
    backgroundColor: '#4169E1',
  },
  quickActionContent: {
    marginLeft: 12,
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },

  // Bottom Navigation
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  bottomNavItemActive: {
    backgroundColor: '#F0F4FF',
  },
  bottomNavLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#7F8C8D',
    marginTop: 4,
  },
  bottomNavLabelActive: {
    color: '#4169E1',
  },

  // Secondary Screens
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  screenHeader: {
    backgroundColor: '#4169E1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  screenContent: {
    flex: 1,
    padding: 20,
  },
  scrollContents: {
    paddingVertical: 20,
    paddingBottom: 100,
  },
  developmentCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    elevation: 2,
  },
  developmentIcon: {
    marginBottom: 16,
  },
  developmentText: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  developmentSubtext: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },

  // Services Screen
  serviceItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  serviceItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  serviceItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
  },

  // Chatbot Styles
  chatContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  chatHeader: {
    backgroundColor: '#4169E1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 4,
  },
  chatBackButton: {
    marginRight: 16,
    padding: 4,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  chatHeaderSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  chatHeaderAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatMessages: {
    flex: 1,
  },
  chatMessagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageContainer: {
    marginBottom: 12,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4169E1',
    borderRadius: 12,
    padding: 12,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    elevation: 1,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFF',
  },
  botMessageText: {
    color: '#2C3E50',
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
  },
  userMessageTime: {
    color: 'rgba(255,255,255,0.7)',
    alignSelf: 'flex-end',
  },
  botMessageTime: {
    color: '#7F8C8D',
    alignSelf: 'flex-start',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    fontSize: 12,
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
  quickResponsesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  quickResponseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quickResponseText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#4169E1',
    fontWeight: '500',
  },
  chatInputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    elevation: 4,
  },
  chatInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chatInput: {
    flex: 1,
    fontSize: 14,
    color: '#2C3E50',
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#4169E1',
  },
  chatbotButtonContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
  },
  chatbotNotification: {
    backgroundColor: '#4169E1',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    maxWidth: 200,
  },
  chatbotNotificationText: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
  },
  chatbotButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  chatbotButtonInner: {
    flex: 1,
    backgroundColor: '#4169E1',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});