import { useContext, useState } from 'react';
import { StyleContext } from '../lib/StyleContext';
export function WidgetPreview() {
  const { styles } = useContext(StyleContext);
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);

  const widgetTitle = styles.widgetTitle || 'Chatbot';

  if (!isPreviewOpen) {
    return (
      <button className='widget-button' onClick={() => setIsPreviewOpen(true)}>
        Open Widget
      </button>
    );
  }

  return (
    <>
      <div className='widget-container preview-widget-container'>
        <div className='widget-header'>
          <h3>{widgetTitle}</h3>
          <button
            onClick={() => setIsPreviewOpen(false)}
            title='Preview Closed State'
            aria-label='Close preview'
            className='close-preview-button'
          >
            X
          </button>
        </div>
        <div className='widget-content'>
          <div
            className='messages-container'
            style={{ padding: '10px', height: 'auto' }}
          >
            <div
              className='message bot'
              style={{
                backgroundColor: 'var(--bot-message-background-color)',
                color: 'var(--bot-message-text-color)',
              }}
            >
              Hello! How can I help you today?
            </div>
            <div
              className='message user'
              style={{
                backgroundColor: 'var(--user-message-background-color)',
                color: 'var(--user-message-text-color)',
              }}
            >
              I'd like to see how these styles look.
            </div>
            <div
              className='message bot typing-indicator'
              style={{
                backgroundColor: 'var(--bot-typing-indicator-bg-color)',
                color: 'var(--bot-typing-indicator-text-color)',
              }}
            >
              Bot is typing...
            </div>
          </div>
          <div
            className='input-container'
            style={{ backgroundColor: 'var(--input-background-color)' }}
          >
            <input
              type='text'
              placeholder='Type a message...'
              disabled
              style={{
                color: 'var(--input-text-color)',
                borderColor: 'var(--input-border-color)',
                backgroundColor: 'var(--input-background-color)',
              }}
            />
            <button
              disabled
              style={{
                backgroundColor: 'var(--button-background-color)',
                color: 'var(--button-text-color)',
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          padding: '10px',
          textAlign: 'center',
          fontSize: '0.8em',
          color: 'var(--chat-text-color)',
          opacity: 0.7,
        }}
      >
        <p>
          <em>This is a live preview. Changes update here.</em>
        </p>
      </div>
    </>
  );
}

export default WidgetPreview;
