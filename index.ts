#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { ChatAnthropic } from "@langchain/anthropic";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

// Using explicit declaration for Node.js process with environment variables
declare const process: {
  exit: (code: number) => never;
  stderr: { write: (message: string) => void };
  env: Record<string, string | undefined>;
};

// MCP Tool definition for rewriting prompts (now generalized)
const REWRITE_PROMPT_TOOL: Tool = {
  name: "refine_prompt", // Generalized name
  description: "This tool MUST be used whenever a user asks to refine, rewrite, improve, enhance, or optimize a prompt. It transforms raw prompts into more effective versions that are clearer, more detailed, and better structured to improve results from Large Language Models (LLMs). When users mention 'refine prompt' or similar phrases, use this tool.", // Improved description
  inputSchema: {
    type: "object",
    properties: {
      prompt: {
        type: "string",
        description: "The raw user prompt that needs rewriting."
      },
      language: { // Language is now optional context
        type: "string",
        description: "Optional: The primary programming language if the prompt is code-related (e.g., typescript, python). Helps tailor coding prompts."
      }
      // You could add other optional context fields here later, e.g., 'target_audience', 'output_format_preference'
    },
    required: ["prompt"], // Only prompt is strictly required
    title: "refine_prompt_Arguments" // Generalized title
  }
};

// MCP Server implementation
const server = new Server(
  {
    name: "refine-prompt", // Updated server name
    version: "1.2.0", // Updated version
  },
  {
    capabilities: {
      tools: {}, // Exposes the tools capability
    },
  },
);

// Type guard to validate the tool arguments (language is optional)
function isRewritePromptArgs(args: unknown): args is {
  prompt: string;
  language?: string; // Language is optional
} {
  if (typeof args !== 'object' || args === null) {
    return false;
  }
  const potentialArgs = args as { prompt?: unknown; language?: unknown };
  if (typeof potentialArgs.prompt !== 'string') {
    return false;
  }
  // Check language only if it exists
  if (potentialArgs.language !== undefined && typeof potentialArgs.language !== 'string') {
    return false;
  }
  return true;
}

/**
 * Main function using an LLM (Claude) to rewrite a user prompt for better results.
 * @param prompt The original user prompt.
 * @param language Optional: The target programming language, if applicable.
 * @returns The rewritten and optimized prompt as a string.
 */
async function rewritePrompt(prompt: string, language?: string): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY environment variable is not set.");
    throw new Error("ANTHROPIC_API_KEY environment variable is not set.");
  }

  // Initialize the LLM
  const model = new ChatAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    temperature: 0.2, // Low temperature for more deterministic and structured outputs
    modelName: "claude-3-5-sonnet-20241022", // Recommended balanced model
    // modelName: "claude-3-opus-20240229", // Alternative: Max quality (higher cost)
    // modelName: "claude-3-haiku-20240307", // Alternative: Speed/cost focus (potentially lower rewrite quality)
  });

  // --- Generalized and Enhanced System Prompt (in English) ---
  // Uses XML tags for structure, which Claude handles well.
  // Conditionally incorporates the language if provided.
  const systemPromptText = `<role>
You are an expert Prompt Engineer AI assistant. Your primary function is to rewrite raw user prompts into highly effective, detailed, and well-structured prompts optimized for Large Language Models (LLMs) like Claude, GPT-4, Gemini, etc., across a wide range of tasks (coding, writing, analysis, brainstorming, etc.).
</role>

<task>
Analyze the provided raw user prompt and transform it into an improved prompt that maximizes the clarity, context, and detail needed for another LLM to generate the best possible response.
${language ? `\nThis specific prompt seems code-related, targeting the '${language}' programming language. Pay special attention to coding-specific instructions if applicable.` : ''}
</task>

<instructions>
Follow these guidelines meticulously when rewriting the prompt:
1.  **Clarify Objective & Scope:** Identify the core goal. If the original prompt is vague, refine it to be specific and unambiguous. Define the scope clearly.
2.  **Inject Essential Context:** Determine what background information or context the target LLM needs. This might include:
    *   Target audience or persona for the response.
    *   Relevant background details or constraints mentioned or implied.
    *   Source data or information to use (if applicable).
    *   ${language ? `For coding tasks related to '${language}': Explicitly mention the language, relevant libraries/frameworks, data structures, or existing code snippets if provided/implied.` : `If the prompt involves specific domains (e.g., scientific, legal), ensure terminology is correct.`}
    *   If crucial context seems missing, structure the rewritten prompt to explicitly ask the user to provide it.
3.  **Structure for Clarity:** Use clear formatting (Markdown preferred) like headings, lists, or numbered steps to break down the request logically. Use code blocks (e.g., \`\`\`${language || 'plaintext'} ... \`\`\`) for any code examples or data.
4.  **Specify Output Format:** Clearly define the desired format for the *final* LLM's response (e.g., JSON object with specific keys, bulleted list, email draft, Python function, analytical report, comparison table).
5.  **Define Constraints & Requirements:** Include explicit requirements like desired length, tone (e.g., formal, casual, witty), style guidelines, performance needs, specific algorithms/techniques to use or avoid (use positive framing: "Use algorithm X" instead of "Don't use Y").
6.  **Incorporate Examples (If Helpful):** For complex requests, provide concise examples of desired input/output or behavior to illustrate the task.
7.  **Break Down Complexity:** For multi-step or complex tasks, structure the prompt to encourage a step-by-step approach (Chain of Thought) or decompose it into logical sub-tasks.
8.  **Preserve Original Intent:** Critically ensure the rewritten prompt accurately reflects the user's original goal, merely enhancing its effectiveness. Do not introduce unrelated tasks.
9.  **Use Action Verbs:** Start instructions with clear action verbs.
</instructions>

<output_format>
Your output MUST be ONLY the rewritten, optimized prompt text, ready to be sent to another LLM. Do NOT include any explanations, introductions, apologies, commentary, markdown formatting markers (\`\`\`markdown\`), or any text other than the final prompt itself.
</output_format>`;

  // Create messages for the LLM
  const systemMessage = new SystemMessage(systemPromptText);
  // User message provides the raw prompt, context (language) is handled in the system prompt
  const userMessage = new HumanMessage(`Rewrite the following user prompt:\n\n---\n${prompt}\n---`);

  // --- Use LCEL (LangChain Expression Language) with pipe for robust output parsing ---
  const chain = model.pipe(new StringOutputParser());

  try {
    // Invoke the chain (model -> StringOutputParser)
    const rewrittenPromptString = await chain.invoke([systemMessage, userMessage]);

    // Basic check to ensure we got a string
    if (typeof rewrittenPromptString === 'string') {
      return rewrittenPromptString.trim(); // Return the cleaned string
    } else {
      console.error('StringOutputParser did not return a string:', rewrittenPromptString);
      throw new Error('Failed to get string output from the language model.');
    }

  } catch (error) {
    console.error("Error invoking LangChain chain (model -> StringOutputParser):", error);
    // Re-throw the error to be handled by the MCP tool handler
    throw error;
  }
}

// --- MCP Request Handlers (Updated for English Logs and Generality) ---

// Handler to list available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  console.error("ListToolsRequestSchema handler called."); // Log in English
  return {
    tools: [REWRITE_PROMPT_TOOL], // Return the generalized tool definition
  };
});

// Handler to call a specific tool
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  console.error(`CallToolRequestSchema handler called for tool: ${request.params.name}`); // Log in English
  try {
    const { name, arguments: args } = request.params;

    if (!args) {
      throw new Error("No arguments provided for tool call."); // English error
    }

    switch (name) {
      case REWRITE_PROMPT_TOOL.name: { // Use the generalized tool name
        // Validate arguments using the updated type guard
        if (!isRewritePromptArgs(args)) {
          console.error("Invalid arguments received:", args);
          throw new Error(`Invalid arguments for tool '${REWRITE_PROMPT_TOOL.name}'. Expected: { prompt: string, language?: string }`); // English error
        }

        // Extract arguments (language might be undefined)
        const { prompt, language } = args; 

        // Remove the keyword "refine" from the prompt before processing
        const cleanedPrompt = prompt.replace(/refine,?\s*/i, "").trim();

        if (language) {
            console.error(`Received prompt to rewrite (Language hint: '${language}'): "${cleanedPrompt.substring(0, 100)}..."`); // English log
        } else {
             console.error(`Received prompt to rewrite: "${cleanedPrompt.substring(0, 100)}..."`); // English log
        }

        // Call the generalized rewrite function with the cleaned prompt
        const rewrittenPrompt = await rewritePrompt(cleanedPrompt, language);

        console.error(`Rewritten prompt: "${rewrittenPrompt.substring(0, 100)}..."`); // English log

        // Return the successful result formatted for MCP
        return {
          content: [{ type: "text", text: rewrittenPrompt }],
          isError: false, // Indicate success
        };
      }

      default:
        // Handle unknown tools
        console.error(`Attempted to call unknown tool: ${name}`); // English log
        return {
          content: [{ type: "text", text: `Error: Unknown tool called: ${name}` }], // English error
          isError: true, // Indicate error
        };
    }
  } catch (error) {
    // General error handling for the tool call
    console.error(`Error processing tool call for '${request.params.name}':`, error); // English log
    return {
      content: [
        {
          type: "text",
          // Provide a safe error message back via MCP
          text: `Error executing tool '${request.params.name}': ${error instanceof Error ? error.message : String(error)}`, // English error
        },
      ],
      isError: true, // Indicate error
    };
  }
});

// --- Main Function to Run the Server ---
async function runServer() {
  // Use Standard I/O transport (common for IDE integrations)
  const transport = new StdioServerTransport();
  // Connect the server instance to the transport
  await server.connect(transport);
  // Log to stderr indicating the server is ready
  console.error("Refine Prompt server running and connected via stdio."); // Updated server name in log
}

// Start the server and handle potential fatal errors during startup
runServer().catch((error) => {
  console.error("Fatal error starting or running the MCP server:", error); // English log
  process.exit(1); // Exit with a non-zero code to indicate failure
});