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
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RemorquageModule = ({ navigation }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activeTab, setActiveTab] = useState('request');

  const services = [
    {
      id: 1,
      name: 'Remorquage d\'urgence',
      description: 'Panne, accident ou problème mécanique',
      icon: 'car-outline',
      color: '#DC143C',
      price: '15 000 - 25 000 CFA',
      duration: '15-30 min'
    },
    {
      id: 2,
      name: 'Dépannage sur place',
      description: 'Réparation simple sans remorquage',
      icon: 'construct-outline',
      color: '#228B22',
      price: '5 000 - 15 000 CFA',
      duration: '20-45 min'
    },
    {
      id: 3,
      name: 'Transport de véhicule',
      description: 'Déplacement programmé de véhicule',
      icon: 'car-sport-outline',
      color: '#4169E1',
      price: '10 000 - 20 000 CFA',
      duration: '30-60 min'
    },
    {
      id: 4,
      name: 'Assistance 24/7',
      description: 'Service d\'urgence jour et nuit',
      icon: 'time-outline',
      color: '#FF8C00',
      price: '20 000 - 35 000 CFA',
      duration: '10-25 min'
    }
  ];

  const vehicleTypes = [
    { id: 'voiture', name: 'Voiture', icon: 'car-outline' },
    { id: 'moto', name: 'Moto/Scooter', icon: 'bicycle-outline' },
    { id: 'camion', name: 'Camion', icon: 'bus-outline' },
    { id: 'autre', name: 'Autre', icon: 'help-outline' }
  ];

  const emergencyContacts = [
    { name: 'Remorquage Express', number: '+225 07 XX XX XX XX', available: true },
    { name: 'Dépannage Rapide', number: '+225 05 XX XX XX XX', available: true },
    { name: 'SOS Auto Bouaké', number: '+225 01 XX XX XX XX', available: false }
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleSubmitRequest = () => {
    if (!selectedService || !currentLocation || !contactNumber) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmRequest = () => {
    setShowConfirmModal(false);
    Alert.alert(
      'Demande envoyée',
      `Votre demande de ${selectedService.name.toLowerCase()} a été envoyée. Un remorqueur vous contactera dans ${selectedService.duration}.`,
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );
  };

  const callEmergency = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const renderServiceCard = (service) => (
    <TouchableOpacity
      key={service.id}
      style={[
        styles.serviceCard,
        selectedService?.id === service.id && styles.selectedServiceCard
      ]}
      onPress={() => handleServiceSelect(service)}
    >
      <View style={styles.serviceCardHeader}>
        <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
          <Ionicons name={service.icon} size={24} color="#FFF" />
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
        </View>
        {selectedService?.id === service.id && (
          <Ionicons name="checkmark-circle" size={24} color={service.color} />
        )}
      </View>
      <View style={styles.serviceDetails}>
        <View style={styles.serviceDetailItem}>
          <Ionicons name="cash-outline" size={16} color="#7F8C8D" />
          <Text style={styles.serviceDetailText}>{service.price}</Text>
        </View>
        <View style={styles.serviceDetailItem}>
          <Ionicons name="time-outline" size={16} color="#7F8C8D" />
          <Text style={styles.serviceDetailText}>{service.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderVehicleTypeButton = (type) => (
    <TouchableOpacity
      key={type.id}
      style={[
        styles.vehicleTypeButton,
        vehicleType === type.id && styles.selectedVehicleType
      ]}
      onPress={() => setVehicleType(type.id)}
    >
      <Ionicons 
        name={type.icon} 
        size={20} 
        color={vehicleType === type.id ? '#4169E1' : '#7F8C8D'} 
      />
      <Text style={[
        styles.vehicleTypeText,
        vehicleType === type.id && styles.selectedVehicleTypeText
      ]}>
        {type.name}
      </Text>
    </TouchableOpacity>
  );

  const renderEmergencyContact = (contact) => (
    <TouchableOpacity
      key={contact.name}
      style={[
        styles.emergencyContactCard,
        !contact.available && styles.unavailableContact
      ]}
      onPress={() => contact.available && callEmergency(contact.number)}
      disabled={!contact.available}
    >
      <View style={styles.contactInfo}>
        <View style={styles.contactHeader}>
          <Ionicons 
            name="call-outline" 
            size={20} 
            color={contact.available ? '#228B22' : '#7F8C8D'} 
          />
          <Text style={[
            styles.contactName,
            !contact.available && styles.unavailableText
          ]}>
            {contact.name}
          </Text>
        </View>
        <Text style={[
          styles.contactNumber,
          !contact.available && styles.unavailableText
        ]}>
          {contact.number}
        </Text>
        <View style={styles.availabilityBadge}>
          <View style={[
            styles.statusDot,
            { backgroundColor: contact.available ? '#00FF7F' : '#FF6B6B' }
          ]} />
          <Text style={[
            styles.availabilityText,
            !contact.available && styles.unavailableText
          ]}>
            {contact.available ? 'Disponible' : 'Indisponible'}
          </Text>
        </View>
      </View>
      {contact.available && (
        <Ionicons name="chevron-forward" size={20} color="#7F8C8D" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Remorquage</Text>
        <TouchableOpacity style={styles.emergencyButton}>
          <Ionicons name="call" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'request' && styles.activeTab]}
          onPress={() => setActiveTab('request')}
        >
          <Text style={[styles.tabText, activeTab === 'request' && styles.activeTabText]}>
            Demander
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'contacts' && styles.activeTab]}
          onPress={() => setActiveTab('contacts')}
        >
          <Text style={[styles.tabText, activeTab === 'contacts' && styles.activeTabText]}>
            Contacts
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'request' ? (
          <>
            {/* Alerte urgence */}
            <View style={styles.urgentAlert}>
              <View style={styles.urgentAlertHeader}>
                <Ionicons name="alert-circle" size={20} color="#DC143C" />
                <Text style={styles.urgentAlertText}>
                  En cas d'urgence, appelez directement le 115
                </Text>
              </View>
              <TouchableOpacity
                style={styles.urgentCallButton}
                onPress={() => callEmergency('115')}
              >
                <Text style={styles.urgentCallText}>Appeler 115</Text>
              </TouchableOpacity>
            </View>

            {/* Toggle urgence */}
            <View style={styles.urgencyToggle}>
              <TouchableOpacity
                style={[styles.urgencyButton, isUrgent && styles.urgencyButtonActive]}
                onPress={() => setIsUrgent(!isUrgent)}
              >
                <Ionicons 
                  name={isUrgent ? "flash" : "flash-outline"} 
                  size={16} 
                  color={isUrgent ? "#FFF" : "#DC143C"} 
                />
                <Text style={[
                  styles.urgencyButtonText,
                  isUrgent && styles.urgencyButtonTextActive
                ]}>
                  {isUrgent ? 'Urgence activée' : 'Marquer comme urgent'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Services */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Type de service</Text>
              {services.map(renderServiceCard)}
            </View>

            {/* Informations du véhicule */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Type de véhicule</Text>
              <View style={styles.vehicleTypeContainer}>
                {vehicleTypes.map(renderVehicleTypeButton)}
              </View>
            </View>

            {/* Localisation */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Localisation *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="location-outline" size={20} color="#7F8C8D" />
                <TextInput
                  style={styles.input}
                  placeholder="Votre position actuelle"
                  value={currentLocation}
                  onChangeText={setCurrentLocation}
                  multiline
                />
              </View>
              <TouchableOpacity style={styles.locationButton}>
                <Ionicons name="navigate-outline" size={16} color="#4169E1" />
                <Text style={styles.locationButtonText}>Utiliser ma position</Text>
              </TouchableOpacity>
            </View>

            {/* Destination */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Destination (optionnel)</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="flag-outline" size={20} color="#7F8C8D" />
                <TextInput
                  style={styles.input}
                  placeholder="Où souhaitez-vous être remorqué ?"
                  value={destination}
                  onChangeText={setDestination}
                  multiline
                />
              </View>
            </View>

            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description du problème</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="document-text-outline" size={20} color="#7F8C8D" />
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Décrivez brièvement le problème..."
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>

            {/* Contact */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Numéro de contact *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color="#7F8C8D" />
                <TextInput
                  style={styles.input}
                  placeholder="+225 XX XX XX XX XX"
                  value={contactNumber}
                  onChangeText={setContactNumber}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Bouton de soumission */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                isUrgent && styles.urgentSubmitButton,
                (!selectedService || !currentLocation || !contactNumber) && styles.disabledButton
              ]}
              onPress={handleSubmitRequest}
              disabled={!selectedService || !currentLocation || !contactNumber}
            >
              <Ionicons 
                name={isUrgent ? "flash" : "send"} 
                size={20} 
                color="#FFF" 
              />
              <Text style={styles.submitButtonText}>
                {isUrgent ? 'Demande urgente' : 'Envoyer la demande'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Contacts d'urgence */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contacts d'urgence</Text>
              <Text style={styles.sectionDescription}>
                Appelez directement ces numéros pour un service rapide
              </Text>
              {emergencyContacts.map(renderEmergencyContact)}
            </View>

            {/* Informations utiles */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informations utiles</Text>
              <View style={styles.infoCard}>
                <Ionicons name="information-circle-outline" size={24} color="#4169E1" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>Avant d'appeler</Text>
                  <Text style={styles.infoText}>
                    • Assurez-vous d'être en sécurité{'\n'}
                    • Notez votre position exacte{'\n'}
                    • Préparez vos documents du véhicule{'\n'}
                    • Ayez votre téléphone chargé
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Modal de confirmation */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmer la demande</Text>
            <Text style={styles.modalText}>
              Service: {selectedService?.name}{'\n'}
              Localisation: {currentLocation}{'\n'}
              Contact: {contactNumber}
              {isUrgent && '\n\n⚡ Demande marquée comme urgente'}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={confirmRequest}
              >
                <Text style={styles.modalConfirmText}>Confirmer</Text>
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
  header: {
    backgroundColor: '#FFD700',
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
  emergencyButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FFD700',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7F8C8D',
  },
  activeTabText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  urgentAlert: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#DC143C',
    elevation: 2,
  },
  urgentAlertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  urgentAlertText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#2C3E50',
    flex: 1,
  },
  urgentCallButton: {
    backgroundColor: '#DC143C',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  urgentCallText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  urgencyToggle: {
    marginBottom: 20,
  },
  urgencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DC143C',
    elevation: 2,
  },
  urgencyButtonActive: {
    backgroundColor: '#DC143C',
  },
  urgencyButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#DC143C',
  },
  urgencyButtonTextActive: {
    color: '#FFF',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedServiceCard: {
    borderColor: '#4169E1',
  },
  serviceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceDetailText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#7F8C8D',
  },
  vehicleTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vehicleTypeButton: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedVehicleType: {
    borderColor: '#4169E1',
    backgroundColor: '#F0F4FF',
  },
  vehicleTypeText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    color: '#7F8C8D',
    textAlign: 'center',
  },
  selectedVehicleTypeText: {
    color: '#4169E1',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 12,
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  locationButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#4169E1',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#4169E1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  urgentSubmitButton: {
    backgroundColor: '#DC143C',
  },
  disabledButton: {
    backgroundColor: '#BDC3C7',
  },
  submitButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  emergencyContactCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  unavailableContact: {
    backgroundColor: '#F8F9FA',
    opacity: 0.7,
  },
  contactInfo: {
    flex: 1,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactName: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  contactNumber: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  unavailableText: {
    color: '#BDC3C7',
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
    fontWeight: '500',
    color: '#228B22',
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  modalCancelText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#7F8C8D',
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: '#4169E1',
    borderRadius: 8,
    padding: 12,
    marginLeft: 8,
  },
  modalConfirmText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFF',
  },
});

export default RemorquageModule;