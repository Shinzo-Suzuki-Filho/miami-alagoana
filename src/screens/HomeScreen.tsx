import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Colors, Spacing, HighContrastColors } from '../theme/Colors';
import { useTranslation } from 'react-i18next';
import { getWeather } from '../services/WeatherService';
import { 
  Palmtree, 
  Hotel, 
  Utensils, 
  ShoppingBag, 
  Palette, 
  Landmark, 
  ShieldAlert, 
  CloudSun,
  Map as MapIcon,
  MessageSquare,
  AlertTriangle,
  Sun,
  Eye
} from 'lucide-react-native';

const categories = [
  { id: 'beaches', icon: Palmtree, color: '#00CED1' },
  { id: 'hotels', icon: Hotel, color: '#DAA520' },
  { id: 'restaurants', icon: Utensils, color: '#FF4500' },
  { id: 'shopping', icon: ShoppingBag, color: '#8A2BE2' },
  { id: 'crafts', icon: Palette, color: '#A0522D' },
  { id: 'historic', icon: Landmark, color: '#4682B4' },
  { id: 'security', icon: ShieldAlert, color: '#B22222' },
];

const HomeScreen = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  const [weather, setWeather] = React.useState<any>(null);
  const [isHighContrast, setIsHighContrast] = React.useState(false);

  React.useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    const data = await getWeather();
    setWeather(data);
  };

  const theme = isHighContrast ? HighContrastColors : Colors;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.primary }]}>Miami Alagoana</Text>
          <View style={styles.headerRight}>
             <TouchableOpacity 
              onPress={() => setIsHighContrast(!isHighContrast)}
              style={styles.actionIconButton}
            >
              <Eye color={theme.primary} size={24} />
            </TouchableOpacity>
            <View style={styles.langButtons}>
              {['pt', 'en', 'es'].map((lng) => (
                <TouchableOpacity 
                  key={lng} 
                  onPress={() => changeLanguage(lng)}
                  style={[styles.langBtn, i18n.language === lng && { backgroundColor: theme.primary + '20', borderColor: theme.primary }]}
                >
                  <Text style={[styles.langText, { color: theme.text }]}>{lng.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.weatherCard, { backgroundColor: theme.surface }]}>
          <CloudSun color={theme.primary} size={32} />
          <View style={styles.weatherInfo}>
            <Text style={[styles.weatherTemp, { color: theme.text }]}>
              {weather ? `${Math.round(weather.main.temp)}°C` : '--°C'}
            </Text>
            <Text style={[styles.weatherDesc, { color: theme.textSecondary }]}>
              {weather ? weather.weather[0].description : 'Maceió, AL'}
            </Text>
          </View>
          <TouchableOpacity onPress={fetchWeather}>
             <Sun size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.welcomeText, { color: theme.textSecondary }]}>{t('welcome')}</Text>

        <View style={styles.grid}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              style={[styles.card, { backgroundColor: theme.surface }]}
              onPress={() => navigation.navigate('Category', { categoryId: cat.id })}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '20' }]}>
                <cat.icon size={32} color={cat.color} />
              </View>
              <Text style={[styles.cardText, { color: theme.text }]}>{t(cat.id)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.surface }]} onPress={() => navigation.navigate('Map')}>
            <MapIcon color={theme.primary} size={24} />
            <Text style={[styles.actionText, { color: theme.primary }]}>{t('map')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.surface }]} onPress={() => navigation.navigate('AI')}>
            <MessageSquare color={theme.primary} size={24} />
            <Text style={[styles.actionText, { color: theme.primary }]}>{t('ai')}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.denunciaCard} 
          onPress={() => navigation.navigate('Report')}
        >
          <AlertTriangle color="#FFF" size={24} />
          <View style={styles.denunciaInfo}>
            <Text style={styles.denunciaTitle}>{t('report')}</Text>
            <Text style={styles.denunciaSub}>{t('denuncia_info')}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.l,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIconButton: {
    padding: Spacing.s,
    marginRight: Spacing.s,
  },
  weatherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.m,
    borderRadius: 16,
    marginBottom: Spacing.l,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weatherInfo: {
    flex: 1,
    marginLeft: Spacing.m,
  },
  weatherTemp: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  weatherDesc: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  langButtons: {
    flexDirection: 'row',
  },
  langBtn: {
    padding: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginLeft: 4,
  },
  activeLangBtn: {
    backgroundColor: Colors.primary + '20',
    borderColor: Colors.primary,
  },
  langText: {
    fontSize: 12,
    fontWeight: '600',
  },
  welcomeText: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: Colors.surface,
    padding: Spacing.m,
    borderRadius: 16,
    marginBottom: Spacing.m,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    padding: Spacing.s,
    borderRadius: 12,
    marginBottom: Spacing.s,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.text,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.m,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    padding: Spacing.m,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    marginLeft: 8,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  denunciaCard: {
    backgroundColor: '#B22222',
    flexDirection: 'row',
    padding: Spacing.m,
    borderRadius: 16,
    marginTop: Spacing.l,
    alignItems: 'center',
  },
  denunciaInfo: {
    marginLeft: Spacing.m,
    flex: 1,
  },
  denunciaTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  denunciaSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
});

export default HomeScreen;
