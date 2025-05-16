import { useContext } from 'react';
import { StyleContext, ChatbotStyles } from '../lib/StyleContext';

interface StyleEditorProps {
  // Props if any, for now, it consumes context directly
}

// Helper to create a label from a style key
const createLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
};

export function StyleEditor({}: StyleEditorProps) {
  const { styles, updateStyle, resetStyles } = useContext(StyleContext);

  const handleInputChange = (key: keyof ChatbotStyles, value: string) => {
    updateStyle(key, value);
  };

  // Filter out keys that are not direct color strings or relevant style properties for direct editing
  // For example, widgetPrimaryColorRgb is derived and should not be directly edited.
  // We will also handle widgetTitle separately.
  const editableColorStyleKeys = Object.keys(styles).filter(
    (key) => !key.endsWith('Rgb') && key !== 'widgetTitle',
  ) as Array<keyof ChatbotStyles>;

  return (
    <div className='style-editor'>
      <h4>Customize Widget Appearance</h4>

      {/* Widget Title Editor */}
      <div className='form-group flex flex-row flex-wrap'>
        <label htmlFor='widgetTitle'>{createLabel('widgetTitle')}</label>
        <input
          type='text'
          id='widgetTitle'
          name='widgetTitle'
          value={styles.widgetTitle}
          onChange={(e) => handleInputChange('widgetTitle', e.target.value)}
        />
      </div>

      {editableColorStyleKeys.map((key) => {
        const value = styles[key];
        // All remaining ones should be colors for now
        const isColor = true; // Simplified as we filtered non-colors

        return (
          <div key={key} className='form-group flex flex-row flex-wrap'>
            <label htmlFor={key}>{createLabel(key)}</label>
            <input
              type={isColor ? 'color' : 'text'} // Kept for future non-color styles
              id={key}
              name={key}
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
            />
          </div>
        );
      })}
      <button onClick={resetStyles} style={{ marginTop: '10px' }}>
        Reset to Defaults
      </button>
    </div>
  );
}
