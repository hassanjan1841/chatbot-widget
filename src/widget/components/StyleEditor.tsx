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

  const handleColorChange = (key: keyof ChatbotStyles, value: string) => {
    updateStyle(key, value);
  };

  // Filter out keys that are not direct color strings or relevant style properties for direct editing
  // For example, widgetPrimaryColorRgb is derived and should not be directly edited.
  const editableStyleKeys = Object.keys(styles).filter(
    (key) => !key.endsWith('Rgb'),
  ) as Array<keyof ChatbotStyles>;

  return (
    <div className='style-editor'>
      <h4>Customize Widget Styles</h4>
      {editableStyleKeys.map((key) => {
        const value = styles[key];
        // Determine input type based on value (simple check for hex color)
        // More robust checking might be needed for different types of style values
        const isColor = typeof value === 'string' && value.startsWith('#');

        return (
          <div key={key} className='form-group flex flex-row flex-wrap'>
            <label htmlFor={key}>{createLabel(key)}</label>
            <input
              type={isColor ? 'color' : 'text'}
              id={key}
              name={key}
              value={value}
              onChange={(e) => handleColorChange(key, e.target.value)}
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
