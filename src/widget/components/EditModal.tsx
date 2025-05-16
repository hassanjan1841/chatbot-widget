import { useContext } from 'react';
import { WidgetContext } from '../lib/context';
import { StyleContext } from '../lib/StyleContext';
import { StyleEditor } from './StyleEditor';
import { Widget } from './widget'; // To show a preview

export function EditModal() {
  const { isEditModalOpen, setIsEditModalOpen } = useContext(WidgetContext);
  const { styles } = useContext(StyleContext);

  if (!isEditModalOpen) {
    return null;
  }

  return (
    <div
      className='edit-modal-overlay'
      onClick={() => setIsEditModalOpen(false)}
    >
      <div className='edit-modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='style-editor-wrapper'>
          <StyleEditor />
        </div>
        <div className='widget-preview-wrapper'>
          {/* 
            To make the widget preview work correctly within the modal, 
            we might need to ensure its context providers are correctly scoped
            or pass specific props to make it behave as a preview.
            For now, rendering <Widget/> directly might have unintended side effects
            if it tries to control global state like the main widget instance.
            A better approach for preview would be a version of Widget 
            that is purely presentational or uses a separate preview context.
            However, for this iteration, we'll render it directly.
            The CSS already has rules to adjust its positioning.
          */}
          <p
            style={{
              textAlign: 'center',
              marginBottom: '10px',
              color: 'var(--header-text-color)',
            }}
          >
            Live Preview
          </p>
          <Widget widgetTitle={styles.widgetTitle} />
        </div>
      </div>
    </div>
  );
}
