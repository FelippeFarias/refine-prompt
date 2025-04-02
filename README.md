<p align="center">
  <img src="https://img.icons8.com/color/96/000000/lighting-bolt--v2.png" alt="Refine Prompt Logo" width="120" height="120"/>
</p>

<h1 align="center">✨ Refine Prompt ✨</h1>

<p align="center">
  <b>Transform ordinary prompts into powerful, structured instructions for any LLM</b>
</p>

<p align="center">
  <a href="https://github.com/felippefarias/refine-prompt/actions"><img src="https://img.shields.io/github/actions/workflow/status/felippefarias/refine-prompt/main.yml?style=flat-square" alt="Build Status"></a>
  <a href="https://github.com/felippefarias/refine-prompt/blob/main/LICENSE"><img src="https://img.shields.io/github/license/felippefarias/refine-prompt?style=flat-square" alt="License"></a>
  <a href="https://www.npmjs.com/package/refine-prompt"><img src="https://img.shields.io/npm/v/refine-prompt?style=flat-square" alt="NPM Version"></a>
  <a href="https://smithery.ai/server/@FelippeFarias/refine-prompt"><img src="https://smithery.ai/badge/@FelippeFarias/refine-prompt" alt="Smithery Badge"></a>
</p>

<p align="center">
  <a href="#-installation">Installation</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-how-it-works">How It Works</a> •
  <a href="#-features">Features</a> •
  <a href="#-examples">Examples</a> •
  <a href="#-license">License</a>
</p>

---

## 📋 Overview

**Refine Prompt** is an intelligent prompt engineering tool that transforms ordinary prompts into powerful, structured instructions for any large language model (LLM). Using Claude's advanced capabilities, it enhances your prompts to produce exceptional results across all AI platforms.

> 🔑 **Important:** Your prompt must include the keyword "refine" to activate the enhancement process.
> 
> Example: `"refine, Create a function that calculates the factorial of a number"`

---

## 🚀 Installation

### 📦 Via NPM

```bash
npm install refine-prompt
```

### 🛠️ Via Smithery

You can install this MCP server directly through Smithery by visiting:
[Smithery - Refine Prompt](https://smithery.ai/server/@FelippeFarias/refine-prompt)

### 📁 Via Local Repository

```bash
# Clone the repository
git clone https://github.com/felippefarias/refine-prompt.git
cd refine-prompt

# Install dependencies
npm install
```

---

## 🏁 Getting Started

### 🔑 API Key Setup

Refine Prompt requires an Anthropic API key to access Claude's advanced capabilities:

```bash
export ANTHROPIC_API_KEY=your_anthropic_api_key
```

Without an API key, the tool will display an error message.

### ⚙️ Running the Server

```bash
npm start
```

Or with MCP Inspector:
```bash
npx @modelcontextprotocol/inspector npm start
```

---

## 🔧 Tool: rewrite_prompt - The Power of Refinement

<p align="center">
  <img src="https://img.icons8.com/fluent/48/000000/wrench.png" alt="Tool Icon" width="48" height="48"/>
</p>

Transform your ideas into expertly crafted prompts. This powerful tool analyzes your input and generates a professionally engineered prompt that maximizes AI understanding and response quality.

### 📝 Parameters

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `prompt` | Your raw prompt that needs refinement (must include "refine" keyword) | ✅ |
| `language` | For code-related prompts, specify the target programming language | ❌ |

### 📋 Example Usage

<details>
<summary><b>For general prompts</b></summary>

```json
{
  "name": "rewrite_prompt",
  "arguments": {
    "prompt": "refine, Summarize the main points of the article titled \"The Future of AI\""
  }
}
```
</details>

<details>
<summary><b>For code-related prompts</b></summary>

```json
{
  "name": "rewrite_prompt",
  "arguments": {
    "prompt": "refine, Create a function to convert temperature between Celsius and Fahrenheit",
    "language": "typescript"
  }
}
```
</details>

---

## 🧠 How It Works

<p align="center">
  <img src="https://img.icons8.com/color/96/000000/artificial-intelligence.png" alt="AI" width="64" height="64"/>
</p>

The server uses Claude 3 Sonnet by Anthropic to intelligently rewrite your prompts for better results. Every prompt must include the keyword "refine" to trigger the enhancement process.

It enhances your prompt by:

1. 📐 Adding clear structure and context
2. 📝 Specifying requirements and expectations
3. 🔍 Including domain-specific considerations
4. 🌐 Optimizing for any LLM understanding

---

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 🤖 **AI-Powered Refinement** | Leverages Claude 3.5 Sonnet's advanced capabilities to transform your prompts |
| 🔑 **Activation with Keywords** | Simply include "refine" in your prompt to trigger the enhancement |
| 🌐 **Universal Compatibility** | Optimizes prompts for any type of task or domain |
| 💻 **Code-Specific Intelligence** | Provides specialized enhancements for programming tasks when language is specified |
| 🔄 **Seamless Integration** | Works flawlessly with any LLM-powered application or workflow |
| 🎯 **Precision-Focused** | Uses 0.2 temperature setting to ensure reliable, consistent output quality |
| 📊 **Structural Clarity** | Adds logical organization, clear instructions, and proper formatting |

</div>

---

## ⚙️ Configuration

### 🖥️ Usage with Claude Desktop
Add this to your `claude_desktop_config.json`:

<details>
<summary><b>NPX</b></summary>

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
</details>

<details>
<summary><b>Local Installation</b></summary>

```bash
# Clone the repository
git clone https://github.com/felippefarias/refine-prompt.git
cd refine-prompt

# Install dependencies
npm install

# Run the server
node index.js
```
</details>

---

## 📊 Examples

### 📝 General Prompt Enhancement

<table>
<tr>
<th>Input</th>
<th>Arguments</th>
</tr>
<tr>
<td>

```
refine, Summarize the main points of the article titled "The Future of AI"
```

</td>
<td>

```json
{
  "prompt": "refine, Summarize the main points of the article titled \"The Future of AI\""
}
```

</td>
</tr>
</table>

### 💻 Code-Related Prompt Enhancement

<table>
<tr>
<th>Input</th>
<th>Arguments</th>
</tr>
<tr>
<td>

```
refine, Create a function that sorts an array of objects by a specific property
```

</td>
<td>

```json
{
  "prompt": "refine, Create a function that sorts an array of objects by a specific property",
  "language": "typescript"
}
```

</td>
</tr>
</table>

The tool will rewrite both prompts to be more structured and detailed for optimal results with any LLM.

---

## 🚀 Elevate Your AI Interactions

<p align="center">
  <img src="https://img.icons8.com/fluent/96/000000/rocket.png" alt="Rocket" width="64" height="64"/>
</p>

Refine Prompt bridges the gap between human thinking and AI understanding. By transforming your natural language instructions into expertly engineered prompts, it helps you unlock the full potential of any language model. Whether you're a developer, content creator, researcher, or AI enthusiast, Refine Prompt gives you the power to communicate with AI more effectively.

---

## 📄 License

<p align="center">
  <img src="https://img.icons8.com/ios/50/000000/certificate.png" alt="License" width="32" height="32"/>
</p>

Refine Prompt is licensed under the MIT License. You are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
