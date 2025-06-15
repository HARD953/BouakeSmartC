import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  ImageBackground,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function DocumentsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('forms');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  // Données simulées - Formulaires disponibles avec documents requis et prix
  const availableForms = [
    {
      id: 1,
      title: 'Certificat de Résidence',
      category: 'État Civil',
      description: 'Justificatif de domicile officiel',
      icon: 'home-outline',
      downloadCount: 1250,
      processingTime: '2-3 jours',
      price: '15 000 FCFA',
      requiredDocuments: [
        'Copie CNI',
        'Facture récente (eau/électricité)',
        'Quittance de loyer'
      ]
    },
    {
      id: 2,
      title: 'Permis de Construire',
      category: 'Urbanisme',
      description: 'Autorisation de construction',
      icon: 'construct-outline',
      downloadCount: 89,
      processingTime: '15-30 jours',
      price: '50 000 FCFA',
      requiredDocuments: [
        'Plan de construction',
        'Titre de propriété',
        'Photocopie CNI',
        'Plan de situation'
      ]
    },
    {
      id: 3,
      title: 'Licence Commerciale',
      category: 'Commerce',
      description: 'Autorisation d\'exercer une activité commerciale',
      icon: 'storefront-outline',
      downloadCount: 156,
      processingTime: '7-10 jours',
      price: '25 000 FCFA',
      requiredDocuments: [
        'Extrait de casier judiciaire',
        'Photocopie CNI',
        'Plan de localisation',
        'Contrat de bail'
      ]
    },
    {
      id: 4,
      title: 'Certificat de Naissance',
      category: 'État Civil',
      description: 'Copie certifiée conforme',
      icon: 'person-add-outline',
      downloadCount: 2100,
      processingTime: '1-2 jours',
      price: '5 000 FCFA',
      requiredDocuments: [
        'Déclaration de naissance',
        'Photocopie CNI des parents',
        'Acte de mariage des parents'
      ]
    },
    {
      id: 5,
      title: 'Autorisation de Manifestation',
      category: 'Événements',
      description: 'Déclaration d\'événement public',
      icon: 'calendar-outline',
      downloadCount: 45,
      processingTime: '5-7 jours',
      price: '10 000 FCFA',
      requiredDocuments: [
        'Liste des participants',
        'Itinéraire prévu',
        'Plan de sécurité'
      ]
    },
    {
      id: 6,
      title: 'Certificat de Décès',
      category: 'État Civil',
      description: 'Acte de décès officiel',
      icon: 'document-text-outline',
      downloadCount: 180,
      processingTime: '1-2 jours',
      price: '3 000 FCFA',
      requiredDocuments: [
        'Déclaration de décès',
        'Photocopie CNI du défunt',
        'Certificat médical de décès'
      ]
    }
  ];

  // Données simulées - Mes demandes en cours
  const myRequests = [
    {
      id: 1,
      title: 'Certificat de Résidence',
      status: 'En cours',
      statusColor: '#FF8C00',
      dateSubmitted: '15 Mai 2025',
      estimatedCompletion: '18 Mai 2025',
      reference: 'CR-2025-001234'
    },
    {
      id: 2,
      title: 'Permis de Construire',
      status: 'En attente',
      statusColor: '#DC143C',
      dateSubmitted: '10 Mai 2025',
      estimatedCompletion: '25 Mai 2025',
      reference: 'PC-2025-000567'
    },
    {
      id: 3,
      title: 'Licence Commerciale',
      status: 'Prêt',
      statusColor: '#2E8B57',
      dateSubmitted: '05 Mai 2025',
      estimatedCompletion: '15 Mai 2025',
      reference: 'LC-2025-000890'
    }
  ];

  // Données simulées - Mes documents
  const myDocuments = [
    {
      id: 1,
      title: 'Certificat de Naissance',
      type: 'PDF',
      size: '245 KB',
      dateObtained: '12 Avril 2025',
      expiryDate: 'Permanent'
    },
    {
      id: 2,
      title: 'Certificat de Résidence',
      type: 'PDF',
      size: '189 KB',
      dateObtained: '28 Mars 2025',
      expiryDate: '28 Mars 2026'
    },
    {
      id: 3,
      title: 'Licence Commerciale',
      type: 'PDF',
      size: '312 KB',
      dateObtained: '15 Février 2025',
      expiryDate: '15 Février 2026'
    }
  ];

  const filteredForms = availableForms.filter(form =>
    form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadForm = (form) => {
    Alert.alert(
      'Télécharger le formulaire',
      `Voulez-vous télécharger le formulaire "${form.title}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Télécharger', 
          onPress: () => Alert.alert('Succès', 'Formulaire téléchargé avec succès !') 
        }
      ]
    );
  };

  const handleRequestForm = (form) => {
    setSelectedForm(form);
    setUploadedDocuments([]); // Réinitialiser les documents uploadés
    setShowRequestModal(true);
  };

  const handleUploadDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true
      });
      
      if (result.type === 'success') {
        const fileInfo = await FileSystem.getInfoAsync(result.uri);
        const newDocument = {
          name: result.name,
          size: `${(fileInfo.size / 1024).toFixed(2)} KB`,
          uri: result.uri
        };
        
        setUploadedDocuments([...uploadedDocuments, newDocument]);
      }
    } catch (err) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la sélection du document');
    }
  };

  const removeUploadedDocument = (index) => {
    const newDocuments = [...uploadedDocuments];
    newDocuments.splice(index, 1);
    setUploadedDocuments(newDocuments);
  };

  const handleSubmitRequest = () => {
    if (uploadedDocuments.length < selectedForm.requiredDocuments.length) {
      Alert.alert(
        'Documents manquants',
        `Veuillez fournir tous les documents requis (${selectedForm.requiredDocuments.length} attendus)`
      );
      return;
    }
    
    setShowRequestModal(false);
    Alert.alert(
      'Demande soumise',
      `Votre demande de "${selectedForm.title}" a été soumise avec succès.\n\nRéférence: ${selectedForm.category.substring(0,2).toUpperCase()}-2025-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      [{ text: 'OK' }]
    );
  };

  const handleDownloadDocument = (doc) => {
    Alert.alert('Téléchargement', `Document "${doc.title}" téléchargé avec succès !`);
  };

  const renderTabButton = (tabKey, title, icon) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tabKey && styles.activeTabButton]}
      onPress={() => setActiveTab(tabKey)}
    >
      <Ionicons 
        name={icon} 
        size={20} 
        color={activeTab === tabKey ? '#FFF' : '#7F8C8D'} 
      />
      <Text style={[styles.tabButtonText, activeTab === tabKey && styles.activeTabButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderFormsTab = () => (
    <View style={styles.tabContent}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#7F8C8D" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un formulaire..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#7F8C8D"
        />
      </View>

      {/* Forms List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredForms.map((form) => (
          <View key={form.id} style={styles.formCard}>
            <View style={styles.formHeader}>
              <View style={styles.formIconContainer}>
                <Ionicons name={form.icon} size={24} color="#4169E1" />
              </View>
              <View style={styles.formInfo}>
                <Text style={styles.formTitle}>{form.title}</Text>
                <Text style={styles.formCategory}>{form.category}</Text>
                <Text style={styles.formDescription}>{form.description}</Text>
              </View>
            </View>
            
            <View style={styles.formStats}>
              <Text style={styles.formStat}>⏱️ {form.processingTime}</Text>
              <Text style={styles.formStat}>💰 {form.price}</Text>
              <Text style={styles.formStat}>📥 {form.downloadCount} téléchargements</Text>
            </View>

            <View style={styles.formActions}>
              <TouchableOpacity
                style={styles.downloadBtn}
                onPress={() => handleDownloadForm(form)}
              >
                <Ionicons name="download-outline" size={16} color="#4169E1" />
                <Text style={styles.downloadBtnText}>Télécharger</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.requestBtn}
                onPress={() => handleRequestForm(form)}
              >
                <Ionicons name="send-outline" size={16} color="#FFF" />
                <Text style={styles.requestBtnText}>Faire une demande</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderRequestsTab = () => (
    <View style={styles.tabContent}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {myRequests.map((request) => (
          <View key={request.id} style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <Text style={styles.requestTitle}>{request.title}</Text>
              <View style={[styles.statusBadge, { backgroundColor: request.statusColor }]}>
                <Text style={styles.statusText}>{request.status}</Text>
              </View>
            </View>
            
            <View style={styles.requestDetails}>
              <Text style={styles.requestReference}>Réf: {request.reference}</Text>
              <Text style={styles.requestDate}>Soumis le: {request.dateSubmitted}</Text>
              <Text style={styles.requestDate}>Estimation: {request.estimatedCompletion}</Text>
            </View>

            <TouchableOpacity style={styles.trackBtn}>
              <Ionicons name="eye-outline" size={16} color="#4169E1" />
              <Text style={styles.trackBtnText}>Suivre la demande</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderDocumentsTab = () => (
    <View style={styles.tabContent}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {myDocuments.map((doc) => (
          <View key={doc.id} style={styles.documentCard}>
            <View style={styles.documentHeader}>
              <Ionicons name="document-text-outline" size={24} color="#2E8B57" />
              <View style={styles.documentInfo}>
                <Text style={styles.documentTitle}>{doc.title}</Text>
                <Text style={styles.documentMeta}>{doc.type} • {doc.size}</Text>
              </View>
            </View>
            
            <View style={styles.documentDetails}>
              <Text style={styles.documentDate}>Obtenu le: {doc.dateObtained}</Text>
              <Text style={styles.documentExpiry}>Expire: {doc.expiryDate}</Text>
            </View>

            <TouchableOpacity
              style={styles.documentDownloadBtn}
              onPress={() => handleDownloadDocument(doc)}
            >
              <Ionicons name="cloud-download-outline" size={16} color="#FFF" />
              <Text style={styles.documentDownloadText}>Télécharger</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Documents Administratifs</Text>
      </View>
{/* 
                <ImageBackground
                  source={require('./assets/BOUAKE.jpg')}
                  style={styles.backgroundImage}
                  resizeMode="cover"
                > */}

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {renderTabButton('forms', 'Formulaires', 'document-outline')}
        {renderTabButton('requests', 'Mes Demandes', 'time-outline')}
        {renderTabButton('documents', 'Mes Documents', 'folder-outline')}
      </View>

      {/* Tab Content */}
      {activeTab === 'forms' && renderFormsTab()}
      {activeTab === 'requests' && renderRequestsTab()}
      {activeTab === 'documents' && renderDocumentsTab()}

      {/* Request Modal */}
      <Modal
        visible={showRequestModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRequestModal(false)}
      >
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Faire une demande</Text>
            <Text style={styles.modalSubtitle}>
              {selectedForm?.title}
            </Text>
            
            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Informations</Text>
              <Text style={styles.modalText}>
                Temps de traitement estimé: {selectedForm?.processingTime}
              </Text>
              <Text style={styles.modalText}>
                Frais: {selectedForm?.price}
              </Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Documents Requis</Text>
              {selectedForm?.requiredDocuments.map((doc, index) => (
                <View key={index} style={styles.requiredDocItem}>
                  <Ionicons name="document-text-outline" size={16} color="#4169E1" />
                  <Text style={styles.requiredDocText}>{doc}</Text>
                </View>
              ))}
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Documents Uploadés</Text>
              {uploadedDocuments.length === 0 ? (
                <Text style={styles.noDocumentsText}>Aucun document uploadé</Text>
              ) : (
                uploadedDocuments.map((doc, index) => (
                  <View key={index} style={styles.uploadedDocItem}>
                    <Ionicons name="document-attach-outline" size={16} color="#2E8B57" />
                    <View style={styles.uploadedDocInfo}>
                      <Text style={styles.uploadedDocName}>{doc.name}</Text>
                      <Text style={styles.uploadedDocSize}>{doc.size}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeUploadedDocument(index)}>
                      <Ionicons name="trash-outline" size={16} color="#DC143C" />
                    </TouchableOpacity>
                  </View>
                ))
              )}
              <TouchableOpacity 
                style={styles.uploadButton}
                onPress={handleUploadDocument}
              >
                <Ionicons name="cloud-upload-outline" size={20} color="#4169E1" />
                <Text style={styles.uploadButtonText}>Ajouter un document</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalNote}>
              Une fois votre demande soumise, vous recevrez une référence de suivi et pourrez consulter l'avancement dans l'onglet "Mes Demandes".
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowRequestModal(false)}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSubmitBtn}
                onPress={handleSubmitRequest}
              >
                <Text style={styles.modalSubmitText}>Soumettre</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  //   backgroundImage: {
  //   flex: 1,
  //   width: '100%',
  //   height: '100%',
  // },
  header: {
    backgroundColor: '#4169E1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  activeTabButton: {
    backgroundColor: '#4169E1',
  },
  tabButtonText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 5,
    fontWeight: '500',
  },
  activeTabButtonText: {
    color: '#FFF',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2C3E50',
  },
  formCard: {
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
  formHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  formIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#E8EFFF',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  formInfo: {
    flex: 1,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  formCategory: {
    fontSize: 12,
    color: '#4169E1',
    fontWeight: '500',
    marginBottom: 4,
  },
  formDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 18,
  },
  formStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  formStat: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  downloadBtn: {
    flex: 0.45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4169E1',
    borderRadius: 8,
    paddingVertical: 10,
  },
  downloadBtnText: {
    color: '#4169E1',
    fontWeight: '500',
    marginLeft: 5,
  },
  requestBtn: {
    flex: 0.45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4169E1',
    borderRadius: 8,
    paddingVertical: 10,
  },
  requestBtnText: {
    color: '#FFF',
    fontWeight: '500',
    marginLeft: 5,
  },
  requestCard: {
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
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  requestDetails: {
    marginBottom: 15,
  },
  requestReference: {
    fontSize: 14,
    color: '#4169E1',
    fontWeight: '500',
    marginBottom: 4,
  },
  requestDate: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  trackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4169E1',
    borderRadius: 8,
    paddingVertical: 10,
  },
  trackBtnText: {
    color: '#4169E1',
    fontWeight: '500',
    marginLeft: 5,
  },
  documentCard: {
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
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  documentInfo: {
    flex: 1,
    marginLeft: 15,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  documentMeta: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  documentDetails: {
    marginBottom: 15,
  },
  documentDate: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  documentExpiry: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  documentDownloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E8B57',
    borderRadius: 8,
    paddingVertical: 10,
  },
  documentDownloadText: {
    color: '#FFF',
    fontWeight: '500',
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#4169E1',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
  modalSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  requiredDocItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  requiredDocText: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 8,
  },
  uploadedDocItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  uploadedDocInfo: {
    flex: 1,
    marginLeft: 10,
  },
  uploadedDocName: {
    fontSize: 14,
    color: '#2C3E50',
  },
  uploadedDocSize: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  noDocumentsText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4169E1',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  uploadButtonText: {
    color: '#4169E1',
    fontWeight: '500',
    marginLeft: 10,
  },
  modalNote: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelBtn: {
    flex: 0.45,
    borderWidth: 1,
    borderColor: '#DC143C',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#DC143C',
    fontWeight: '500',
  },
  modalSubmitBtn: {
    flex: 0.45,
    backgroundColor: '#4169E1',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalSubmitText: {
    color: '#FFF',
    fontWeight: '500',
  },
});