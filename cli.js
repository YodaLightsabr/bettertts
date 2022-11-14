#!/usr/bin/env node

const ms = Date.now();

const tts = require('./index.js');
const commandLineArgs = require('command-line-args');
const fs = require('fs');
const { Readable } = require('stream');
const tty = require('tty');

const isRedirected = !!!tty.isatty(process.stdout.fd);

class FileDetails {
    constructor(filename) {
        this.filename = filename;
        this.exists = fs.existsSync(filename);
    }
}

class VoiceType {
    constructor(voice) {
        if (voice?.toLowerCase() == 'male') this.voice = 'male';
        else this.voice = 'female';
    }
}

const args = [
    { name: 'text', alias: 't', type: String, defaultOption: true },
    { name: 'locale', alias: 'l', type: String },
    { name: 'file', alias: 'f', type: filename => new FileDetails(filename) },
    { name: 'voice', alias: 'v', type: filename => new VoiceType(filename) },
    { name: 'help', alias: 'h', type: Boolean }
];

const { text, file, locale, voice, help } = commandLineArgs(args);

if (help) return console.log(`
Generate text-to-speech .mp3 files in the terminal

ttsjs <text>

Options:
- [-f|--file] The file to output to (or use redirection ">" which is automatically detected)
- [-v|--voice] The TTS voice, one of male or female
- [-l|--locale] The text locale`);

if (!text) throw new Error('Missing text');

const bytes = Buffer.byteLength(text, "utf-8");

if (!isRedirected && !file?.filename) console.warn('No file specified and no redirect detected');

tts(voice?.voice ?? 'female', text, locale, file?.filename).then(output => {
    if (!isRedirected) return console.log(`Synthesized ${bytes} bytes of text in ${Date.now() - ms}ms`);
    if (file?.filename) return;

    const stream = Readable.from(output);
    stream.pipe(process.stdout);
});