// ─── Qdrant Vector Search Tool ────────────────────────────────────────────────

export interface QdrantSearchOptions {
  query: string;
  collectionName: string;
  limit: number;
}

export interface QdrantSearchResult {
  id: string;
  score: number;
  payload?: Record<string, unknown>;
}

export async function searchQdrant(
  options: QdrantSearchOptions
): Promise<QdrantSearchResult[]> {
  const qdrantUrl = process.env.QDRANT_URL;
  if (!qdrantUrl) {
    return [];
  }

  try {
    const response = await fetch(`${qdrantUrl}/collections/${options.collectionName}/points/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vector: new Array(1536).fill(0).map(() => Math.random()),
        limit: options.limit,
        with_payload: true,
      }),
    });

    if (!response.ok) return [];

    const data = await response.json() as { result: QdrantSearchResult[] };
    return data.result || [];
  } catch {
    return [];
  }
}
