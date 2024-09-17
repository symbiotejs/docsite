import Symbiote, { html, css } from '@symbiotejs/symbiote';

const CFG = {
  apiUrl: 'https://api.openai.com/v1/chat/completions',
  apiKey: '<YOUR_API_KEY>',
};

const textStyles = [
  'Free informal speech, jokes, memes, emoji, possibly long',
  'Casual chat, friendly tone, occasional emoji, short and relaxed',
  'Medium formality, soft style, basic set of emoji possible, compact',
  'Neutral tone, clear and direct, minimal slang or emoji',
  'Professional tone, polite and respectful, no emoji, short sentences',
  'Strict business language. Polite and grammatically correct.',
  'Highly formal, authoritative, extensive use of complex vocabulary, long and structured',
];

export class SmartTextarea extends Symbiote {

  ssrMode = true;

  #sourceText = '';

  init$ = {
    '@model': 'gpt-4o',

    '+currentTextStyle': () => {
      return textStyles[this.ref.textStyleRange.value - 1];
    },

    saveSourceText: () => {
      this.#sourceText = this.ref.text.value;
    },
    revertChanges: () => {
      this.ref.text.value = this.#sourceText;
    },
    onTextStyleChange: (e) => {
      this.notify('+currentTextStyle');
    },
    askAi: async () => {
      if (!this.ref.text.value.trim()) {
        alert('Your text input is empty');
        return;
      }
      let aiResponse = await (await window.fetch(CFG.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CFG.apiKey}`,
        },
        body: JSON.stringify({
          model: this.$['@model'],
          messages: [
            {
              role: 'system',
              content: JSON.stringify({
                useLanguage: this.ref.lang.value || 'Same as the initial text language',
                textStyle: this.$['+currentTextStyle'],
              }),
            },
            {
              role: 'assistant',
              content: 'You are the text writing assistant. Rewrite the input text according to parameters provided.',
            },
            {
              role: 'user',
              content: this.ref.text.value,
            },
          ],
          temperature: 0.7,
        }),
      })).json();
  
      this.ref.text.value = aiResponse?.choices?.[0]?.message.content || this.ref.text.value;
    },
  }

}

SmartTextarea.reg('smart-textarea');