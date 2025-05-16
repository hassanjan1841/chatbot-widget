// import React, { useState, useContext, useEffect, useCallback } from 'react'; // React might not be needed if using new JSX transform
import { useState, useEffect, useCallback } from 'react'; // Removed unused useContext
// We will temporarily comment out getBotResponse as we are using a local demo flow
// import { getBotResponse } from '../services/api';
import { demoConversationFlow, FlowNode, FlowOption } from '../lib/demo-flow'; // Corrected path
// import { WidgetContext, WidgetContextType } from '../lib/context'; // WidgetContext not used directly in ChatView
// import { StyleContext } from '../lib/StyleContext'; // Corrected path, still commented out

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  options?: FlowOption[]; // For rendering options as part of a bot message
}

const ChatView: React.FC = () => {
  // const { setIsOpen } = useContext(WidgetContext) as WidgetContextType; // setIsOpen is unused in ChatView
  // const { clientKey } = useContext(WidgetContext); // clientKey from WidgetContext is not used in the demo flow
  // const { styles } = useContext(StyleContext); // ChatView relies on CSS variables set by WidgetContainer from StyleContext, so direct access to styles object is not needed here.

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(
    demoConversationFlow.startNodeId,
  );

  const addMessage = useCallback(
    (text: string, sender: 'user' | 'bot', options?: FlowOption[]) => {
      const newMessage: Message = {
        id: Date.now().toString() + Math.random().toString(), // Ensure more unique ID
        text,
        sender,
        options,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    },
    [],
  );

  // Function to process and add bot messages (can be single or multiple)
  const addBotMessages = useCallback(
    (node: FlowNode) => {
      setIsLoading(true);
      // Simulate bot thinking time
      setTimeout(() => {
        if (Array.isArray(node.botMessage)) {
          node.botMessage.forEach((msg: string, index: number) => {
            // Added types for msg and index
            // Add options only to the last message in a sequence
            const msgOptions =
              index === node.botMessage.length - 1 &&
              node.options && // Display options if they exist
              node.options.length > 0
                ? node.options
                : undefined;
            addMessage(msg, 'bot', msgOptions);
          });
        } else {
          addMessage(
            node.botMessage,
            'bot',
            node.options && node.options.length > 0 // Display options if they exist
              ? node.options
              : undefined,
          );
        }
        setIsLoading(false);
      }, 500); // Shorter delay for local flow
    },
    [addMessage],
  );

  // Effect to display the first message(s) from the flow when component mounts or flow changes
  useEffect(() => {
    const initialNode =
      demoConversationFlow.nodes[demoConversationFlow.startNodeId];
    if (initialNode) {
      addBotMessages(initialNode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addBotMessages]); // demoConversationFlow.startNodeId, demoConversationFlow.nodes are stable

  const handleOptionClick = useCallback(
    (option: FlowOption) => {
      // Add user's choice to messages
      addMessage(option.text, 'user');
      setMessages((prev) => prev.map((m) => ({ ...m, options: undefined }))); // Remove options from previous bot message

      if (option.directAnswer) {
        const answerText = option.directAnswer; // Assign to a const
        setTimeout(() => addMessage(answerText, 'bot'), 300);
        // After a direct answer, we might want to go to a generic node or end,
        // for now, we can go back to main menu or an end node if specified
        const thankYouNode = Object.values(demoConversationFlow.nodes).find(
          (n: any) => n.nodeType === 'end_conversation', // Typed n as any for now, ideally FlowNode
        );
        if (thankYouNode && answerText.includes('signup')) {
          // Use the new const here
          setTimeout(() => addBotMessages(thankYouNode), 600);
        } else {
          // Or present options to go back to main menu
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
    [
      addMessage,
      // demoConversationFlow.nodes, // Considered stable
      // demoConversationFlow.startNodeId, // Considered stable
      addBotMessages, // Include addBotMessages as it's used inside
      // setCurrentNodeId // Include if state updates based on it are critical for re-render, but usually not for useCallback itself
    ],
  );

  // Original handleSendMessage for text input - can be enhanced later or disabled for pure flow demo
  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    const userMessageText = inputValue; // Store before clearing input
    addMessage(userMessageText, 'user');
    setInputValue('');

    setIsLoading(true); // For the "You said..." part and subsequent bot message

    // First bot message: "You said..."
    setTimeout(() => {
      addMessage(
        `You said: "${userMessageText}". Please use the buttons to navigate the demo flow.`,
        'bot',
      );

      // Second part: Re-show current node's prompt and options
      // Ensure currentNodeId is not null before accessing nodes
      if (currentNodeId) {
        const currentNode = demoConversationFlow.nodes[currentNodeId];
        if (currentNode) {
          // addBotMessages will handle its own isLoading state changes and delays
          addBotMessages(currentNode);
        } else {
          // If no current node for some reason, ensure isLoading is reset
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
    }, 500); // Delay for "You said..." message
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
                      border: '1px solid var(--widget-primary-color)', // Reverted to simple CSS var
                      borderRadius: '15px',
                      background: 'white',
                      color: 'var(--widget-primary-color)', // Reverted to simple CSS var
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
          disabled={isLoading} // Can also be permanently disabled if only buttons drive the flow
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatView;
