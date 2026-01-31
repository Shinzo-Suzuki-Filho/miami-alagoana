import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';
import { Colors, Spacing } from '../theme/Colors';
import { Star, MapPin, ChevronRight } from 'lucide-react-native';

const CATEGORY_DATA: any = {
  beaches: [
    { id: '1', name: 'Praia de Pajuçara', location: 'Maceió', rating: 4.8, description: 'Famosa pelas piscinas naturais e jangadas.' },
    { id: '2', name: 'Praia do Francês', location: 'Marechal Deodoro', rating: 4.9, description: 'Águas cristalinas e ótimas para surf e banho.' },
    { id: '3', name: 'Maragogi', location: 'Litoral Norte', rating: 5.0, description: 'O Caribe Brasileiro com galés incríveis.' },
    { id: '4', name: 'Praia do Gunga', location: 'Roteiro', rating: 4.8, description: 'Um dos litorais mais bonitos do Brasil.' },
  ],
  hotels: [
    { id: 'h1', name: 'Jatiúca Hotel & Resort', location: 'Maceió', rating: 4.7, description: 'Resort pé na areia com estrutura completa.' },
    { id: 'h2', name: 'Kenoa Resort', location: 'Barra de São Miguel', rating: 5.0, description: 'Eco-chic design resort de luxo.' },
  ],
  // ... Outras categorias podem ser expandidas aqui
};

const CategoryScreen = ({ route }: any) => {
  const { categoryId } = route.params;
  const data = CATEGORY_DATA[categoryId] || [];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardInfo}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.rating}>
            <Star size={14} color={Colors.secondary} fill={Colors.secondary} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.locationRow}>
          <MapPin size={14} color={Colors.textSecondary} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      </View>
      <ChevronRight size={20} color={Colors.border} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum item encontrado nesta categoria.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  list: {
    padding: Spacing.m,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.m,
    marginBottom: Spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardInfo: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
    color: Colors.text,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: Colors.textSecondary,
  }
});

export default CategoryScreen;
