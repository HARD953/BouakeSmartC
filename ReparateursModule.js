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
  Modal,
  FlatList,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReparateursModule = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReparateur, setSelectedReparateur] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Catégories de réparateurs
  const categories = [
    { id: 'all', name: 'Tout', icon: 'grid-outline', color: '#4169E1' },
    { id: 'electronics', name: 'Électronique', icon: 'phone-portrait-outline', color: '#FF8C00' },
    { id: 'appliances', name: 'Électroménager', icon: 'home-outline', color: '#228B22' },
    { id: 'automotive', name: 'Automobile', icon: 'car-outline', color: '#DC143C' },
    { id: 'plumbing', name: 'Plomberie', icon: 'water-outline', color: '#4682B4' },
    { id: 'electrical', name: 'Électricité', icon: 'flash-outline', color: '#FFD700' },
    { id: 'construction', name: 'Construction', icon: 'hammer-outline', color: '#708090' },
    { id: 'clothing', name: 'Couture', icon: 'shirt-outline', color: '#9932CC' },
    { id: 'shoes', name: 'Cordonnerie', icon: 'footsteps-outline', color: '#8B4513' }
  ];

  // Base de données des réparateurs
  const reparateurs = [
    {
      id: 1,
      name: 'Atelier Électro Services',
      category: 'electronics',
      specialties: ['Téléphones', 'Ordinateurs', 'Télévisions'],
      address: 'Quartier Commerce, Rue des Artisans',
      phone: '+225 07 12 34 56 78',
      whatsapp: '+225 07 12 34 56 78',
      rating: 4.8,
      reviews: 127,
      verified: true,
      openTime: '08:00 - 18:00',
      experience: '15 ans',
      description: 'Spécialiste en réparation de tous types d\'appareils électroniques. Service rapide et garanti.',
      services: [
        'Réparation téléphones mobiles',
        'Réparation ordinateurs portables',
        'Réparation télévisions',
        'Installation d\'antennes',
        'Récupération de données'
      ],
      images: ['atelier1.jpg', 'atelier2.jpg'],
      emergencyService: true,
      homeService: false
    },
    {
      id: 2,
      name: 'Garage Moderne Auto',
      category: 'automotive',
      specialties: ['Mécanique', 'Électricité auto', 'Climatisation'],
      address: 'Zone Industrielle, Boulevard de la Paix',
      phone: '+225 07 23 45 67 89',
      whatsapp: '+225 07 23 45 67 89',
      rating: 4.6,
      reviews: 89,
      verified: true,
      openTime: '07:00 - 17:00',
      experience: '20 ans',
      description: 'Garage spécialisé dans la réparation automobile toutes marques. Équipement moderne et personnel qualifié.',
      services: [
        'Réparation moteur',
        'Réparation boîte de vitesse',
        'Électricité automobile',
        'Climatisation auto',
        'Diagnostic électronique',
        'Révision générale'
      ],
      images: ['garage1.jpg', 'garage2.jpg'],
      emergencyService: true,
      homeService: true
    },
    {
      id: 3,
      name: 'Plomberie Express',
      category: 'plumbing',
      specialties: ['Plomberie', 'Sanitaire', 'Dépannage'],
      address: 'Quartier Résidentiel, Rue de la Fontaine',
      phone: '+225 07 34 56 78 90',
      whatsapp: '+225 07 34 56 78 90',
      rating: 4.9,
      reviews: 156,
      verified: true,
      openTime: '24h/24',
      experience: '12 ans',
      description: 'Service de plomberie 24h/24. Intervention rapide pour tous vos problèmes de plomberie.',
      services: [
        'Réparation fuites',
        'Débouchage canalisations',
        'Installation sanitaires',
        'Réparation chauffe-eau',
        'Dépannage urgence'
      ],
      images: ['plomberie1.jpg'],
      emergencyService: true,
      homeService: true
    },
    {
      id: 4,
      name: 'Électro Ménager Plus',
      category: 'appliances',
      specialties: ['Réfrigérateurs', 'Machines à laver', 'Climatiseurs'],
      address: 'Marché Central, Allée des Commerçants',
      phone: '+225 07 45 67 89 01',
      whatsapp: '+225 07 45 67 89 01',
      rating: 4.5,
      reviews: 73,
      verified: true,
      openTime: '08:00 - 17:00',
      experience: '10 ans',
      description: 'Réparation et maintenance de tous appareils électroménagers. Pièces détachées disponibles.',
      services: [
        'Réparation réfrigérateurs',
        'Réparation machines à laver',
        'Réparation climatiseurs',
        'Réparation micro-ondes',
        'Maintenance préventive'
      ],
      images: ['electromenager1.jpg'],
      emergencyService: false,
      homeService: true
    },
    {
      id: 5,
      name: 'Électricité Sécurisée',
      category: 'electrical',
      specialties: ['Installation électrique', 'Dépannage', 'Mise aux normes'],
      address: 'Quartier Nimbo, Avenue de l\'Indépendance',
      phone: '+225 07 56 78 90 12',
      whatsapp: '+225 07 56 78 90 12',
      rating: 4.7,
      reviews: 94,
      verified: true,
      openTime: '07:00 - 18:00',
      experience: '18 ans',
      description: 'Électricien professionnel agréé. Travaux d\'installation et de dépannage électrique.',
      services: [
        'Installation électrique complète',
        'Dépannage électrique',
        'Mise aux normes',
        'Installation éclairage',
        'Réparation tableaux électriques'
      ],
      images: ['electricite1.jpg'],
      emergencyService: true,
      homeService: true
    },
    {
      id: 6,
      name: 'Couture Moderne',
      category: 'clothing',
      specialties: ['Retouches', 'Réparations', 'Création'],
      address: 'Quartier Koko, Rue des Tisserands',
      phone: '+225 07 67 89 01 23',
      whatsapp: '+225 07 67 89 01 23',
      rating: 4.4,
      reviews: 45,
      verified: true,
      openTime: '09:00 - 17:00',
      experience: '8 ans',
      description: 'Atelier de couture spécialisé dans les retouches et réparations de vêtements.',
      services: [
        'Retouches vêtements',
        'Réparation fermetures éclair',
        'Réparation accrocs',
        'Ajustements taille',
        'Création sur mesure'
      ],
      images: ['couture1.jpg'],
      emergencyService: false,
      homeService: false
    }
  ];

  // Filtrer les réparateurs
  const filteredReparateurs = reparateurs.filter(reparateur => {
    const matchesCategory = selectedCategory === 'all' || reparateur.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      reparateur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reparateur.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Fonctions utilitaires
  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleWhatsApp = (phone) => {
    Linking.openURL(`whatsapp://send?phone=${phone}`);
  };

  const handleContact = (reparateur) => {
    setSelectedReparateur(reparateur);
    setShowContactModal(true);
  };

  const handleBooking = (reparateur) => {
    Alert.alert(
      'Réservation',
      `Souhaitez-vous réserver un service avec ${reparateur.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Appeler', onPress: () => handleCall(reparateur.phone) },
        { text: 'WhatsApp', onPress: () => handleWhatsApp(reparateur.whatsapp) }
      ]
    );
  };

  const renderReparateurCard = ({ item }) => (
    <TouchableOpacity
      style={styles.reparateurCard}
      onPress={() => {
        setSelectedReparateur(item);
        setShowDetailsModal(true);
      }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Text style={styles.reparateurName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviews}>({item.reviews} avis)</Text>
            {item.verified && (
              <Ionicons name="checkmark-circle" size={16} color="#228B22" style={styles.verifiedIcon} />
            )}
          </View>
        </View>
        <View style={styles.cardHeaderRight}>
          {item.emergencyService && (
            <View style={styles.emergencyBadge}>
              <Ionicons name="flash" size={12} color="#DC143C" />
              <Text style={styles.emergencyText}>Urgence</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.specialtiesContainer}>
        {item.specialties.map((specialty, index) => (
          <View key={index} style={styles.specialtyChip}>
            <Text style={styles.specialtyText}>{specialty}</Text>
          </View>
        ))}
      </View>

      <View style={styles.cardInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color="#7F8C8D" />
          <Text style={styles.address}>{item.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color="#7F8C8D" />
          <Text style={styles.openTime}>{item.openTime}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="ribbon-outline" size={16} color="#7F8C8D" />
          <Text style={styles.experience}>{item.experience} d'expérience</Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => handleContact(item)}
        >
          <Ionicons name="call-outline" size={16} color="#4169E1" />
          <Text style={styles.contactButtonText}>Contacter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => handleBooking(item)}
        >
          <Ionicons name="calendar-outline" size={16} color="#FFF" />
          <Text style={styles.bookButtonText}>Réserver</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryChip = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryChip,
        selectedCategory === category.id && styles.categoryChipActive
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Ionicons
        name={category.icon}
        size={16}
        color={selectedCategory === category.id ? '#FFF' : category.color}
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === category.id && styles.categoryTextActive
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Réparateurs</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#7F8C8D" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un réparateur ou service..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#BDC3C7"
        />
      </View>

      {/* Catégories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map(renderCategoryChip)}
      </ScrollView>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.resultsCount}>
          {filteredReparateurs.length} réparateur{filteredReparateurs.length > 1 ? 's' : ''} trouvé{filteredReparateurs.length > 1 ? 's' : ''}
        </Text>
        <TouchableOpacity style={styles.mapButton}>
          <Ionicons name="map-outline" size={16} color="#4169E1" />
          <Text style={styles.mapButtonText}>Voir sur la carte</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des réparateurs */}
      <FlatList
        data={filteredReparateurs}
        renderItem={renderReparateurCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal de détails */}
      <Modal
        visible={showDetailsModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        {selectedReparateur && (
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
                <Ionicons name="close" size={24} color="#2C3E50" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Détails du réparateur</Text>
              <View style={styles.modalHeaderRight} />
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.detailsHeader}>
                <Text style={styles.detailsName}>{selectedReparateur.name}</Text>
                <View style={styles.detailsRating}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.detailsRatingText}>{selectedReparateur.rating}</Text>
                  <Text style={styles.detailsReviews}>({selectedReparateur.reviews} avis)</Text>
                </View>
              </View>

              <Text style={styles.description}>{selectedReparateur.description}</Text>

              <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Services proposés</Text>
                {selectedReparateur.services.map((service, index) => (
                  <View key={index} style={styles.serviceItem}>
                    <Ionicons name="checkmark-circle-outline" size={16} color="#228B22" />
                    <Text style={styles.serviceText}>{service}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Informations pratiques</Text>
                <View style={styles.infoItem}>
                  <Ionicons name="location-outline" size={16} color="#7F8C8D" />
                  <Text style={styles.infoText}>{selectedReparateur.address}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="time-outline" size={16} color="#7F8C8D" />
                  <Text style={styles.infoText}>{selectedReparateur.openTime}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="call-outline" size={16} color="#7F8C8D" />
                  <Text style={styles.infoText}>{selectedReparateur.phone}</Text>
                </View>
              </View>

              <View style={styles.detailsActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleCall(selectedReparateur.phone)}
                >
                  <Ionicons name="call" size={20} color="#FFF" />
                  <Text style={styles.actionButtonText}>Appeler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.whatsappButton]}
                  onPress={() => handleWhatsApp(selectedReparateur.whatsapp)}
                >
                  <Ionicons name="logo-whatsapp" size={20} color="#FFF" />
                  <Text style={styles.actionButtonText}>WhatsApp</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>

      {/* Modal de contact */}
      <Modal
        visible={showContactModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.contactModalOverlay}>
          <View style={styles.contactModalContent}>
            <Text style={styles.contactModalTitle}>Contacter {selectedReparateur?.name}</Text>
            <Text style={styles.contactModalSubtitle}>Choisissez votre méthode de contact</Text>
            
            <TouchableOpacity
              style={styles.contactOption}
              onPress={() => {
                setShowContactModal(false);
                handleCall(selectedReparateur.phone);
              }}
            >
              <View style={styles.contactOptionIcon}>
                <Ionicons name="call" size={20} color="#4169E1" />
              </View>
              <View style={styles.contactOptionText}>
                <Text style={styles.contactOptionTitle}>Appel téléphonique</Text>
                <Text style={styles.contactOptionSubtitle}>{selectedReparateur?.phone}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactOption}
              onPress={() => {
                setShowContactModal(false);
                handleWhatsApp(selectedReparateur.whatsapp);
              }}
            >
              <View style={[styles.contactOptionIcon, styles.whatsappIcon]}>
                <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
              </View>
              <View style={styles.contactOptionText}>
                <Text style={styles.contactOptionTitle}>WhatsApp</Text>
                <Text style={styles.contactOptionSubtitle}>Message instantané</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowContactModal(false)}
            >
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
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
    backgroundColor: '#228B22',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 4,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  filterButton: {
    padding: 4,
  },

  // Recherche
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },

  // Catégories
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    elevation: 1,
  },
  categoryChipActive: {
    backgroundColor: '#228B22',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2C3E50',
    marginLeft: 4,
  },
  categoryTextActive: {
    color: '#FFF',
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapButtonText: {
    fontSize: 14,
    color: '#4169E1',
    marginLeft: 4,
    fontWeight: '500',
  },

  // Liste
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  // Cards des réparateurs
  reparateurCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  reparateurName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 4,
    fontWeight: '500',
  },
  reviews: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 4,
  },
  verifiedIcon: {
    marginLeft: 8,
  },
  cardHeaderRight: {
    alignItems: 'flex-end',
  },
  emergencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE8E8',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  emergencyText: {
    fontSize: 10,
    color: '#DC143C',
    fontWeight: '500',
    marginLeft: 4,
  },

  // Spécialités
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  specialtyChip: {
    backgroundColor: '#F0F4FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 12,
    color: '#4169E1',
    fontWeight: '500',
  },

  // Informations
  cardInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 8,
    flex: 1,
  },
  openTime: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 8,
  },
  experience: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 8,
  },

  // Actions
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  contactButtonText: {
    fontSize: 14,
    color: '#4169E1',
    fontWeight: '500',
    marginLeft: 4,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#228B22',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    justifyContent: 'center',
  },
  bookButtonText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
    marginLeft: 4,
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  modalHeaderRight: {
    width: 24,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Détails
  detailsHeader: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  detailsName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  detailsRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsRatingText: {
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 4,
    fontWeight: '500',
  },
  detailsReviews: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    paddingVertical: 16,
  },

  // Sections
  detailsSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 8,
  },

  // Actions détails
  detailsActions: {
    flexDirection: 'row',
    paddingVertical: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4169E1',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },

  // Modal de contact
  contactModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  contactModalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  contactModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4,
  },
  contactModalSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 24,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  contactOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  whatsappIcon: {
    backgroundColor: '#E8F5E8',
  },
  contactOptionText: {
    flex: 1,
  },
  contactOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  contactOptionSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  cancelButton: {
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#7F8C8D',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ReparateursModule;