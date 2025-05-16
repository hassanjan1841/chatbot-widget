export interface FlowOption {
  id: string;
  text: string; // Text displayed on the button
  nextNodeId?: string; // ID of the next node if this option is chosen
  directAnswer?: string; // If this option leads to an immediate answer
}

export interface FlowNode {
  id: string;
  botMessage: string | string[]; // Bot's message(s) at this node. Can be an array for multiple messages.
  nodeType:
    | 'greeting'
    | 'question_with_options'
    | 'information_only'
    | 'end_conversation';
  options?: FlowOption[]; // Available options if it's a 'question_with_options' type
}

export interface ConversationFlow {
  startNodeId: string;
  nodes: Record<string, FlowNode>; // A dictionary of nodes, keyed by their ID
}

// Sample Demo Conversation Flow
export const demoConversationFlow: ConversationFlow = {
  startNodeId: 'greetingNode',
  nodes: {
    greetingNode: {
      id: 'greetingNode',
      botMessage:
        'Hello! Welcome to our demo service. How can we assist you today?',
      nodeType: 'question_with_options',
      options: [
        {
          id: 'opt_services',
          text: 'Tell me about your services',
          nextNodeId: 'servicesNode',
        },
        {
          id: 'opt_pricing',
          text: 'Show me pricing',
          nextNodeId: 'pricingNode',
        },
        {
          id: 'opt_contact',
          text: 'How to contact us?',
          nextNodeId: 'contactNode',
        },
      ],
    },
    servicesNode: {
      id: 'servicesNode',
      botMessage: [
        'We offer a variety of excellent services:',
        '1. Widget Configuration',
        '2. Chatbot Customization',
        '3. Magical Solutions Inc.',
      ],
      nodeType: 'question_with_options',
      options: [
        {
          id: 'opt_more_details',
          text: 'More details on Magical Solutions',
          nextNodeId: 'magicalSolutionsNode',
        },
        {
          id: 'opt_back_to_main',
          text: 'Main Menu',
          nextNodeId: 'greetingNode',
        },
        {
          id: 'opt_end_chat_services',
          text: 'Thats all, thanks!',
          nextNodeId: 'endNodeThankYou',
        },
      ],
    },
    pricingNode: {
      id: 'pricingNode',
      botMessage:
        'Our pricing is very competitive! The Super Duper Plan is $99/month. Would you like to sign up?',
      nodeType: 'question_with_options',
      options: [
        {
          id: 'opt_signup',
          text: 'Yes, sign me up!',
          directAnswer:
            'Great! Please visit our website signup page. (This is a demo - no actual signup)',
        },
        {
          id: 'opt_back_to_main_pricing',
          text: 'Main Menu',
          nextNodeId: 'greetingNode',
        },
      ],
    },
    contactNode: {
      id: 'contactNode',
      botMessage:
        'You can reach us at demo@example.com or call us at 555-DEMO.',
      nodeType: 'information_only',
      options: [
        {
          id: 'opt_back_to_main_contact',
          text: 'Main Menu',
          nextNodeId: 'greetingNode',
        },
        {
          id: 'opt_end_chat_contact',
          text: 'End Chat',
          nextNodeId: 'endNodeThankYou',
        },
      ],
    },
    magicalSolutionsNode: {
      id: 'magicalSolutionsNode',
      botMessage:
        "Magical Solutions Inc. provides cutting-edge illusions and enchantments for all your mystical needs! It's truly wondrous.",
      nodeType: 'information_only',
      options: [
        {
          id: 'opt_back_to_services_from_magic',
          text: 'Back to Services',
          nextNodeId: 'servicesNode',
        },
        {
          id: 'opt_main_menu_from_magic',
          text: 'Main Menu',
          nextNodeId: 'greetingNode',
        },
        {
          id: 'opt_end_chat_magic',
          text: 'End Chat',
          nextNodeId: 'endNodeThankYou',
        },
      ],
    },
    endNodeThankYou: {
      id: 'endNodeThankYou',
      botMessage: "You're welcome! Have a great day!",
      nodeType: 'end_conversation',
    },
  },
};
