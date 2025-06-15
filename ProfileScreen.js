import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');
  
  // État pour les paramètres
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('Français');
  
  // Données utilisateur simulées
  const [userProfile, setUserProfile] = useState({
    name: 'Jean-Baptiste KOFFI',
    email: 'jb.koffi@email.ci',
    phone: '+225 07 XX XX XX XX',
    address: 'Quartier Résidentiel, Bouaké',
    dateOfBirth: '15/03/1985',
    profession: 'Enseignant',
    emergencyContact: '+225 05 XX XX XX XX'
  });

  // Historique des activités simulé
  const activities = [
    {
      id: 1,
      type: 'document',
      title: 'Demande d\'extrait de naissance',
      date: '23/05/2025',
      status: 'En cours',
      icon: 'document-text-outline',
      color: '#4169E1'
    },
    {
      id: 2,
      type: 'signalement',
      title: 'Signalement éclairage public',
      date: '20/05/2025',
      status: 'Résolu',
      icon: 'bulb-outline',
      color: '#228B22'
    },
    {
      id: 3,
      type: 'transport',
      title: 'Consultation ligne de bus 2',
      date: '18/05/2025',
      status: 'Consulté',
      icon: 'bus-outline',
      color: '#2E8B57'
    },
    {
      id: 4,
      type: 'alerte',
      title: 'Alerte sécurité envoyée',
      date: '15/05/2025',
      status: 'Traitée',
      icon: 'shield-checkmark-outline',
      color: '#DC143C'
    }
  ];

  // Statistiques d'utilisation
  const stats = [
    { label: 'Services utilisés', value: '12', icon: 'apps-outline', color: '#2E8B57' },
    { label: 'Signalements', value: '3', icon: 'flag-outline', color: '#FF8C00' },
    { label: 'Documents obtenus', value: '5', icon: 'document-outline', color: '#4169E1' },
    { label: 'Points civiques', value: '850', icon: 'star-outline', color: '#FFD700' }
  ];

  const menuSections = [
    {
      title: 'Informations personnelles',
      items: [
        { id: 'personal', title: 'Profil personnel', icon: 'person-outline', subtitle: 'Nom, email, téléphone' },
        { id: 'address', title: 'Adresse', icon: 'location-outline', subtitle: userProfile.address },
        { id: 'emergency', title: 'Contact d\'urgence', icon: 'call-outline', subtitle: userProfile.emergencyContact }
      ]
    },
    {
      title: 'Mes activités',
      items: [
        { id: 'history', title: 'Historique des services', icon: 'time-outline', subtitle: `${activities.length} activités récentes` },
        { id: 'documents', title: 'Mes documents', icon: 'folder-outline', subtitle: '5 documents sauvegardés' },
        { id: 'favorites', title: 'Services favoris', icon: 'heart-outline', subtitle: '3 services marqués' }
      ]
    },
    {
      title: 'Paramètres',
      items: [
        { id: 'notifications', title: 'Notifications', icon: 'notifications-outline', subtitle: 'Gérer les alertes' },
        { id: 'privacy', title: 'Confidentialité', icon: 'shield-outline', subtitle: 'Données et localisation' },
        { id: 'language', title: 'Langue', icon: 'language-outline', subtitle: language },
        { id: 'accessibility', title: 'Accessibilité', icon: 'accessibility-outline', subtitle: 'Options d\'affichage' }
      ]
    },
    {
      title: 'Support',
      items: [
        { id: 'help', title: 'Aide', icon: 'help-circle-outline', subtitle: 'FAQ et guides' },
        { id: 'feedback', title: 'Avis et suggestions', icon: 'chatbubble-outline', subtitle: 'Votre opinion compte' },
        { id: 'contact', title: 'Nous contacter', icon: 'mail-outline', subtitle: 'Support technique' }
      ]
    }
  ];

  const handleMenuPress = (itemId) => {
    switch (itemId) {
      case 'personal':
        setSelectedSection('personal');
        setEditModalVisible(true);
        break;
      case 'history':
        setSelectedSection('history');
        setModalVisible(true);
        break;
      case 'notifications':
        setSelectedSection('notifications');
        setModalVisible(true);
        break;
      case 'privacy':
        setSelectedSection('privacy');
        setModalVisible(true);
        break;
      case 'language':
        setSelectedSection('language');
        setModalVisible(true);
        break;
      default:
        Alert.alert('Information', `Section ${itemId} - En développement`);
    }
  };

  const renderPersonalInfoModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={editModalVisible}
      onRequestClose={() => setEditModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Informations personnelles</Text>
            <TouchableOpacity 
              onPress={() => setEditModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close-outline" size={24} color="#2C3E50" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nom complet</Text>
              <TextInput
                style={styles.textInput}
                value={userProfile.name}
                onChangeText={(text) => setUserProfile({...userProfile, name: text})}
                placeholder="Votre nom complet"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={userProfile.email}
                onChangeText={(text) => setUserProfile({...userProfile, email: text})}
                placeholder="votre@email.ci"
                keyboardType="email-address"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Téléphone</Text>
              <TextInput
                style={styles.textInput}
                value={userProfile.phone}
                onChangeText={(text) => setUserProfile({...userProfile, phone: text})}
                placeholder="+225 XX XX XX XX XX"
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Profession</Text>
              <TextInput
                style={styles.textInput}
                value={userProfile.profession}
                onChangeText={(text) => setUserProfile({...userProfile, profession: text})}
                placeholder="Votre profession"
              />
            </View>
          </ScrollView>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => {
              Alert.alert('Succès', 'Informations mises à jour avec succès');
              setEditModalVisible(false);
            }}
          >
            <Text style={styles.saveButtonText}>Sauvegarder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderHistoryModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible && selectedSection === 'history'}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Historique des activités</Text>
            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close-outline" size={24} color="#2C3E50" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.activitiesList}>
            {activities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: activity.color }]}>
                  <Ionicons name={activity.icon} size={20} color="#FFF" />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                </View>
                <Text style={[styles.activityStatus, { 
                  color: activity.status === 'Résolu' || activity.status === 'Traitée' ? '#228B22' : 
                         activity.status === 'En cours' ? '#FF8C00' : '#7F8C8D' 
                }]}>
                  {activity.status}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderNotificationsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible && selectedSection === 'notifications'}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Paramètres de notification</Text>
            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close-outline" size={24} color="#2C3E50" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingsContainer}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Notifications push</Text>
                <Text style={styles.settingSubtitle}>Recevoir les alertes importantes</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E0E0E0', true: '#2E8B57' }}
                thumbColor={notifications ? '#FFF' : '#FFF'}
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Alertes de sécurité</Text>
                <Text style={styles.settingSubtitle}>Incidents dans votre zone</Text>
              </View>
              <Switch
                value={true}
                trackColor={{ false: '#E0E0E0', true: '#2E8B57' }}
                thumbColor="#FFF"
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Mises à jour transport</Text>
                <Text style={styles.settingSubtitle}>Horaires et perturbations</Text>
              </View>
              <Switch
                value={true}
                trackColor={{ false: '#E0E0E0', true: '#2E8B57' }}
                thumbColor="#FFF"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderPrivacyModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible && selectedSection === 'privacy'}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Confidentialité</Text>
            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close-outline" size={24} color="#2C3E50" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingsContainer}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Services de localisation</Text>
                <Text style={styles.settingSubtitle}>Pour les services géolocalisés</Text>
              </View>
              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
                trackColor={{ false: '#E0E0E0', true: '#2E8B57' }}
                thumbColor={locationServices ? '#FFF' : '#FFF'}
              />
            </View>
            
            <TouchableOpacity style={styles.privacyOption}>
              <Text style={styles.privacyOptionText}>Politique de confidentialité</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="#7F8C8D" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.privacyOption}>
              <Text style={styles.privacyOptionText}>Gestion des données</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="#7F8C8D" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9932CC" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mon Profil</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JK</Text>
            </View>
            <TouchableOpacity style={styles.avatarEditBtn}>
              <Ionicons name="camera-outline" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userEmail}>{userProfile.email}</Text>
          <Text style={styles.userLocation}>{userProfile.address}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                <Ionicons name={stat.icon} size={20} color="#FFF" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.id)}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIcon}>
                    <Ionicons name={item.icon} size={22} color="#7F8C8D" />
                  </View>
                  <View style={styles.menuText}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward-outline" size={20} color="#7F8C8D" />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Emergency Section */}
        <View style={styles.emergencySection}>
          <TouchableOpacity style={styles.emergencyButton}>
            <Ionicons name="call-outline" size={24} color="#FFF" />
            <Text style={styles.emergencyText}>Numéros d'urgence</Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Bouaké Smart City v1.0.0</Text>
          <Text style={styles.versionSubtext}>Dernière mise à jour: 25 Mai 2025</Text>
        </View>
      </ScrollView>

      {/* Modals */}
      {renderPersonalInfoModal()}
      {renderHistoryModal()}
      {renderNotificationsModal()}
      {renderPrivacyModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#9932CC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  editButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#9932CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  avatarEditBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2E8B57',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 3,
  },
  userLocation: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    padding: 20,
    paddingBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  emergencySection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  emergencyButton: {
    backgroundColor: '#DC143C',
    borderRadius: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  emergencyText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  versionInfo: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#BDC3C7',
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
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  closeButton: {
    padding: 5,
  },
  formContainer: {
    maxHeight: 400,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2C3E50',
    backgroundColor: '#FFF',
  },
  saveButton: {
    backgroundColor: '#9932CC',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activitiesList: {
    maxHeight: 400,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  activityStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  settingsContainer: {
    paddingVertical: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  privacyOptionText: {
    fontSize: 16,
    color: '#2C3E50',
  },
});

export default ProfileScreen;