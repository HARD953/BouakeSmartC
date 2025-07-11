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
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TravauxArtisansModule = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const categories = [
    { id: 'all', name: 'Tous', icon: 'grid-outline', color: '#4169E1' },
    { id: 'plomberie', name: 'Plomberie', icon: 'water-outline', color: '#2196F3' },
    { id: 'electricite', name: 'Électricité', icon: 'flash-outline', color: '#FF9800' },
    { id: 'maconnerie', name: 'Maçonnerie', icon: 'construct-outline', color: '#795548' },
    { id: 'menuiserie', name: 'Menuiserie', icon: 'hammer-outline', color: '#8BC34A' },
    { id: 'peinture', name: 'Peinture', icon: 'brush-outline', color: '#9C27B0' },
    { id: 'carrelage', name: 'Carrelage', icon: 'apps-outline', color: '#607D8B' },
    { id: 'jardinage', name: 'Jardinage', icon: 'leaf-outline', color: '#4CAF50' },
    { id: 'climatisation', name: 'Climatisation', icon: 'snow-outline', color: '#00BCD4' }
  ];

  const artisans = [
    {
      id: 1,
      name: 'Kouassi Jean-Baptiste',
      specialty: 'Plomberie',
      category: 'plomberie',
      rating: 4.8,
      reviewCount: 127,
      experience: '12 ans',
      phone: '+225 07 12 34 56 78',
      location: 'Dar-Es-Salam, Bouaké',
      services: ['Réparation canalisations', 'Installation sanitaire', 'Dépannage urgence'],
      price: '15 000 - 50 000 FCFA',
      available: true,
      image: null,
      description: 'Plombier expérimenté, intervention rapide 24h/24'
    },
    {
      id: 2,
      name: 'Diabaté Amadou',
      specialty: 'Électricité',
      category: 'electricite',
      rating: 4.9,
      reviewCount: 89,
      experience: '15 ans',
      phone: '+225 05 87 65 43 21',
      location: 'Broukro, Bouaké',
      services: ['Installation électrique', 'Réparation pannes', 'Mise aux normes'],
      price: '20 000 - 80 000 FCFA',
      available: true,
      image: null,
      description: 'Électricien certifié, travail soigné et garantie 2 ans'
    },
    {
      id: 3,
      name: 'Traoré Moussa',
      specialty: 'Maçonnerie',
      category: 'maconnerie',
      rating: 4.7,
      reviewCount: 156,
      experience: '20 ans',
      phone: '+225 01 23 45 67 89',
      location: 'Kennedy, Bouaké',
      services: ['Construction', 'Rénovation', 'Carrelage', 'Crépi'],
      price: '25 000 - 120 000 FCFA',
      available: false,
      image: null,
      description: 'Maçon professionnel, spécialiste construction et rénovation'
    },
    {
      id: 4,
      name: 'Koné Fatou',
      specialty: 'Menuiserie',
      category: 'menuiserie',
      rating: 4.6,
      reviewCount: 73,
      experience: '8 ans',
      phone: '+225 07 98 76 54 32',
      location: 'Ahougnassou, Bouaké',
      services: ['Portes & fenêtres', 'Meubles sur mesure', 'Réparation bois'],
      price: '30 000 - 200 000 FCFA',
      available: true,
      image: null,
      description: 'Menuisière talentueuse, créations sur mesure de qualité'
    },
    {
      id: 5,
      name: 'Yao Pierre',
      specialty: 'Peinture',
      category: 'peinture',
      rating: 4.5,
      reviewCount: 92,
      experience: '10 ans',
      phone: '+225 05 11 22 33 44',
      location: 'Assandé, Bouaké',
      services: ['Peinture intérieure', 'Peinture extérieure', 'Décoration'],
      price: '18 000 - 75 000 FCFA',
      available: true,
      image: null,
      description: 'Peintre décorateur, finitions soignées et conseils couleurs'
    },
    {
      id: 6,
      name: 'Ouattara Salif',
      specialty: 'Jardinage',
      category: 'jardinage',
      rating: 4.4,
      reviewCount: 64,
      experience: '6 ans',
      phone: '+225 07 55 66 77 88',
      location: 'Nimbo, Bouaké',
      services: ['Entretien jardins', 'Élagage', 'Plantation', 'Arrosage'],
      price: '12 000 - 45 000 FCFA',
      available: true,
      image: null,
      description: 'Jardinier passionné, entretien et création d\'espaces verts'
    }
  ];

  const filteredArtisans = artisans.filter(artisan => {
    const matchesSearch = artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artisan.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artisan.services.some(service => 
                           service.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    const matchesCategory = selectedCategory === 'all' || artisan.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactArtisan = (artisan) => {
    setSelectedArtisan(artisan);
    setShowContactModal(true);
  };

  const handleCallArtisan = (phone) => {
    Alert.alert(
      'Appeler l\'artisan',
      `Voulez-vous appeler ${phone} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Appeler', onPress: () => Alert.alert('Appel', 'Fonctionnalité d\'appel simulée') }
      ]
    );
  };

  const handleRequestQuote = (artisan) => {
    Alert.alert(
      'Demande de devis',
      `Demande de devis envoyée à ${artisan.name}. Vous serez contacté sous 24h.`,
      [{ text: 'OK' }]
    );
    setShowContactModal(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={12} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={12} color="#FFD700" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={12} color="#FFD700" />
      );
    }

    return stars;
  };

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        selectedCategory === category.id && styles.categoryCardActive,
        { backgroundColor: selectedCategory === category.id ? category.color : '#FFF' }
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Ionicons 
        name={category.icon} 
        size={20} 
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

  const renderArtisanCard = (artisan) => (
    <TouchableOpacity
      key={artisan.id}
      style={styles.artisanCard}
      onPress={() => handleContactArtisan(artisan)}
    >
      <View style={styles.artisanHeader}>
        <View style={styles.artisanAvatar}>
          <Text style={styles.artisanInitial}>
            {artisan.name.charAt(0)}
          </Text>
        </View>
        <View style={styles.artisanInfo}>
          <Text style={styles.artisanName}>{artisan.name}</Text>
          <Text style={styles.artisanSpecialty}>{artisan.specialty}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(artisan.rating)}
            </View>
            <Text style={styles.ratingText}>
              {artisan.rating} ({artisan.reviewCount} avis)
            </Text>
          </View>
        </View>
        <View style={styles.artisanStatus}>
          <View style={[
            styles.statusDot,
            { backgroundColor: artisan.available ? '#4CAF50' : '#F44336' }
          ]} />
          <Text style={[
            styles.statusText,
            { color: artisan.available ? '#4CAF50' : '#F44336' }
          ]}>
            {artisan.available ? 'Disponible' : 'Occupé'}
          </Text>
        </View>
      </View>

      <View style={styles.artisanDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={14} color="#7F8C8D" />
          <Text style={styles.detailText}>{artisan.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={14} color="#7F8C8D" />
          <Text style={styles.detailText}>{artisan.experience} d'expérience</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cash-outline" size={14} color="#7F8C8D" />
          <Text style={styles.detailText}>{artisan.price}</Text>
        </View>
      </View>

      <View style={styles.servicesContainer}>
        <Text style={styles.servicesTitle}>Services :</Text>
        <View style={styles.servicesTags}>
          {artisan.services.slice(0, 3).map((service, index) => (
            <View key={index} style={styles.serviceTag}>
              <Text style={styles.serviceTagText}>{service}</Text>
            </View>
          ))}
          {artisan.services.length > 3 && (
            <View style={styles.serviceTag}>
              <Text style={styles.serviceTagText}>+{artisan.services.length - 3}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.artisanActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleCallArtisan(artisan.phone)}
        >
          <Ionicons name="call-outline" size={16} color="#4169E1" />
          <Text style={styles.actionButtonText}>Appeler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.primaryButton]}
          onPress={() => handleRequestQuote(artisan)}
        >
          <Ionicons name="document-text-outline" size={16} color="#FFF" />
          <Text style={[styles.actionButtonText, styles.primaryButtonText]}>
            Devis
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Travaux & Artisans</Text>
        <TouchableOpacity
          onPress={() => setShowFilters(!showFilters)}
          style={styles.filterButton}
        >
          <Ionicons name="filter-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#7F8C8D" />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un artisan ou service..."
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
        {categories.map(renderCategoryCard)}
      </ScrollView>

      {/* Artisans List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredArtisans.length} artisan{filteredArtisans.length > 1 ? 's' : ''} trouvé{filteredArtisans.length > 1 ? 's' : ''}
          </Text>
          <TouchableOpacity style={styles.sortButton}>
            <Ionicons name="swap-vertical-outline" size={16} color="#7F8C8D" />
            <Text style={styles.sortText}>Trier</Text>
          </TouchableOpacity>
        </View>

        {filteredArtisans.map(renderArtisanCard)}

        {filteredArtisans.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="#BDC3C7" />
            <Text style={styles.emptyStateText}>Aucun artisan trouvé</Text>
            <Text style={styles.emptyStateSubtext}>
              Essayez de modifier vos critères de recherche
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Contact Modal */}
      <Modal
        visible={showContactModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowContactModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedArtisan && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalArtisanInfo}>
                    <View style={styles.modalAvatar}>
                      <Text style={styles.modalAvatarText}>
                        {selectedArtisan.name.charAt(0)}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.modalArtisanName}>{selectedArtisan.name}</Text>
                      <Text style={styles.modalArtisanSpecialty}>{selectedArtisan.specialty}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowContactModal(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={24} color="#7F8C8D" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalBody}>
                  <Text style={styles.modalDescription}>
                    {selectedArtisan.description}
                  </Text>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Contact</Text>
                    <View style={styles.modalContactInfo}>
                      <Ionicons name="call-outline" size={16} color="#4169E1" />
                      <Text style={styles.modalContactText}>{selectedArtisan.phone}</Text>
                    </View>
                    <View style={styles.modalContactInfo}>
                      <Ionicons name="location-outline" size={16} color="#4169E1" />
                      <Text style={styles.modalContactText}>{selectedArtisan.location}</Text>
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Services proposés</Text>
                    {selectedArtisan.services.map((service, index) => (
                      <View key={index} style={styles.modalServiceItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color="#4CAF50" />
                        <Text style={styles.modalServiceText}>{service}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Tarifs</Text>
                    <Text style={styles.modalPriceText}>{selectedArtisan.price}</Text>
                  </View>
                </ScrollView>

                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => handleCallArtisan(selectedArtisan.phone)}
                  >
                    <Ionicons name="call-outline" size={20} color="#4169E1" />
                    <Text style={styles.modalButtonText}>Appeler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalPrimaryButton]}
                    onPress={() => handleRequestQuote(selectedArtisan)}
                  >
                    <Ionicons name="document-text-outline" size={20} color="#FFF" />
                    <Text style={[styles.modalButtonText, styles.modalPrimaryButtonText]}>
                      Demander un devis
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Emergency Button */}
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => Alert.alert('Urgence', 'Service d\'urgence 24h/24')}
      >
        <Ionicons name="flash-outline" size={24} color="#FFF" />
        <Text style={styles.emergencyButtonText}>Urgence</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#708090',
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
    flex: 1,
    textAlign: 'center',
  },
  filterButton: {
    padding: 4,
  },
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
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#2C3E50',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    elevation: 2,
  },
  categoryCardActive: {
    elevation: 4,
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
  },
  categoryTextActive: {
    color: '#FFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  sortText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#7F8C8D',
  },
  artisanCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  artisanHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  artisanAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4169E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  artisanInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  artisanInfo: {
    flex: 1,
  },
  artisanName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  artisanSpecialty: {
    fontSize: 14,
    color: '#708090',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  artisanStatus: {
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '500',
  },
  artisanDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 8,
  },
  servicesContainer: {
    marginBottom: 16,
  },
  servicesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  servicesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceTag: {
    backgroundColor: '#F0F4FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  serviceTagText: {
    fontSize: 10,
    color: '#4169E1',
    fontWeight: '500',
  },
  artisanActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#4169E1',
    flex: 0.48,
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#4169E1',
    borderColor: '#4169E1',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4169E1',
    marginLeft: 4,
  },
  primaryButtonText: {
    color: '#FFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7F8C8D',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#BDC3C7',
    marginTop: 4,
    textAlign: 'center',
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
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  modalArtisanInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4169E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  modalAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  modalArtisanName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  modalArtisanSpecialty: {
    fontSize: 14,
    color: '#708090',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  modalContactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalContactText: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 12,
  },
  modalServiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalServiceText: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 12,
  },
  modalPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4169E1',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#4169E1',
    flex: 0.48,
    justifyContent: 'center',
  },
  modalPrimaryButton: {
    backgroundColor: '#4169E1',
    borderColor: '#4169E1',
    marginLeft: 16,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4169E1',
    marginLeft: 8,
  },
  modalPrimaryButtonText: {
    color: '#FFF',
  },
  emergencyButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF5252',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emergencyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 8,
  },
});

export default TravauxArtisansModule;