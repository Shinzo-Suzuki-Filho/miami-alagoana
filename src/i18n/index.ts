import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      welcome: 'Bem-vindo ao Miami Alagoana',
      home: 'Início',
      map: 'Mapa',
      ai: 'Assistente IA',
      report: 'Denúncia',
      beaches: 'Praias',
      hotels: 'Hotéis',
      restaurants: 'Bares e Restaurantes',
      shopping: 'Shopping Centers',
      crafts: 'Artesanato',
      banks: 'Bancos',
      health: 'Saúde',
      supermarkets: 'Supermercados',
      security: 'Segurança',
      historic: 'Centros Históricos',
      museums: 'Museus',
      events: 'Eventos',
      weather: 'Clima',
      highContrast: 'Alto Contraste',
      denuncia_info: 'Notifique as autoridades sobre furtos, roubos ou emergências.',
    },
  },
  en: {
    translation: {
      welcome: 'Welcome to Miami Alagoana',
      home: 'Home',
      map: 'Map',
      ai: 'AI Assistant',
      report: 'Report',
      beaches: 'Beaches',
      hotels: 'Hotels',
      restaurants: 'Bars & Restaurants',
      shopping: 'Shopping Malls',
      crafts: 'Craftsmanship',
      banks: 'Banks',
      health: 'Health',
      supermarkets: 'Supermarkets',
      security: 'Security',
      historic: 'Historic Centers',
      museums: 'Museums',
      events: 'Events',
      weather: 'Weather',
      highContrast: 'High Contrast',
      denuncia_info: 'Notify authorities about thefts, robberies, or emergencies.',
    },
  },
  es: {
    translation: {
      welcome: 'Bienvenido a Miami Alagoana',
      home: 'Inicio',
      map: 'Mapa',
      ai: 'Asistente IA',
      report: 'Denuncia',
      beaches: 'Playas',
      hotels: 'Hoteles',
      restaurants: 'Bares y Restaurantes',
      shopping: 'Centros Comerciales',
      crafts: 'Artesanía',
      banks: 'Bancos',
      health: 'Salud',
      supermarkets: 'Supermercados',
      security: 'Seguridad',
      historic: 'Centros Históricos',
      museums: 'Museos',
      events: 'Eventos',
      weather: 'Clima',
      highContrast: 'Alto Contraste',
      denuncia_info: 'Notifique a las autoridades sobre hurtos, robos o emergencias.',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
