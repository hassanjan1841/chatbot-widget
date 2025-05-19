import { useContext } from 'react';
import { WidgetContext } from '../lib/context';
import { StyleEditor } from './StyleEditor';
import WidgetPreview from './WidgetPreview';

export function EditModal() {
  const { isEditModalOpen, setIsEditModalOpen } = useContext(WidgetContext);
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
          <p
            style={{
              textAlign: 'center',
              color: 'var(--header-text-color)',
            }}
          >
            Live Preview
          </p>
          <WidgetPreview />
        </div>
      </div>
    </div>
  );
}
