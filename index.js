const fs = require('fs');
const fetch = require('node-fetch');

async function tts (voice, text, locale = 'en-US', file) {
    if (!voice?.toLowerCase || !['male', 'female'].includes(voice.toLowerCase())) throw new Error('Voice must be one of male, female');
    const url = `https://synthesis-service.scratch.mit.edu/synth?locale=${encodeURIComponent(locale)}&gender=${voice.toLowerCase()}&text=${encodeURIComponent(text).split('%20').join('+')}`;
    const data = await fetch(url, {
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    });
    const buffer = await data.buffer();
    if (!file) return buffer;
    return fs.writeFileSync(file, buffer);
}

module.exports = tts;