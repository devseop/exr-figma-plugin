import { PluginMessagePayload, QuoteProps } from '../../shared';

export function requestToPlugin<T>(payload: T) {
  parent.postMessage({ pluginMessage: payload }, '*');
}

export function requestGenerateRandomQuoteToPlugin(randomQuote: QuoteProps) {
  requestToPlugin<PluginMessagePayload>({
    type: 'generateRandomQuote',
    randomQuote,
  });
}
