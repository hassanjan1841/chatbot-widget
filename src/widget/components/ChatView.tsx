import { useState, useEffect, useCallback } from 'react';
import { demoConversationFlow, FlowNode, FlowOption } from '../lib/demo-flow';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  options?: FlowOption[];
}

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(
    demoConversationFlow.startNodeId,
  );

  const addMessage = useCallback(
    (text: string, sender: 'user' | 'bot', options?: FlowOption[]) => {
      const newMessage: Message = {
        id: Date.now().toString() + Math.random().toString(),
        text,
        sender,
        options,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    },
    [],
  );

  const addBotMessages = useCallback(
    (node: FlowNode) => {
      setIsLoading(true);
      setTimeout(() => {
        if (Array.isArray(node.botMessage)) {
          node.botMessage.forEach((msg: string, index: number) => {
            const msgOptions =
              index === node.botMessage.length - 1 &&
              node.options &&
              node.options.length > 0
                ? node.options
                : undefined;
            addMessage(msg, 'bot', msgOptions);
          });
        } else {
          addMessage(
            node.botMessage,
            'bot',
            node.options && node.options.length > 0 ? node.options : undefined,
          );
        }
        setIsLoading(false);
      }, 500);
    },
    [addMessage],
  );

  useEffect(() => {
    const initialNode =
      demoConversationFlow.nodes[demoConversationFlow.startNodeId];
    if (initialNode) {
      addBotMessages(initialNode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addBotMessages]);

  const handleOptionClick = useCallback(
    (option: FlowOption) => {
      addMessage(option.text, 'user');
      setMessages((prev) => prev.map((m) => ({ ...m, options: undefined })));

      if (option.directAnswer) {
        const answerText = option.directAnswer;
        setTimeout(() => addMessage(answerText, 'bot'), 300);
        const thankYouNode = Object.values(demoConversationFlow.nodes).find(
          (n: any) => n.nodeType === 'end_conversation',
        );
        if (thankYouNode && answerText.includes('signup')) {
          setTimeout(() => addBotMessages(thankYouNode), 600);
        } else {
          const mainMenuNode =
            demoConversationFlow.nodes[demoConversationFlow.startNodeId];
          if (mainMenuNode && mainMenuNode.options) {
            setTimeout(
              () =>
                addMessage(
                  'Is there anything else?',
                  'bot',
                  mainMenuNode.options,
                ),
              600,
            );
          }
        }
      } else if (option.nextNodeId) {
        const nextNode = demoConversationFlow.nodes[option.nextNodeId];
        if (nextNode) {
          setCurrentNodeId(option.nextNodeId);
          addBotMessages(nextNode);
        } else {
          addMessage(
            "Sorry, I don't know how to respond to that. (Error: Next node not found)",
            'bot',
          );
        }
      }
    },
    [addMessage, addBotMessages],
  );

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    const userMessageText = inputValue;
    addMessage(userMessageText, 'user');
    setInputValue('');

    setIsLoading(true);

    setTimeout(() => {
      addMessage(
        `You said: "${userMessageText}". Please use the buttons to navigate the demo flow.`,
        'bot',
      );

      if (currentNodeId) {
        const currentNode = demoConversationFlow.nodes[currentNodeId];
        if (currentNode) {
          addBotMessages(currentNode);
        } else {
          setIsLoading(false);
          addMessage(
            `Error: Could not find current node with ID: ${currentNodeId}`,
            'bot',
          );
        }
      } else {
        setIsLoading(false);
        addMessage('Error: Current node ID is null.', 'bot');
      }
    }, 500);
  };

  return (
    <div className='chat-view'>
      <div className='messages-container'>
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
            {msg.sender === 'bot' && msg.options && msg.options.length > 0 && (
              <div className='options-container' style={{ marginTop: '10px' }}>
                {msg.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionClick(opt)}
                    className='option-button'
                    style={{
                      margin: '5px',
                      padding: '8px 12px',
                      border: '1px solid var(--widget-primary-color)',
                      borderRadius: '15px',
                      background: 'white',
                      color: 'var(--widget-primary-color)',
                      cursor: 'pointer',
                    }}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className='message bot typing-indicator'>
            <em>Bot is typing...</em>
          </div>
        )}
      </div>
      <div className='input-container'>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !isLoading) {
              handleSendMessage();
            }
          }}
          placeholder='Type a message or use buttons...'
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatView;
