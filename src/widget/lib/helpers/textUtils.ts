// Helper function to extract name
export const extractName = (userInput: string): string => {
  const patterns = [
    // More specific patterns first
    /^\s*(?:yes|yeah|yep|ok|okay|sure|alright|my name is|i am|i'm|call me|it is|it's)\s*,?\s*(?:my name is|i am|i'm|call me|it is|it's)?\s*([A-Za-z'-]+(?:\s+[A-Za-z'-]+)*)\s*\.?\s*$/i,
    // Simpler patterns for affirmation + name
    /^\s*(?:yes|yeah|yep|ok|okay|sure|alright)\s*,?\s+([A-Za-z'-]+(?:\s+[A-Za-z'-]+)*)\s*\.?\s*$/i,
    // Just the name introduction phrases
    /^\s*(?:my name is|i am|i'm|call me|it is|it's)\s+([A-Za-z'-]+(?:\s+[A-Za-z'-]+)*)\s*\.?\s*$/i,
  ];

  for (const pattern of patterns) {
    const match = userInput.match(pattern);
    if (match && match[1]) {
      return match[1].trim(); // Return the captured group (the name)
    }
  }

  // Fallback: if no complex pattern matches, try removing just a simple leading "yes" or "yeah"
  const simpleAffirmationMatch = userInput.match(
    /^\s*(?:yes|yeah)\s*,?\s+(.*)/i,
  );
  if (simpleAffirmationMatch && simpleAffirmationMatch[1]) {
    return simpleAffirmationMatch[1].trim();
  }

  return userInput.trim(); // Default to returning the trimmed input
};