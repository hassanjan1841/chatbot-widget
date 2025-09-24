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
    | 'capture_name'
    | 'capture_email'
    | 'capture_phone'
    | 'confirm_lead_data'
    | 'end_conversation';
  options?: FlowOption[]; // Available options if it's a 'question_with_options' type
  validation?: 'email' | 'phone_with_country_code'; // Optional validation type
  nextOnInputNodeId?: string; // For capture types, node to go to after successful input
}

export interface ConversationFlow {
  startNodeId: string;
  nodes: Record<string, FlowNode>; // A dictionary of nodes, keyed by their ID
}

// Sample Demo Conversation Flow
export const demoConversationFlow: ConversationFlow = {
  startNodeId: 'leadCaptureGreeting',
  nodes: {
    leadCaptureGreeting: {
      id: 'leadCaptureGreeting',
      botMessage:
        "Hello! I'm here to help. To get started, could I please get your full name?",
      nodeType: 'capture_name',
      nextOnInputNodeId: 'leadCaptureEmail',
    },
    greetingNode: {
      id: 'greetingNode',
      botMessage:
        'Thanks for providing your details! How can I assist you further today?',
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
    leadCaptureName: {
      id: 'leadCaptureName',
      botMessage: 'Great! To get started, could I please get your full name?',
      nodeType: 'capture_name',
      nextOnInputNodeId: 'leadCaptureEmail',
    },
    leadCaptureEmail: {
      id: 'leadCaptureEmail',
      botMessage: 'Thanks, {name}! What is your email address?',
      nodeType: 'capture_email',
      validation: 'email',
      nextOnInputNodeId: 'leadCapturePhone',
    },
    leadCapturePhone: {
      id: 'leadCapturePhone',
      botMessage:
        "Got it! And lastly, what's your phone number? Please include your country code (e.g., +1 555-123-4567).",
      nodeType: 'capture_phone',
      validation: 'phone_with_country_code',
      nextOnInputNodeId: 'leadCaptureConfirm',
    },
    leadCaptureConfirm: {
      id: 'leadCaptureConfirm',
      botMessage:
        'Perfect! Just to confirm your details:\nName: {name}\nEmail: {email}\nPhone: {phone}\nIs this correct?',
      nodeType: 'confirm_lead_data',
      options: [
        {
          id: 'confirm_yes',
          text: "Yes, that's correct",
          nextNodeId: 'leadCaptureComplete',
        },
        {
          id: 'confirm_edit_name',
          text: 'Edit Name',
          nextNodeId: 'leadCaptureName',
        },
        {
          id: 'confirm_edit_email',
          text: 'Edit Email',
          nextNodeId: 'leadCaptureEmail',
        },
        {
          id: 'confirm_edit_phone',
          text: 'Edit Phone',
          nextNodeId: 'leadCapturePhone',
        },
        {
          id: 'confirm_start_over',
          text: 'Start Over',
          nextNodeId: 'leadCaptureGreeting',
        },
      ],
    },
    leadCaptureComplete: {
      id: 'leadCaptureComplete',
      botMessage:
        "Excellent! We've received your details. Now, how can we help you?",
      nodeType: 'question_with_options',
      options: [
        {
          id: 'final_opt_services',
          text: 'Tell me about your services',
          nextNodeId: 'servicesNode',
        },
        {
          id: 'final_opt_pricing',
          text: 'Show me pricing',
          nextNodeId: 'pricingNode',
        },
        {
          id: 'final_opt_contact',
          text: 'How to contact us?',
          nextNodeId: 'contactNode',
        },
        {
          id: 'final_opt_end_chat',
          text: "That's all, thanks!",
          nextNodeId: 'endNodeThankYou',
        },
      ],
    },
    invalidEmailNode: {
      id: 'invalidEmailNode',
      botMessage:
        "Hmm, that email address doesn't look quite right. Could you please enter a valid email?",
      nodeType: 'capture_email',
      validation: 'email',
      nextOnInputNodeId: 'leadCapturePhone',
      options: [
        {
          id: 'skip_email',
          text: 'Skip Email',
          nextNodeId: 'leadCapturePhone',
        },
        {
          id: 'back_to_name_from_email',
          text: 'Go Back to Name',
          nextNodeId: 'leadCaptureName',
        },
      ],
    },
    invalidPhoneNode: {
      id: 'invalidPhoneNode',
      botMessage:
        "Please ensure your phone number starts with a '+' followed by your country code and number (e.g., +1 555-123-4567).",
      nodeType: 'capture_phone',
      validation: 'phone_with_country_code',
      nextOnInputNodeId: 'leadCaptureConfirm',
      options: [
        {
          id: 'skip_phone',
          text: 'Skip Phone',
          nextNodeId: 'leadCaptureConfirm',
        },
        {
          id: 'back_to_email_from_phone',
          text: 'Go Back to Email',
          nextNodeId: 'leadCaptureEmail',
        },
      ],
    },
  },
};
