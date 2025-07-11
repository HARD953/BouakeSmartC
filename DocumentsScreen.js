import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Haptics from 'expo-haptics';


const { width, height } = Dimensions.get('window');

export default function DocumentsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('forms');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Données améliorées avec plus de détails
  const availableForms = [
    {
      id: 1,
      title: 'Certificat de Résidence',
      category: 'État Civil',
      description: 'Justificatif de domicile officiel pour vos démarches administratives',
      icon: 'home-outline',
      downloadCount: 1250,
      processingTime: '2-3 jours',
      price: '15,000',
      currency: 'FCFA',
      urgentPrice: '25,000',
      requiredDocuments: [
        'Copie de la Carte Nationale d\'Identité',
        'Facture récente (eau/électricité)',
        'Quittance de loyer ou acte de propriété',
        'Photo d\'identité récente'
      ],
      color: '#4169E1'
    },
    {
      id: 2,
      title: 'Permis de Construire',
      category: 'Urbanisme',
      description: 'Autorisation officielle pour tous vos projets de construction',
      icon: 'construct-outline',
      downloadCount: 89,
      processingTime: '15-30 jours',
      price: '50,000',
      currency: 'FCFA',
      urgentPrice: '75,000',
      requiredDocuments: [
        'Plan de construction certifié',
        'Titre de propriété ou bail emphytéotique',
        'Photocopie CNI du demandeur',
        'Plan de situation du terrain',
        'Étude d\'impact environnemental'
      ],
      color: '#FF6B35'
    },
    {
      id: 3,
      title: 'Licence Commerciale',
      category: 'Commerce',
      description: 'Autorisation d\'exercer une activité commerciale en toute légalité',
      icon: 'storefront-outline',
      downloadCount: 156,
      processingTime: '7-10 jours',
      price: '25,000',
      currency: 'FCFA',
      urgentPrice: '40,000',
      requiredDocuments: [
        'Extrait de casier judiciaire récent',
        'Photocopie CNI du demandeur',
        'Plan de localisation du commerce',
        'Contrat de bail commercial',
        'Attestation de formation professionnelle'
      ],
      color: '#2ECC71'
    },
    {
      id: 4,
      title: 'Certificat de Naissance',
      category: 'État Civil',
      description: 'Copie certifiée conforme de votre acte de naissance',
      icon: 'person-add-outline',
      downloadCount: 2100,
      processingTime: '1-2 jours',
      price: '5,000',
      currency: 'FCFA',
      urgentPrice: '8,000',
      requiredDocuments: [
        'Déclaration de naissance originale',
        'Photocopie CNI des parents',
        'Acte de mariage des parents',
        'Attestation de témoin'
      ],
      color: '#9B59B6'
    },
    {
      id: 5,
      title: 'Autorisation de Manifestation',
      category: 'Événements',
      description: 'Déclaration officielle pour organiser un événement public',
      icon: 'calendar-outline',
      downloadCount: 45,
      processingTime: '5-7 jours',
      price: '10,000',
      currency: 'FCFA',
      urgentPrice: '15,000',
      requiredDocuments: [
        'Liste complète des participants',
        'Itinéraire détaillé de la manifestation',
        'Plan de sécurité et d\'évacuation',
        'Attestation d\'assurance responsabilité civile'
      ],
      color: '#E74C3C'
    },
    {
      id: 6,
      title: 'Certificat de Décès',
      category: 'État Civil',
      description: 'Acte de décès officiel pour les démarches successorales',
      icon: 'document-text-outline',
      downloadCount: 180,
      processingTime: '1-2 jours',
      price: '3,000',
      currency: 'FCFA',
      urgentPrice: '5,000',
      requiredDocuments: [
        'Déclaration de décès médical',
        'Photocopie CNI du défunt',
        'Certificat médical de décès',
        'Témoignage de deux personnes'
      ],
      color: '#34495E'
    }
  ];

  const myRequests = [
    {
      id: 1,
      title: 'Certificat de Résidence',
      status: 'En cours',
      statusColor: '#F39C12',
      dateSubmitted: '15 Mai 2025',
      estimatedCompletion: '18 Mai 2025',
      reference: 'CR-2025-001234',
      progress: 65
    },
    {
      id: 2,
      title: 'Permis de Construire',
      status: 'En attente',
      statusColor: '#E74C3C',
      dateSubmitted: '10 Mai 2025',
      estimatedCompletion: '25 Mai 2025',
      reference: 'PC-2025-000567',
      progress: 25
    },
    {
      id: 3,
      title: 'Licence Commerciale',
      status: 'Prêt',
      statusColor: '#27AE60',
      dateSubmitted: '05 Mai 2025',
      estimatedCompletion: '15 Mai 2025',
      reference: 'LC-2025-000890',
      progress: 100
    }
  ];

  const myDocuments = [
    {
      id: 1,
      title: 'Certificat de Naissance',
      type: 'PDF',
      size: '245 KB',
      dateObtained: '12 Avril 2025',
      expiryDate: 'Permanent',
      verified: true
    },
    {
      id: 2,
      title: 'Certificat de Résidence',
      type: 'PDF',
      size: '189 KB',
      dateObtained: '28 Mars 2025',
      expiryDate: '28 Mars 2026',
      verified: true
    },
    {
      id: 3,
      title: 'Licence Commerciale',
      type: 'PDF',
      size: '312 KB',
      dateObtained: '15 Février 2025',
      expiryDate: '15 Février 2026',
      verified: false
    }
  ];

  const filteredForms = availableForms.filter(form =>
    form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabChange = useCallback((tab) => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setActiveTab(tab);
  }, []);

  const handleDownloadForm = useCallback((form) => {
    Alert.alert(
      'Télécharger le formulaire',
      `Voulez-vous télécharger le formulaire "${form.title}" ?\n\nTaille estimée: 2-3 MB`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Télécharger', 
          onPress: () => {
            setIsLoading(true);
            // Simulation du téléchargement
            setTimeout(() => {
              setIsLoading(false);
              Alert.alert('Succès', 'Formulaire téléchargé avec succès !');
            }, 2000);
          }
        }
      ]
    );
  }, []);

  const handleRequestForm = useCallback((form) => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setSelectedForm(form);
    setUploadedDocuments([]);
    setShowRequestModal(true);
  }, []);

  const handleUploadDocument = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
        multiple: false
      });
      
      if (result.type === 'success') {
        const fileInfo = await FileSystem.getInfoAsync(result.uri);
        const fileSizeInMB = (fileInfo.size / (1024 * 1024)).toFixed(2);
        
        if (fileInfo.size > 10 * 1024 * 1024) { // 10MB limit
          Alert.alert('Erreur', 'Le fichier ne doit pas dépasser 10 MB');
          return;
        }
        
        const newDocument = {
          id: Date.now().toString(),
          name: result.name,
          size: fileSizeInMB > 1 ? `${fileSizeInMB} MB` : `${(fileInfo.size / 1024).toFixed(2)} KB`,
          uri: result.uri,
          type: result.mimeType
        };
        
        setUploadedDocuments(prev => [...prev, newDocument]);
        
        if (Platform.OS === 'ios') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      }
    } catch (err) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la sélection du document');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeUploadedDocument = useCallback((id) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== id));
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, []);

  const handleSubmitRequest = useCallback(() => {
    if (uploadedDocuments.length < selectedForm.requiredDocuments.length) {
      Alert.alert(
        'Documents manquants',
        `Veuillez fournir tous les documents requis.\n\nRequis: ${selectedForm.requiredDocuments.length}\nFournis: ${uploadedDocuments.length}`,
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }
    
    setShowRequestModal(false);
    const reference = `${selectedForm.category.substring(0,2).toUpperCase()}-2025-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    
    Alert.alert(
      'Demande soumise avec succès',
      `Votre demande de "${selectedForm.title}" a été soumise.\n\nRéférence: ${reference}\n\nVous pouvez suivre l'avancement dans l'onglet "Mes Demandes".`,
      [{ text: 'OK', style: 'default' }]
    );
    
    if (Platform.OS === 'ios') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [uploadedDocuments, selectedForm]);

  const handleDownloadDocument = useCallback((doc) => {
    Alert.alert(
      'Télécharger le document',
      `Télécharger "${doc.title}" (${doc.size}) ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Télécharger', 
          onPress: () => Alert.alert('Succès', 'Document téléchargé avec succès !') 
        }
      ]
    );
  }, []);

  const renderTabButton = (tabKey, title, icon) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tabKey && styles.activeTabButton]}
      onPress={() => handleTabChange(tabKey)}
      activeOpacity={0.7}
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
      {/* Enhanced Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#7F8C8D" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher par nom, catégorie ou description..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#7F8C8D"
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#7F8C8D" />
          </TouchableOpacity>
        )}
      </View>

      {/* Results count */}
      <Text style={styles.resultsCount}>
        {filteredForms.length} formulaire(s) trouvé(s)
      </Text>

      {/* Enhanced Forms List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {filteredForms.map((form) => (
          <View key={form.id} style={[styles.formCard, { borderLeftColor: form.color }]}>
            <View style={styles.formHeader}>
              <View style={[styles.formIconContainer, { backgroundColor: form.color + '20' }]}>
                <Ionicons name={form.icon} size={24} color={form.color} />
              </View>
              <View style={styles.formInfo}>
                <Text style={styles.formTitle}>{form.title}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.formCategory}>{form.category}</Text>
                </View>
                <Text style={styles.formDescription}>{form.description}</Text>
              </View>
            </View>
            
            <View style={styles.formStats}>
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={16} color="#7F8C8D" />
                <Text style={styles.formStat}>{form.processingTime}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="card-outline" size={16} color="#7F8C8D" />
                <Text style={styles.formStat}>{form.price} {form.currency}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="download-outline" size={16} color="#7F8C8D" />
                <Text style={styles.formStat}>{form.downloadCount}</Text>
              </View>
            </View>

            <View style={styles.formActions}>
              <TouchableOpacity
                style={[styles.downloadBtn, { borderColor: form.color }]}
                onPress={() => handleDownloadForm(form)}
                activeOpacity={0.7}
              >
                <Ionicons name="download-outline" size={16} color={form.color} />
                <Text style={[styles.downloadBtnText, { color: form.color }]}>Télécharger</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.requestBtn, { backgroundColor: form.color }]}
                onPress={() => handleRequestForm(form)}
                activeOpacity={0.7}
              >
                <Ionicons name="send-outline" size={16} color="#FFF" />
                <Text style={styles.requestBtnText}>Demander</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderRequestsTab = () => (
    <View style={styles.tabContent}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {myRequests.map((request) => (
          <View key={request.id} style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <Text style={styles.requestTitle}>{request.title}</Text>
              <View style={[styles.statusBadge, { backgroundColor: request.statusColor }]}>
                <Text style={styles.statusText}>{request.status}</Text>
              </View>
            </View>
            
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${request.progress}%`, backgroundColor: request.statusColor }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>{request.progress}%</Text>
            </View>
            
            <View style={styles.requestDetails}>
              <Text style={styles.requestReference}>📋 {request.reference}</Text>
              <Text style={styles.requestDate}>📅 Soumis le: {request.dateSubmitted}</Text>
              <Text style={styles.requestDate}>⏰ Estimation: {request.estimatedCompletion}</Text>
            </View>

            <TouchableOpacity style={styles.trackBtn} activeOpacity={0.7}>
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
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {myDocuments.map((doc) => (
          <View key={doc.id} style={styles.documentCard}>
            <View style={styles.documentHeader}>
              <View style={styles.documentIconContainer}>
                <Ionicons name="document-text-outline" size={24} color="#2E8B57" />
                {doc.verified && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark-circle" size={16} color="#27AE60" />
                  </View>
                )}
              </View>
              <View style={styles.documentInfo}>
                <Text style={styles.documentTitle}>{doc.title}</Text>
                <Text style={styles.documentMeta}>{doc.type} • {doc.size}</Text>
                {doc.verified && (
                  <Text style={styles.verifiedText}>✓ Vérifié</Text>
                )}
              </View>
            </View>
            
            <View style={styles.documentDetails}>
              <Text style={styles.documentDate}>📅 Obtenu le: {doc.dateObtained}</Text>
              <Text style={[
                styles.documentExpiry, 
                { color: doc.expiryDate === 'Permanent' ? '#27AE60' : '#7F8C8D' }
              ]}>
                ⏰ Expire: {doc.expiryDate}
              </Text>
            </View>

            <View style={styles.documentActions}>
              <TouchableOpacity
                style={styles.documentViewBtn}
                activeOpacity={0.7}
              >
                <Ionicons name="eye-outline" size={16} color="#3498DB" />
                <Text style={styles.documentViewText}>Voir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.documentDownloadBtn}
                onPress={() => handleDownloadDocument(doc)}
                activeOpacity={0.7}
              >
                <Ionicons name="cloud-download-outline" size={16} color="#FFF" />
                <Text style={styles.documentDownloadText}>Télécharger</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4169E1" />
      
      {/* Enhanced Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Documents Administratifs</Text>
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="notifications-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Enhanced Tab Navigation */}
      <View style={styles.tabContainer}>
        {renderTabButton('forms', 'Formulaires', 'document-outline')}
        {renderTabButton('requests', 'Mes Demandes', 'time-outline')}
        {renderTabButton('documents', 'Mes Documents', 'folder-outline')}
      </View>

      {/* Tab Content */}
      {activeTab === 'forms' && renderFormsTab()}
      {activeTab === 'requests' && renderRequestsTab()}
      {activeTab === 'documents' && renderDocumentsTab()}

      {/* Enhanced Request Modal */}
      <Modal
        visible={showRequestModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRequestModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Nouvelle Demande</Text>
                <TouchableOpacity 
                  onPress={() => setShowRequestModal(false)}
                  style={styles.modalCloseBtn}
                >
                  <Ionicons name="close" size={24} color="#7F8C8D" />
                </TouchableOpacity>
              </View>
              
              <Text style={[styles.modalSubtitle, { color: selectedForm?.color }]}>
                {selectedForm?.title}
              </Text>
              
              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>📋 Informations</Text>
                <View style={styles.infoGrid}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Temps de traitement:</Text>
                    <Text style={styles.infoValue}>{selectedForm?.processingTime}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Frais standard:</Text>
                    <Text style={styles.infoValue}>{selectedForm?.price} {selectedForm?.currency}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Traitement urgent:</Text>
                    <Text style={styles.infoValue}>{selectedForm?.urgentPrice} {selectedForm?.currency}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>📄 Documents Requis</Text>
                {selectedForm?.requiredDocuments.map((doc, index) => (
                  <View key={index} style={styles.requiredDocItem}>
                    <View style={styles.requiredDocIcon}>
                      <Ionicons name="document-text-outline" size={16} color="#4169E1" />
                    </View>
                    <Text style={styles.requiredDocText}>{doc}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>
                  📎 Documents Uploadés ({uploadedDocuments.length}/{selectedForm?.requiredDocuments.length})
                </Text>
                {uploadedDocuments.length === 0 ? (
                  <View style={styles.emptyState}>
                    <Ionicons name="cloud-upload-outline" size={48} color="#E0E0E0" />
                    <Text style={styles.noDocumentsText}>Aucun document uploadé</Text>
                  </View>
                ) : (
                  uploadedDocuments.map((doc) => (
                    <View key={doc.id} style={styles.uploadedDocItem}>
                      <Ionicons name="document-attach-outline" size={16} color="#27AE60" />
                      <View style={styles.uploadedDocInfo}>
                        <Text style={styles.uploadedDocName}>{doc.name}</Text>
                        <Text style={styles.uploadedDocSize}>{doc.size}</Text>
                      </View>
                      <TouchableOpacity onPress={() => removeUploadedDocument(doc.id)}>
                        <Ionicons name="trash-outline" size={16} color="#E74C3C" />
                      </TouchableOpacity>
                    </View>
                  ))
                )}
                
                <TouchableOpacity 
                  style={styles.uploadButton}
                  onPress={handleUploadDocument}
                  disabled={isLoading}
                  activeOpacity={0.7}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#4169E1" />
                  ) : (
                    <Ionicons name="cloud-upload-outline" size={20} color="#4169E1" />
                  )}
                  <Text style={styles.uploadButtonText}>
                    {isLoading ? 'Chargement...' : 'Ajouter un document'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.noteContainer}>
                <Ionicons name="information-circle-outline" size={20} color="#3498DB" />
                <Text style={styles.modalNote}>
                  Une fois votre demande soumise, vous recevrez une référence de suivi et pourrez consulter l'avancement dans l'onglet "Mes Demandes".
                </Text>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalCancelBtn}
                  onPress={() => setShowRequestModal(false)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalCancelText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalSubmitBtn, { backgroundColor: selectedForm?.color }]}
                  onPress={handleSubmitRequest}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalSubmitText}>Soumettre la demande</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Loading Overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4169E1" />
            <Text style={styles.loadingText}>Traitement en cours...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#4169E1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  headerAction: {
    padding: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  activeTabButton: {
    backgroundColor: '#4169E1',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7F8C8D',
    marginLeft: 8,
  },
  activeTabButtonText: {
    color: '#FFF',
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
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
    fontSize: 14,
    color: '#2C3E50',
  },
  resultsCount: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    marginBottom: 10,
  },
  formCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  formHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  formIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  formInfo: {
    flex: 1,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECF0F1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  formCategory: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F8C8D',
  },
  formDescription: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 18,
  },
  formStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formStat: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 4,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  downloadBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 8,
  },
  downloadBtnText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  requestBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
  },
  requestBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
    marginLeft: 6,
  },
  requestCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
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
    marginBottom: 12,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFF',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#ECF0F1',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  requestDetails: {
    marginBottom: 12,
  },
  requestReference: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  requestDate: {
    fontSize: 13,
    color: '#7F8C8D',
  },
  trackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#4169E1',
    borderRadius: 6,
  },
  trackBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4169E1',
    marginLeft: 6,
  },
  documentCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
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
    marginBottom: 12,
  },
  documentIconContainer: {
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E8F8F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 2,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  documentMeta: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: '#27AE60',
  },
  documentDetails: {
    marginBottom: 12,
  },
  documentDate: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  documentExpiry: {
    fontSize: 13,
  },
  documentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  documentViewBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3498DB',
    borderRadius: 6,
    paddingVertical: 8,
    marginRight: 8,
  },
  documentViewText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3498DB',
    marginLeft: 6,
  },
  documentDownloadBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4169E1',
    borderRadius: 6,
    paddingVertical: 8,
  },
  documentDownloadText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
    marginLeft: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 15,
    maxHeight: height * 0.85,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  modalSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  infoItem: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2C3E50',
  },
  requiredDocItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requiredDocIcon: {
    marginRight: 8,
  },
  requiredDocText: {
    fontSize: 13,
    color: '#2C3E50',
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  noDocumentsText: {
    fontSize: 14,
    color: '#BDC3C7',
    marginTop: 10,
  },
  uploadedDocItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  uploadedDocInfo: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  uploadedDocName: {
    fontSize: 13,
    color: '#2C3E50',
    marginBottom: 2,
  },
  uploadedDocSize: {
    fontSize: 11,
    color: '#7F8C8D',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4169E1',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 15,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4169E1',
    marginLeft: 8,
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: '#EAF2F8',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  modalNote: {
    fontSize: 13,
    color: '#2C3E50',
    flex: 1,
    marginLeft: 8,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1',
  },
  modalCancelBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 10,
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7F8C8D',
  },
  modalSubmitBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
  },
  modalSubmitText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#2C3E50',
    marginTop: 15,
  },
});