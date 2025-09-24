import React from 'react';
import ReactDOM from 'react-dom/client';
import './widget/styles/style.css';
import { WidgetContainer } from './widget/components/widget-container';

interface WidgetConfig {
  clientKey: string;
  targetElementId?: string; // Optional: ID of an element to render into
}

declare global {
  interface Window {
    ChatbotWidget: {
      init: (config: WidgetConfig) => void;
      destroy: (targetElementId?: string) => void;
    };
  }
}

const DEFAULT_ELEMENT_ID = 'chatbot-widget-container';

function init(config: WidgetConfig): void {
  const { clientKey, targetElementId = DEFAULT_ELEMENT_ID } = config;

  let targetElement = document.getElementById(targetElementId);

  if (!targetElement) {
    console.log(
      `ChatbotWidget: Target element '#${targetElementId}' not found. Creating one.`,
    );
    targetElement = document.createElement('div');
    targetElement.id = targetElementId;
    document.body.appendChild(targetElement);
  } else {
    // Clear the container if it already has content (e.g., from a previous init)
    targetElement.innerHTML = '';
  }

  const root = ReactDOM.createRoot(targetElement);
  root.render(
    <React.StrictMode>
      <WidgetContainer clientKey={clientKey} />
    </React.StrictMode>,
  );
  console.log(
    `ChatbotWidget initialized on '#${targetElementId}' with clientKey: ${clientKey}`,
  );
}

function destroy(targetElementId: string = DEFAULT_ELEMENT_ID): void {
  const targetElement = document.getElementById(targetElementId);
  if (targetElement) {
    const root = (targetElement as { _reactRootContainer?: { unmount(): void } })._reactRootContainer;
    if (root && typeof root.unmount === 'function') {
      root.unmount();
    } else {
      // Fallback if unmount isn't available directly (e.g. older React or different setup)
      targetElement.innerHTML = '';
    }
    // Optionally remove the container if it was auto-created and is now empty
    // For simplicity, we'll leave it, but you could add logic here to remove it.
    console.log(`ChatbotWidget destroyed on '#${targetElementId}'.`);
  } else {
    console.warn(
      `ChatbotWidget: Target element '#${targetElementId}' not found for destruction.`,
    );
  }
}

// Expose the init and destroy functions on the window object
window.ChatbotWidget = {
  init,
  destroy,
};
