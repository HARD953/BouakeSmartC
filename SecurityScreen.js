import React, { useState, useEffect } from 'react';
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
  Linking,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

export default function SecurityScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('emergency');
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedIncidentType, setSelectedIncidentType] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [alertSent, setAlertSent] = useState(false);
  const [alertImage, setAlertImage] = useState(null);
  const [reportImage, setReportImage] = useState(null);

  // Numéros d'urgence
  const emergencyNumbers = [
    {
      id: 1,
      service: 'Police Secours',
      number: '110',
      icon: 'shield-checkmark',
      color: '#DC143C',
      bgColor: '#FFE8E8',
      description: 'Urgences sécuritaires'
    },
    {
      id: 2,
      service: 'Pompiers',
      number: '180',
      icon: 'flame',
      color: '#FF4500',
      bgColor: '#FFF0E6',
      description: 'Incendies et secours'
    },
    {
      id: 3,
      service: 'SAMU',
      number: '185',
      icon: 'medical',
      color: '#2E8B57',
      bgColor: '#E8F5E8',
      description: 'Urgences médicales'
    },
    {
      id: 4,
      service: 'Gendarmerie',
      number: '170',
      icon: 'star',
      color: '#4169E1',
      bgColor: '#E8EFFF',
      description: 'Forces de l\'ordre'
    }
  ];

  // Types d'incidents pour alerte rapide
  const incidentTypes = [
    { id: 'vol', label: 'Vol/Cambriolage', icon: 'bag-outline', color: '#DC143C' },
    { id: 'agression', label: 'Agression', icon: 'warning-outline', color: '#FF4500' },
    { id: 'accident', label: 'Accident', icon: 'car-outline', color: '#FF8C00' },
    { id: 'incendie', label: 'Incendie', icon: 'flame-outline', color: '#DC143C' },
    { id: 'medical', label: 'Urgence Médicale', icon: 'medical-outline', color: '#2E8B57' },
    { id: 'autre', label: 'Autre Urgence', icon: 'alert-circle-outline', color: '#4169E1' }
  ];

  // Données simulées - Signalements récents
  const recentReports = [
    {
      id: 1,
      type: 'Éclairage défaillant',
      location: 'Rue de la Paix',
      date: '2025-05-23',
      status: 'En cours',
      priority: 'Moyenne'
    },
    {
      id: 2,
      type: 'Nid de poule',
      location: 'Avenue Houphouët-Boigny',
      date: '2025-05-22',
      status: 'Planifié',
      priority: 'Haute'
    },
    {
      id: 3,
      type: 'Feu tricolore HS',
      location: 'Carrefour Central',
      date: '2025-05-21',
      status: 'Réparé',
      priority: 'Critique'
    },
    {
      id: 4,
      type: 'Éclairage défaillant',
      location: 'Quartier Koko',
      date: '2025-05-20',
      status: 'En cours',
      priority: 'Moyenne'
    }
  ];

  const handleEmergencyCall = (number) => {
    Alert.alert(
      'Appel d\'urgence',
      `Appeler le ${number} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Appeler',
          style: 'destructive',
          onPress: () => {
            Linking.openURL(`tel:${number}`).catch(() => {
              Alert.alert('Erreur', 'Impossible de passer l\'appel');
            });
          }
        }
      ]
    );
  };

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'alert') {
        setAlertImage(result.assets[0].uri);
      } else {
        setReportImage(result.assets[0].uri);
      }
    }
  };

  const takePhoto = async (type) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Nous avons besoin de la permission de la caméra pour prendre des photos.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'alert') {
        setAlertImage(result.assets[0].uri);
      } else {
        setReportImage(result.assets[0].uri);
      }
    }
  };

  const handleQuickAlert = () => {
    if (!selectedIncidentType || !incidentDescription.trim()) {
      Alert.alert('Erreur', 'Veuillez sélectionner un type d\'incident et ajouter une description');
      return;
    }

    // Simulation d'envoi d'alerte
    setAlertSent(true);
    setTimeout(() => {
      Alert.alert(
        'Alerte envoyée',
        'Votre alerte a été transmise aux services d\'urgence. Des secours ont été dépêchés.',
        [
          {
            text: 'OK',
            onPress: () => {
              setAlertModalVisible(false);
              setSelectedIncidentType('');
              setIncidentDescription('');
              setAlertImage(null);
              setAlertSent(false);
            }
          }
        ]
      );
    }, 2000);
  };

  const handleInfrastructureReport = () => {
    if (!reportDescription.trim() || !selectedLocation.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    Alert.alert(
      'Signalement envoyé',
      'Votre signalement a été transmis aux services techniques. Merci de votre contribution !',
      [
        {
          text: 'OK',
          onPress: () => {
            setReportModalVisible(false);
            setReportDescription('');
            setSelectedLocation('');
            setReportImage(null);
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En cours': return '#FF8C00';
      case 'Planifié': return '#4169E1';
      case 'Réparé': return '#2E8B57';
      default: return '#7F8C8D';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critique': return '#DC143C';
      case 'Haute': return '#FF8C00';
      case 'Moyenne': return '#4169E1';
      default: return '#7F8C8D';
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
        <Text style={styles.headerTitle}>Sécurité</Text>
        <Text style={styles.headerSubtitle}>Alertes & Signalements</Text>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'emergency' && styles.activeTab]}
        onPress={() => setActiveTab('emergency')}
      >
        <Ionicons 
          name="call-outline" 
          size={18} 
          color={activeTab === 'emergency' ? '#FFF' : '#7F8C8D'} 
        />
        <Text style={[styles.tabText, activeTab === 'emergency' && styles.activeTabText]}>
          Urgences
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === 'reports' && styles.activeTab]}
        onPress={() => setActiveTab('reports')}
      >
        <Ionicons 
          name="construct-outline" 
          size={18} 
          color={activeTab === 'reports' ? '#FFF' : '#7F8C8D'} 
        />
        <Text style={[styles.tabText, activeTab === 'reports' && styles.activeTabText]}>
          Signalements
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmergency = () => (
    <View style={styles.contentContainer}>
      <TouchableOpacity
        style={styles.quickAlertButton}
        onPress={() => setAlertModalVisible(true)}
      >
        <View style={styles.alertIcon}>
          <Ionicons name="warning" size={32} color="#FFF" />
        </View>
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>ALERTE URGENTE</Text>
          <Text style={styles.alertSubtitle}>Appuyez pour signaler une urgence</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#FFF" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Numéros d'Urgence</Text>
      
      {emergencyNumbers.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={[styles.serviceCard, { backgroundColor: service.bgColor }]}
          onPress={() => handleEmergencyCall(service.number)}
        >
          <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
            <Ionicons name={service.icon} size={24} color="#FFF" />
          </View>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{service.service}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
          </View>
          <View style={styles.serviceNumber}>
            <Text style={styles.numberText}>{service.number}</Text>
            <Ionicons name="call" size={20} color={service.color} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderReports = () => (
    <View style={styles.contentContainer}>
      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => setReportModalVisible(true)}
      >
        <Ionicons name="add-circle-outline" size={24} color="#4169E1" />
        <Text style={styles.reportButtonText}>Nouveau Signalement</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Signalements Récents</Text>
      
      {recentReports.map((report) => (
        <View key={report.id} style={styles.reportCard}>
          <View style={styles.reportHeader}>
            <Text style={styles.reportType}>{report.type}</Text>
            <View style={styles.reportBadges}>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(report.priority) }]}>
                <Text style={styles.badgeText}>{report.priority}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}>
                <Text style={styles.badgeText}>{report.status}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.reportDetails}>
            <View style={styles.reportRow}>
              <Ionicons name="location-outline" size={16} color="#7F8C8D" />
              <Text style={styles.reportText}>{report.location}</Text>
            </View>
            <View style={styles.reportRow}>
              <Ionicons name="calendar-outline" size={16} color="#7F8C8D" />
              <Text style={styles.reportText}>
                {new Date(report.date).toLocaleDateString('fr-FR')}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAlertModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={alertModalVisible}
      onRequestClose={() => setAlertModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Alerte d'Urgence</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAlertModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#7F8C8D" />
            </TouchableOpacity>
          </View>
          
          {!alertSent ? (
            <ScrollView style={styles.modalForm}>
              <Text style={styles.inputLabel}>Type d'incident *</Text>
              <View style={styles.incidentTypes}>
                {incidentTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.incidentType,
                      selectedIncidentType === type.id && { backgroundColor: type.color }
                    ]}
                    onPress={() => setSelectedIncidentType(type.id)}
                  >
                    <Ionicons 
                      name={type.icon} 
                      size={20} 
                      color={selectedIncidentType === type.id ? '#FFF' : type.color} 
                    />
                    <Text style={[
                      styles.incidentTypeText,
                      selectedIncidentType === type.id && { color: '#FFF' }
                    ]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={styles.inputLabel}>Description de l'incident *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Décrivez brièvement la situation..."
                value={incidentDescription}
                onChangeText={setIncidentDescription}
                multiline={true}
                numberOfLines={3}
              />

              <Text style={styles.inputLabel}>Ajouter une photo (optionnel)</Text>
              <View style={styles.imageButtonsContainer}>
                <TouchableOpacity 
                  style={styles.imageButton}
                  onPress={() => pickImage('alert')}
                >
                  <Ionicons name="image-outline" size={20} color="#4169E1" />
                  <Text style={styles.imageButtonText}>Galerie</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.imageButton}
                  onPress={() => takePhoto('alert')}
                >
                  <Ionicons name="camera-outline" size={20} color="#4169E1" />
                  <Text style={styles.imageButtonText}>Prendre photo</Text>
                </TouchableOpacity>
              </View>

              {alertImage && (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: alertImage }} style={styles.imagePreview} />
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={() => setAlertImage(null)}
                  >
                    <Ionicons name="close-circle" size={24} color="#DC143C" />
                  </TouchableOpacity>
                </View>
              )}
              
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setAlertModalVisible(false)}
                >
                  <Text style={styles.cancelBtnText}>Annuler</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.alertBtn}
                  onPress={handleQuickAlert}
                >
                  <Text style={styles.alertBtnText}>Envoyer l'Alerte</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : (
            <View style={styles.alertSending}>
              <View style={styles.loadingContainer}>
                <Ionicons name="checkmark-circle" size={64} color="#2E8B57" />
                <Text style={styles.sendingText}>Alerte envoyée avec succès</Text>
                <Text style={styles.sendingSubtext}>Les secours ont été alertés</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
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
              placeholder="Décrivez le problème (éclairage, nid de poule, infrastructure...)"
              value={reportDescription}
              onChangeText={setReportDescription}
              multiline={true}
              numberOfLines={4}
            />

            <Text style={styles.inputLabel}>Ajouter une photo (optionnel)</Text>
            <View style={styles.imageButtonsContainer}>
              <TouchableOpacity 
                style={styles.imageButton}
                onPress={() => pickImage('report')}
              >
                <Ionicons name="image-outline" size={20} color="#4169E1" />
                <Text style={styles.imageButtonText}>Galerie</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.imageButton}
                onPress={() => takePhoto('report')}
              >
                <Ionicons name="camera-outline" size={20} color="#4169E1" />
                <Text style={styles.imageButtonText}>Prendre photo</Text>
              </TouchableOpacity>
            </View>

            {reportImage && (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: reportImage }} style={styles.imagePreview} />
                <TouchableOpacity 
                  style={styles.removeImageButton}
                  onPress={() => setReportImage(null)}
                >
                  <Ionicons name="close-circle" size={24} color="#DC143C" />
                </TouchableOpacity>
              </View>
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setReportModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Annuler</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleInfrastructureReport}
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
        {activeTab === 'emergency' && renderEmergency()}
        {activeTab === 'reports' && renderReports()}
      </ScrollView>
      
      {renderAlertModal()}
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
    backgroundColor: '#DC143C',
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
    backgroundColor: '#DC143C',
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
    paddingBottom: 30,
  },
  quickAlertButton: {
    backgroundColor: '#DC143C',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  alertIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  alertSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  serviceCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
  serviceNumber: {
    alignItems: 'center',
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4169E1',
    borderStyle: 'dashed',
  },
  reportButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4169E1',
    marginLeft: 8,
  },
  reportCard: {
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
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reportType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 10,
  },
  reportBadges: {
    gap: 4,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  badgeText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: 'bold',
  },
  reportDetails: {
    gap: 6,
  },
  reportRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportText: {
    fontSize: 14,
    color: '#34495E',
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
    maxHeight: '90%',
    paddingBottom: 20,
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
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
  },
  modalForm: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  incidentTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  incidentType: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#F8F9FA',
    minWidth: width / 2 - 30,
    justifyContent: 'center',
  },
  incidentTypeText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 6,
    color: '#2C3E50',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  cancelBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  alertBtn: {
    flex: 1,
    backgroundColor: '#DC143C',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  alertBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  submitBtn: {
    flex: 1,
    backgroundColor: '#4169E1',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  alertSending: {
    padding: 40,
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  sendingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginTop: 16,
    textAlign: 'center',
  },
  sendingSubtext: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 8,
    textAlign: 'center',
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    gap: 6,
  },
  imageButtonText: {
    fontSize: 14,
    color: '#4169E1',
    fontWeight: '500',
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
  },
});