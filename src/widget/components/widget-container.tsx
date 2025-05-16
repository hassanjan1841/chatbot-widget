import { useState, useEffect, useCallback } from 'react';
import { WidgetContext } from '../lib/context';
import {
  StyleContext,
  defaultChatbotStyles,
  ChatbotStyles,
} from '../lib/StyleContext';
import { Widget } from './widget';
import { EditModal } from './EditModal';

interface WidgetContainerProps {
  clientKey: string;
}

// Helper function to convert style keys to CSS variable names
const toCssVarName = (key: string): string => {
  // Example: widgetPrimaryColor -> --widget-primary-color
  return `--${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`;
};

export function WidgetContainer({ clientKey }: WidgetContainerProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [styles, setStyles] = useState<ChatbotStyles>(defaultChatbotStyles);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    for (const key in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, key)) {
        const cssVarName = toCssVarName(key as keyof ChatbotStyles);
        root.style.setProperty(cssVarName, styles[key as keyof ChatbotStyles]);
      }
    }
    if (styles.widgetPrimaryColor) {
      let r = 0,
        g = 0,
        b = 0;
      if (styles.widgetPrimaryColor.length === 7) {
        r = parseInt(styles.widgetPrimaryColor.substring(1, 3), 16);
        g = parseInt(styles.widgetPrimaryColor.substring(3, 5), 16);
        b = parseInt(styles.widgetPrimaryColor.substring(5, 7), 16);
      } else if (styles.widgetPrimaryColor.length === 4) {
        r = parseInt(
          styles.widgetPrimaryColor.substring(1, 2) +
            styles.widgetPrimaryColor.substring(1, 2),
          16,
        );
        g = parseInt(
          styles.widgetPrimaryColor.substring(2, 3) +
            styles.widgetPrimaryColor.substring(2, 3),
          16,
        );
        b = parseInt(
          styles.widgetPrimaryColor.substring(3, 4) +
            styles.widgetPrimaryColor.substring(3, 4),
          16,
        );
      }
      root.style.setProperty('--widget-primary-color-rgb', `${r}, ${g}, ${b}`);
    }
  }, [styles]);

  const updateStyle = useCallback((key: keyof ChatbotStyles, value: string) => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      [key]: value,
    }));
  }, []);

  const resetStyles = useCallback(() => {
    setStyles(defaultChatbotStyles);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <StyleContext.Provider
      value={{ styles, setStyles, updateStyle, resetStyles }}
    >
      <WidgetContext.Provider
        value={{
          isOpen,
          setIsOpen,
          clientKey,
          isEditModalOpen,
          setIsEditModalOpen,
        }}
      >
        <Widget />
        <EditModal />
      </WidgetContext.Provider>
    </StyleContext.Provider>
  );
}
