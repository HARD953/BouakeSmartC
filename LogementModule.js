
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
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LogementModule = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);

  // Catégories de logement
  const categories = [
    { id: 'all', label: 'Tous', icon: 'home-outline', color: '#4169E1' },
    { id: 'appartement', label: 'Appartements', icon: 'business-outline', color: '#FF8C00' },
    { id: 'maison', label: 'Maisons', icon: 'home-outline', color: '#228B22' },
    { id: 'studio', label: 'Studios', icon: 'bed-outline', color: '#9932CC' },
    { id: 'terrain', label: 'Terrains', icon: 'map-outline', color: '#2E8B57' },
  ];

  // Données d'exemple de logements
  const logements = [
    {
      id: 1,
      type: 'appartement',
      title: 'Appartement 3 pièces - Résidence Paix',
      price: '85 000 FCFA/mois',
      location: 'Quartier Résidentiel, Bouaké',
      surface: '75 m²',
      rooms: 3,
      bathrooms: 2,
      features: ['Balcon', 'Parking', 'Climatisation'],
      rating: 4.5,
      images: 1,
      contact: '+225 07 XX XX XX XX',
      description: 'Bel appartement moderne dans résidence sécurisée avec gardien 24h/24',
      available: true,
      isFavorite: false
    },
    {
      id: 2,
      type: 'maison',
      title: 'Villa 4 chambres - Quartier Dar Es Salam',
      price: '120 000 FCFA/mois',
      location: 'Dar Es Salam, Bouaké',
      surface: '150 m²',
      rooms: 4,
      bathrooms: 3,
      features: ['Jardin', 'Garage', 'Piscine'],
      rating: 4.8,
      images: 3,
      contact: '+225 05 XX XX XX XX',
      description: 'Magnifique villa avec jardin et piscine, quartier calme et sécurisé',
      available: true,
      isFavorite: true
    },
    {
      id: 3,
      type: 'studio',
      title: 'Studio meublé - Centre-ville',
      price: '45 000 FCFA/mois',
      location: 'Centre-ville, Bouaké',
      surface: '35 m²',
      rooms: 1,
      bathrooms: 1,
      features: ['Meublé', 'WiFi', 'Cuisine équipée'],
      rating: 4.2,
      images: 2,
      contact: '+225 01 XX XX XX XX',
      description: 'Studio moderne entièrement meublé, idéal pour étudiant ou jeune professionnel',
      available: true,
      isFavorite: false
    },
    {
      id: 4,
      type: 'terrain',
      title: 'Terrain constructible - Zone industrielle',
      price: '2 500 000 FCFA',
      location: 'Zone industrielle, Bouaké',
      surface: '500 m²',
      rooms: 0,
      bathrooms: 0,
      features: ['Viabilisé', 'Titre foncier', 'Accès route'],
      rating: 4.0,
      images: 1,
      contact: '+225 09 XX XX XX XX',
      description: 'Terrain viabilisé avec titre foncier, idéal pour construction industrielle',
      available: true,
      isFavorite: false
    }
  ];

  // Services associés au logement
  const services = [
    {
      id: 'evaluation',
      title: 'Évaluation immobilière',
      icon: 'calculator-outline',
      color: '#4169E1',
      description: 'Estimation gratuite de votre bien'
    },
    {
      id: 'juridique',
      title: 'Conseils juridiques',
      icon: 'shield-checkmark-outline',
      color: '#228B22',
      description: 'Assistance pour vos démarches'
    },
    {
      id: 'financement',
      title: 'Aide au financement',
      icon: 'card-outline',
      color: '#FF8C00',
      description: 'Solutions de crédit immobilier'
    },
    {
      id: 'visite',
      title: 'Visite virtuelle',
      icon: 'eye-outline',
      color: '#9932CC',
      description: 'Visitez à distance'
    }
  ];

  const handleLogementPress = (logement) => {
    Alert.alert(
      logement.title,
      `${logement.description}\n\nPrix: ${logement.price}\nSurface: ${logement.surface}\nContact: ${logement.contact}`,
      [
        { text: 'Fermer', style: 'cancel' },
        { text: 'Contacter', onPress: () => Alert.alert('Contact', 'Redirection vers WhatsApp/Appel') },
        { text: 'Favoris', onPress: () => toggleFavorite(logement.id) }
      ]
    );
  };

  const handleServicePress = (service) => {
    Alert.alert(
      service.title,
      `${service.description}\n\nCe service sera bientôt disponible. Souhaitez-vous être notifié ?`,
      [
        { text: 'Plus tard', style: 'cancel' },
        { text: 'Me notifier', onPress: () => Alert.alert('Notification', 'Vous serez notifié du lancement de ce service') }
      ]
    );
  };

  const toggleFavorite = (logementId) => {
    Alert.alert('Favoris', 'Logement ajouté/retiré des favoris');
  };

  const filteredLogements = logements.filter(logement => {
    const matchesSearch = logement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         logement.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || logement.type === activeFilter;
    const matchesFavorites = !showFavorites || logement.isFavorite;
    
    return matchesSearch && matchesFilter && matchesFavorites;
  });

  const renderLogementCard = (logement) => (
    <TouchableOpacity
      key={logement.id}
      style={styles.logementCard}
      onPress={() => handleLogementPress(logement)}
      activeOpacity={0.8}
    >
      {/* Image placeholder */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="home" size={24} color="#7F8C8D" />
        </View>
        <View style={styles.imageOverlay}>
          <View style={styles.imageCount}>
            <Ionicons name="camera" size={12} color="#FFF" />
            <Text style={styles.imageCountText}>{logement.images}</Text>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite(logement.id);
            }}
          >
            <Ionicons 
              name={logement.isFavorite ? "heart" : "heart-outline"} 
              size={16} 
              color={logement.isFavorite ? "#DC143C" : "#FFF"} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Informations */}
      <View style={styles.logementInfo}>
        <View style={styles.logementHeader}>
          <Text style={styles.logementTitle} numberOfLines={2}>{logement.title}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{logement.rating}</Text>
          </View>
        </View>

        <View style={styles.logementLocation}>
          <Ionicons name="location-outline" size={14} color="#7F8C8D" />
          <Text style={styles.locationText}>{logement.location}</Text>
        </View>

        <View style={styles.logementDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="resize-outline" size={14} color="#7F8C8D" />
            <Text style={styles.detailText}>{logement.surface}</Text>
          </View>
          {logement.rooms > 0 && (
            <View style={styles.detailItem}>
              <Ionicons name="bed-outline" size={14} color="#7F8C8D" />
              <Text style={styles.detailText}>{logement.rooms} ch.</Text>
            </View>
          )}
          {logement.bathrooms > 0 && (
            <View style={styles.detailItem}>
              <Ionicons name="water-outline" size={14} color="#7F8C8D" />
              <Text style={styles.detailText}>{logement.bathrooms} sdb</Text>
            </View>
          )}
        </View>

        <View style={styles.featuresContainer}>
          {logement.features.slice(0, 3).map((feature, index) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.logementFooter}>
          <Text style={styles.logementPrice}>{logement.price}</Text>
          <View style={styles.availabilityBadge}>
            <View style={[styles.statusDot, { backgroundColor: logement.available ? '#00FF7F' : '#FF6B6B' }]} />
            <Text style={styles.availabilityText}>
              {logement.available ? 'Disponible' : 'Occupé'}
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF8C00" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🏘 Logement</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.filterButton}
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
            placeholder="Rechercher un logement..."
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
      </View>

      {/* Filtres */}
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
            <Text style={styles.statNumber}>{filteredLogements.length}</Text>
            <Text style={styles.statLabel}>Logements</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>45K-120K</Text>
            <Text style={styles.statLabel}>Prix/mois</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>96%</Text>
            <Text style={styles.statLabel}>Occupés</Text>
          </View>
        </View>

        {/* Services */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Services associés</Text>
          <View style={styles.servicesGrid}>
            {services.map(renderServiceCard)}
          </View>
        </View>

        {/* Logements disponibles */}
        <View style={styles.logementsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {showFavorites ? 'Mes favoris' : 'Logements disponibles'}
            </Text>
            <Text style={styles.resultCount}>
              {filteredLogements.length} résultat{filteredLogements.length > 1 ? 's' : ''}
            </Text>
          </View>
          
          {filteredLogements.length > 0 ? (
            <View style={styles.logementsGrid}>
              {filteredLogements.map(renderLogementCard)}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="home-outline" size={48} color="#BDC3C7" />
              <Text style={styles.emptyStateText}>
                {showFavorites ? 'Aucun favori pour le moment' : 'Aucun logement trouvé'}
              </Text>
              <Text style={styles.emptyStateSubtext}>
                {showFavorites ? 'Ajoutez des logements à vos favoris' : 'Essayez de modifier vos critères de recherche'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
    backgroundColor: '#FF8C00',
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
  filterButton: {
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

  // Logements
  logementsSection: {
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
  logementsGrid: {
    gap: 16,
  },
  logementCard: {
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
  logementInfo: {
    padding: 16,
  },
  logementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  logementTitle: {
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
  logementLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 4,
  },
  logementDetails: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
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
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 6,
  },
  featureTag: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featureText: {
    fontSize: 10,
    color: '#7F8C8D',
  },
  logementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logementPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  availabilityBadge: {
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
});

export default LogementModule;