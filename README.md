# Streamdown Lite

A lightweight drop-in replacement for react-markdown, designed for AI-powered streaming with code highlighting.

[![npm version](https://img.shields.io/npm/v/@phaserjs/streamdown-lite)](https://www.npmjs.com/package/@phaserjs/streamdown-lite)

## Overview

Formatting Markdown is easy, but when you tokenize and stream it, new challenges arise. Streamdown is built specifically to handle the unique requirements of streaming Markdown content from AI models, providing seamless formatting even with incomplete or unterminated Markdown blocks.

Streamdown powers the [AI Elements Response](https://ai-sdk.dev/elements/components/response) component but can be installed as a standalone package for your own streaming needs.

## Features

- 🚀 **Drop-in replacement** for `react-markdown`
- 🔄 **Streaming-optimized** - Handles incomplete Markdown gracefully
- 🎨 **Unterminated block parsing** - Styles incomplete bold, italic, code, links, and headings
- 📊 **GitHub Flavored Markdown** - Tables, task lists, and strikethrough support
- 🎯 **Code syntax highlighting** - Beautiful code blocks with Speed Highlight
- 🛡️ **Security-first** - Built on harden-react-markdown for safe rendering
- ⚡ **Performance optimized** - Memoized rendering for efficient updates

## Installation

```bash
npm i @phaserjs/streamdown-lite
```

Then, update your Tailwind `globals.css` to include the following.

```css
@source "../node_modules/@phaserjs/streamdown-lite/dist/index.js";
```

Make sure the path matches the location of the `node_modules` folder in your project. This will ensure that the Streamdown styles are applied to your project.

## Usage

### Basic Example

```tsx
import { Streamdown } from '@phaserjs/streamdown-lite';

export default function Page() {
  const markdown = "# Hello World\n\nThis is **streaming** markdown!";

  return <Streamdown>{markdown}</Streamdown>;
}
```

### With AI SDK

```tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Streamdown } from '@phaserjs/streamdown-lite';

export default function Page() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState('');

  return (
    <>
      {messages.map(message => (
        <div key={message.id}>
          {message.parts.filter(part => part.type === 'text').map((part, index) => (
            <Streamdown key={index}>{part.text}</Streamdown>
          ))}
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={status !== 'ready'}
          placeholder="Say something..."
        />
        <button type="submit" disabled={status !== 'ready'}>
          Submit
        </button>
      </form>
    </>
  );
}
```

## Props

Streamdown accepts all the same props as react-markdown, plus additional streaming-specific options:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | - | The Markdown content to render |
| `parseIncompleteMarkdown` | `boolean` | `true` | Parse and style unterminated Markdown blocks |
| `className` | `string` | - | CSS class for the container |
| `components` | `object` | - | Custom component overrides |
| `remarkPlugins` | `array` | `[remarkGfm]` | Remark plugins to use |
| `rehypePlugins` | `array` | `[rehypeKatex]` | Rehype plugins to use |
| `allowedImagePrefixes` | `array` | `['*']` | Allowed image URL prefixes |
| `allowedLinkPrefixes` | `array` | `['*']` | Allowed link URL prefixes |
| `defaultOrigin` | `string` | - | Default origin to use for relative URLs in links and images |

**Note:** Streamdown-lite also accepts all props from `react-markdown` through inheritance.

## Architecture

Streamdown-lite is built as a monorepo with:

- **`packages/streamdown-lite`** - The core React component library
- **`apps/website`** - Documentation and demo site

## Development

```bash
# Install dependencies
pnpm install

# Build the streamdown-lite package
pnpm --filter streamdown-lite build

# Run development server
pnpm dev

# Run tests
pnpm test

# Build packages
pnpm build
```

## Requirements

- Node.js >= 18
- React >= 19.1.1

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
