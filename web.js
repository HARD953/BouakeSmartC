import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Bell, 
  MapPin, 
  AlertCircle, 
  User, 
  Calendar, 
  ArrowLeft, 
  ChevronRight,
  Building,
  Car,
  Wrench,
  UtensilsCrossed,
  Truck,
  CreditCard,
  Hammer,
  Bed,
  FileText,
  Phone,
  Menu,
  X,
  Plus
} from 'lucide-react';

// Composants d'écran de développement
const DevelopmentScreen = ({ title, onBack, color = '#4169E1' }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-white shadow-sm border-b">
      <div className="flex items-center px-4 py-3">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Retour"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="ml-3 text-lg font-semibold text-gray-900">{title}</h1>
      </div>
    </div>
    
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-sm w-full">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building size={32} className="text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">Ce service sera bientôt disponible</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Développement en cours...</p>
      </div>
    </div>
  </div>
);

const ServicesScreen = ({ onBack, onNavigate }) => {
  const services = [
    { name: 'Logement', icon: Home, color: '#FF8C00', screenName: 'logement' },
    { name: 'Hôtels', icon: Bed, color: '#4169E1', screenName: 'hotels' },
    { name: 'Réparateurs', icon: Wrench, color: '#228B22', screenName: 'reparateurs' },
    { name: 'Restaurants', icon: UtensilsCrossed, color: '#DC143C', screenName: 'restaurants' },
    { name: 'Remorquage', icon: Truck, color: '#FFD700', screenName: 'remorquages' },
    { name: 'Mobile Money', icon: CreditCard, color: '#9932CC', screenName: 'mobilemoney' },
    { name: 'Travaux/Artisans', icon: Hammer, color: '#708090', screenName: 'travauxartisans' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center px-4 py-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Retour"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="ml-3 text-lg font-semibold text-gray-900">Services</h1>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <button
              key={index}
              onClick={() => onNavigate(service.screenName)}
              className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex items-center space-x-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: service.color }}
                >
                  <IconComponent size={24} className="text-white" />
                </div>
                <span className="text-lg font-medium text-gray-900">{service.name}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function BouakeSmartCity() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreServices, setShowMoreServices] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainServices = [
    {
      id: 1,
      title: 'Services',
      subtitle: 'Administration',
      icon: Building,
      color: '#4169E1',
      bgColor: '#EEF2FF',
      action: 'services'
    },
    {
      id: 2,
      title: 'Mobilité',
      subtitle: 'Transport',
      icon: Car,
      color: '#228B22',
      bgColor: '#F0FDF4',
      action: 'mobility'
    },
    {
      id: 3,
      title: 'Réservations',
      subtitle: 'Hôtels & Services',
      icon: Calendar,
      color: '#9932CC',
      bgColor: '#FAF5FF',
      action: 'reservations'
    },
    {
      id: 4,
      title: 'Signalement',
      subtitle: 'Alertes',
      icon: AlertCircle,
      color: '#DC143C',
      bgColor: '#FEF2F2',
      action: 'alert'
    }
  ];

  const additionalServices = [
    {
      id: 5,
      title: 'Documents',
      subtitle: 'Démarches',
      icon: FileText,
      color: '#4682B4',
      bgColor: '#EFF6FF',
      action: 'documents'
    },
    {
      id: 6,
      title: 'Mon compte',
      subtitle: 'Profil',
      icon: User,
      color: '#708090',
      bgColor: '#F8FAFC',
      action: 'profile'
    }
  ];

  const handleServicePress = (action) => {
    setCurrentScreen(action);
    setIsMenuOpen(false);
  };

  const handleBottomNavigation = (screen) => {
    setCurrentScreen(screen);
    setIsMenuOpen(false);
  };

  const renderServiceCard = (service) => {
    const IconComponent = service.icon;
    return (
      <button
        key={service.id}
        className="w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ backgroundColor: service.bgColor }}
        onClick={() => handleServicePress(service.action)}
      >
        <div className="flex items-start justify-between mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: service.color }}
          >
            <IconComponent size={24} className="text-white" />
          </div>
          <ChevronRight size={16} style={{ color: service.color }} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.title}</h3>
        <p className="text-sm text-gray-600">{service.subtitle}</p>
      </button>
    );
  };

  // Navigation des écrans
  if (currentScreen !== 'home') {
    const screenComponents = {
      mobility: <DevelopmentScreen title="Mobilité" onBack={() => setCurrentScreen('home')} />,
      services: <ServicesScreen 
        onBack={() => setCurrentScreen('home')} 
        onNavigate={(screen) => setCurrentScreen(screen)} 
      />,
      logement: <DevelopmentScreen title="Logement" onBack={() => setCurrentScreen('services')} />,
      hotels: <DevelopmentScreen title="Hôtels" onBack={() => setCurrentScreen('services')} />,
      reparateurs: <DevelopmentScreen title="Réparateurs" onBack={() => setCurrentScreen('services')} />,
      restaurants: <DevelopmentScreen title="Restaurants" onBack={() => setCurrentScreen('services')} />,
      remorquages: <DevelopmentScreen title="Remorquage" onBack={() => setCurrentScreen('services')} />,
      mobilemoney: <DevelopmentScreen title="Mobile Money" onBack={() => setCurrentScreen('services')} />,
      travauxartisans: <DevelopmentScreen title="Travaux/Artisans" onBack={() => setCurrentScreen('services')} />,
      map: <DevelopmentScreen title="Carte" onBack={() => setCurrentScreen('home')} />,
      documents: <DevelopmentScreen title="Documents" onBack={() => setCurrentScreen('home')} />,
      alert: <DevelopmentScreen title="Signalement" onBack={() => setCurrentScreen('home')} />,
      profile: <DevelopmentScreen title="Mon Compte" onBack={() => setCurrentScreen('home')} />
    };
    
    return screenComponents[currentScreen] || screenComponents.services;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Bouaké</h1>
                <p className="text-sm text-gray-500">Ville intelligente</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                aria-label="Notifications"
              >
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
            />
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {[
                { icon: Home, label: 'Accueil', screen: 'home' },
                { icon: Building, label: 'Services', screen: 'services' },
                { icon: MapPin, label: 'Carte', screen: 'map' },
                { icon: AlertCircle, label: 'Alerte', screen: 'alert' },
                { icon: User, label: 'Compte', screen: 'profile' }
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.screen}
                    onClick={() => handleBottomNavigation(item.screen)}
                    className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <IconComponent size={20} className="text-gray-600" />
                    <span className="text-gray-900">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <main className="pb-20">
        {/* Message de bienvenue */}
        <div className="p-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Bienvenue ! 👋</h2>
            <p className="text-blue-100 mb-4">
              Accédez facilement à tous les services de votre ville intelligente
            </p>
            <div className="flex items-center space-x-4 pt-4 border-t border-blue-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-blue-100">Services 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-blue-100">500K+ Citoyens</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services principaux */}
        <div className="px-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Services disponibles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mainServices.map(renderServiceCard)}
          </div>

          {/* Bouton "Voir plus" */}
          {!showMoreServices && (
            <button
              onClick={() => setShowMoreServices(true)}
              className="w-full mt-4 bg-white rounded-xl p-4 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Plus size={16} className="text-gray-600" />
              <span className="text-gray-600 font-medium">Voir plus de services</span>
            </button>
          )}

          {/* Services additionnels */}
          {showMoreServices && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {additionalServices.map(renderServiceCard)}
            </div>
          )}
        </div>

        {/* Actions rapides */}
        <div className="px-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions rapides</h2>
          <div className="space-y-3">
            <button
              onClick={() => handleServicePress('alert')}
              className="w-full bg-red-500 rounded-xl p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <AlertCircle size={24} className="text-white" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">Signaler un problème</h3>
                <p className="text-red-100 text-sm">Urgence ou problème dans la ville</p>
              </div>
            </button>
            
            <button
              onClick={() => alert('Numéros utiles - Fonctionnalité en développement')}
              className="w-full bg-green-500 rounded-xl p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <Phone size={24} className="text-white" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">Numéros utiles</h3>
                <p className="text-green-100 text-sm">Contacts d'urgence et services</p>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Navigation bottom */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          {[
            { icon: Home, label: 'Accueil', screen: 'home' },
            { icon: Building, label: 'Services', screen: 'services' },
            { icon: MapPin, label: 'Carte', screen: 'map' },
            { icon: AlertCircle, label: 'Alerte', screen: 'alert' },
            { icon: User, label: 'Compte', screen: 'profile' }
          ].map((item) => {
            const IconComponent = item.icon;
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => handleBottomNavigation(item.screen)}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                }`}
              >
                <IconComponent size={20} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}