import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator 
} from 'react-native';
import { Colors, Spacing } from '../theme/Colors';
import { Send, User, Bot, Mic } from 'lucide-react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';

// API Key fornecida pelo usuário (placeholder por segurança, idealmente via .env)
const GEMINI_API_KEY = "ukqz4ijIdgMHPxpxEt8rHKyHcXDQXeQX"; 
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const AIScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Olá! Sou seu assistente Miami Alagoana. Como posso ajudar você hoje?', sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Você é um guia turístico e assistente local para o aplicativo "Miami Alagoana". 
      Ajude o usuário com informações sobre Maceió e Alagoas. Seja cordial, preciso e assertivo. 
      Pergunta do usuário: ${inputText}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const botMsg = { id: (Date.now() + 1).toString(), text: response.text(), sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg = { id: (Date.now() + 1).toString(), text: 'Desculpe, tive um erro ao processar sua dúvida.', sender: 'bot' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: any) => (
    <View style={[
      styles.messageContainer, 
      item.sender === 'user' ? styles.userMessage : styles.botMessage
    ]}>
      <View style={styles.avatar}>
        {item.sender === 'user' ? <User size={20} color="#FFF" /> : <Bot size={20} color={Colors.primary} />}
      </View>
      <View style={[
        styles.textBubble, 
        item.sender === 'user' ? styles.userBubble : styles.botBubble
      ]}>
        <Text style={item.sender === 'user' ? styles.userText : styles.botText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
      />
      
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator color={Colors.primary} />
          <Text style={styles.loadingText}>Pensando...</Text>
        </View>
      )}

      <View style={styles.inputArea}>
        <TouchableOpacity style={styles.audioBtn}>
          <Mic color={Colors.primary} size={24} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Tire suas dúvidas..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Send color="#FFF" size={24} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: Spacing.m,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.m,
    alignItems: 'flex-end',
  },
  userMessage: {
    flexDirection: 'row-reverse',
  },
  botMessage: {
    flexDirection: 'row',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.s,
  },
  textBubble: {
    maxWidth: '80%',
    padding: Spacing.m,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userText: {
    color: '#FFF',
  },
  botText: {
    color: Colors.text,
  },
  inputArea: {
    flexDirection: 'row',
    padding: Spacing.m,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.s,
    marginHorizontal: Spacing.s,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioBtn: {
    padding: Spacing.s,
  },
  loading: {
    flexDirection: 'row',
    paddingLeft: Spacing.xxl,
    alignItems: 'center',
    marginBottom: Spacing.s,
  },
  loadingText: {
    marginLeft: Spacing.s,
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  }
});

export default AIScreen;
