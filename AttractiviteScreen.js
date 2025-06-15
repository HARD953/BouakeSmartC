import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AttractiviteScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('events');
  const [reservations, setReservations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [reservationType, setReservationType] = useState('');
  const [reservationDetails, setReservationDetails] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
  });

  // Données simulées pour les événements
  const events = [
    {
      id: 1,
      title: 'Festival des Arts de Bouaké',
      date: '15-17 Juin 2025',
      location: 'Centre Culturel',
      category: 'Culture',
      image: '🎭',
      description: 'Festival annuel célébrant les arts traditionnels et contemporains',
      participants: '5000+',
      price: 'Gratuit'
    },
    {
      id: 2,
      title: 'Marché Nocturne',
      date: 'Chaque Vendredi',
      location: 'Place Centrale',
      category: 'Commerce',
      image: '🌙',
      description: 'Marché artisanal et gastronomique sous les étoiles',
      participants: '2000+',
      price: 'Gratuit'
    },
    {
      id: 3,
      title: 'Foire Agricole',
      date: '2-5 Juillet 2025',
      location: 'Parc des Expositions',
      category: 'Agriculture',
      image: '🌾',
      description: 'Exposition des produits agricoles locaux et innovations',
      participants: '8000+',
      price: '5 000 FCFA'
    },
    {
      id: 4,
      title: 'Concert Zouglou',
      date: '20 Juin 2025',
      location: 'Stade Municipal',
      category: 'Musique',
      image: '🎵',
      description: 'Grande soirée musicale avec les stars nationales',
      participants: '15000+',
      price: '10 000 FCFA'
    }
  ];

  // Données simulées pour les points d'intérêt
  const pointsOfInterest = [
    {
      id: 1,
      name: 'Mosquée de Bouaké',
      category: 'Monument',
      distance: '2.1 km',
      rating: 4.6,
      image: '🕌',
      description: 'Architecture islamique remarquable'
    },
    {
      id: 2,
      name: 'Hôtel Ran',
      category: 'Hébergement',
      distance: '0.8 km',
      rating: 4.2,
      image: '🏨',
      description: 'Hôtel moderne au cœur de la ville',
      price: '35 000 FCFA/nuit',
      roomsAvailable: true
    },
    {
      id: 3,
      name: 'Restaurant Maquis Chez Tante',
      category: 'Restaurant',
      distance: '1.5 km',
      rating: 4.8,
      image: '🍽️',
      description: 'Cuisine ivoirienne authentique',
      reservationRequired: true
    },
    {
      id: 4,
      name: 'CHU de Bouaké',
      category: 'Santé',
      distance: '3.2 km',
      rating: 4.0,
      image: '🏥',
      description: 'Centre hospitalier universitaire'
    },
    {
      id: 5,
      name: 'Université Alassane Ouattara',
      category: 'Éducation',
      distance: '4.1 km',
      rating: 4.3,
      image: '🎓',
      description: 'Campus universitaire moderne'
    },
    {
      id: 6,
      name: 'Marché de Koko',
      category: 'Commerce',
      distance: '1.8 km',
      rating: 4.4,
      image: '🛒',
      description: 'Grand marché traditionnel'
    }
  ];

  // Données simulées pour les statistiques
  const cityStats = [
    { label: 'Population', value: '832,371', icon: 'people-outline', color: '#FF6B6B' },
    { label: 'Investissements 2024', value: '45.2M €', icon: 'trending-up-outline', color: '#4ECDC4' },
    { label: 'Projets Smart City', value: '12', icon: 'bulb-outline', color: '#45B7D1' },
    { label: 'Taux Emploi', value: '78%', icon: 'briefcase-outline', color: '#96CEB4' },
  ];

  const smartProjects = [
    {
      id: 1,
      title: 'Éclairage LED Intelligent',
      status: 'Terminé',
      progress: 100,
      description: '2,500 lampadaires LED connectés installés'
    },
    {
      id: 2,
      title: 'Transport Connecté',
      status: 'En cours',
      progress: 75,
      description: 'Système de géolocalisation des bus'
    },
    {
      id: 3,
      title: 'Wifi Public Gratuit',
      status: 'En cours',
      progress: 60,
      description: '50 zones wifi dans les lieux publics'
    },
    {
      id: 4,
      title: 'Capteurs Environnementaux',
      status: 'Planifié',
      progress: 25,
      description: 'Surveillance qualité air et bruit'
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Culture': '#FF6B6B',
      'Commerce': '#4ECDC4',
      'Agriculture': '#45B7D1',
      'Musique': '#96CEB4',
      'Monument': '#FECA57',
      'Hébergement': '#FF9FF3',
      'Restaurant': '#54A0FF',
      'Santé': '#5F27CD',
      'Éducation': '#00D2D3',
    };
    return colors[category] || '#95A5A6';
  };

  const handleReservationPress = (item, type) => {
    setCurrentItem(item);
    setReservationType(type);
    setModalVisible(true);
  };

  const confirmReservation = () => {
    const newReservation = {
      id: currentItem.id,
      type: reservationType,
      title: currentItem.title || currentItem.name,
      date: reservationDetails.date || currentItem.date,
      reservationDate: new Date().toLocaleDateString(),
      userDetails: { ...reservationDetails }
    };
    
    setReservations([...reservations, newReservation]);
    setModalVisible(false);
    setReservationDetails({
      name: '',
      email: '',
      phone: '',
      date: '',
      guests: '',
    });
    
    // Ici vous pourriez ajouter une logique pour envoyer la réservation à un serveur
    alert(`Réservation confirmée pour ${newReservation.title}`);
  };

  const renderEvents = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>Événements à venir</Text>
      {events.map((event) => (
        <View key={event.id} style={styles.eventCard}>
          <View style={styles.eventHeader}>
            <View style={styles.eventImageContainer}>
              <Text style={styles.eventEmoji}>{event.image}</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
              <Text style={styles.eventLocation}>📍 {event.location}</Text>
            </View>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(event.category) }]}>
              <Text style={styles.categoryText}>{event.category}</Text>
            </View>
          </View>
          <Text style={styles.eventDescription}>{event.description}</Text>
          <View style={styles.eventFooter}>
            <View>
              <Text style={styles.participants}>👥 {event.participants} participants</Text>
              <Text style={styles.price}>💰 {event.price}</Text>
            </View>
            <TouchableOpacity 
              style={styles.reservationBtn}
              onPress={() => handleReservationPress(event, 'event')}
            >
              <Ionicons name="calendar-outline" size={16} color="#FFF" />
              <Text style={styles.reservationText}>Réserver</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderPointsOfInterest = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>Points d'intérêt</Text>
      <View style={styles.poiGrid}>
        {pointsOfInterest.map((poi) => (
          <View key={poi.id} style={styles.poiCard}>
            <View style={styles.poiImageContainer}>
              <Text style={styles.poiEmoji}>{poi.image}</Text>
            </View>
            <Text style={styles.poiName}>{poi.name}</Text>
            <Text style={styles.poiCategory}>{poi.category}</Text>
            <View style={styles.poiDetails}>
              <Text style={styles.poiDistance}>📍 {poi.distance}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.rating}>{poi.rating}</Text>
              </View>
            </View>
            <Text style={styles.poiDescription}>{poi.description}</Text>
            
            {(poi.category === 'Hébergement' || poi.category === 'Restaurant') && (
              <TouchableOpacity 
                style={styles.reservationBtnSmall}
                onPress={() => handleReservationPress(poi, poi.category === 'Hébergement' ? 'hotel' : 'restaurant')}
              >
                <Text style={styles.reservationTextSmall}>
                  {poi.category === 'Hébergement' ? 'Réserver une chambre' : 'Réserver une table'}
                </Text>
              </TouchableOpacity>
            )}
            
            {poi.price && (
              <Text style={styles.priceSmall}>💰 {poi.price}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  const renderStats = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>Données de la ville</Text>
      
      <View style={styles.statsGrid}>
        {cityStats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
            <View style={styles.statHeader}>
              <Ionicons name={stat.icon} size={24} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Projets Smart City</Text>
      {smartProjects.map((project) => (
        <View key={project.id} style={styles.projectCard}>
          <View style={styles.projectHeader}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <View style={[styles.statusBadge, 
              { backgroundColor: project.status === 'Terminé' ? '#2ECC71' : 
                                project.status === 'En cours' ? '#F39C12' : '#95A5A6' }]}>
              <Text style={styles.statusText}>{project.status}</Text>
            </View>
          </View>
          <Text style={styles.projectDescription}>{project.description}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${project.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{project.progress}%</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF8C00" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Attractivité</Text>
          <Text style={styles.headerSubtitle}>Découvrir Bouaké</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'events' && styles.activeTab]}
          onPress={() => setActiveTab('events')}
        >
          <Ionicons name="calendar-outline" size={20} color={activeTab === 'events' ? '#FF8C00' : '#7F8C8D'} />
          <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>Événements</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'poi' && styles.activeTab]}
          onPress={() => setActiveTab('poi')}
        >
          <Ionicons name="location-outline" size={20} color={activeTab === 'poi' ? '#FF8C00' : '#7F8C8D'} />
          <Text style={[styles.tabText, activeTab === 'poi' && styles.activeTabText]}>Lieux</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
          onPress={() => setActiveTab('stats')}
        >
          <Ionicons name="bar-chart-outline" size={20} color={activeTab === 'stats' ? '#FF8C00' : '#7F8C8D'} />
          <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>Données</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'poi' && renderPointsOfInterest()}
        {activeTab === 'stats' && renderStats()}
      </ScrollView>

      {/* Modal de réservation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Réserver {currentItem?.title || currentItem?.name}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nom complet"
              value={reservationDetails.name}
              onChangeText={(text) => setReservationDetails({...reservationDetails, name: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={reservationDetails.email}
              onChangeText={(text) => setReservationDetails({...reservationDetails, email: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Téléphone"
              keyboardType="phone-pad"
              value={reservationDetails.phone}
              onChangeText={(text) => setReservationDetails({...reservationDetails, phone: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder={reservationType === 'event' ? "Date de l'événement" : "Date de réservation"}
              value={reservationDetails.date || currentItem?.date}
              onChangeText={(text) => setReservationDetails({...reservationDetails, date: text})}
            />
            
            {(reservationType === 'hotel' || reservationType === 'restaurant') && (
              <TextInput
                style={styles.input}
                placeholder={reservationType === 'hotel' ? "Nombre de nuits" : "Nombre de personnes"}
                keyboardType="numeric"
                value={reservationDetails.guests}
                onChangeText={(text) => setReservationDetails({...reservationDetails, guests: text})}
              />
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmReservation}
              >
                <Text style={styles.buttonText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    marginRight: 15,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#FFF4E6',
  },
  tabText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 5,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FF8C00',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabContent: {
    paddingVertical: 20,
  },
  tabTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  eventImageContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF4E6',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  eventEmoji: {
    fontSize: 24,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#FF8C00',
    fontWeight: '600',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 10,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participants: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  price: {
    fontSize: 12,
    color: '#2ECC71',
    fontWeight: 'bold',
  },
  reservationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#FF8C00',
    borderRadius: 15,
  },
  reservationText: {
    fontSize: 12,
    color: '#FFF',
    marginLeft: 5,
    fontWeight: '600',
  },
  poiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  poiCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  poiImageContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF4E6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  poiEmoji: {
    fontSize: 20,
  },
  poiName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4,
  },
  poiCategory: {
    fontSize: 12,
    color: '#FF8C00',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  poiDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  poiDistance: {
    fontSize: 10,
    color: '#7F8C8D',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 10,
    color: '#7F8C8D',
    marginLeft: 2,
  },
  poiDescription: {
    fontSize: 10,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 14,
  },
  reservationBtnSmall: {
    backgroundColor: '#FF8C00',
    borderRadius: 10,
    padding: 6,
    marginTop: 8,
  },
  reservationTextSmall: {
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  priceSmall: {
    fontSize: 10,
    color: '#2ECC71',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  projectCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 15,
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF8C00',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  confirmButton: {
    backgroundColor: '#FF8C00',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});