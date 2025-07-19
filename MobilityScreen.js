import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Platform,
  PermissionsAndroid,
  Alert,
  TextInput,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

const MobilityScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('map');
  const [selectedBusLine, setSelectedBusLine] = useState(null);
  const [selectedStationSubTab, setSelectedStationSubTab] = useState('communale');
  const [modalVisible, setModalVisible] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 7.6898,
    longitude: -5.0300,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [reservationModalVisible, setReservationModalVisible] = useState(false);
  const [selectedGare, setSelectedGare] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [parkingModalVisible, setParkingModalVisible] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);
  const [parkingDuration, setParkingDuration] = useState('1');
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      //requestLocationPermission();
    } else {
      setLocationPermissionGranted(true);
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permission de localisation',
            message: 'Cette application a besoin de la localisation pour afficher la carte.',
            buttonNeutral: 'Demander plus tard',
            buttonNegative: 'Annuler',
            buttonPositive: 'OK',
          }
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission de localisation accordée');
          setLocationPermissionGranted(true);
        } else {
          console.log('Permission de localisation refusée');
        }
      }
    } catch (err) {
      console.warn('Erreur lors de la demande de permission:', err);
    }
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission requise',
          'La permission de localisation est nécessaire pour utiliser la carte.',
          [{ text: 'OK' }]
        );
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } catch (error) {
      console.log('Erreur de géolocalisation:', error);
    }
  };

  const busLines = [
    {
      id: 1,
      name: 'Ligne 1',
      route: 'Centre-ville → Université Alassane Ouattara',
      color: '#2E8B57',
      frequency: '15 min',
      status: 'En service',
      nextArrival: '5 min',
      stops: [
        { name: 'Gare Routière', latitude: 7.6898, longitude: -5.0300 },
        { name: 'Marché Central', latitude: 7.6920, longitude: -5.0280 },
        { name: 'Préfecture', latitude: 7.6940, longitude: -5.0260 },
        { name: 'Hôpital Bouaké', latitude: 7.6960, longitude: -5.0240 },
        { name: 'Université Alassane Ouattara', latitude: 7.6980, longitude: -5.0220 }
      ]
    },
    {
      id: 2,
      name: 'Ligne 2',
      route: 'Aéroport → Koko',
      color: '#FF8C00',
      frequency: '20 min',
      status: 'En service',
      nextArrival: '12 min',
      stops: [
        { name: 'Aéroport Bouaké', latitude: 7.6800, longitude: -5.0700 },
        { name: 'Zone Industrielle', latitude: 7.6850, longitude: -5.0500 },
        { name: 'Centre Commercial', latitude: 7.6880, longitude: -5.0400 },
        { name: 'Lycée Moderne', latitude: 7.6900, longitude: -5.0350 },
        { name: 'Koko', latitude: 7.6920, longitude: -5.0300 }
      ]
    },
    {
      id: 3,
      name: 'Ligne 3',
      route: 'Dar Es Salam → Stade Municipal',
      color: '#4169E1',
      frequency: '25 min',
      status: 'Retard',
      nextArrival: '18 min',
      stops: [
        { name: 'Dar Es Salam', latitude: 7.6850, longitude: -5.0350 },
        { name: 'Mosquée Centrale', latitude: 7.6870, longitude: -5.0320 },
        { name: 'École Primaire', latitude: 7.6890, longitude: -5.0310 },
        { name: 'Centre de Santé', latitude: 7.6910, longitude: -5.0290 },
        { name: 'Stade Municipal', latitude: 7.6930, longitude: -5.0270 }
      ]
    }
  ];

  const garesCommune = [
    {
      id: 1,
      name: 'Gare Routière Centrale',
      location: 'Centre-ville de Bouaké',
      address: 'Boulevard de la République',
      services: ['Transport urbain', 'Taxis communaux', 'Bus urbains'],
      horaires: '05h00 - 22h00',
      contact: '+225 07 XX XX XX XX',
      latitude: 7.6898,
      longitude: -5.0300,
      status: 'Ouvert',
      destinations: ['Tous quartiers de Bouaké', 'Zones périphériques']
    },
    {
      id: 2,
      name: 'Gare de Koko',
      location: 'Quartier Koko',
      address: 'Carrefour Koko',
      services: ['Transport local', 'Taxis partagés'],
      horaires: '06h00 - 20h00',
      contact: '+225 07 XX XX XX XX',
      latitude: 7.6920,
      longitude: -5.0280,
      status: 'Ouvert',
      destinations: ['Centre-ville', 'Dar Es Salam', 'Université']
    },
    {
      id: 3,
      name: 'Gare de Dar Es Salam',
      location: 'Quartier Dar Es Salam',
      address: 'Rond-point Dar Es Salam',
      services: ['Transport urbain', 'Motos-taxis'],
      horaires: '05h30 - 21h00',
      contact: '+225 07 XX XX XX XX',
      latitude: 7.6850,
      longitude: -5.0350,
      status: 'Ouvert',
      destinations: ['Centre-ville', 'Koko', 'Zone industrielle']
    }
  ];

  const garesRoutieres = [
    {
      id: 1,
      name: 'UTB (Union des Transports de Bouaké)',
      location: 'Gare Routière Principale',
      address: 'Avenue Félix Houphouët-Boigny',
      services: ['Transport intercité', 'Voyages longue distance'],
      horaires: '04h00 - 20h00',
      contact: '+225 31 XX XX XX XX',
      latitude: 7.6890,
      longitude: -5.0320,
      status: 'Ouvert',
      destinations: ['Abidjan', 'Yamoussoukro', 'Korhogo', 'San Pedro', 'Man'],
      tarifs: {
        'Abidjan': '3 500 CFA',
        'Yamoussoukro': '1 500 CFA',
        'Korhogo': '2 000 CFA',
        'San Pedro': '4 000 CFA',
        'Man': '3 000 CFA'
      },
      compagnie: 'UTB'
    },
    {
      id: 2,
      name: 'AVS (Auto-Véhicules Services)',
      location: 'Gare AVS',
      address: 'Rue du Commerce',
      services: ['Transport VIP', 'Voyages climatisés'],
      horaires: '05h00 - 19h00',
      contact: '+225 31 XX XX XX XX',
      latitude: 7.6880,
      longitude: -5.0310,
      status: 'Ouvert',
      destinations: ['Abidjan', 'Yamoussoukro', 'Daloa', 'Gagnoa'],
      tarifs: {
        'Abidjan': '4 000 CFA',
        'Yamoussoukro': '2 000 CFA',
        'Daloa': '2 500 CFA',
        'Gagnoa': '3 000 CFA'
      },
      compagnie: 'AVS'
    },
    {
      id: 3,
      name: 'STCB (Société de Transport Centre-Bouaké)',
      location: 'Terminal STCB',
      address: 'Carrefour Lycée Moderne',
      services: ['Transport économique', 'Desserte régionale'],
      horaires: '04h30 - 18h30',
      contact: '+225 31 XX XX XX XX',
      latitude: 7.6870,
      longitude: -5.0290,
      status: 'Ouvert',
      destinations: ['Abidjan', 'Dimbokro', 'Bongouanou', 'Daoukro'],
      tarifs: {
        'Abidjan': '3 000 CFA',
        'Dimbokro': '1 000 CFA',
        'Bongouanou': '1 500 CFA',
        'Daoukro': '800 CFA'
      },
      compagnie: 'STCB'
    },
    {
      id: 4,
      name: 'TSR (Transport Sahel Route)',
      location: 'Gare TSR',
      address: 'Boulevard de l\'Indépendance',
      services: ['Transport Nord', 'Liaisons Mali-Burkina'],
      horaires: '06h00 - 18h00',
      contact: '+225 31 XX XX XX XX',
      latitude: 7.6860,
      longitude: -5.0330,
      status: 'Ouvert',
      destinations: ['Korhogo', 'Ferkessédougou', 'Ouangolodougou', 'Mali', 'Burkina Faso'],
      tarifs: {
        'Korhogo': '2 000 CFA',
        'Ferkessédougou': '1 500 CFA',
        'Ouangolodougou': '2 500 CFA',
        'Mali': '8 000 CFA',
        'Burkina Faso': '7 500 CFA'
      },
      compagnie: 'TSR'
    }
  ];

  const parkings = [
    {
      id: 1,
      name: 'Parking Centre-ville',
      address: 'Avenue Félix Houphouët-Boigny',
      capacity: 150,
      available: 45,
      price: '500 CFA/h',
      distance: '0.2 km',
      latitude: 7.6898,
      longitude: -5.0300
    },
    {
      id: 2,
      name: 'Parking Marché Central',
      address: 'Place du Marché',
      capacity: 200,
      available: 12,
      price: '300 CFA/h',
      distance: '0.5 km',
      latitude: 7.6920,
      longitude: -5.0280
    },
    {
      id: 3,
      name: 'Parking Université',
      address: 'Campus Universitaire',
      capacity: 100,
      available: 78,
      price: 'Gratuit',
      distance: '2.1 km',
      latitude: 7.6980,
      longitude: -5.0220
    }
  ];

  const trafficZones = [
    {
      id: 1,
      name: 'Boulevard Principal',
      severity: 'high',
      latitude: 7.6910,
      longitude: -5.0290,
    },
    {
      id: 2,
      name: 'Rue de la République',
      severity: 'medium',
      latitude: 7.6890,
      longitude: -5.0310,
    }
  ];

  const trafficAlerts = [
    {
      id: 1,
      type: 'embouteillage',
      location: 'Boulevard Principal',
      severity: 'Élevé',
      description: 'Embouteillage important suite à un accident',
      estimatedDelay: '15-20 min'
    },
    {
      id: 2,
      type: 'travaux',
      location: 'Rue de la République',
      severity: 'Moyen',
      description: 'Travaux de réfection routière',
      estimatedDelay: '5-10 min'
    }
  ];

  const handleBusLinePress = (busLine) => {
    setSelectedBusLine(busLine);
    setModalVisible(true);
  };

  const handleReservation = (gare) => {
    setSelectedGare(gare);
    setReservationModalVisible(true);
  };

  const handleConfirmReservation = async () => {
    if (!selectedDestination || !travelDate) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      const reservationData = {
        gare: selectedGare.name,
        destination: selectedDestination,
        travelDate,
        passengerCount,
        totalPrice: parseFloat(selectedGare.tarifs[selectedDestination].replace(' CFA', '')) * passengerCount,
      };

      setReservationDetails(reservationData);
      setReservationModalVisible(false);
      setPaymentModalVisible(true);
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la réservation. Veuillez réessayer.');
    }
  };

  const handleParkingReservation = (parking) => {
    if (parking.available === 0) return;
    setSelectedParking(parking);
    setParkingModalVisible(true);
  };

  const handleConfirmParkingReservation = async () => {
    if (!parkingDuration) {
      Alert.alert('Erreur', 'Veuillez indiquer la durée de stationnement.');
      return;
    }

    try {
      const reservationData = {
        parking: selectedParking.name,
        duration: parseInt(parkingDuration),
        totalPrice: selectedParking.price !== 'Gratuit'
          ? parseFloat(selectedParking.price.replace(' CFA/h', '')) * parseInt(parkingDuration)
          : 0,
      };

      console.log('Réservation parking:', reservationData);
      Alert.alert('Succès', 'Place de parking réservée !');

      setParkingModalVisible(false);
      setParkingDuration('1');
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la réservation. Veuillez réessayer.');
    }
  };

  const handlePayment = async () => {
    try {
      console.log('Paiement:', reservationDetails);
      Alert.alert('Succès', 'Paiement effectué ! Votre ticket est réservé.');
      setPaymentModalVisible(false);
      setReservationDetails(null);
      setSelectedDestination('');
      setTravelDate('');
      setPassengerCount(1);
    } catch (error) {
      Alert.alert('Erreur', 'Échec du paiement. Veuillez réessayer.');
    }
  };

  const tabs = [
    { id: 'bus', name: 'Bus', icon: 'bus-outline' },
    { id: 'stations', name: 'Gares', icon: 'train-outline' },
    { id: 'parking', name: 'Parking', icon: 'car-outline' },
    { id: 'traffic', name: 'Trafic', icon: 'warning-outline' },
    { id: 'map', name: 'Carte', icon: 'map-outline' }
  ];

  const stationSubTabs = [
    { id: 'communale', name: 'Communales', icon: 'bus-outline' },
    { id: 'routiere', name: 'Routières', icon: 'train-outline' }
  ];

  const renderBusContent = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Lignes de Bus</Text>
        <TouchableOpacity style={styles.refreshBtn} onPress={getCurrentLocation}>
          <Ionicons name="refresh-outline" size={20} color="#2E8B57" />
        </TouchableOpacity>
      </View>
      
      {busLines.map((line) => (
        <TouchableOpacity
          key={line.id}
          style={styles.busCard}
          onPress={() => handleBusLinePress(line)}
        >
          <View style={styles.busCardHeader}>
            <View style={[styles.lineIndicator, { backgroundColor: line.color }]} />
            <View style={styles.busInfo}>
              <Text style={styles.busLineName}>{line.name}</Text>
              <Text style={styles.busRoute}>{line.route}</Text>
            </View>
            <View style={styles.busStatus}>
              <Text style={[styles.statusText, { 
                color: line.status === 'En service' ? '#228B22' : '#FF6347' 
              }]}>
                {line.status}
              </Text>
              <Text style={styles.nextArrival}>Prochain: {line.nextArrival}</Text>
            </View>
          </View>
          <View style={styles.busCardFooter}>
            <Text style={styles.frequency}>Fréquence: {line.frequency}</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#7F8C8D" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStationsContent = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Gares de Bouaké</Text>
      
      <View style={styles.subTabsContainer}>
        {stationSubTabs.map((subTab) => (
          <TouchableOpacity
            key={subTab.id}
            style={[styles.subTab, selectedStationSubTab === subTab.id && styles.activeSubTab]}
            onPress={() => setSelectedStationSubTab(subTab.id)}
          >
            <Ionicons 
              name={subTab.icon} 
              size={18} 
              color={selectedStationSubTab === subTab.id ? '#2E8B57' : '#7F8C8D'} 
            />
            <Text style={[styles.subTabText, selectedStationSubTab === subTab.id && styles.activeSubTabText]}>
              {subTab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedStationSubTab === 'communale' ? renderGaresCommunales() : renderGaresRoutieres()}
    </View>
  );

  const renderGaresCommunales = () => (
    <View>
      <Text style={styles.subSectionTitle}>Gares Communales</Text>
      {garesCommune.map((gare) => (
        <View key={gare.id} style={styles.stationCard}>
          <View style={styles.stationHeader}>
            <Ionicons name="location-outline" size={24} color="#2E8B57" />
            <View style={styles.stationInfo}>
              <Text style={styles.stationName}>{gare.name}</Text>
              <Text style={styles.stationLocation}>{gare.location}</Text>
              <Text style={styles.stationAddress}>{gare.address}</Text>
            </View>
            <View style={[styles.statusBadge, { 
              backgroundColor: gare.status === 'Ouvert' ? '#228B22' : '#DC143C' 
            }]}>
              <Text style={styles.statusBadgeText}>{gare.status}</Text>
            </View>
          </View>
          
          <View style={styles.stationDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={16} color="#7F8C8D" />
              <Text style={styles.detailText}>Horaires: {gare.horaires}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={16} color="#7F8C8D" />
              <Text style={styles.detailText}>{gare.contact}</Text>
            </View>
            <View style={styles.servicesContainer}>
              <Text style={styles.servicesTitle}>Services:</Text>
              <View style={styles.servicesTags}>
                {gare.services.map((service, index) => (
                  <View key={index} style={styles.serviceTag}>
                    <Text style={styles.serviceTagText}>{service}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.destinationsContainer}>
              <Text style={styles.destinationsTitle}>Destinations:</Text>
              <Text style={styles.destinationsText}>{gare.destinations.join(', ')}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderGaresRoutieres = () => (
    <View>
      <Text style={styles.subSectionTitle}>Gares Routières - Compagnies</Text>
      {garesRoutieres.map((gare) => (
        <View key={gare.id} style={styles.stationCard}>
          <View style={styles.stationHeader}>
            <Ionicons name="bus-outline" size={24} color="#4169E1" />
            <View style={styles.stationInfo}>
              <Text style={styles.stationName}>{gare.name}</Text>
              <Text style={styles.companyBadge}>Compagnie: {gare.compagnie}</Text>
              <Text style={styles.stationLocation}>{gare.location}</Text>
              <Text style={styles.stationAddress}>{gare.address}</Text>
            </View>
            <View style={[styles.statusBadge, { 
              backgroundColor: gare.status === 'Ouvert' ? '#228B22' : '#DC143C' 
            }]}>
              <Text style={styles.statusBadgeText}>{gare.status}</Text>
            </View>
          </View>
          
          <View style={styles.stationDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={16} color="#7F8C8D" />
              <Text style={styles.detailText}>Horaires: {gare.horaires}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={16} color="#7F8C8D" />
              <Text style={styles.detailText}>{gare.contact}</Text>
            </View>
            
            <View style={styles.destinationsContainer}>
              <Text style={styles.destinationsTitle}>Destinations & Tarifs:</Text>
              <View style={styles.tarifsContainer}>
                {gare.destinations.map((destination, index) => (
                  <View key={index} style={styles.tarifRow}>
                    <Text style={styles.destinationText}>{destination}</Text>
                    {gare.tarifs[destination] && (
                      <Text style={styles.tarifText}>{gare.tarifs[destination]}</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.servicesContainer}>
              <Text style={styles.servicesTitle}>Services:</Text>
              <View style={styles.servicesTags}>
                {gare.services.map((service, index) => (
                  <View key={index} style={styles.serviceTag}>
                    <Text style={styles.serviceTagText}>{service}</Text>
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.reserveButton}
              onPress={() => handleReservation(gare)}
            >
              <Text style={styles.reserveButtonText}>Réserver un ticket</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderParkingContent = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Parkings Disponibles</Text>
      
      {parkings.map((parking) => (
        <View key={parking.id} style={styles.parkingCard}>
          <View style={styles.parkingHeader}>
            <Ionicons name="car-outline" size={24} color="#4169E1" />
            <View style={styles.parkingInfo}>
              <Text style={styles.parkingName}>{parking.name}</Text>
              <Text style={styles.parkingAddress}>{parking.address}</Text>
            </View>
            <Text style={styles.parkingDistance}>{parking.distance}</Text>
          </View>
          
          <View style={styles.parkingDetails}>
            <View style={styles.capacityInfo}>
              <Text style={styles.availableSpaces}>
                {parking.available}/{parking.capacity} places
              </Text>
              <View style={[styles.availabilityBar, {
                backgroundColor: parking.available > 50 ? '#228B22' : 
                               parking.available > 20 ? '#FF8C00' : '#DC143C'
              }]} />
            </View>
            <Text style={styles.parkingPrice}>{parking.price}</Text>
          </View>

          <TouchableOpacity
            style={[styles.reserveButton, parking.available === 0 && styles.disabledButton]}
            onPress={() => handleParkingReservation(parking)}
            disabled={parking.available === 0}
          >
            <Text style={styles.reserveButtonText}>
              {parking.available === 0 ? 'Complet' : 'Réserver une place'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderTrafficContent = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>État du Trafic</Text>
      
      <View style={styles.trafficOverall}>
        <Ionicons name="speedometer-outline" size={24} color="#228B22" />
        <Text style={styles.trafficStatus}>Trafic Normal</Text>
        <Text style={styles.trafficTime}>Dernière MAJ: Il y a 5 min</Text>
      </View>

      <Text style={styles.alertsTitle}>Alertes en Cours</Text>
      
      {trafficAlerts.map((alert) => (
        <View key={alert.id} style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <Ionicons 
              name={alert.type === 'embouteillage' ? 'warning-outline' : 'construct-outline'} 
              size={20} 
              color={alert.severity === 'Élevé' ? '#DC143C' : '#FF8C00'} 
            />
            <Text style={styles.alertLocation}>{alert.location}</Text>
            <Text style={[styles.alertSeverity, {
              color: alert.severity === 'Élevé' ? '#DC143C' : '#FF8C00'
            }]}>
              {alert.severity}
            </Text>
          </View>
          <Text style={styles.alertDescription}>{alert.description}</Text>
          <Text style={styles.alertDelay}>Retard estimé: {alert.estimatedDelay}</Text>
        </View>
      ))}
    </View>
  );

  const renderMapContent = () => {
    if (!locationPermissionGranted) {
      return (
        <View style={styles.permissionContainer}>
          <Ionicons name="location-outline" size={64} color="#7F8C8D" />
          <Text style={styles.permissionTitle}>Permission de localisation requise</Text>
          <Text style={styles.permissionText}>
            Veuillez accorder la permission de localisation pour utiliser la carte.
          </Text>
          <TouchableOpacity 
            style={styles.permissionButton}
            onPress={requestLocationPermission}
          >
            <Text style={styles.permissionButtonText}>Autoriser la localisation</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.fullScreenMapContainer}>
        <MapView
          style={styles.fullScreenMap}
          initialRegion={userLocation}
          region={userLocation}
          showsUserLocation={true}
          showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          zoomControlEnabled={true}
          scrollEnabled={true}
          rotateEnabled={true}
          pitchEnabled={true}
          toolbarEnabled={true}
        >
          {busLines.map((line) =>
            line.stops.map((stop, index) => (
              <Marker
                key={`${line.id}-${index}`}
                coordinate={{
                  latitude: stop.latitude,
                  longitude: stop.longitude,
                }}
                title={stop.name}
                description={`Ligne ${line.name}`}
              >
                <View style={[styles.busMarker, { backgroundColor: line.color }]}>
                  <Ionicons name="bus-outline" size={16} color="#FFF" />
                </View>
              </Marker>
            ))
          )}

          {garesCommune.map((gare) => (
            <Marker
              key={`gare-commune-${gare.id}`}
              coordinate={{
                latitude: gare.latitude,
                longitude: gare.longitude,
              }}
              title={gare.name}
              description={gare.location}
            >
              <View style={styles.stationMarker}>
                <Ionicons name="location-outline" size={16} color="#FFF" />
              </View>
            </Marker>
          ))}

          {garesRoutieres.map((gare) => (
            <Marker
              key={`gare-routiere-${gare.id}`}
              coordinate={{
                latitude: gare.latitude,
                longitude: gare.longitude,
              }}
              title={gare.name}
              description={`Compagnie ${gare.compagnie}`}
            >
              <View style={styles.routeStationMarker}>
                <Ionicons name="train-outline" size={16} color="#FFF" />
              </View>
            </Marker>
          ))}

          {parkings.map((parking) => (
            <Marker
              key={`parking-${parking.id}`}
              coordinate={{
                latitude: parking.latitude,
                longitude: parking.longitude,
              }}
              title={parking.name}
              description={`${parking.available}/${parking.capacity} places disponibles`}
            >
              <View style={[styles.parkingMarker, { 
                backgroundColor: parking.available > 50 ? '#228B22' : 
                               parking.available > 20 ? '#FF8C00' : '#DC143C' 
              }]}>
                <Ionicons name="car-outline" size={16} color="#FFF" />
              </View>
            </Marker>
          ))}

          {trafficZones.map((zone) => (
            <Marker
              key={`traffic-${zone.id}`}
              coordinate={{
                latitude: zone.latitude,
                longitude: zone.longitude,
              }}
              title={zone.name}
              description={`Trafic ${zone.severity === 'high' ? 'dense' : 'modéré'}`}
            >
              <View style={[styles.trafficMarker, { 
                backgroundColor: zone.severity === 'high' ? '#DC143C' : '#FF8C00' 
              }]}>
                <Ionicons name="warning-outline" size={16} color="#FFF" />
              </View>
            </Marker>
          ))}

          {busLines.map((line) => (
            <Polyline
              key={`polyline-${line.id}`}
              coordinates={line.stops.map(stop => ({
                latitude: stop.latitude,
                longitude: stop.longitude,
              }))}
              strokeColor={line.color}
              strokeWidth={3}
              strokePattern={[5, 5]}
            />
          ))}
        </MapView>

        <View style={styles.mapLegend}>
          <Text style={styles.legendTitle}>Légende</Text>
          <View style={styles.legendItem}>
            <View style={[styles.legendMarkerBus, { backgroundColor: '#2E8B57' }]}>
              <Ionicons name="bus-outline" size={12} color="#FFF" />
            </View>
            <Text style={styles.legendText}>Arrêts de bus</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendMarkerStation, { backgroundColor: '#4169E1' }]}>
              <Ionicons name="location-outline" size={12} color="#FFF" />
            </View>
            <Text style={styles.legendText}>Gares communales</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendMarkerRouteStation, { backgroundColor: '#8A2BE2' }]}>
              <Ionicons name="train-outline" size={12} color="#FFF" />
            </View>
            <Text style={styles.legendText}>Gares routières</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendMarkerParking, { backgroundColor: '#228B22' }]}>
              <Ionicons name="car-outline" size={12} color="#FFF" />
            </View>
            <Text style={styles.legendText}>Parkings</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendMarkerTraffic, { backgroundColor: '#DC143C' }]}>
              <Ionicons name="warning-outline" size={12} color="#FFF" />
            </View>
            <Text style={styles.legendText}>Zones de trafic</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.myLocationButton}
          onPress={getCurrentLocation}
        >
          <Ionicons name="locate-outline" size={24} color="#2E8B57" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'bus': return renderBusContent();
      case 'stations': return renderStationsContent();
      case 'parking': return renderParkingContent();
      case 'traffic': return renderTrafficContent();
      case 'map': return renderMapContent();
      default: return renderBusContent();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E8B57" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mobilité - Bouaké</Text>
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={getCurrentLocation}
        >
          <Ionicons name="location-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, selectedTab === tab.id && styles.activeTab]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Ionicons 
              name={tab.icon} 
              size={20} 
              color={selectedTab === tab.id ? '#2E8B57' : '#7F8C8D'} 
            />
            <Text style={[styles.tabText, selectedTab === tab.id && styles.activeTabText]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedTab === 'map' ? (
        renderMapContent()
      ) : (
        <ScrollView style={styles.content}>
          {renderTabContent()}
        </ScrollView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedBusLine && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedBusLine.name}</Text>
                  <TouchableOpacity 
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close-outline" size={24} color="#2C3E50" />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.modalRoute}>{selectedBusLine.route}</Text>
                
                <Text style={styles.stopsTitle}>Arrêts</Text>
                {selectedBusLine.stops.map((stop, index) => (
                  <View key={index} style={styles.stopItem}>
                    <View style={[styles.stopIndicator, { backgroundColor: selectedBusLine.color }]} />
                    <Text style={styles.stopName}>{stop.name}</Text>
                  </View>
                ))}
                
                <View style={styles.modalFooter}>
                  <Text style={styles.modalInfo}>
                    Prochain bus: {selectedBusLine.nextArrival}
                  </Text>
                  <Text style={styles.modalInfo}>
                    Fréquence: {selectedBusLine.frequency}
                  </Text>
                  <Text style={styles.modalInfo}>
                    Statut: <Text style={{ 
                      color: selectedBusLine.status === 'En service' ? '#228B22' : '#FF6347',
                      fontWeight: 'bold'
                    }}>
                      {selectedBusLine.status}
                    </Text>
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={reservationModalVisible}
        onRequestClose={() => setReservationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedGare && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Réserver un ticket - {selectedGare.name}</Text>
                  <TouchableOpacity 
                    onPress={() => setReservationModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close-outline" size={24} color="#2C3E50" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalSubTitle}>Sélectionnez une destination</Text>
                <Picker
                  selectedValue={selectedDestination}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedDestination(itemValue)}
                >
                  <Picker.Item label="Choisir une destination" value="" />
                  {selectedGare.destinations.map((destination, index) => (
                    <Picker.Item key={index} label={`${destination} (${selectedGare.tarifs[destination]})`} value={destination} />
                  ))}
                </Picker>

                <Text style={styles.modalSubTitle}>Date de voyage</Text>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={travelDate}
                  onChangeText={setTravelDate}
                />

                <Text style={styles.modalSubTitle}>Nombre de passagers</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre de passagers"
                  keyboardType="numeric"
                  value={passengerCount.toString()}
                  onChangeText={(value) => setPassengerCount(parseInt(value) || 1)}
                />

                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirmReservation}
                >
                  <Text style={styles.confirmButtonText}>Confirmer la réservation</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={parkingModalVisible}
        onRequestClose={() => setParkingModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedParking && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Réserver une place - {selectedParking.name}</Text>
                  <TouchableOpacity 
                    onPress={() => setParkingModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close-outline" size={24} color="#2C3E50" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalSubTitle}>Durée de stationnement (heures)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre d'heures"
                  keyboardType="numeric"
                  value={parkingDuration}
                  onChangeText={(value) => setParkingDuration(value)}
                />

                <Text style={styles.modalSubTitle}>Coût estimé</Text>
                <Text style={styles.modalInfo}>
                  {parkingDuration && selectedParking.price !== 'Gratuit'
                    ? `${parseFloat(selectedParking.price.replace(' CFA/h', '')) * parseInt(parkingDuration)} CFA`
                    : 'Gratuit'}
                </Text>

                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirmParkingReservation}
                >
                  <Text style={styles.confirmButtonText}>Confirmer la réservation</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={paymentModalVisible}
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Paiement</Text>
              <TouchableOpacity 
                onPress={() => setPaymentModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close-outline" size={24} color="#2C3E50" />
              </TouchableOpacity>
            </View>

            {reservationDetails && (
              <>
                <Text style={styles.modalSubTitle}>Résumé de la réservation</Text>
                <Text style={styles.modalInfo}>Gare: {reservationDetails.gare}</Text>
                <Text style={styles.modalInfo}>Destination: {reservationDetails.destination}</Text>
                <Text style={styles.modalInfo}>Date: {reservationDetails.travelDate}</Text>
                <Text style={styles.modalInfo}>Passagers: {reservationDetails.passengerCount}</Text>
                <Text style={styles.modalInfo}>Total: {reservationDetails.totalPrice} CFA</Text>

                <Text style={styles.modalSubTitle}>Méthode de paiement</Text>
                <TouchableOpacity
                  style={styles.paymentButton}
                  onPress={handlePayment}
                >
                  <Text style={styles.paymentButtonText}>Payer avec Mobile Money</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#2E8B57',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  locationButton: {
    padding: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2E8B57',
  },
  tabText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  activeTabText: {
    color: '#2E8B57',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  fullScreenMapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fullScreenMap: {
    ...StyleSheet.absoluteFillObject,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    marginTop: 10,
  },
  refreshBtn: {
    padding: 8,
  },
  busCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  busCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  lineIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 15,
  },
  busInfo: {
    flex: 1,
  },
  busLineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  busRoute: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  busStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  nextArrival: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
  busCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  frequency: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  parkingCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  parkingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  parkingInfo: {
    flex: 1,
    marginLeft: 15,
  },
  parkingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  parkingAddress: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  parkingDistance: {
    fontSize: 12,
    color: '#2E8B57',
    fontWeight: 'bold',
  },
  parkingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  capacityInfo: {
    flex: 1,
  },
  availableSpaces: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 5,
  },
  availabilityBar: {
    height: 4,
    borderRadius: 2,
    flex: 1,
  },
  parkingPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  trafficOverall: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  trafficStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#228B22',
    marginTop: 10,
  },
  trafficTime: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 5,
  },
  alertsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  alertCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertLocation: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: 10,
  },
  alertSeverity: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  alertDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  alertDelay: {
    fontSize: 12,
    color: '#DC143C',
    fontWeight: 'bold',
  },
  subTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 5,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  subTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeSubTab: {
    backgroundColor: '#E8F5E9',
  },
  subTabText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 5,
  },
  activeSubTabText: {
    color: '#2E8B57',
    fontWeight: 'bold',
  },
  stationCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  stationInfo: {
    flex: 1,
    marginLeft: 15,
  },
  stationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  stationLocation: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  stationAddress: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
    fontStyle: 'italic',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: 'bold',
  },
  stationDetails: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 8,
  },
  servicesContainer: {
    marginTop: 10,
  },
  servicesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  servicesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceTag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  serviceTagText: {
    fontSize: 12,
    color: '#2E8B57',
  },
  destinationsContainer: {
    marginTop: 10,
  },
  destinationsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  destinationsText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  tarifsContainer: {
    marginTop: 5,
  },
  tarifRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  destinationText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  tarifText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  companyBadge: {
    fontSize: 12,
    color: '#4169E1',
    backgroundColor: '#E6E6FA',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 2,
    marginBottom: 2,
  },
  reserveButton: {
    backgroundColor: '#2E8B57',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  reserveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#7F8C8D',
  },
  mapContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
    minHeight: 400,
  },
  busMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  stationMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4169E1',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  routeStationMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8A2BE2',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  parkingMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  trafficMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  mapLegend: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendMarkerBus: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  legendMarkerStation: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#4169E1',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  legendMarkerRouteStation: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#8A2BE2',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  legendMarkerParking: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  legendMarkerTraffic: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  legendText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 15,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#2E8B57',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  closeButton: {
    padding: 5,
  },
  modalRoute: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 20,
  },
  stopsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  stopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stopIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 15,
  },
  stopName: {
    fontSize: 14,
    color: '#2C3E50',
  },
  modalFooter: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  modalInfo: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  modalSubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 15,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: '#2E8B57',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: '#4169E1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  paymentButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  myLocationButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default MobilityScreen;