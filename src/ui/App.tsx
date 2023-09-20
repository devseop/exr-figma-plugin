import React, { useState } from 'react';
import useRandomQuotes from './hooks/useRandomQuotes';
import { requestGenerateRandomQuoteToPlugin } from './lib/figma';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getRandomQuote = useRandomQuotes();

  const generateRandomQuote = async () => {
    setIsLoading(true);
    const randomQuote = await getRandomQuote();
    // console.log('randomQuote', randomQuote);
    requestGenerateRandomQuoteToPlugin(randomQuote);
    setIsLoading(false);
  };

  return (
    <div>
      <p>Select Text Node and Click</p>
      <button type="submit" onClick={generateRandomQuote}>
        {isLoading ? 'Loading...' : 'Random Quote'}
      </button>
    </div>
  );
}

export default App;
