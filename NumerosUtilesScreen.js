import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NumerosUtilesScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('urgence');

  const categories = [
    {
      id: 'urgence',
      title: 'Urgences',
      icon: 'alert-circle',
      color: '#DC143C'
    },
    {
      id: 'administration',
      title: 'Administration',
      icon: 'business',
      color: '#2E8B57'
    },
    {
      id: 'transport',
      title: 'Transport',
      icon: 'bus',
      color: '#4169E1'
    },
    {
      id: 'sante',
      title: 'Santé',
      icon: 'medical',
      color: '#228B22'
    },
    {
      id: 'services',
      title: 'Services Publics',
      icon: 'construct',
      color: '#FF8C00'
    }
  ];

  const numerosByCategory = {
    urgence: [
      {
        name: 'Police Nationale',
        number: '110',
        description: 'Urgences sécuritaires et criminelles',
        available: '24h/24'
      },
      {
        name: 'Sapeurs Pompiers',
        number: '180',
        description: 'Incendies et secours',
        available: '24h/24'
      },
      {
        name: 'SAMU',
        number: '185',
        description: 'Urgences médicales',
        available: '24h/24'
      },
      {
        name: 'Protection Civile',
        number: '199',
        description: 'Catastrophes naturelles',
        available: '24h/24'
      }
    ],
    administration: [
      {
        name: 'Mairie de Bouaké',
        number: '27 31 63 75',
        description: 'Services municipaux',
        available: 'Lun-Ven 8h-17h'
      },
      {
        name: 'Préfecture',
        number: '27 31 62 28',
        description: 'Services préfectoraux',
        available: 'Lun-Ven 8h-16h'
      },
      {
        name: 'Sous-Préfecture',
        number: '27 31 63 12',
        description: 'Services administratifs',
        available: 'Lun-Ven 8h-16h'
      },
      {
        name: 'Centre des Impôts',
        number: '27 31 64 89',
        description: 'Services fiscaux',
        available: 'Lun-Ven 8h-16h'
      }
    ],
    transport: [
      {
        name: 'Gare Routière',
        number: '27 31 65 43',
        description: 'Transport interurbain',
        available: '5h-22h'
      },
      {
        name: 'Taxi Bouaké',
        number: '07 08 09 10',
        description: 'Service de taxi',
        available: '24h/24'
      },
      {
        name: 'Transport Urbain',
        number: '27 31 66 77',
        description: 'Bus urbains',
        available: '6h-20h'
      },
      {
        name: 'Moto-taxi Association',
        number: '05 04 03 02',
        description: 'Transport par moto',
        available: '6h-22h'
      }
    ],
    sante: [
      {
        name: 'CHU Bouaké',
        number: '27 31 62 50',
        description: 'Hôpital universitaire',
        available: '24h/24'
      },
      {
        name: 'Hôpital Général',
        number: '27 31 63 41',
        description: 'Soins généraux',
        available: '24h/24'
      },
      {
        name: 'Centre de Santé Air France',
        number: '27 31 64 32',
        description: 'Soins de proximité',
        available: '7h-19h'
      },
      {
        name: 'Pharmacie de Garde',
        number: '177',
        description: 'Pharmacie de garde',
        available: 'Nuits et weekends'
      }
    ],
    services: [
      {
        name: 'CIE (Électricité)',
        number: '179',
        description: 'Compagnie Ivoirienne d\'Électricité',
        available: '24h/24'
      },
      {
        name: 'SODECI (Eau)',
        number: '175',
        description: 'Distribution d\'eau',
        available: '24h/24'
      },
      {
        name: 'Service Voirie',
        number: '27 31 65 88',
        description: 'Problèmes de voirie',
        available: 'Lun-Ven 8h-17h'
      },
      {
        name: 'Collecte Déchets',
        number: '27 31 66 99',
        description: 'Service de propreté',
        available: 'Lun-Sam 6h-18h'
      }
    ]
  };

  const handleCall = (number) => {
    Alert.alert(
      'Appeler',
      `Voulez-vous appeler le ${number} ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Appeler',
          onPress: () => {
            Linking.openURL(`tel:${number.replace(/\s/g, '')}`);
          }
        }
      ]
    );
  };

  const currentNumbers = numerosByCategory[selectedCategory] || [];
  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E8B57" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Numéros Utiles</Text>
          <Text style={styles.headerSubtitle}>Contacts d'urgence et services</Text>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && [
                  styles.selectedCategoryButton,
                  { backgroundColor: category.color }
                ]
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons 
                name={category.icon} 
                size={20} 
                color={selectedCategory === category.id ? '#FFF' : category.color} 
              />
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category.id && styles.selectedCategoryButtonText
              ]}>
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.categoryHeader}>
          <View style={[styles.categoryIcon, { backgroundColor: currentCategory?.color }]}>
            <Ionicons name={currentCategory?.icon} size={24} color="#FFF" />
          </View>
          <Text style={styles.categoryTitle}>{currentCategory?.title}</Text>
        </View>

        <View style={styles.numbersContainer}>
          {currentNumbers.map((contact, index) => (
            <View key={index} style={styles.contactCard}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactDescription}>{contact.description}</Text>
                <View style={styles.contactDetails}>
                  <Ionicons name="time-outline" size={14} color="#7F8C8D" />
                  <Text style={styles.contactAvailable}>{contact.available}</Text>
                </View>
              </View>
              <View style={styles.contactActions}>
                <Text style={styles.contactNumber}>{contact.number}</Text>
                <TouchableOpacity
                  style={[styles.callButton, { backgroundColor: currentCategory?.color }]}
                  onPress={() => handleCall(contact.number)}
                >
                  <Ionicons name="call" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {selectedCategory === 'urgence' && (
          <View style={styles.emergencyNotice}>
            <Ionicons name="warning" size={24} color="#FF4444" />
            <Text style={styles.emergencyNoticeText}>
              En cas d'urgence vitale, ces numéros sont gratuits et disponibles 24h/24.
              N'hésitez pas à les composer immédiatement.
            </Text>
          </View>
        )}

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color="#2E8B57" />
          <Text style={styles.infoText}>
            Ces numéros sont régulièrement mis à jour. 
            Ajoutez les plus importants à vos contacts pour un accès rapide.
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
    backgroundColor: '#2E8B57',
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
  categoriesContainer: {
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoriesScrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  selectedCategoryButton: {
    borderColor: 'transparent',
  },
  categoryButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  selectedCategoryButtonText: {
    color: '#FFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  numbersContainer: {
    gap: 15,
  },
  contactCard: {
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
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 6,
  },
  contactDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactAvailable: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 4,
  },
  contactActions: {
    alignItems: 'center',
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  emergencyNotice: {
    backgroundColor: '#FFE8E8',
    borderColor: '#FF4444',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 15,
  },
  emergencyNoticeText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#FF4444',
    lineHeight: 20,
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: '#E8F5E8',
    borderColor: '#2E8B57',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#2E8B57',
    lineHeight: 20,
  },
});