import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
  Dimensions,
  TextInput,
  FlatList,
  Image,
  Animated,
  PanResponder
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Données de services avec coordonnées mieux distribuées pour Bouaké
const servicesData = {
  logement: [
    { id: 1, name: 'Résidence les Palmiers', address: 'Quartier Commerce', phone: '+225 31 63 40 10', lat: 7.6898, lng: -5.0305, type: 'Appartement', price: '150,000 FCFA/mois' },
    { id: 2, name: 'Villa Moderne Koko', address: 'Quartier Koko', phone: '+225 31 63 40 11', lat: 7.6950, lng: -5.0350, type: 'Villa', price: '300,000 FCFA/mois' },
    { id: 3, name: 'Studio Universitaire', address: 'Quartier Université', phone: '+225 31 63 40 12', lat: 7.6850, lng: -5.0280, type: 'Studio', price: '80,000 FCFA/mois' },
    { id: 4, name: 'Duplex Standing', address: 'Quartier Belleville', phone: '+225 31 63 40 13', lat: 7.6980, lng: -5.0400, type: 'Duplex', price: '250,000 FCFA/mois' },
  ],
  hotels: [
    { id: 1, name: 'Hôtel Ran', address: 'Centre-ville', phone: '+225 31 63 50 10', lat: 7.6900, lng: -5.0300, type: 'Hôtel 4 étoiles', price: '35,000 FCFA/nuit' },
    { id: 2, name: 'Auberge du Centre', address: 'Quartier Commerce', phone: '+225 31 63 50 11', lat: 7.6920, lng: -5.0320, type: 'Auberge', price: '15,000 FCFA/nuit' },
    { id: 3, name: 'Motel Paradise', address: 'Route de Yamoussoukro', phone: '+225 31 63 50 12', lat: 7.6800, lng: -5.0250, type: 'Motel', price: '25,000 FCFA/nuit' },
    { id: 4, name: 'Résidence Hôtelière', address: 'Quartier Administratif', phone: '+225 31 63 50 13', lat: 7.6970, lng: -5.0380, type: 'Résidence', price: '45,000 FCFA/nuit' },
  ],
  restaurants: [
    { id: 1, name: 'Restaurant Traditionnel', address: 'Marché Central', phone: '+225 31 63 60 10', lat: 7.6910, lng: -5.0310, type: 'Cuisine ivoirienne', price: '2,500 FCFA/repas' },
    { id: 2, name: 'Pizzeria Milano', address: 'Quartier Moderne', phone: '+225 31 63 60 11', lat: 7.6930, lng: -5.0330, type: 'Pizza', price: '4,000 FCFA/repas' },
    { id: 3, name: 'Maquis Chez Tante', address: 'Quartier Koko', phone: '+225 31 63 60 12', lat: 7.6960, lng: -5.0360, type: 'Maquis', price: '3,000 FCFA/repas' },
    { id: 4, name: 'Restaurant Gastronomique', address: 'Centre-ville', phone: '+225 31 63 60 13', lat: 7.6890, lng: -5.0290, type: 'Gastronomie', price: '8,000 FCFA/repas' },
  ],
  reparateurs: [
    { id: 1, name: 'Garage Auto Expert', address: 'Zone Industrielle', phone: '+225 31 63 70 10', lat: 7.6820, lng: -5.0260, type: 'Automobile', price: 'Devis gratuit' },
    { id: 2, name: 'Réparation Électronique', address: 'Marché Central', phone: '+225 31 63 70 11', lat: 7.6905, lng: -5.0305, type: 'Électronique', price: '5,000 FCFA/diagnostic' },
    { id: 3, name: 'Atelier Moto Service', address: 'Quartier Bromakoté', phone: '+225 31 63 70 12', lat: 7.6870, lng: -5.0270, type: 'Moto', price: '2,000 FCFA/réparation' },
    { id: 4, name: 'Menuiserie Moderne', address: 'Quartier Artisanal', phone: '+225 31 63 70 13', lat: 7.6940, lng: -5.0340, type: 'Menuiserie', price: 'Sur devis' },
  ],
  sante: [
    { id: 1, name: 'CHU Bouaké', address: 'Quartier Universitaire', phone: '+225 31 63 80 10', lat: 7.6860, lng: -5.0285, type: 'Hôpital public', price: 'Consultation: 1,000 FCFA' },
    { id: 2, name: 'Clinique Sainte Marie', address: 'Centre-ville', phone: '+225 31 63 80 11', lat: 7.6915, lng: -5.0315, type: 'Clinique privée', price: 'Consultation: 5,000 FCFA' },
    { id: 3, name: 'Pharmacie Centrale', address: 'Marché Central', phone: '+225 31 63 80 12', lat: 7.6900, lng: -5.0300, type: 'Pharmacie', price: 'Médicaments' },
    { id: 4, name: 'Cabinet Dentaire', address: 'Quartier Administratif', phone: '+225 31 63 80 13', lat: 7.6975, lng: -5.0385, type: 'Dentiste', price: 'Consultation: 8,000 FCFA' },
  ],
  remorquages: [
    { id: 1, name: 'Remorquage Express', address: 'Zone Industrielle', phone: '+225 31 63 90 10', lat: 7.6825, lng: -5.0265, type: 'Remorquage 24h/24', price: '15,000 FCFA' },
    { id: 2, name: 'SOS Dépannage', address: 'Route Principale', phone: '+225 31 63 90 11', lat: 7.6880, lng: -5.0275, type: 'Dépannage auto', price: '10,000 FCFA' },
    { id: 3, name: 'Assistance Moto', address: 'Quartier Bromakoté', phone: '+225 31 63 90 12', lat: 7.6875, lng: -5.0275, type: 'Dépannage moto', price: '5,000 FCFA' },
  ],
  travauxartisans: [
    { id: 1, name: 'Entreprise BTP Bouaké', address: 'Zone Industrielle', phone: '+225 31 63 95 10', lat: 7.6830, lng: -5.0270, type: 'Bâtiment', price: 'Devis gratuit' },
    { id: 2, name: 'Électricité Générale', address: 'Quartier Moderne', phone: '+225 31 63 95 11', lat: 7.6935, lng: -5.0335, type: 'Électricité', price: '3,000 FCFA/intervention' },
    { id: 3, name: 'Plomberie Express', address: 'Centre-ville', phone: '+225 31 63 95 12', lat: 7.6895, lng: -5.0295, type: 'Plomberie', price: '2,500 FCFA/intervention' },
    { id: 4, name: 'Peinture Décoration', address: 'Quartier Résidentiel', phone: '+225 31 63 95 13', lat: 7.6950, lng: -5.0350, type: 'Peinture', price: '1,500 FCFA/m²' },
  ]
};

// Types de services définis globalement
const serviceTypes = [
  { id: 'logement', name: 'Logement', icon: 'home-outline', color: '#FF6B35' },
  { id: 'hotels', name: 'Hôtels', icon: 'bed-outline', color: '#007BFF' },
  { id: 'restaurants', name: 'Restaurants', icon: 'restaurant-outline', color: '#E74C3C' },
  { id: 'reparateurs', name: 'Réparateurs', icon: 'construct-outline', color: '#28A745' },
  { id: 'sante', name: 'Santé', icon: 'medkit-outline', color: '#DC3545' },
  { id: 'remorquages', name: 'Remorquage', icon: 'car-outline', color: '#F39C12' },
  { id: 'travauxartisans', name: 'Travaux', icon: 'hammer-outline', color: '#17A2B8' },
];

// Composant pour la carte simulée
const MapView = ({ services, selectedService, onMarkerPress, mapCenter, zoomLevel }) => {
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
    },
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      pan.flattenOffset();
    },
  });

  const getMarkerColor = (serviceType) => {
    const colors = {
      logement: '#FF6B35',
      hotels: '#007BFF',
      restaurants: '#E74C3C',
      reparateurs: '#28A745',
      sante: '#DC3545',
      remorquages: '#F39C12',
      travauxartisans: '#17A2B8'
    };
    return colors[serviceType] || '#7F8C8D';
  };

  const convertCoordinatesToPixels = (lat, lng) => {
    const mapWidth = width;
    const mapHeight = height * 0.6; // Hauteur disponible pour la carte
    
    // Définir les limites de la zone de Bouaké
    const bounds = {
      north: 7.7100,
      south: 7.6700,
      east: -5.0100,
      west: -5.0500
    };
    
    // Convertir les coordonnées GPS en pixels
    const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * mapWidth;
    const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * mapHeight;
    
    return { x: Math.max(0, Math.min(mapWidth - 30, x)), y: Math.max(0, Math.min(mapHeight - 30, y)) };
  };

  const getServiceIcon = (serviceType) => {
    const icons = {
      logement: 'home',
      hotels: 'bed',
      restaurants: 'restaurant',
      reparateurs: 'construct',
      sante: 'medkit',
      remorquages: 'car',
      travauxartisans: 'hammer'
    };
    return icons[serviceType] || 'location';
  };

  return (
    <View style={styles.mapContainer}>
      <Animated.View
        style={[
          styles.mapView,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {/* Fond de carte amélioré */}
        <View style={styles.mapBackground}>
          {/* Grille plus subtile */}
          <View style={styles.mapGrid}>
            {Array.from({ length: 15 }, (_, i) => (
              <View key={`h-${i}`} style={[styles.gridLine, { top: i * (height * 0.6 / 15) }]} />
            ))}
            {Array.from({ length: 15 }, (_, i) => (
              <View key={`v-${i}`} style={[styles.gridLine, { left: i * (width / 15) }, styles.verticalLine]} />
            ))}
          </View>
          
          {/* Routes principales mieux positionnées */}
          <View style={[styles.road, { top: height * 0.25, left: 0, width: width }]} />
          <View style={[styles.road, { top: height * 0.4, left: 0, width: width }]} />
          <View style={[styles.road, { left: width * 0.3, top: 0, height: height * 0.6 }]} />
          <View style={[styles.road, { left: width * 0.7, top: 0, height: height * 0.6 }]} />
          
          {/* Zones importantes repositionnées */}
          <View style={[styles.landmark, { top: height * 0.3, left: width * 0.4 }]}>
            <Text style={styles.landmarkText}>Centre-ville</Text>
          </View>
          <View style={[styles.landmark, { top: height * 0.15, left: width * 0.6 }]}>
            <Text style={styles.landmarkText}>Université</Text>
          </View>
          <View style={[styles.landmark, { top: height * 0.45, left: width * 0.2 }]}>
            <Text style={styles.landmarkText}>Marché Central</Text>
          </View>
          <View style={[styles.landmark, { top: height * 0.35, left: width * 0.8 }]}>
            <Text style={styles.landmarkText}>Koko</Text>
          </View>
          <View style={[styles.landmark, { top: height * 0.1, left: width * 0.1 }]}>
            <Text style={styles.landmarkText}>Zone Industrielle</Text>
          </View>
        </View>

        {/* Marqueurs des services améliorés */}
        {services.map((service) => {
          const position = convertCoordinatesToPixels(service.lat, service.lng);
          return (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.marker,
                {
                  left: position.x,
                  top: position.y,
                  backgroundColor: getMarkerColor(selectedService),
                },
              ]}
              onPress={() => onMarkerPress(service)}
              activeOpacity={0.7}
            >
              <View style={styles.markerInner}>
                <Ionicons 
                  name={getServiceIcon(selectedService)} 
                  size={18} 
                  color="#FFF" 
                />
              </View>
              <View style={styles.markerTail} />
              <View style={[styles.markerLabel, { backgroundColor: getMarkerColor(selectedService) }]}>
                <Text style={styles.markerLabelText} numberOfLines={1}>
                  {service.name.length > 15 ? service.name.substring(0, 15) + '...' : service.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      {/* Contrôles de zoom améliorés */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.zoomButton} activeOpacity={0.7}>
          <Ionicons name="add" size={20} color="#2C3E50" />
        </TouchableOpacity>
        <View style={styles.zoomSeparator} />
        <TouchableOpacity style={styles.zoomButton} activeOpacity={0.7}>
          <Ionicons name="remove" size={20} color="#2C3E50" />
        </TouchableOpacity>
      </View>

      {/* Indicateur de position amélioré */}
      <View style={styles.locationIndicator}>
        <Ionicons name="location" size={16} color="#007BFF" />
        <Text style={styles.locationText}>Bouaké, Côte d'Ivoire</Text>
      </View>

      {/* Légende des services */}
      <View style={styles.mapLegend}>
        <View style={[styles.legendItem, { backgroundColor: getMarkerColor(selectedService) }]}>
          <Ionicons name={getServiceIcon(selectedService)} size={16} color="#FFF" />
        </View>
        <Text style={styles.legendText}>
          {serviceTypes.find(s => s.id === selectedService)?.name || 'Services'}
        </Text>
      </View>
    </View>
  );
};

// Composant principal de l'écran carte
const MapScreen = ({ navigation }) => {
  const [selectedService, setSelectedService] = useState('logement');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [mapCenter] = useState({ lat: 7.6900, lng: -5.0300 });
  const [zoomLevel] = useState(1);

  const currentServices = servicesData[selectedService] || [];
  const filteredServices = currentServices.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkerPress = (service) => {
    setSelectedMarker(service);
    setShowServiceModal(true);
  };

  const handleCallService = (phone) => {
    Alert.alert(
      'Appeler le service',
      `Voulez-vous appeler ${phone} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Appeler', onPress: () => console.log('Appel vers:', phone) },
      ]
    );
  };

  const getDirections = (service) => {
    Alert.alert(
      'Itinéraire',
      `Calculer l'itinéraire vers ${service.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Oui', onPress: () => console.log('Itinéraire vers:', service.name) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carte des Services</Text>
        <TouchableOpacity 
          onPress={() => setShowFilters(!showFilters)}
          style={styles.filterButton}
        >
          <Ionicons name="filter" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7F8C8D" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un service..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#BDC3C7"
        />
      </View>

      {/* Sélecteur de services */}
      <View style={styles.serviceSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {serviceTypes.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceTab,
                selectedService === service.id && styles.serviceTabActive,
                { borderBottomColor: service.color }
              ]}
              onPress={() => setSelectedService(service.id)}
            >
              <View style={[
                styles.serviceTabIcon,
                { backgroundColor: selectedService === service.id ? service.color : '#F8F9FA' }
              ]}>
                <Ionicons 
                  name={service.icon} 
                  size={20} 
                  color={selectedService === service.id ? '#FFF' : service.color} 
                />
              </View>
              <Text style={[
                styles.serviceTabText,
                selectedService === service.id && styles.serviceTabTextActive
              ]}>
                {service.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Carte */}
      <MapView
        services={filteredServices}
        selectedService={selectedService}
        onMarkerPress={handleMarkerPress}
        mapCenter={mapCenter}
        zoomLevel={zoomLevel}
      />

      {/* Compteur de résultats */}
      <View style={styles.resultsCounter}>
        <Text style={styles.resultsText}>
          {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''} trouvé{filteredServices.length > 1 ? 's' : ''}
        </Text>
      </View>

      {/* Modal de détails du service */}
      <Modal
        visible={showServiceModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowServiceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedMarker && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedMarker.name}</Text>
                  <TouchableOpacity 
                    onPress={() => setShowServiceModal(false)}
                    style={styles.modalCloseButton}
                  >
                    <Ionicons name="close" size={24} color="#7F8C8D" />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.serviceInfo}>
                    <Ionicons name="location-outline" size={20} color="#7F8C8D" />
                    <Text style={styles.serviceInfoText}>{selectedMarker.address}</Text>
                  </View>
                  
                  <View style={styles.serviceInfo}>
                    <Ionicons name="call-outline" size={20} color="#7F8C8D" />
                    <Text style={styles.serviceInfoText}>{selectedMarker.phone}</Text>
                  </View>
                  
                  <View style={styles.serviceInfo}>
                    <Ionicons name="pricetag-outline" size={20} color="#7F8C8D" />
                    <Text style={styles.serviceInfoText}>{selectedMarker.price}</Text>
                  </View>

                  <View style={styles.serviceInfo}>
                    <Ionicons name="information-circle-outline" size={20} color="#7F8C8D" />
                    <Text style={styles.serviceInfoText}>{selectedMarker.type}</Text>
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.callButton]}
                    onPress={() => handleCallService(selectedMarker.phone)}
                  >
                    <Ionicons name="call" size={20} color="#FFF" />
                    <Text style={styles.actionButtonText}>Appeler</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.actionButton, styles.directionsButton]}
                    onPress={() => getDirections(selectedMarker)}
                  >
                    <Ionicons name="navigate" size={20} color="#FFF" />
                    <Text style={styles.actionButtonText}>Itinéraire</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Liste des services (affichage en bas) */}
      {showFilters && (
        <View style={styles.servicesList}>
          <Text style={styles.servicesListTitle}>Services disponibles</Text>
          <FlatList
            data={filteredServices}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.serviceListItem}
                onPress={() => handleMarkerPress(item)}
              >
                <View style={styles.serviceListItemContent}>
                  <Text style={styles.serviceListItemName}>{item.name}</Text>
                  <Text style={styles.serviceListItemAddress}>{item.address}</Text>
                  <Text style={styles.serviceListItemPrice}>{item.price}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#7F8C8D" />
              </TouchableOpacity>
            )}
            style={styles.servicesFlatList}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  // Header
  header: {
    backgroundColor: '#28A745',
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1,
  },
  filterButton: {
    padding: 4,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },

  // Service Selector
  serviceSelector: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  serviceTab: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  serviceTabActive: {
    borderBottomWidth: 2,
  },
  serviceTabIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  serviceTabText: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  serviceTabTextActive: {
    color: '#2C3E50',
    fontWeight: '600',
  },

  // Map
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapView: {
    flex: 1,
    width: width,
    height: height,
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#E8F5E8',
    position: 'relative',
  },
  mapGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: '#D5E5D5',
    height: 1,
    width: '100%',
    opacity: 0.5,
  },
  verticalLine: {
    width: 1,
    height: '100%',
  },
  road: {
    position: 'absolute',
    backgroundColor: '#95A5A6',
    height: 6,
    borderRadius: 3,
    elevation: 1,
  },
  landmark: {
    position: 'absolute',
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  landmarkText: {
    fontSize: 10,
    color: '#34495E',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Marqueurs
  marker: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerInner: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  markerTail: {
    position: 'absolute',
    bottom: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'inherit',
  },
  markerLabel: {
    position: 'absolute',
    top: -35,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  markerLabelText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Contrôles de la carte
  mapControls: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  zoomButton: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  zoomSeparator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },

  // Indicateur de position
  locationIndicator: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  locationText: {
    fontSize: 12,
    color: '#34495E',
    fontWeight: '600',
    marginLeft: 4,
  },

  // Légende
  mapLegend: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  legendItem: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#34495E',
    fontWeight: '600',
  },

  // Compteur de résultats
  resultsCounter: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  resultsText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    fontWeight: '500',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  modalCloseButton: {
    padding: 4,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceInfoText: {
    fontSize: 16,
    color: '#34495E',
    marginLeft: 12,
    flex: 1,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 0.45,
  },
  callButton: {
    backgroundColor: '#28A745',
  },
  directionsButton: {
    backgroundColor: '#007BFF',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  // Liste des services
  servicesList: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    maxHeight: height * 0.4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  servicesListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  servicesFlatList: {
    flex: 1,
  },
  serviceListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFF',
  },
  serviceListItemContent: {
    flex: 1,
  },
  serviceListItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  serviceListItemAddress: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  serviceListItemPrice: {
    fontSize: 14,
    color: '#28A745',
    fontWeight: '600',
  },

  // Animations et transitions
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0,
  },
  slideUp: {
    transform: [{ translateY: 0 }],
  },
  slideDown: {
    transform: [{ translateY: 100 }],
  },

  // États de chargement
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 12,
  },

  // États d'erreur
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#E74C3C',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#28A745',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Responsivité tablette
  tabletContainer: {
    flexDirection: 'row',
  },
  tabletMapContainer: {
    flex: 2,
  },
  tabletSidebar: {
    flex: 1,
    backgroundColor: '#FFF',
    borderLeftWidth: 1,
    borderLeftColor: '#E0E0E0',
  },

  // Mode sombre
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  darkHeader: {
    backgroundColor: '#2C3E50',
  },
  darkText: {
    color: '#FFF',
  },
  darkMapBackground: {
    backgroundColor: '#2C3E50',
  },
  darkModalContent: {
    backgroundColor: '#34495E',
  },
});

export default MapScreen;