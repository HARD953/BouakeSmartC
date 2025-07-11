import React, { useState } from 'react';
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
  Modal,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HotelsModule = ({ navigation }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Catégories d'hôtels
  const categories = [
    { id: 'all', label: 'Tous', icon: 'business-outline', color: '#4169E1' },
    { id: 'luxury', label: 'Luxe', icon: 'diamond-outline', color: '#FFD700' },
    { id: 'business', label: 'Affaires', icon: 'briefcase-outline', color: '#2E8B57' },
    { id: 'budget', label: 'Budget', icon: 'wallet-outline', color: '#FF8C00' },
    { id: 'resort', label: 'Resort', icon: 'sunny-outline', color: '#FF6B6B' },
  ];

  // Données d'exemple d'hôtels
  const hotels = [
    {
      id: 1,
      category: 'luxury',
      name: 'Hôtel Président',
      rating: 4.8,
      reviews: 156,
      price: 45000,
      originalPrice: 50000,
      priceUnit: 'FCFA/nuit',
      location: 'Centre-ville, Bouaké',
      distance: '0.5 km du centre',
      amenities: ['WiFi gratuit', 'Piscine', 'Spa', 'Restaurant', 'Parking'],
      images: 8,
      description: 'Hôtel de luxe au cœur de Bouaké avec service 5 étoiles',
      available: true,
      isFavorite: false,
      checkIn: '14:00',
      checkOut: '12:00',
      phone: '+225 27 31 XX XX XX',
      features: ['Climatisation', 'Room Service', 'Blanchisserie', 'Coffre-fort'],
      roomTypes: ['Chambre Standard', 'Suite Junior', 'Suite Présidentielle']
    },
    {
      id: 2,
      category: 'business',
      name: 'Best Western Bouaké',
      rating: 4.5,
      reviews: 89,
      price: 35000,
      originalPrice: 35000,
      priceUnit: 'FCFA/nuit',
      location: 'Quartier Administratif, Bouaké',
      distance: '1.2 km du centre',
      amenities: ['WiFi gratuit', 'Salle de conférence', 'Fitness', 'Restaurant'],
      images: 5,
      description: 'Hôtel moderne idéal pour les voyages d\'affaires',
      available: true,
      isFavorite: true,
      checkIn: '15:00',
      checkOut: '11:00',
      phone: '+225 27 31 XX XX XX',
      features: ['Bureau', 'Climatisation', 'Minibar', 'Coffre-fort'],
      roomTypes: ['Chambre Business', 'Suite Executive']
    },
    {
      id: 3,
      category: 'budget',
      name: 'Hôtel La Paix',
      rating: 4.2,
      reviews: 234,
      price: 18000,
      originalPrice: 20000,
      priceUnit: 'FCFA/nuit',
      location: 'Quartier Commerce, Bouaké',
      distance: '0.8 km du centre',
      amenities: ['WiFi gratuit', 'Restaurant', 'Parking', 'Réception 24h'],
      images: 3,
      description: 'Hôtel abordable avec excellent rapport qualité-prix',
      available: true,
      isFavorite: false,
      checkIn: '14:00',
      checkOut: '12:00',
      phone: '+225 05 XX XX XX XX',
      features: ['Climatisation', 'TV satellite', 'Salle de bain privée'],
      roomTypes: ['Chambre Standard', 'Chambre Familiale']
    },
    {
      id: 4,
      category: 'resort',
      name: 'Resort Lac aux Caïmans',
      rating: 4.6,
      reviews: 67,
      price: 55000,
      originalPrice: 60000,
      priceUnit: 'FCFA/nuit',
      location: 'Lac aux Caïmans, Yamoussoukro',
      distance: '45 km de Bouaké',
      amenities: ['Piscine', 'Plage privée', 'Spa', 'Restaurant', 'Bar', 'Sports nautiques'],
      images: 12,
      description: 'Resort de luxe au bord du lac avec activités nautiques',
      available: true,
      isFavorite: false,
      checkIn: '15:00',
      checkOut: '11:00',
      phone: '+225 27 30 XX XX XX',
      features: ['Vue lac', 'Balcon', 'Minibar', 'Room Service', 'Climatisation'],
      roomTypes: ['Chambre Vue Lac', 'Bungalow', 'Suite Royale']
    },
    {
      id: 5,
      category: 'luxury',
      name: 'Hôtel Tiama',
      rating: 4.7,
      reviews: 98,
      price: 42000,
      originalPrice: 45000,
      priceUnit: 'FCFA/nuit',
      location: 'Plateau, Abidjan',
      distance: '190 km de Bouaké',
      amenities: ['Piscine', 'Spa', 'Fitness', 'Restaurant', 'Bar', 'Parking'],
      images: 10,
      description: 'Hôtel prestigieux dans le quartier des affaires d\'Abidjan',
      available: false,
      isFavorite: true,
      checkIn: '14:00',
      checkOut: '12:00',
      phone: '+225 27 20 XX XX XX',
      features: ['Vue ville', 'Climatisation', 'Minibar', 'Coffre-fort', 'Room Service'],
      roomTypes: ['Chambre Deluxe', 'Suite Executive', 'Suite Présidentielle']
    }
  ];

  // Services hôteliers
  const hotelServices = [
    {
      id: 'booking',
      title: 'Réservation groupée',
      icon: 'people-outline',
      color: '#4169E1',
      description: 'Réservez pour plusieurs personnes'
    },
    {
      id: 'transport',
      title: 'Transfert aéroport',
      icon: 'car-outline',
      color: '#228B22',
      description: 'Service de navette inclus'
    },
    {
      id: 'events',
      title: 'Événements',
      icon: 'calendar-outline',
      color: '#FF8C00',
      description: 'Séminaires et conférences'
    },
    {
      id: 'packages',
      title: 'Packages',
      icon: 'gift-outline',
      color: '#9932CC',
      description: 'Offres spéciales combinées'
    }
  ];

  const formatPrice = (price) => {
    return price.toLocaleString('fr-FR');
  };

  const handleHotelPress = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleBooking = (hotel) => {
    if (!hotel.available) {
      Alert.alert('Non disponible', 'Cet hôtel est complet pour les dates sélectionnées.');
      return;
    }
    
    Alert.alert(
      'Réservation',
      `Réserver ${hotel.name} ?\n\nPrix: ${formatPrice(hotel.price)} ${hotel.priceUnit}\nGuest(s): ${guests}`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Contacter', onPress: () => Alert.alert('Contact', `Appel vers ${hotel.phone}`) },
        { text: 'Réserver', onPress: () => Alert.alert('Réservation', 'Redirection vers le système de réservation') }
      ]
    );
  };

  const handleServicePress = (service) => {
    Alert.alert(
      service.title,
      `${service.description}\n\nCe service sera bientôt disponible.`,
      [
        { text: 'Fermer', style: 'cancel' },
        { text: 'Plus d\'infos', onPress: () => Alert.alert('Information', 'Contactez-nous pour plus de détails') }
      ]
    );
  };

  const toggleFavorite = (hotelId) => {
    Alert.alert('Favoris', 'Hôtel ajouté/retiré des favoris');
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || hotel.category === activeFilter;
    const matchesFavorites = !showFavorites || hotel.isFavorite;
    
    return matchesSearch && matchesFilter && matchesFavorites;
  });

  const renderHotelCard = (hotel) => (
    <TouchableOpacity
      key={hotel.id}
      style={styles.hotelCard}
      onPress={() => handleHotelPress(hotel)}
      activeOpacity={0.8}
    >
      {/* Image et badges */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="business" size={24} color="#7F8C8D" />
        </View>
        <View style={styles.imageOverlay}>
          <View style={styles.imageCount}>
            <Ionicons name="camera" size={12} color="#FFF" />
            <Text style={styles.imageCountText}>{hotel.images}</Text>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite(hotel.id);
            }}
          >
            <Ionicons 
              name={hotel.isFavorite ? "heart" : "heart-outline"} 
              size={16} 
              color={hotel.isFavorite ? "#DC143C" : "#FFF"} 
            />
          </TouchableOpacity>
        </View>
        {hotel.originalPrice > hotel.price && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -{Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)}%
            </Text>
          </View>
        )}
      </View>

      {/* Informations hôtel */}
      <View style={styles.hotelInfo}>
        <View style={styles.hotelHeader}>
          <Text style={styles.hotelName} numberOfLines={1}>{hotel.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{hotel.rating}</Text>
            <Text style={styles.reviewsText}>({hotel.reviews})</Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color="#7F8C8D" />
          <Text style={styles.locationText}>{hotel.location}</Text>
        </View>

        <View style={styles.distanceContainer}>
          <Ionicons name="walk-outline" size={14} color="#7F8C8D" />
          <Text style={styles.distanceText}>{hotel.distance}</Text>
        </View>

        <View style={styles.amenitiesContainer}>
          {hotel.amenities.slice(0, 4).map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
          {hotel.amenities.length > 4 && (
            <View style={styles.amenityTag}>
              <Text style={styles.amenityText}>+{hotel.amenities.length - 4}</Text>
            </View>
          )}
        </View>

        <View style={styles.hotelFooter}>
          <View style={styles.priceContainer}>
            {hotel.originalPrice > hotel.price && (
              <Text style={styles.originalPrice}>
                {formatPrice(hotel.originalPrice)} FCFA
              </Text>
            )}
            <Text style={styles.hotelPrice}>{formatPrice(hotel.price)} FCFA</Text>
            <Text style={styles.priceUnit}>par nuit</Text>
          </View>
          <View style={styles.availabilityContainer}>
            <View style={[styles.statusDot, { backgroundColor: hotel.available ? '#00FF7F' : '#FF6B6B' }]} />
            <Text style={styles.availabilityText}>
              {hotel.available ? 'Disponible' : 'Complet'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderServiceCard = (service) => (
    <TouchableOpacity
      key={service.id}
      style={styles.serviceCard}
      onPress={() => handleServicePress(service)}
      activeOpacity={0.8}
    >
      <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
        <Ionicons name={service.icon} size={20} color="#FFF" />
      </View>
      <View style={styles.serviceContent}>
        <Text style={styles.serviceTitle}>{service.title}</Text>
        <Text style={styles.serviceDescription}>{service.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#7F8C8D" />
    </TouchableOpacity>
  );

  const renderHotelModal = () => (
    <Modal
      visible={selectedHotel !== null}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setSelectedHotel(null)}>
            <Ionicons name="close" size={24} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Détails de l'hôtel</Text>
          <TouchableOpacity onPress={() => toggleFavorite(selectedHotel?.id)}>
            <Ionicons 
              name={selectedHotel?.isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={selectedHotel?.isFavorite ? "#DC143C" : "#2C3E50"} 
            />
          </TouchableOpacity>
        </View>

        {selectedHotel && (
          <ScrollView style={styles.modalContent}>
            <View style={styles.modalImageContainer}>
              <View style={styles.modalImagePlaceholder}>
                <Ionicons name="business" size={48} color="#7F8C8D" />
              </View>
            </View>

            <View style={styles.modalInfo}>
              <Text style={styles.modalHotelName}>{selectedHotel.name}</Text>
              <View style={styles.modalRating}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.modalRatingText}>{selectedHotel.rating}</Text>
                <Text style={styles.modalReviews}>({selectedHotel.reviews} avis)</Text>
              </View>

              <View style={styles.modalLocation}>
                <Ionicons name="location" size={16} color="#FF8C00" />
                <Text style={styles.modalLocationText}>{selectedHotel.location}</Text>
              </View>

              <Text style={styles.modalDescription}>{selectedHotel.description}</Text>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Équipements</Text>
                <View style={styles.modalAmenities}>
                  {selectedHotel.amenities.map((amenity, index) => (
                    <View key={index} style={styles.modalAmenityItem}>
                      <Ionicons name="checkmark-circle" size={16} color="#00FF7F" />
                      <Text style={styles.modalAmenityText}>{amenity}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Types de chambres</Text>
                {selectedHotel.roomTypes.map((roomType, index) => (
                  <View key={index} style={styles.modalRoomType}>
                    <Ionicons name="bed" size={16} color="#7F8C8D" />
                    <Text style={styles.modalRoomTypeText}>{roomType}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Informations pratiques</Text>
                <View style={styles.modalPracticalInfo}>
                  <View style={styles.modalInfoItem}>
                    <Ionicons name="time" size={16} color="#7F8C8D" />
                    <Text style={styles.modalInfoText}>Check-in: {selectedHotel.checkIn}</Text>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Ionicons name="time" size={16} color="#7F8C8D" />
                    <Text style={styles.modalInfoText}>Check-out: {selectedHotel.checkOut}</Text>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Ionicons name="call" size={16} color="#7F8C8D" />
                    <Text style={styles.modalInfoText}>{selectedHotel.phone}</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        )}

        <View style={styles.modalFooter}>
          <View style={styles.modalPriceContainer}>
            <Text style={styles.modalPrice}>
              {formatPrice(selectedHotel?.price || 0)} FCFA
            </Text>
            <Text style={styles.modalPriceUnit}>par nuit</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.bookButton,
              !selectedHotel?.available && styles.bookButtonDisabled
            ]}
            onPress={() => handleBooking(selectedHotel)}
            disabled={!selectedHotel?.available}
          >
            <Text style={styles.bookButtonText}>
              {selectedHotel?.available ? 'Réserver' : 'Complet'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF8C00" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🏨 Hôtels</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => setShowFavorites(!showFavorites)}
            >
              <Ionicons 
                name={showFavorites ? "heart" : "heart-outline"} 
                size={20} 
                color="#FFF" 
              />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#7F8C8D" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un hôtel..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#BDC3C7"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#7F8C8D" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filtres de recherche */}
        <View style={styles.searchFilters}>
          <TouchableOpacity style={styles.dateFilter}>
            <Ionicons name="calendar-outline" size={16} color="#7F8C8D" />
            <Text style={styles.dateFilterText}>Dates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.guestFilter}>
            <Ionicons name="people-outline" size={16} color="#7F8C8D" />
            <Text style={styles.guestFilterText}>{guests} invité{guests > 1 ? 's' : ''}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filtres de catégorie */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.filterButton,
                activeFilter === category.id && styles.filterButtonActive
              ]}
              onPress={() => setActiveFilter(category.id)}
            >
              <Ionicons 
                name={category.icon} 
                size={16} 
                color={activeFilter === category.id ? '#FFF' : category.color} 
              />
              <Text style={[
                styles.filterText,
                activeFilter === category.id && styles.filterTextActive
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Statistiques */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{filteredHotels.length}</Text>
            <Text style={styles.statLabel}>Hôtels</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>18K-55K</Text>
            <Text style={styles.statLabel}>Prix/nuit</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.5★</Text>
            <Text style={styles.statLabel}>Note moy.</Text>
          </View>
        </View>

        {/* Services */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Services hôteliers</Text>
          <View style={styles.servicesGrid}>
            {hotelServices.map(renderServiceCard)}
          </View>
        </View>

        {/* Hôtels */}
        <View style={styles.hotelsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {showFavorites ? 'Mes hôtels favoris' : 'Hôtels disponibles'}
            </Text>
            <Text style={styles.resultCount}>
              {filteredHotels.length} résultat{filteredHotels.length > 1 ? 's' : ''}
            </Text>
          </View>
          
          {filteredHotels.length > 0 ? (
            <View style={styles.hotelsGrid}>
              {filteredHotels.map(renderHotelCard)}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="business-outline" size={48} color="#BDC3C7" />
              <Text style={styles.emptyStateText}>
                {showFavorites ? 'Aucun hôtel favori' : 'Aucun hôtel trouvé'}
              </Text>
              <Text style={styles.emptyStateSubtext}>
                {showFavorites ? 'Ajoutez des hôtels à vos favoris' : 'Essayez de modifier vos critères'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal détails hôtel */}
      {renderHotelModal()}
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
    backgroundColor: '#4169E1',
    paddingHorizontal: 20,
    paddingBottom: 20,
    elevation: 4,
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
    paddingTop: 10,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 4,
  },
  
  // Recherche
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  clearButton: {
    padding: 4,
  },
  searchFilters: {
    flexDirection: 'row',
    gap: 12,
  },
  dateFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
  },
  dateFilterText: {
    color: '#FFF',
    marginLeft: 8,
    fontSize: 14,
  },
  guestFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  guestFilterText: {
    color: '#FFF',
    marginLeft: 8,
    fontSize: 14,
  },

  // Filtres
  filtersContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  filtersScroll: {
    paddingHorizontal: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  filterButtonActive: {
    backgroundColor: '#FF8C00',
    borderColor: '#FF8C00',
  },
  filterText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 6,
  },
  filterTextActive: {
    color: '#FFF',
  },

  // Contenu
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  // Statistiques
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
  },

  // Services
  servicesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  servicesGrid: {
    gap: 8,
  },
  serviceCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },

  // Hôtels
  hotelsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultCount: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  hotelsGrid: {
    gap: 16,
  },
  hotelCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 160,
    position: 'relative',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#E9ECEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  imageCountText: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 4,
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#DC143C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  hotelInfo: {
    padding: 16,
  },
  hotelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 10,
    color: '#BDC3C7',
    marginLeft: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  distanceText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 4,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 6,
  },
  amenityTag: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  amenityText: {
    fontSize: 10,
    color: '#7F8C8D',
  },
  hotelFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  originalPrice: {
    fontSize: 12,
    color: '#BDC3C7',
    textDecorationLine: 'line-through',
  },
  hotelPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  priceUnit: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  availabilityText: {
    fontSize: 12,
    color: '#7F8C8D',
  },

  // État vide
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#BDC3C7',
    marginTop: 8,
    textAlign: 'center',
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  modalContent: {
    flex: 1,
  },
  modalImageContainer: {
    height: 200,
    backgroundColor: '#E9ECEF',
  },
  modalImagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInfo: {
    padding: 20,
  },
  modalHotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  modalRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalRatingText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginLeft: 8,
  },
  modalReviews: {
    fontSize: 14,
    color: '#BDC3C7',
    marginLeft: 4,
  },
  modalLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalLocationText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginLeft: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  modalAmenities: {
    gap: 8,
  },
  modalAmenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalAmenityText: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 12,
  },
  modalRoomType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalRoomTypeText: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 12,
  },
  modalPracticalInfo: {
    gap: 8,
  },
  modalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalInfoText: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 12,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  modalPriceContainer: {
    flex: 1,
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  modalPriceUnit: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  bookButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#BDC3C7',
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HotelsModule;