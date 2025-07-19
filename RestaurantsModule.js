import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
  Modal,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RestaurantsModule = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    phone: '',
    specialRequests: ''
  });

  const categories = [
    { id: 'all', name: 'Tous', icon: 'restaurant-outline' },
    { id: 'ivoirien', name: 'Ivoirien', icon: 'leaf-outline' },
    { id: 'francais', name: 'Français', icon: 'wine-outline' },
    { id: 'libanais', name: 'Libanais', icon: 'pizza-outline' },
    { id: 'chinois', name: 'Chinois', icon: 'fish-outline' },
    { id: 'fast-food', name: 'Fast Food', icon: 'fast-food-outline' },
    { id: 'vegetarien', name: 'Végétarien', icon: 'nutrition-outline' }
  ];

  const restaurants = [
    {
      id: 1,
      name: 'Le Baobab',
      category: 'ivoirien',
      rating: 4.8,
      reviews: 156,
      price: '$$',
      image: 'https://via.placeholder.com/300x200/4169E1/FFFFFF?text=Le+Baobab',
      cuisine: 'Cuisine Ivoirienne Traditionnelle',
      address: 'Quartier Commerce, Bouaké',
      phone: '+225 07 XX XX XX XX',
      openingHours: '11h00 - 23h00',
      description: 'Restaurant traditionnel proposant les meilleurs plats ivoiriens dans une ambiance chaleureuse.',
      specialties: ['Attiéké Poisson', 'Kedjenou', 'Alloco', 'Bangui'],
      amenities: ['Wifi', 'Parking', 'Terrasse', 'Climatisation'],
      distance: '0.8 km',
      deliveryTime: '25-35 min',
      isOpen: true,
      hasDelivery: true,
      hasReservation: true
    },
    {
      id: 2,
      name: 'Chez Tante Marie',
      category: 'ivoirien',
      rating: 4.6,
      reviews: 89,
      price: '$',
      image: 'https://via.placeholder.com/300x200/228B22/FFFFFF?text=Chez+Tante+Marie',
      cuisine: 'Cuisine Locale & Maquis',
      address: 'Quartier Broukro, Bouaké',
      phone: '+225 07 XX XX XX XX',
      openingHours: '10h00 - 22h00',
      description: 'Maquis familial réputé pour ses grillades et plats locaux authentiques.',
      specialties: ['Poisson Braisé', 'Poulet DG', 'Garba', 'Foutou'],
      amenities: ['Parking', 'Terrasse', 'Musique Live'],
      distance: '1.2 km',
      deliveryTime: '20-30 min',
      isOpen: true,
      hasDelivery: true,
      hasReservation: false
    },
    {
      id: 3,
      name: 'La Brasserie Française',
      category: 'francais',
      rating: 4.7,
      reviews: 203,
      price: '$$$',
      image: 'https://via.placeholder.com/300x200/DC143C/FFFFFF?text=La+Brasserie',
      cuisine: 'Cuisine Française',
      address: 'Centre-ville, Bouaké',
      phone: '+225 07 XX XX XX XX',
      openingHours: '12h00 - 14h30, 19h00 - 23h00',
      description: 'Restaurant français élégant proposant une cuisine raffinée et une carte des vins sélectionnée.',
      specialties: ['Coq au Vin', 'Bouillabaisse', 'Ratatouille', 'Tarte Tatin'],
      amenities: ['Wifi', 'Parking', 'Bar', 'Climatisation', 'Service Voiturier'],
      distance: '0.5 km',
      deliveryTime: '30-45 min',
      isOpen: true,
      hasDelivery: false,
      hasReservation: true
    },
    {
      id: 4,
      name: 'Dragon d\'Or',
      category: 'chinois',
      rating: 4.4,
      reviews: 124,
      price: '$$',
      image: 'https://via.placeholder.com/300x200/FFD700/000000?text=Dragon+d\'Or',
      cuisine: 'Cuisine Chinoise',
      address: 'Quartier Koko, Bouaké',
      phone: '+225 07 XX XX XX XX',
      openingHours: '11h30 - 15h00, 18h00 - 22h30',
      description: 'Restaurant chinois authentique avec un large choix de plats traditionnels.',
      specialties: ['Canard Laqué', 'Riz Cantonais', 'Nouilles Sautées', 'Dim Sum'],
      amenities: ['Wifi', 'Climatisation', 'Livraison'],
      distance: '1.8 km',
      deliveryTime: '35-45 min',
      isOpen: true,
      hasDelivery: true,
      hasReservation: true
    },
    {
      id: 5,
      name: 'Quick Bouaké',
      category: 'fast-food',
      rating: 4.2,
      reviews: 342,
      price: '$',
      image: 'https://via.placeholder.com/300x200/FF8C00/FFFFFF?text=Quick+Bouake',
      cuisine: 'Fast Food',
      address: 'Avenue Houphouët-Boigny, Bouaké',
      phone: '+225 07 XX XX XX XX',
      openingHours: '07h00 - 23h00',
      description: 'Fast-food moderne proposant burgers, pizzas et plats rapides de qualité.',
      specialties: ['Burger Baoulé', 'Pizza Margherita', 'Tacos', 'Shawarma'],
      amenities: ['Wifi', 'Drive', 'Livraison 24h/24'],
      distance: '0.3 km',
      deliveryTime: '15-25 min',
      isOpen: true,
      hasDelivery: true,
      hasReservation: false
    },
    {
      id: 6,
      name: 'Green Garden',
      category: 'vegetarien',
      rating: 4.5,
      reviews: 67,
      price: '$$',
      image: 'https://via.placeholder.com/300x200/228B22/FFFFFF?text=Green+Garden',
      cuisine: 'Végétarien & Bio',
      address: 'Quartier Résidentiel, Bouaké',
      phone: '+225 07 XX XX XX XX',
      openingHours: '09h00 - 21h00',
      description: 'Restaurant végétarien proposant des plats sains et biologiques.',
      specialties: ['Salade Buddha Bowl', 'Curry de Légumes', 'Quinoa Bowl', 'Smoothies'],
      amenities: ['Wifi', 'Terrasse', 'Jardin', 'Produits Bio'],
      distance: '2.1 km',
      deliveryTime: '25-35 min',
      isOpen: true,
      hasDelivery: true,
      hasReservation: true
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
    if (sortBy === 'price') return a.price.length - b.price.length;
    return 0;
  });

  const handleReservation = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowReservationModal(true);
  };

  const submitReservation = () => {
    if (!reservationData.name || !reservationData.phone || !reservationData.date || !reservationData.time) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    Alert.alert(
      'Réservation confirmée',
      `Votre réservation chez ${selectedRestaurant.name} pour ${reservationData.guests} personne(s) le ${reservationData.date} à ${reservationData.time} est confirmée.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowReservationModal(false);
            setReservationData({
              date: '',
              time: '',
              guests: '2',
              name: '',
              phone: '',
              specialRequests: ''
            });
          }
        }
      ]
    );
  };

  const renderRestaurantCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.restaurantCard}
      onPress={() => setSelectedRestaurant(item)}
    >
      <View style={styles.restaurantImageContainer}>
        <Image source={{ uri: item.image }} style={styles.restaurantImage} />
        <View style={styles.restaurantBadges}>
          {item.isOpen && (
            <View style={styles.openBadge}>
              <Text style={styles.openBadgeText}>Ouvert</Text>
            </View>
          )}
          {item.hasDelivery && (
            <View style={styles.deliveryBadge}>
              <Ionicons name="bicycle-outline" size={12} color="#FFF" />
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
        </View>
        
        <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
        
        <View style={styles.restaurantMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviews})</Text>
          </View>
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>
        
        <View style={styles.restaurantDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={12} color="#7F8C8D" />
            <Text style={styles.detailText}>{item.deliveryTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={12} color="#7F8C8D" />
            <Text style={styles.detailText}>{item.address.split(',')[0]}</Text>
          </View>
        </View>
        
        <View style={styles.restaurantActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('Appeler', `Appeler ${item.name} ?`)}
          >
            <Ionicons name="call-outline" size={16} color="#4169E1" />
            <Text style={styles.actionButtonText}>Appeler</Text>
          </TouchableOpacity>
          
          {item.hasReservation && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.primaryButton]}
              onPress={() => handleReservation(item)}
            >
              <Ionicons name="calendar-outline" size={16} color="#FFF" />
              <Text style={[styles.actionButtonText, styles.primaryButtonText]}>Réserver</Text>
            </TouchableOpacity>
          )}
          
          {item.hasDelivery && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => Alert.alert('Commande', 'Redirection vers la commande en ligne')}
            >
              <Ionicons name="bag-outline" size={16} color="#228B22" />
              <Text style={[styles.actionButtonText, { color: '#228B22' }]}>Commander</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurants</Text>
        <TouchableOpacity 
          onPress={() => setShowFilters(!showFilters)}
          style={styles.filterButton}
        >
          <Ionicons name="options-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#7F8C8D" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un restaurant..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#BDC3C7"
        />
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategory === category.id && styles.categoryItemActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Ionicons 
              name={category.icon} 
              size={20} 
              color={selectedCategory === category.id ? '#FFF' : '#7F8C8D'} 
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.categoryTextActive
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersTitle}>Trier par:</Text>
          <View style={styles.sortOptions}>
            {[
              { id: 'rating', label: 'Note', icon: 'star-outline' },
              { id: 'distance', label: 'Distance', icon: 'location-outline' },
              { id: 'price', label: 'Prix', icon: 'pricetag-outline' }
            ].map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.sortOption,
                  sortBy === option.id && styles.sortOptionActive
                ]}
                onPress={() => setSortBy(option.id)}
              >
                <Ionicons 
                  name={option.icon} 
                  size={16} 
                  color={sortBy === option.id ? '#4169E1' : '#7F8C8D'} 
                />
                <Text style={[
                  styles.sortOptionText,
                  sortBy === option.id && styles.sortOptionTextActive
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredRestaurants.length} restaurant{filteredRestaurants.length > 1 ? 's' : ''} trouvé{filteredRestaurants.length > 1 ? 's' : ''}
        </Text>
      </View>

      {/* Restaurants List */}
      <FlatList
        data={filteredRestaurants}
        renderItem={renderRestaurantCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.restaurantsList}
      />

      {/* Reservation Modal */}
      <Modal
        visible={showReservationModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowReservationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Réserver une table</Text>
              <TouchableOpacity onPress={() => setShowReservationModal(false)}>
                <Ionicons name="close" size={24} color="#7F8C8D" />
              </TouchableOpacity>
            </View>
            
            {selectedRestaurant && (
              <View style={styles.restaurantSummary}>
                <Text style={styles.restaurantSummaryName}>{selectedRestaurant.name}</Text>
                <Text style={styles.restaurantSummaryAddress}>{selectedRestaurant.address}</Text>
              </View>
            )}
            
            <ScrollView style={styles.modalForm}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Nom complet *</Text>
                <TextInput
                  style={styles.formInput}
                  value={reservationData.name}
                  onChangeText={(text) => setReservationData({...reservationData, name: text})}
                  placeholder="Votre nom"
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Téléphone *</Text>
                <TextInput
                  style={styles.formInput}
                  value={reservationData.phone}
                  onChangeText={(text) => setReservationData({...reservationData, phone: text})}
                  placeholder="+225 XX XX XX XX XX"
                  keyboardType="phone-pad"
                />
              </View>
              
              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Date *</Text>
                  <TextInput
                    style={styles.formInput}
                    value={reservationData.date}
                    onChangeText={(text) => setReservationData({...reservationData, date: text})}
                    placeholder="JJ/MM/AAAA"
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Heure *</Text>
                  <TextInput
                    style={styles.formInput}
                    value={reservationData.time}
                    onChangeText={(text) => setReservationData({...reservationData, time: text})}
                    placeholder="HH:MM"
                  />
                </View>
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Nombre de personnes</Text>
                <TextInput
                  style={styles.formInput}
                  value={reservationData.guests}
                  onChangeText={(text) => setReservationData({...reservationData, guests: text})}
                  keyboardType="numeric"
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Demandes spéciales</Text>
                <TextInput
                  style={[styles.formInput, styles.textArea]}
                  value={reservationData.specialRequests}
                  onChangeText={(text) => setReservationData({...reservationData, specialRequests: text})}
                  placeholder="Allergies, préférences de table, etc."
                  multiline
                  numberOfLines={3}
                />
              </View>
            </ScrollView>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowReservationModal(false)}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={submitReservation}
              >
                <Text style={styles.confirmButtonText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
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
  
  // Header
  header: {
    backgroundColor: '#DC143C',
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
    marginVertical: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  
  // Categories
  categoriesContainer: {
    flexGrow: 1,
    marginBottom: 16,
    height: 60, // hauteur fixe pour éviter les sauts
  },
  categoriesContent: {
    paddingRight: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    height: 40, // hauteur fixe
  },
  categoryItemActive: {
    backgroundColor: '#DC143C',
  },
  categoryText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 8,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFF',
  },
  
  // Filters
  filtersContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  sortOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  sortOptionActive: {
    backgroundColor: '#E8EFFF',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 6,
  },
  sortOptionTextActive: {
    color: '#4169E1',
    fontWeight: '500',
  },
  
  // Results
  resultsContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  
  // Restaurant Cards
  restaurantsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  restaurantCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  restaurantImageContainer: {
    position: 'relative',
    height: 180,
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  restaurantBadges: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
  },
  openBadge: {
    backgroundColor: '#228B22',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  openBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  deliveryBadge: {
    backgroundColor: '#4169E1',
    padding: 6,
    borderRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 16,
  },
  restaurantInfo: {
    padding: 16,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  priceContainer: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#228B22',
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  restaurantDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 4,
  },
  restaurantActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F8F9FA',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8EFFF',
    backgroundColor: '#F8F9FA',
  },
  primaryButton: {
    backgroundColor: '#4169E1',
    borderColor: '#4169E1',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#4169E1',
    marginLeft: 4,
    fontWeight: '500',
  },
  primaryButtonText: {
    color: '#FFF',
  },
  
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  restaurantSummary: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
  },
  restaurantSummaryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  restaurantSummaryAddress: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  modalForm: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#E8EFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2C3E50',
    backgroundColor: '#FFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F8F9FA',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8EFFF',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#4169E1',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
});

export default RestaurantsModule;