import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';
import { Colors, Spacing } from '../theme/Colors';
import { useTranslation } from 'react-i18next';
import { AlertCircle, FileText, MapPin, Camera } from 'lucide-react-native';

const ReportScreen = () => {
  const { t } = useTranslation();
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const reportTypes = [
    { id: 'theft', label: 'Furto' },
    { id: 'robbery', label: 'Roubo' },
    { id: 'assault', label: 'Assalto' },
    { id: 'other', label: 'Outros' },
  ];

  const handleSubmit = () => {
    if (!type || !description) {
      Alert.alert('Atenção', 'Por favor, preencha o tipo e a descrição da ocorrência.');
      return;
    }
    Alert.alert(
      'Denúncia Enviada', 
      'Sua notificação foi registrada. Em caso de emergência real, ligue para 190.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.warningBox}>
        <AlertCircle color="#B22222" size={24} />
        <Text style={styles.warningText}>
          Esta é uma plataforma de auxílio. Para emergências imediatas, contate diretamente as autoridades locais (190/193).
        </Text>
      </View>

      <Text style={styles.label}>Tipo de Ocorrência</Text>
      <View style={styles.typeGrid}>
        {reportTypes.map((rt) => (
          <TouchableOpacity 
            key={rt.id} 
            style={[styles.typeBtn, type === rt.id && styles.typeBtnActive]}
            onPress={() => setType(rt.id)}
          >
            <Text style={[styles.typeBtnText, type === rt.id && styles.typeBtnTextActive]}>{rt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Local aproximado</Text>
      <View style={styles.inputContainer}>
        <MapPin size={20} color={Colors.textSecondary} />
        <TextInput 
          style={styles.input} 
          placeholder="Ex: Praia de Jatiúca, Maceió"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <Text style={styles.label}>Descrição dos fatos</Text>
      <View style={[styles.inputContainer, styles.textAreaContainer]}>
        <FileText size={20} color={Colors.textSecondary} style={{ marginTop: 10 }} />
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Descreva o que aconteceu..."
          multiline
          numberOfLines={6}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <TouchableOpacity style={styles.photoBtn}>
        <Camera size={24} color={Colors.primary} />
        <Text style={styles.photoBtnText}>Anexar Foto (Opcional)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>Enviar Denúncia</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.m,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FFEBEE',
    padding: Spacing.m,
    borderRadius: 12,
    marginBottom: Spacing.l,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  warningText: {
    flex: 1,
    marginLeft: Spacing.s,
    fontSize: 12,
    color: '#B22222',
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.s,
    marginTop: Spacing.m,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeBtn: {
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.s,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  typeBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typeBtnText: {
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  typeBtnTextActive: {
    color: '#FFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: Spacing.m,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.m,
    marginLeft: Spacing.s,
    color: Colors.text,
  },
  textAreaContainer: {
    alignItems: 'flex-start',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  photoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.m,
    marginTop: Spacing.l,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  photoBtnText: {
    marginLeft: Spacing.s,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  submitBtn: {
    backgroundColor: '#B22222',
    padding: Spacing.m,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReportScreen;
