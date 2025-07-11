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
  Linking,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SanteModule = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);

  const categories = [
    { id: 'all', name: 'Tous', icon: 'medical-outline', color: '#4169E1' },
    { id: 'hopital', name: 'Hôpitaux', icon: 'business-outline', color: '#DC143C' },
    { id: 'clinique', name: 'Cliniques', icon: 'home-outline', color: '#228B22' },
    { id: 'centre', name: 'Centres', icon: 'fitness-outline', color: '#FF8C00' },
    { id: 'specialiste', name: 'Spécialistes', icon: 'person-outline', color: '#9932CC' },
    { id: 'urgence', name: 'Urgences', icon: 'alert-circle-outline', color: '#FF1493' }
  ];

  const servicesData = [
    {
      id: 1,
      name: 'CHU de Bouaké',
      type: 'hopital',
      specialties: ['Urgences', 'Chirurgie', 'Pédiatrie', 'Cardiologie'],
      address: 'Boulevard Félix Houphouët-Boigny, Bouaké',
      phone: '+225 31 63 41 24',
      hours: '24h/24 - 7j/7',
      rating: 4.2,
      distance: '2.5 km',
      emergency: true,
      description: 'Centre hospitalier universitaire offrant tous les services médicaux spécialisés.',
      services: ['Consultations', 'Hospitalisations', 'Chirurgie', 'Radiologie', 'Laboratoire'],
      price: 'Conventionné',
      coordinates: { lat: 7.6898, lng: -5.0306 }
    },
    {
      id: 2,
      name: 'Clinique Sainte Marie',
      type: 'clinique',
      specialties: ['Gynécologie', 'Obstétrique', 'Pédiatrie'],
      address: 'Quartier Commerce, Bouaké',
      phone: '+225 31 63 25 47',
      hours: '07h00 - 19h00',
      rating: 4.5,
      distance: '1.8 km',
      emergency: false,
      description: 'Clinique privée spécialisée en gynécologie et obstétrique.',
      services: ['Consultations', 'Accouchements', 'Échographies', 'Suivi grossesse'],
      price: 'Privé - 15,000 à 50,000 FCFA',
      coordinates: { lat: 7.6945, lng: -5.0289 }
    },
    {
      id: 3,
      name: 'Centre de Santé Urbain',
      type: 'centre',
      specialties: ['Médecine générale', 'Vaccination', 'Soins infirmiers'],
      address: 'Quartier Bromakoté, Bouaké',
      phone: '+225 31 63 18 92',
      hours: '07h30 - 17h30',
      rating: 4.0,
      distance: '3.2 km',
      emergency: false,
      description: 'Centre de santé communautaire offrant des soins de base.',
      services: ['Consultations', 'Vaccinations', 'Soins infirmiers', 'Planification familiale'],
      price: 'Public - 2,000 à 5,000 FCFA',
      coordinates: { lat: 7.6812, lng: -5.0234 }
    },
    {
      id: 4,
      name: 'Dr. Koné Abou (Cardiologue)',
      type: 'specialiste',
      specialties: ['Cardiologie', 'Hypertension'],
      address: 'Cabinet médical, Rue du Commerce',
      phone: '+225 07 45 12 36',
      hours: 'Lun-Ven: 08h00-17h00, Sam: 08h00-12h00',
      rating: 4.7,
      distance: '1.5 km',
      emergency: false,
      description: 'Cardiologue expérimenté, spécialiste en hypertension artérielle.',
      services: ['Consultations cardiologiques', 'ECG', 'Échocardiopathie', 'Holter'],
      price: 'Privé - 25,000 à 40,000 FCFA',
      coordinates: { lat: 7.6923, lng: -5.0312 }
    },
    {
      id: 5,
      name: 'Pharmacie de la Paix',
      type: 'pharmacie',
      specialties: ['Médicaments', 'Conseil pharmaceutique'],
      address: 'Avenue Félix Houphouët-Boigny',
      phone: '+225 31 63 44 55',
      hours: '07h00 - 20h00',
      rating: 4.3,
      distance: '0.8 km',
      emergency: false,
      description: 'Pharmacie moderne avec un large stock de médicaments.',
      services: ['Vente médicaments', 'Conseils', 'Matériel médical', 'Parapharmacie'],
      price: 'Variable selon médicaments',
      coordinates: { lat: 7.6934, lng: -5.0298 }
    },
    {
      id: 6,
      name: 'Laboratoire Bio-Santé',
      type: 'laboratoire',
      specialties: ['Analyses médicales', 'Biologie'],
      address: 'Quartier Koko, Bouaké',
      phone: '+225 31 63 67 89',
      hours: '06h30 - 16h00',
      rating: 4.1,
      distance: '2.1 km',
      emergency: false,
      description: 'Laboratoire d\'analyses médicales équipé d\'appareils modernes.',
      services: ['Analyses sanguines', 'Analyses urinaires', 'Parasitologie', 'Bactériologie'],
      price: '5,000 à 25,000 FCFA',
      coordinates: { lat: 7.6876, lng: -5.0267 }
    }
  ];

  const urgenceNumbers = [
    { name: 'SAMU Bouaké', number: '185', description: 'Service d\'aide médicale urgente' },
    { name: 'Pompiers', number: '180', description: 'Service de secours et d\'incendie' },
    { name: 'Police Secours', number: '170', description: 'Police nationale - urgences' },
    { name: 'CHU Urgences', number: '+225 31 63 41 24', description: 'Service d\'urgences du CHU' }
  ];

  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || service.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCall = (phoneNumber) => {
    const cleanNumber = phoneNumber.replace(/\s+/g, '');
    Linking.openURL(`tel:${cleanNumber}`);
  };

  const handleDirection = (coordinates) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
    Linking.openURL(url);
  };

  const showServiceDetails = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const renderServiceCard = (service) => {
    const categoryColor = categories.find(cat => cat.id === service.type)?.color || '#4169E1';
    
    return (
      <TouchableOpacity
        key={service.id}
        style={styles.serviceCard}
        onPress={() => showServiceDetails(service)}
        activeOpacity={0.8}
      >
        <View style={styles.serviceHeader}>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <View style={styles.serviceDetails}>
              <View style={[styles.typeBadge, { backgroundColor: categoryColor }]}>
                <Text style={styles.typeBadgeText}>
                  {categories.find(cat => cat.id === service.type)?.name || 'Service'}
                </Text>
              </View>
              {service.emergency && (
                <View style={styles.emergencyBadge}>
                  <Ionicons name="alert-circle" size={12} color="#FFF" />
                  <Text style={styles.emergencyText}>Urgence</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.serviceActions}>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => handleCall(service.phone)}
            >
              <Ionicons name="call" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.specialtiesContainer}>
          {service.specialties.slice(0, 3).map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
          {service.specialties.length > 3 && (
            <Text style={styles.moreSpecialties}>+{service.specialties.length - 3}</Text>
          )}
        </View>

        <View style={styles.serviceFooter}>
          <View style={styles.locationInfo}>
            <Ionicons name="location-outline" size={14} color="#7F8C8D" />
            <Text style={styles.distanceText}>{service.distance}</Text>
          </View>
          <View style={styles.hoursInfo}>
            <Ionicons name="time-outline" size={14} color="#7F8C8D" />
            <Text style={styles.hoursText}>{service.hours}</Text>
          </View>
          <View style={styles.ratingInfo}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{service.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderUrgenceCard = (urgence, index) => (
    <TouchableOpacity
      key={index}
      style={styles.urgenceCard}
      onPress={() => handleCall(urgence.number)}
    >
      <View style={styles.urgenceIcon}>
        <Ionicons name="call" size={24} color="#FFF" />
      </View>
      <View style={styles.urgenceInfo}>
        <Text style={styles.urgenceName}>{urgence.name}</Text>
        <Text style={styles.urgenceNumber}>{urgence.number}</Text>
        <Text style={styles.urgenceDescription}>{urgence.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#DC143C" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Services de Santé</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Ionicons name="filter-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#7F8C8D" />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un service de santé..."
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
              selectedCategory === category.id && styles.categoryItemActive,
              { borderColor: category.color }
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
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Urgences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚨 Numéros d'urgence</Text>
          <View style={styles.urgencesGrid}>
            {urgenceNumbers.map((urgence, index) => renderUrgenceCard(urgence, index))}
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            📍 Services de santé ({filteredServices.length})
          </Text>
          {filteredServices.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Ionicons name="search-outline" size={48} color="#BDC3C7" />
              <Text style={styles.noResultsText}>Aucun service trouvé</Text>
              <Text style={styles.noResultsSubtext}>
                Essayez de modifier votre recherche ou vos filtres
              </Text>
            </View>
          ) : (
            filteredServices.map(renderServiceCard)
          )}
        </View>
      </ScrollView>

      {/* Service Details Modal */}
      <Modal
        visible={showServiceModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowServiceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedService && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedService.name}</Text>
                  <TouchableOpacity
                    onPress={() => setShowServiceModal(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={24} color="#7F8C8D" />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.modalBody}>
                  <Text style={styles.modalDescription}>{selectedService.description}</Text>
                  
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>📍 Adresse</Text>
                    <Text style={styles.modalText}>{selectedService.address}</Text>
                  </View>
                  
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>📞 Contact</Text>
                    <Text style={styles.modalText}>{selectedService.phone}</Text>
                  </View>
                  
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>🕒 Horaires</Text>
                    <Text style={styles.modalText}>{selectedService.hours}</Text>
                  </View>
                  
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>💰 Tarifs</Text>
                    <Text style={styles.modalText}>{selectedService.price}</Text>
                  </View>
                  
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>🏥 Services proposés</Text>
                    {selectedService.services.map((service, index) => (
                      <View key={index} style={styles.serviceListItem}>
                        <Ionicons name="checkmark-circle" size={16} color="#228B22" />
                        <Text style={styles.serviceListText}>{service}</Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
                
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.callActionButton]}
                    onPress={() => handleCall(selectedService.phone)}
                  >
                    <Ionicons name="call" size={20} color="#FFF" />
                    <Text style={styles.actionButtonText}>Appeler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.directionActionButton]}
                    onPress={() => handleDirection(selectedService.coordinates)}
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

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModalContent}>
            <Text style={styles.filterModalTitle}>Filtrer par catégorie</Text>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.filterOption,
                  selectedCategory === category.id && styles.filterOptionActive
                ]}
                onPress={() => {
                  setSelectedCategory(category.id);
                  setShowFilterModal(false);
                }}
              >
                <Ionicons name={category.icon} size={20} color={category.color} />
                <Text style={styles.filterOptionText}>{category.name}</Text>
                {selectedCategory === category.id && (
                  <Ionicons name="checkmark" size={20} color="#228B22" />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.filterCloseButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.filterCloseButtonText}>Fermer</Text>
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
  header: {
    backgroundColor: '#FF1493',
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
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
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
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#2C3E50',
  },
  categoriesContainer: {
    maxHeight: 60,
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#FFF',
  },
  categoryItemActive: {
    backgroundColor: '#4169E1',
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  urgencesGrid: {
    gap: 8,
  },
  urgenceCard: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#DC143C',
  },
  urgenceIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#DC143C',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  urgenceInfo: {
    flex: 1,
  },
  urgenceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  urgenceNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC143C',
    marginVertical: 2,
  },
  urgenceDescription: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  serviceCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  serviceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFF',
  },
  emergencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC143C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  emergencyText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#FFF',
  },
  serviceActions: {
    flexDirection: 'row',
    gap: 8,
  },
  callButton: {
    backgroundColor: '#228B22',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  specialtyTag: {
    backgroundColor: '#F0F4FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  specialtyText: {
    fontSize: 12,
    color: '#4169E1',
    fontWeight: '500',
  },
  moreSpecialties: {
    fontSize: 12,
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  hoursInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hoursText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  noResultsContainer: {
    alignItems: 'center',
    padding: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 16,
    fontWeight: '500',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#BDC3C7',
    textAlign: 'center',
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    marginBottom: 20,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  serviceListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  serviceListText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  callActionButton: {
    backgroundColor: '#228B22',
  },
  directionActionButton: {
    backgroundColor: '#4169E1',
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  filterModalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  filterModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
   },  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: 8,
  },
  filterOptionActive: {
    backgroundColor: '#F0F4FF',
    borderColor: '#4169E1',
  },
  filterOptionText: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 12,
  },
  filterCloseButton: {
    backgroundColor: '#4169E1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  filterCloseButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SanteModule;

