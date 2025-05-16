import { createContext, Dispatch, SetStateAction } from 'react';

export interface ChatbotStyles {
  widgetPrimaryColor: string;
  widgetPrimaryTextColor: string;
  headerBackgroundColor: string;
  headerTextColor: string;
  chatBackgroundColor: string;
  userMessageBackgroundColor: string;
  userMessageTextColor: string;
  botMessageBackgroundColor: string;
  botMessageTextColor: string;
  inputBackgroundColor: string;
  inputTextColor: string;
  inputPlaceholderColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  scrollbarThumbColor: string;
  scrollbarTrackColor: string;
  widgetTitle: string;
  // Add more properties as needed
}

export const defaultChatbotStyles: ChatbotStyles = {
  widgetPrimaryColor: '#007bff',
  widgetPrimaryTextColor: '#ffffff',
  headerBackgroundColor: '#f7f7f7',
  headerTextColor: '#333333',
  chatBackgroundColor: '#ffffff',
  userMessageBackgroundColor: '#007bff',
  userMessageTextColor: '#ffffff',
  botMessageBackgroundColor: '#f0f0f0',
  botMessageTextColor: '#333333',
  inputBackgroundColor: '#ffffff',
  inputTextColor: '#333333',
  inputPlaceholderColor: '#999999',
  buttonBackgroundColor: '#007bff',
  buttonTextColor: '#ffffff',
  scrollbarThumbColor: '#007bff',
  scrollbarTrackColor: '#f0f0f0',
  widgetTitle: 'Chat with us!',
};

interface StyleContextType {
  styles: ChatbotStyles;
  setStyles: Dispatch<SetStateAction<ChatbotStyles>>;
  updateStyle: (key: keyof ChatbotStyles, value: string) => void;
  resetStyles: () => void;
}

export const StyleContext = createContext<StyleContextType>({
  styles: defaultChatbotStyles,
  setStyles: () => undefined,
  updateStyle: () => undefined,
  resetStyles: () => undefined,
});
