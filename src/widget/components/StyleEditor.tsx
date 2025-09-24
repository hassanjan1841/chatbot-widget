import { useContext } from 'react';
import {
  StyleContext,
  ChatbotStyles,
  defaultChatbotStyles,
} from '../lib/StyleContext';

interface StyleEditorProps {
  [key: string]: never;
}

const createLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

export function StyleEditor(_props: StyleEditorProps) {
  const { styles, updateStyle, resetStyles } = useContext(StyleContext);
  const handleInputChange = (key: keyof ChatbotStyles, value: string) => {
    updateStyle(key, value);
  };
  const isColorProperty = (key: keyof ChatbotStyles): boolean => {
    const value = defaultChatbotStyles[key];
    return (
      typeof value === 'string' &&
      (value.startsWith('#') ||
        value.startsWith('rgb') ||
        value.startsWith('hsl'))
    );
  };

  const editableStyleKeys = Object.keys(styles).filter(
    (key) => !key.endsWith('Rgb'),
  ) as Array<keyof ChatbotStyles>;

  return (
    <div className='style-editor'>
      <h4>Customize Appearance</h4>

      {editableStyleKeys.map((key) => {
        const value = styles[key];
        const label = createLabel(key);
        const isColor = isColorProperty(key);

        return (
          <div key={key} className='form-group'>
            <label htmlFor={key}>{label}</label>
            <div className='input-wrapper'>
              <input
                type={isColor ? 'color' : 'text'}
                id={key}
                name={key}
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
                style={isColor ? {} : { flexGrow: 1 }}
              />
              {isColor && (
                <span
                  className='color-preview-box'
                  style={{ backgroundColor: value }}
                ></span>
              )}
            </div>
          </div>
        );
      })}
      <button onClick={resetStyles} className='reset-button'>
        Reset to Defaults
      </button>
    </div>
  );
}
