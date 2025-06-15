import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  TextInput,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

export default function WasteScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('points');
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportDescription, setReportDescription] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [image, setImage] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  // Données simulées - Points de collecte
  const collectionPoints = [
    {
      id: 1,
      name: 'Place de la Paix',
      type: 'Centre de tri',
      address: 'Place de la Paix, Bouaké',
      hours: '6h00 - 18h00',
      services: ['Plastique', 'Verre', 'Métal'],
      distance: '0.8 km'
    },
    {
      id: 2,
      name: 'Marché Central',
      type: 'Point de collecte',
      address: 'Avenue Houphouët-Boigny',
      hours: '5h00 - 20h00',
      services: ['Déchets organiques', 'Cartons'],
      distance: '1.2 km'
    },
    {
      id: 3,
      name: 'Quartier Koko',
      type: 'Conteneurs',
      address: 'Rue des Écoles, Koko',
      hours: '24h/24',
      services: ['Ordures ménagères'],
      distance: '2.1 km'
    },
    {
      id: 4,
      name: 'Zone Industrielle',
      type: 'Centre spécialisé',
      address: 'Route d\'Abidjan',
      hours: '8h00 - 17h00',
      services: ['Déchets industriels', 'Électronique'],
      distance: '3.5 km'
    }
  ];

  // Données simulées - Planning de ramassage
  const collectionSchedule = [
    {
      id: 1,
      zone: 'Centre-ville',
      day: 'Lundi & Jeudi',
      time: '6h00 - 10h00',
      type: 'Ordures ménagères',
      nextCollection: '2025-05-26',
      color: '#2E8B57'
    },
    {
      id: 2,
      zone: 'Quartier Koko',
      day: 'Mardi & Vendredi',
      time: '5h30 - 9h30',
      type: 'Ordures ménagères',
      nextCollection: '2025-05-27',
      color: '#FF8C00'
    },
    {
      id: 3,
      zone: 'Zone Résidentielle',
      day: 'Mercredi & Samedi',
      time: '6h30 - 11h00',
      type: 'Déchets recyclables',
      nextCollection: '2025-05-28',
      color: '#4169E1'
    },
    {
      id: 4,
      zone: 'Périphérie',
      day: 'Samedi',
      time: '7h00 - 12h00',
      type: 'Collecte générale',
      nextCollection: '2025-05-31',
      color: '#DC143C'
    }
  ];

  // Données simulées - Campagnes
  const campaigns = [
    {
      id: 1,
      title: 'Opération Ville Propre',
      date: '2025-06-01',
      location: 'Place de la Paix',
      participants: 156,
      status: 'À venir',
      description: 'Grande opération de nettoyage citoyenne'
    },
    {
      id: 2,
      title: 'Sensibilisation Tri Sélectif',
      date: '2025-05-28',
      location: 'Marché Central',
      participants: 89,
      status: 'En cours',
      description: 'Formation au tri des déchets recyclables'
    },
    {
      id: 3,
      title: 'Collecte Déchets Électroniques',
      date: '2025-05-20',
      location: 'Mairie de Bouaké',
      participants: 234,
      status: 'Terminée',
      description: 'Collecte spéciale équipements électroniques'
    }
  ];

  const pickImage = async () => {
    if (!status?.granted) {
      await requestPermission();
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    if (!status?.granted) {
      await requestPermission();
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleReport = () => {
    if (!reportDescription.trim() || !selectedLocation.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    Alert.alert(
      'Signalement envoyé',
      'Votre signalement a été transmis aux services compétents. Merci de votre contribution !',
      [
        {
          text: 'OK',
          onPress: () => {
            setReportModalVisible(false);
            setReportDescription('');
            setSelectedLocation('');
            setImage(null);
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'À venir': return '#FF8C00';
      case 'En cours': return '#2E8B57';
      case 'Terminée': return '#7F8C8D';
      default: return '#4169E1';
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Gestion des Déchets</Text>
        <Text style={styles.headerSubtitle}>Collecte & Propreté</Text>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'points' && styles.activeTab]}
        onPress={() => setActiveTab('points')}
      >
        <Ionicons 
          name="location-outline" 
          size={18} 
          color={activeTab === 'points' ? '#FFF' : '#7F8C8D'} 
        />
        <Text style={[styles.tabText, activeTab === 'points' && styles.activeTabText]}>
          Points de Collecte
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === 'schedule' && styles.activeTab]}
        onPress={() => setActiveTab('schedule')}
      >
        <Ionicons 
          name="calendar-outline" 
          size={18} 
          color={activeTab === 'schedule' ? '#FFF' : '#7F8C8D'} 
        />
        <Text style={[styles.tabText, activeTab === 'schedule' && styles.activeTabText]}>
          Planning
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === 'campaigns' && styles.activeTab]}
        onPress={() => setActiveTab('campaigns')}
      >
        <Ionicons 
          name="people-outline" 
          size={18} 
          color={activeTab === 'campaigns' ? '#FFF' : '#7F8C8D'} 
        />
        <Text style={[styles.tabText, activeTab === 'campaigns' && styles.activeTabText]}>
          Campagnes
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCollectionPoints = () => (
    <View style={styles.contentContainer}>
      {collectionPoints.map((point) => (
        <View key={point.id} style={styles.pointCard}>
          <View style={styles.pointHeader}>
            <View style={styles.pointIcon}>
              <Ionicons name="location" size={20} color="#2E8B57" />
            </View>
            <View style={styles.pointInfo}>
              <Text style={styles.pointName}>{point.name}</Text>
              <Text style={styles.pointType}>{point.type}</Text>
            </View>
            <Text style={styles.distance}>{point.distance}</Text>
          </View>
          
          <Text style={styles.pointAddress}>{point.address}</Text>
          <Text style={styles.pointHours}>Horaires: {point.hours}</Text>
          
          <View style={styles.servicesContainer}>
            {point.services.map((service, index) => (
              <View key={index} style={styles.serviceTag}>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity style={styles.directionBtn}>
            <Ionicons name="navigate-outline" size={16} color="#2E8B57" />
            <Text style={styles.directionText}>Itinéraire</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderSchedule = () => (
    <View style={styles.contentContainer}>
      {collectionSchedule.map((schedule) => (
        <View key={schedule.id} style={styles.scheduleCard}>
          <View style={styles.scheduleHeader}>
            <View style={[styles.scheduleIndicator, { backgroundColor: schedule.color }]} />
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleZone}>{schedule.zone}</Text>
              <Text style={styles.scheduleType}>{schedule.type}</Text>
            </View>
          </View>
          
          <View style={styles.scheduleDetails}>
            <View style={styles.scheduleRow}>
              <Ionicons name="calendar-outline" size={16} color="#7F8C8D" />
              <Text style={styles.scheduleText}>{schedule.day}</Text>
            </View>
            <View style={styles.scheduleRow}>
              <Ionicons name="time-outline" size={16} color="#7F8C8D" />
              <Text style={styles.scheduleText}>{schedule.time}</Text>
            </View>
            <View style={styles.scheduleRow}>
              <Ionicons name="alarm-outline" size={16} color="#2E8B57" />
              <Text style={[styles.scheduleText, styles.nextCollection]}>
                Prochain: {new Date(schedule.nextCollection).toLocaleDateString('fr-FR')}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderCampaigns = () => (
    <View style={styles.contentContainer}>
      {campaigns.map((campaign) => (
        <View key={campaign.id} style={styles.campaignCard}>
          <View style={styles.campaignHeader}>
            <Text style={styles.campaignTitle}>{campaign.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(campaign.status) }]}>
              <Text style={styles.statusText}>{campaign.status}</Text>
            </View>
          </View>
          
          <Text style={styles.campaignDescription}>{campaign.description}</Text>
          
          <View style={styles.campaignDetails}>
            <View style={styles.campaignRow}>
              <Ionicons name="calendar-outline" size={16} color="#7F8C8D" />
              <Text style={styles.campaignText}>
                {new Date(campaign.date).toLocaleDateString('fr-FR')}
              </Text>
            </View>
            <View style={styles.campaignRow}>
              <Ionicons name="location-outline" size={16} color="#7F8C8D" />
              <Text style={styles.campaignText}>{campaign.location}</Text>
            </View>
            <View style={styles.campaignRow}>
              <Ionicons name="people-outline" size={16} color="#7F8C8D" />
              <Text style={styles.campaignText}>{campaign.participants} participants</Text>
            </View>
          </View>
          
          {campaign.status !== 'Terminée' && (
            <TouchableOpacity style={styles.joinBtn}>
              <Text style={styles.joinBtnText}>
                {campaign.status === 'À venir' ? 'S\'inscrire' : 'Participer'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );

  const renderReportModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={reportModalVisible}
      onRequestClose={() => setReportModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Signaler un Problème</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setReportModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#7F8C8D" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalForm}>
            <Text style={styles.inputLabel}>Localisation *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: Rue principale, Quartier Koko"
              value={selectedLocation}
              onChangeText={setSelectedLocation}
            />
            
            <Text style={styles.inputLabel}>Description du problème *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Décrivez le problème observé (dépôt sauvage, conteneur endommagé, etc.)"
              value={reportDescription}
              onChangeText={setReportDescription}
              multiline={true}
              numberOfLines={4}
            />
            
            <Text style={styles.inputLabel}>Ajouter une photo (optionnel)</Text>
            <View style={styles.imageButtonsContainer}>
              <TouchableOpacity 
                style={styles.imageButton}
                onPress={takePhoto}
              >
                <Ionicons name="camera" size={20} color="#FFF" />
                <Text style={styles.imageButtonText}>Prendre photo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.imageButton, {backgroundColor: '#6c757d'}]}
                onPress={pickImage}
              >
                <Ionicons name="image" size={20} color="#FFF" />
                <Text style={styles.imageButtonText}>Choisir photo</Text>
              </TouchableOpacity>
            </View>
            
            {image && (
              <View style={styles.imagePreviewContainer}>
                <Image 
                  source={{ uri: image }} 
                  style={styles.imagePreview} 
                />
                <TouchableOpacity 
                  style={styles.removeImageButton}
                  onPress={() => setImage(null)}
                >
                  <Ionicons name="close-circle" size={24} color="#DC143C" />
                </TouchableOpacity>
              </View>
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setReportModalVisible(false);
                  setImage(null);
                }}
              >
                <Text style={styles.cancelBtnText}>Annuler</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleReport}
              >
                <Text style={styles.submitBtnText}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderTabs()}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'points' && renderCollectionPoints()}
        {activeTab === 'schedule' && renderSchedule()}
        {activeTab === 'campaigns' && renderCampaigns()}
      </ScrollView>
      
      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => setReportModalVisible(true)}
      >
        <Ionicons name="warning-outline" size={24} color="#FFF" />
        <Text style={styles.reportButtonText}>Signaler</Text>
      </TouchableOpacity>
      
      {renderReportModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#228B22',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#228B22',
  },
  tabText: {
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: '500',
    marginLeft: 4,
  },
  activeTabText: {
    color: '#FFF',
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  pointCard: {
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
  pointHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pointIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  pointInfo: {
    flex: 1,
  },
  pointName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  pointType: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
  distance: {
    fontSize: 12,
    color: '#2E8B57',
    fontWeight: '500',
  },
  pointAddress: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  pointHours: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 12,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  serviceTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  serviceText: {
    fontSize: 12,
    color: '#2E8B57',
    fontWeight: '500',
  },
  directionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  directionText: {
    fontSize: 14,
    color: '#2E8B57',
    fontWeight: '500',
    marginLeft: 4,
  },
  scheduleCard: {
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
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleZone: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  scheduleType: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
  scheduleDetails: {
    gap: 8,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleText: {
    fontSize: 14,
    color: '#34495E',
    marginLeft: 8,
  },
  nextCollection: {
    color: '#2E8B57',
    fontWeight: '500',
  },
  campaignCard: {
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
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  campaignTitle: {
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
    fontSize: 12,
    color: '#FFF',
    fontWeight: '500',
  },
  campaignDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 12,
    lineHeight: 20,
  },
  campaignDetails: {
    gap: 6,
    marginBottom: 12,
  },
  campaignRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  campaignText: {
    fontSize: 14,
    color: '#34495E',
    marginLeft: 8,
  },
  joinBtn: {
    backgroundColor: '#228B22',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  joinBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  reportButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#DC143C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  reportButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  closeButton: {
    padding: 5,
  },
  modalForm: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#7F8C8D',
    fontWeight: '500',
    fontSize: 14,
  },
  submitBtn: {
    flex: 1,
    backgroundColor: '#DC143C',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 10,
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#228B22',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  imageButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 16,
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  removeImageButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
});