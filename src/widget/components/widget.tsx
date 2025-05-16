import { useContext } from 'react';
import { WidgetContext } from '../lib/context';
import ChatView from './ChatView';

// A simple gear icon SVG as a string
const GearIcon = () => (
  <svg
    fill='currentColor'
    viewBox='0 0 16 16'
    height='1em'
    width='1em'
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d='M8 4.754a3.246 3.246 0 100 6.492 3.246 3.246 0 000-6.492zM5.754 8a2.246 2.246 0 114.492 0 2.246 2.246 0 01-4.492 0z' />
    <path d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 01-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 01-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 01.52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 011.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 011.255-.52l.292.16c1.64.893 3.434-.901 2.54-2.541l-.159-.292a.873.873 0 01.52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 01-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 01-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 002.679 1.118l.292-.16c.786-.426 1.658.219 1.232.998l-.16.292a1.873 1.873 0 001.118 2.679l.319.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 00-1.118 2.679l.16.292c.426.786-.219 1.658-.998 1.232l-.292-.16a1.873 1.873 0 00-2.679 1.118l-.094.319c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 00-2.679-1.118l-.292.16c-.786.426-1.658-.219-1.232-.998l.16-.292a1.873 1.873 0 00-1.118-2.679l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 003.005 4.88l-.16-.292c-.426-.786.219-1.658.998-1.232l.292.16a1.873 1.873 0 002.679-1.118l.094-.319z' />
  </svg>
);

interface WidgetProps {
  widgetTitle: string;
}

export function Widget({ widgetTitle }: WidgetProps) {
  const { isOpen, setIsOpen, setIsEditModalOpen } = useContext(WidgetContext);

  if (!isOpen) {
    return (
      <button className='widget-button' onClick={() => setIsOpen(true)}>
        Open Widget
      </button>
    );
  }

  return (
    <div className='widget-container'>
      <div className='widget-header'>
        <h3>{widgetTitle}</h3>
        <div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            title='Customize Styles'
            style={{ marginRight: '10px' }}
          >
            <GearIcon />
          </button>
          <button onClick={() => setIsOpen(false)} title='Close Widget'>
            X
          </button>
        </div>
      </div>

      <div className='widget-content'>
        <ChatView />
      </div>
    </div>
  );
}
