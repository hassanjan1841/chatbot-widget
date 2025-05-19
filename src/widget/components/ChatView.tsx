import { useState, useEffect, useCallback, useRef } from 'react';
import { demoConversationFlow, FlowNode, FlowOption } from '../lib/demo-flow';
import { extractName } from '../lib/helpers/textUtils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  options?: FlowOption[];
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
}

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState<string>(
    demoConversationFlow.startNodeId,
  );
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
  });
  const [editNextNodeIdOverride, setEditNextNodeIdOverride] = useState<
    string | null
  >(null);
  const initialLoadDoneRef = useRef(false);
  const prevNodeIdRef = useRef<string>();

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

  // Helper to replace placeholders in messages
  const formatMessage = useCallback((text: string, data: LeadData) => {
    return text
      .replace('{name}', data.name || 'N/A')
      .replace('{email}', data.email || 'N/A')
      .replace('{phone}', data.phone || 'N/A');
  }, []);

  const addBotMessages = useCallback(
    (node: FlowNode, dataToUse: LeadData) => {
      setIsLoading(true);
      setTimeout(() => {
        const messagesToSend: { text: string; options?: FlowOption[] }[] = [];
        if (Array.isArray(node.botMessage)) {
          node.botMessage.forEach((msg: string) => {
            messagesToSend.push({ text: formatMessage(msg, dataToUse) });
          });
        } else {
          messagesToSend.push({
            text: formatMessage(node.botMessage, dataToUse),
          });
        }

        messagesToSend.forEach((msgDetail, index) => {
          const isLastMessage = index === messagesToSend.length - 1;
          const msgOptions =
            isLastMessage && node.options && node.options.length > 0
              ? node.options
              : undefined;
          addMessage(msgDetail.text, 'bot', msgOptions);
        });
        setIsLoading(false);
      }, 500);
    },
    [addMessage, formatMessage],
  );

  useEffect(() => {
    const node = demoConversationFlow.nodes[currentNodeId];
    if (!node) return;

    const hasNodeTrulyChanged = prevNodeIdRef.current !== currentNodeId;

    if (currentNodeId === demoConversationFlow.startNodeId) {
      if (!initialLoadDoneRef.current) {
        initialLoadDoneRef.current = true;
        const freshLeadData = { name: '', email: '', phone: '' };
        setLeadData(freshLeadData);
        addBotMessages(node, freshLeadData);
      } else if (hasNodeTrulyChanged) {
        const freshLeadData = { name: '', email: '', phone: '' };
        setLeadData(freshLeadData);
        addBotMessages(node, freshLeadData);
      }
    } else {
      if (hasNodeTrulyChanged) {
        addBotMessages(node, leadData);
      }
    }
    prevNodeIdRef.current = currentNodeId;
  }, [currentNodeId, leadData, addBotMessages]);

  const handleNodeTransition = useCallback(
    (nodeId: string | undefined, _currentLeadDataForNextNode?: LeadData) => {
      if (nodeId) {
        const nextNode = demoConversationFlow.nodes[nodeId];
        if (nextNode) {
          setCurrentNodeId(nodeId);
        } else {
          addMessage(
            `Sorry, I don't know how to respond to that. (Error: Next node ${nodeId} not found)`,
            'bot',
          );
        }
      } else {
        addMessage(
          'Sorry, there seems to be an issue with the conversation flow.',
          'bot',
        );
      }
    },
    [addMessage],
  );

  const handleOptionClick = useCallback(
    (option: FlowOption) => {
      addMessage(option.text, 'user');
      setMessages((prev) => prev.map((m) => ({ ...m, options: undefined })));

      const currentNode = demoConversationFlow.nodes[currentNodeId];
      if (currentNode && currentNode.id === 'leadCaptureConfirm') {
        if (
          option.id === 'confirm_edit_name' ||
          option.id === 'confirm_edit_email' ||
          option.id === 'confirm_edit_phone'
        ) {
          setEditNextNodeIdOverride('leadCaptureConfirm');
        }
      }

      if (option.directAnswer) {
        const answerText = formatMessage(option.directAnswer, leadData);
        setTimeout(() => addMessage(answerText, 'bot'), 300);
        const thankYouNode = demoConversationFlow.nodes['endNodeThankYou'];
        if (thankYouNode && answerText.includes('signup')) {
          setTimeout(() => {
            if (typeof thankYouNode.botMessage === 'string') {
              addMessage(thankYouNode.botMessage, 'bot', thankYouNode.options);
            } else {
              addMessage(
                thankYouNode.botMessage[0],
                'bot',
                thankYouNode.options,
              );
            }
          }, 600);
        } else {
          const currentNode = demoConversationFlow.nodes[currentNodeId];
          if (
            currentNode &&
            currentNode.options &&
            currentNode.nodeType === 'question_with_options'
          ) {
            // Potentially show a generic follow-up or re-show current options
            // addMessage("Is there anything else?", 'bot', currentNode.options);
          } else {
            // If no specific follow-up, maybe a generic end or main menu transition
            // handleNodeTransition('greetingNode'); // Example: go to main menu if available
          }
        }
      } else if (option.nextNodeId) {
        handleNodeTransition(option.nextNodeId);
      }
    },
    [addMessage, leadData, formatMessage, handleNodeTransition, currentNodeId],
  );

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Basic check: starts with + and has at least 7 digits after + (very simplified)
    const phoneRegex = /^\+[0-9]{7,}$/;
    return phoneRegex.test(phone);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    const userMessageText = inputValue;
    addMessage(userMessageText, 'user');
    setInputValue('');
    setMessages((prev) => prev.map((m) => ({ ...m, options: undefined })));

    const currentFlowNode = demoConversationFlow.nodes[currentNodeId];

    if (currentFlowNode) {
      let nextNodeIdToShow: string | undefined = undefined;
      let updatedLeadData = { ...leadData };

      switch (currentFlowNode.nodeType) {
        case 'capture_name':
          const extractedName = extractName(userMessageText);
          updatedLeadData = { ...leadData, name: extractedName };
          setLeadData(updatedLeadData);
          if (editNextNodeIdOverride) {
            nextNodeIdToShow = editNextNodeIdOverride;
            setEditNextNodeIdOverride(null);
          } else {
            nextNodeIdToShow = currentFlowNode.nextOnInputNodeId;
          }
          handleNodeTransition(nextNodeIdToShow);
          break;
        case 'capture_email':
          if (validateEmail(userMessageText)) {
            updatedLeadData = { ...leadData, email: userMessageText };
            setLeadData(updatedLeadData);
            if (editNextNodeIdOverride) {
              nextNodeIdToShow = editNextNodeIdOverride;
              setEditNextNodeIdOverride(null);
            } else {
              nextNodeIdToShow = currentFlowNode.nextOnInputNodeId;
            }
            handleNodeTransition(nextNodeIdToShow);
          } else {
            // If validation fails during an edit, we should ideally stay on the email capture
            // but ensure the context is right. For now, going to invalidEmailNode is okay,
            // but the 'editNextNodeIdOverride' logic might need refinement if invalidEmailNode
            // itself needs to loop back to 'leadCaptureConfirm' after correction.
            // For simplicity, we clear override if validation fails for now.
            if (editNextNodeIdOverride) setEditNextNodeIdOverride(null);
            nextNodeIdToShow = 'invalidEmailNode';
            handleNodeTransition(nextNodeIdToShow);
          }
          break;
        case 'capture_phone':
          if (validatePhone(userMessageText)) {
            updatedLeadData = { ...leadData, phone: userMessageText };
            setLeadData(updatedLeadData);
            if (editNextNodeIdOverride) {
              nextNodeIdToShow = editNextNodeIdOverride;
              setEditNextNodeIdOverride(null);
            } else {
              nextNodeIdToShow = currentFlowNode.nextOnInputNodeId;
            }
            handleNodeTransition(nextNodeIdToShow);
          } else {
            // Similar to email, if validation fails during an edit.
            if (editNextNodeIdOverride) setEditNextNodeIdOverride(null);
            nextNodeIdToShow = 'invalidPhoneNode';
            handleNodeTransition(nextNodeIdToShow);
          }
          break;
        default:
          setIsLoading(true);
          setTimeout(() => {
            addMessage(
              `You said: "${userMessageText}". Please use the buttons if available, or follow the prompt.`,
              'bot',
            );
            if (currentFlowNode) addBotMessages(currentFlowNode, leadData);
            setIsLoading(false);
          }, 500);
          return;
      }
    } else {
      addMessage('Error: Current node ID is null or node not found.', 'bot');
    }
  };

  return (
    <div className='chat-view'>
      <div className='messages-container'>
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
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
