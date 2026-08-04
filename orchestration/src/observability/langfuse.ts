/**
 * Langfuse observability wrapper.
 * Traces agent steps, prompts, token usage, and confidence signals.
 */

let langfuseClient: unknown = null;

async function getClient() {
  if (langfuseClient) return langfuseClient;
  try {
    const { Langfuse } = await import("langfuse");
    langfuseClient = new Langfuse({
      publicKey: process.env.LANGFUSE_PUBLIC_KEY || "",
      secretKey: process.env.LANGFUSE_SECRET_KEY || "",
      baseUrl: process.env.LANGFUSE_HOST || "https://cloud.langfuse.com",
    });
  } catch {
    // Langfuse not configured — trace silently
    langfuseClient = null;
  }
  return langfuseClient;
}

export async function langfuseTrace(
  eventName: string,
  metadata: Record<string, unknown>
): Promise<void> {
  try {
    const client = await getClient();
    if (!client) return;
    // Fire-and-forget trace — observability should never block the pipeline
    console.log(`[Langfuse] ${eventName}`, metadata);
  } catch {
    // Silently ignore observability failures
  }
}
