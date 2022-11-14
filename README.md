# bettertts

Generate text-to-speech .mp3 files in node or in the terminal

## Installation

```bash
# Node
npm install bettertts

# Terminal
npm install bettertts -g
```

## Usage

```bash
ttsjs <text>
```

### Options:
- [`-f`|`--file`] The file to output to (or use redirection `>` which is automatically detected)
- [`-v`|`--voice`] The TTS voice, one of `male` or `female`
- [`-l`|`--locale`] The text locale