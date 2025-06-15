import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MobilityScreen from './MobilityScreen';
import DocumentsScreen from './DocumentsScreen';
import AttractiviteScreen from './AttractiviteScreen';
import WasteScreen from './WasteScreen';
import SecurityScreen from './SecurityScreen';
import ProfileScreen from './ProfileScreen';
import AlerteScreen from './AlerteScreen';
import NumerosUtilesScreen from './NumerosUtilesScreen';

export default function App() {
  const services = [
    {
      id: 1,
      title: 'Mobilité',
      subtitle: 'Transport & Parking',
      icon: 'bus-outline',
      color: '#2E8B57',
      bgColor: '#E8F5E8'
    },
    {
      id: 2,
      title: 'Sécurité',
      subtitle: 'Alertes & Signalements',
      icon: 'shield-checkmark-outline',
      color: '#DC143C',
      bgColor: '#FFE8E8'
    },
    {
      id: 3,
      title: 'Déchets',
      subtitle: 'Collecte & Propreté',
      icon: 'trash-outline',
      color: '#228B22',
      bgColor: '#E8F8E8'
    },
    {
      id: 4,
      title: 'Attractivité',
      subtitle: 'Découvrir Bouaké',
      icon: 'camera-outline',
      color: '#FF8C00',
      bgColor: '#FFF4E6'
    },
    {
      id: 5,
      title: 'Documents',
      subtitle: 'Démarches Admin',
      icon: 'document-text-outline',
      color: '#4169E1',
      bgColor: '#E8EFFF'
    },
    {
      id: 6,
      title: 'Profil',
      subtitle: 'Espace Personnel',
      icon: 'person-outline',
      color: '#9932CC',
      bgColor: '#F3E8FF'
    }
  ];

  const [currentScreen, setCurrentScreen] = useState('home');
  
  const handleServicePress = (service) => {
    if (service.title === 'Mobilité') {
      setCurrentScreen('mobility');
    } else if (service.title === 'Documents') {
      setCurrentScreen('documents');
    } else if (service.title === 'Attractivité') {
      setCurrentScreen('attractivite');
    } else if (service.title === 'Déchets') {
        setCurrentScreen('waste');
    } else if (service.title === 'Sécurité') {
      setCurrentScreen('security');
   }  else if (service.title === 'Profil') {
    setCurrentScreen('profile');
  } else {
      console.log(`Service sélectionné: ${service.title}`);
      alert(`Module ${service.title} - En développement`);
    }
  };

  const handleQuickAction = (action) => {
    if (action === 'Alerte Urgente') {
      setCurrentScreen('alerte');
    } else if (action === 'Numéros Utiles') {
      setCurrentScreen('numeros');
    } else {
      alert(`${action} - En développement`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === 'home' ? (
        <>
          <StatusBar barStyle="light-content" backgroundColor="#1A5D3A" />
          
          {/* Header amélioré avec gradient et logo mairie */}
          <View style={styles.header}>
            <View style={styles.headerGradient}>
              <View style={styles.headerContent}>
                <View style={styles.leftHeaderSection}>
                  <View style={styles.logoContainer}>
                    <Ionicons name="business-outline" size={28} color="#FFF" />
                  </View>
                  <View style={styles.headerText}>
                    <Text style={styles.headerTitle}>Bouaké Smart City</Text>
                    <Text style={styles.headerSubtitle}>Ville Durable & Intelligente</Text>
                  </View>
                </View>
                
                {/* Logo de la mairie à droite */}
                <View style={styles.mayorLogo}>
                  {/* Remplacez par votre logo de mairie */}
                  <Image 
                    // source={require('./assets/logo-mairie.png')} // Ajoutez votre logo ici
                    source={require('./assets/image.png')}
                    style={styles.mayorLogoImage}
                    resizeMode="contain"
                  />
                  {/* Alternative avec icône si pas de logo */}
                  {/* <View style={styles.mayorLogoPlaceholder}>
                    <Ionicons name="library-outline" size={32} color="#FFF" />
                  </View> */}
                </View>
              </View>
            </View>
          </View>

          <ImageBackground
            source={require('./assets/BOUAKE.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            {/* Overlay pour améliorer la lisibilité */}
            <View style={styles.overlay} />
            
            <ScrollView 
              style={styles.content} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Section bienvenue améliorée */}
              <View style={styles.welcomeSection}>
                <View style={styles.welcomeCard}>
                  <Text style={styles.welcomeTitle}>Bienvenue à Bouaké</Text>
                  <Text style={styles.welcomeText}>
                    Accédez facilement à tous les services de votre ville intelligente
                  </Text>
                  <View style={styles.welcomeStats}>
                    <View style={styles.statItem}>
                      <Ionicons name="people-outline" size={16} color="#2E8B57" />
                      <Text style={styles.statText}>500K+ Citoyens</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Ionicons name="checkmark-circle-outline" size={16} color="#2E8B57" />
                      <Text style={styles.statText}>Services 24/7</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Grille de services améliorée */}
              <View style={styles.servicesContainer}>
                <Text style={styles.sectionTitle}>Nos Services</Text>
                <View style={styles.servicesGrid}>
                  {services.map((service) => (
                    <TouchableOpacity
                      key={service.id}
                      style={[styles.serviceCard, { backgroundColor: service.bgColor }]}
                      onPress={() => handleServicePress(service)}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                        <Ionicons name={service.icon} size={26} color="#FFF" />
                      </View>
                      <Text style={styles.serviceTitle}>{service.title}</Text>
                      <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
                      <View style={styles.serviceArrow}>
                        <Ionicons name="chevron-forward-outline" size={16} color={service.color} />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Actions rapides améliorées */}
              <View style={styles.quickActionsContainer}>
                <Text style={styles.sectionTitle}>Actions Rapides</Text>
                <View style={styles.quickActions}>
                  <TouchableOpacity 
                    style={[styles.quickActionBtn, styles.alertBtn]}
                    onPress={() => handleQuickAction('Alerte Urgente')}
                  >
                    <View style={styles.quickActionIcon}>
                      <Ionicons name="alert-circle-outline" size={22} color="#FFF" />
                    </View>
                    <View style={styles.quickActionContent}>
                      <Text style={styles.quickActionText}>Alerte Urgente</Text>
                      <Text style={styles.quickActionSubtext}>Signaler un problème</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.quickActionBtn, styles.callBtn]}
                    onPress={() => handleQuickAction('Numéros Utiles')}
                  >
                    <View style={styles.quickActionIcon}>
                      <Ionicons name="call-outline" size={22} color="#FFF" />
                    </View>
                    <View style={styles.quickActionContent}>
                      <Text style={styles.quickActionText}>Numéros Utiles</Text>
                      <Text style={styles.quickActionSubtext}>Contacts importants</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Section actualités */}
              <View style={styles.newsSection}>
                <Text style={styles.sectionTitle}>Actualités</Text>
                <View style={styles.newsCard}>
                  <Ionicons name="newspaper-outline" size={24} color="#2E8B57" />
                  <View style={styles.newsContent}>
                    <Text style={styles.newsTitle}>Dernières nouvelles de Bouaké</Text>
                    <Text style={styles.newsText}>Restez informé des dernières actualités de votre ville</Text>
                  </View>
                  <Ionicons name="chevron-forward-outline" size={20} color="#7F8C8D" />
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </>
      ) : currentScreen === 'mobility' ? (
        <MobilityScreen navigation={{ goBack: () => setCurrentScreen('home') }} />
      ) : currentScreen === 'documents' ? (
        <DocumentsScreen navigation={{ goBack: () => setCurrentScreen('home') }} />
      ) : currentScreen === 'attractivite' ? (
        <AttractiviteScreen navigation={{ goBack: () => setCurrentScreen('home') }} />
      ) :  currentScreen === 'waste' ? (
        <WasteScreen navigation={{ goBack: () => setCurrentScreen('home') }} />
      ) : currentScreen === 'security' ? (
        <SecurityScreen navigation={{ goBack: () => setCurrentScreen('home') }} />
      ) : currentScreen === 'profile' ? (
        <ProfileScreen navigation={{ goBack: () => setCurrentScreen('home') }} />
      ): currentScreen === 'alerte' ? (
        <AlerteScreen navigation={{ goBack: () => setCurrentScreen('home') }} />
      ) : currentScreen === 'numeros' ? (
        <NumerosUtilesScreen navigation={{ goBack: () => setCurrentScreen('home') }} />
      ): null
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    backgroundColor: '#1A5D3A',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftHeaderSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 45,
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
    fontStyle: 'italic',
  },
  mayorLogo: {
    marginLeft: 15,
  },
  mayorLogoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  mayorLogoPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  welcomeSection: {
    marginTop: 25,
    marginBottom: 30,
  },
  welcomeCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#7F8C8D',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  welcomeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#2E8B57',
    fontWeight: '600',
  },
  servicesContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
    textAlign: 'center',
  },
  serviceSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 10,
  },
  serviceArrow: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  quickActionsContainer: {
    marginBottom: 30,
  },
  quickActions: {
    gap: 10,
  },
  quickActionBtn: {
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  alertBtn: {
    backgroundColor: '#DC143C',
  },
  callBtn: {
    backgroundColor: '#2E8B57',
  },
  quickActionIcon: {
    marginRight: 15,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quickActionSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  newsSection: {
    marginBottom: 20,
  },
  newsCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  newsContent: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  newsText: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 18,
  },
});