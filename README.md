# Refine Prompt

Refine Prompt is an intelligent prompt engineering tool that transforms ordinary prompts into powerful, structured instructions for any large language model (LLM). Using Claude's advanced capabilities, it enhances your prompts to produce exceptional results across all AI platforms.

> **Important:** Your prompt must include the keyword "refine" to activate the enhancement process. For example: "refine, Create a function that calculates the factorial of a number".

## Installation

```bash
npm install
```

### Install via Smithery

You can install this MCP server directly through Smithery by visiting:
[![smithery badge](https://smithery.ai/badge/@FelippeFarias/refine-prompt)](https://smithery.ai/server/@FelippeFarias/refine-prompt)

### Installation via Local Repository 
You can install Refine Prompt by cloning the repository:

```bash
# Clone the repository
git clone https://github.com/felippefarias/refine-prompt.git
cd refine-prompt

# Install dependencies
npm install
```

## Getting Started

### API Key Setup

Refine Prompt requires an Anthropic API key to access Claude's advanced capabilities. Set your key as an environment variable:

```bash
export ANTHROPIC_API_KEY=your_anthropic_api_key
```

This secure connection to Claude's AI powers the transformation of your prompts. Without an API key, the tool will display an error message.

### Running the Server

```bash
npm start
```

Or with MCP Inspector:
```bash
npx @modelcontextprotocol/inspector npm start
```

## Tool: rewrite_prompt - The Power of Refinement

Transform your ideas into expertly crafted prompts. This powerful tool analyzes your input and generates a professionally engineered prompt that maximizes AI understanding and response quality.

### Parameters

- `prompt` (required): Your raw prompt that needs refinement (must include "refine" keyword to trigger the enhancement)
- `language` (optional): For code-related prompts, specify the target programming language for tailored optimization

### Example Usage

For general prompts:
```json
{
  "name": "rewrite_prompt",
  "arguments": {
    "prompt": "refine, Summarize the main points of the article titled \"The Future of AI\""
  }
}
```

For code-related prompts:
```json
{
  "name": "rewrite_prompt",
  "arguments": {
    "prompt": "refine, Create a function to convert temperature between Celsius and Fahrenheit",
    "language": "typescript"
  }
}
```

## How It Works

The server uses Claude 3 Sonnet by Anthropic to intelligently rewrite your prompts for better results. Every prompt must include the keyword "refine" to trigger the enhancement process. It enhances your prompt by:

1. Adding clear structure and context
2. Specifying requirements and expectations
3. Including domain-specific considerations
4. Optimizing for any LLM understanding

## Features

- **AI-Powered Refinement**: Leverages Claude 3.5 Sonnet's advanced capabilities to transform your prompts
- **Activation with Keywords**: Simply include "refine" in your prompt to trigger the enhancement
- **Universal Compatibility**: Optimizes prompts for any type of task or domain
- **Code-Specific Intelligence**: Provides specialized enhancements for programming tasks when language is specified
- **Seamless Integration**: Works flawlessly with any LLM-powered application or workflow
- **Precision-Focused**: Uses 0.2 temperature setting to ensure reliable, consistent output quality
- **Structural Clarity**: Adds logical organization, clear instructions, and proper formatting

## Configuration

### Usage with Claude Desktop
Add this to your `claude_desktop_config.json`:

### NPX

```json
{
  "mcpServers": {
    "refine-prompt": {
      "command": "npx",
      "args": [
        "-y",
        "refine-prompt"
      ]
    }
  }
}
```

### Local Installation

```bash
# Clone the repository
git clone https://github.com/felippefarias/refine-prompt.git
cd refine-prompt

# Install dependencies
npm install

# Run the server
node index.js
```

## Examples

### General Prompt Enhancement

Input:
```
refine, Summarize the main points of the article titled "The Future of AI"
```

With arguments:
```json
{
  "prompt": "refine, Summarize the main points of the article titled \"The Future of AI\""
}
```

### Code-Related Prompt Enhancement

Input:
```
refine, Create a function that sorts an array of objects by a specific property
```

With arguments:
```json
{
  "prompt": "refine, Create a function that sorts an array of objects by a specific property",
  "language": "typescript"
}
```

The tool will rewrite both prompts to be more structured and detailed for optimal results with any LLM.

## Elevate Your AI Interactions

Refine Prompt bridges the gap between human thinking and AI understanding. By transforming your natural language instructions into expertly engineered prompts, it helps you unlock the full potential of any language model. Whether you're a developer, content creator, researcher, or AI enthusiast, Refine Prompt gives you the power to communicate with AI more effectively.

## License

Refine Prompt is licensed under the MIT License. You are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
