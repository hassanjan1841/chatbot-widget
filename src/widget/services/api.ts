interface ChatResponse {
  text: string;
}

// Mock API service
export const getBotResponse = async (
  userMessage: string,
  clientKey: string,
): Promise<ChatResponse> => {
  console.log(
    `Mock API called with clientKey: ${clientKey} and message: ${userMessage}`,
  );
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate different responses based on clientKey or message
  let botText = 'I am a generic bot.';
  if (clientKey === 'test-key') {
    if (userMessage.toLowerCase().includes('hello')) {
      botText = 'Hi there! How can I help you today?';
    } else if (userMessage.toLowerCase().includes('help')) {
      botText = 'Sure, I can help. What do you need assistance with?';
    } else {
      botText = `Thanks for your message about \"${userMessage}\". I am processing it.`;
    }
  } else if (clientKey === 'another-key') {
    botText = 'Hello from another configuration!';
  } else {
    botText = `Received your message: ${userMessage}`;
  }

  return { text: botText };
};
