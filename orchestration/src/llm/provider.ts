import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";

type LLMProvider = "anthropic" | "openai" | "google";

/**
 * Returns a provider-agnostic LLM instance based on the BYOK configuration.
 * The LLM provider is determined by the LLM_PROVIDER environment variable.
 * API keys are read from environment (decrypted from Vault in production).
 */
export function getLLM(): BaseChatModel {
  const provider = (process.env.LLM_PROVIDER || "anthropic").toLowerCase() as LLMProvider;

  switch (provider) {
    case "anthropic":
      return new ChatAnthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
        model: "claude-sonnet-4-5",
        maxTokens: 4096,
        temperature: 0.1,
      });

    case "openai":
      return new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        model: "gpt-4o",
        maxTokens: 4096,
        temperature: 0.1,
      });

    case "google":
      return new ChatGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_AI_API_KEY,
        model: "gemini-1.5-pro",
        maxOutputTokens: 4096,
        temperature: 0.1,
      });

    default:
      throw new Error(
        `Unsupported LLM_PROVIDER: "${provider}". Valid options: anthropic, openai, google`
      );
  }
}
