import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AlerteScreen({ navigation }) {
  const [selectedAlertType, setSelectedAlertType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const alertTypes = [
    {
      id: 'incendie',
      title: 'Incendie',
      icon: 'flame-outline',
      color: '#FF4444',
      description: 'Signaler un incendie ou un risque d\'incendie'
    },
    {
      id: 'accident',
      title: 'Accident',
      icon: 'car-outline',
      color: '#FF8C00',
      description: 'Accident de la route ou autre urgence'
    },
    {
      id: 'medical',
      title: 'Urgence Médicale',
      icon: 'medical-outline',
      color: '#DC143C',
      description: 'Urgence médicale nécessitant des secours'
    },
    {
      id: 'criminel',
      title: 'Activité Suspecte',
      icon: 'eye-outline',
      color: '#8B008B',
      description: 'Activité criminelle ou suspecte'
    },
    {
      id: 'catastrophe',
      title: 'Catastrophe Naturelle',
      icon: 'thunderstorm-outline',
      color: '#4682B4',
      description: 'Inondation, glissement de terrain, etc.'
    },
    {
      id: 'autre',
      title: 'Autre Urgence',
      icon: 'alert-circle-outline',
      color: '#696969',
      description: 'Autre type d\'urgence'
    }
  ];

  const handleSubmitAlert = () => {
    if (!selectedAlertType) {
      Alert.alert('Erreur', 'Veuillez sélectionner un type d\'alerte');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Erreur', 'Veuillez décrire la situation');
      return;
    }

    if (!location.trim()) {
      Alert.alert('Erreur', 'Veuillez préciser le lieu');
      return;
    }

    setIsSubmitting(true);

    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Alerte Envoyée',
        'Votre alerte a été transmise aux services d\'urgence. Un numéro de référence vous sera communiqué par SMS.',
        [
          {
            text: 'OK',
            onPress: () => {
              setSelectedAlertType('');
              setDescription('');
              setLocation('');
            }
          }
        ]
      );
    }, 2000);
  };

  const selectedAlert = alertTypes.find(alert => alert.id === selectedAlertType);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#DC143C" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Alerte Urgente</Text>
          <Text style={styles.headerSubtitle}>Signalement d'urgence</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.warningBox}>
          <Ionicons name="warning" size={24} color="#FF4444" />
          <Text style={styles.warningText}>
            En cas d'urgence vitale immédiate, composez directement le 
            <Text style={styles.emergencyNumber}> 110 </Text>
            (Police) ou le 
            <Text style={styles.emergencyNumber}> 180 </Text>
            (Pompiers)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type d'alerte</Text>
          <View style={styles.alertTypesContainer}>
            {alertTypes.map((alertType) => (
              <TouchableOpacity
                key={alertType.id}
                style={[
                  styles.alertTypeCard,
                  selectedAlertType === alertType.id && styles.selectedAlertType
                ]}
                onPress={() => setSelectedAlertType(alertType.id)}
              >
                <View style={[styles.alertTypeIcon, { backgroundColor: alertType.color }]}>
                  <Ionicons name={alertType.icon} size={20} color="#FFF" />
                </View>
                <View style={styles.alertTypeInfo}>
                  <Text style={styles.alertTypeTitle}>{alertType.title}</Text>
                  <Text style={styles.alertTypeDescription}>{alertType.description}</Text>
                </View>
                {selectedAlertType === alertType.id && (
                  <Ionicons name="checkmark-circle" size={24} color={alertType.color} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedAlertType && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Lieu de l'incident</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Adresse précise ou point de repère"
                value={location}
                onChangeText={setLocation}
                multiline={false}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description de la situation</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Décrivez brièvement la situation d'urgence..."
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: selectedAlert?.color || '#DC143C' }
              ]}
              onPress={handleSubmitAlert}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Text style={styles.submitButtonText}>Envoi en cours...</Text>
              ) : (
                <>
                  <Ionicons name="send" size={20} color="#FFF" />
                  <Text style={styles.submitButtonText}>Envoyer l'alerte</Text>
                </>
              )}
            </TouchableOpacity>
          </>
        )}

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color="#2E8B57" />
          <Text style={styles.infoText}>
            Votre localisation sera automatiquement partagée avec les services d'urgence pour une intervention rapide.
          </Text>
        </View>
      </ScrollView>
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
  headerTextContainer: {
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
  content: {
    flex: 1,
    padding: 20,
  },
  warningBox: {
    backgroundColor: '#FFE8E8',
    borderColor: '#FF4444',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  warningText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  emergencyNumber: {
    fontWeight: 'bold',
    color: '#FF4444',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  alertTypesContainer: {
    gap: 10,
  },
  alertTypeCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAlertType: {
    borderColor: '#DC143C',
    backgroundColor: '#FFF5F5',
  },
  alertTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  alertTypeInfo: {
    flex: 1,
  },
  alertTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  alertTypeDescription: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  textInput: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E1E8ED',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  textArea: {
    height: 100,
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  infoBox: {
    backgroundColor: '#E8F5E8',
    borderColor: '#2E8B57',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#2E8B57',
    lineHeight: 20,
  },
});