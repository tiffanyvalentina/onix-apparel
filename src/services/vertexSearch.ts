import { Product } from '../types/product';

export interface FacetValue {
  value: string;
  count: number;
}

export interface FacetGroup {
  key: string;
  values: FacetValue[];
}

export interface VertexSearchParams {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  sortBy?: string;
  pageSize?: number;
}

export interface VertexSearchResponse {
  source: 'vertex-ai-live' | 'vertex-ai-simulation' | 'local-fallback';
  totalSize: number;
  correctedQuery: string | null;
  facets: FacetGroup[];
  products: Product[];
}

export interface VertexHealthResponse {
  status: string;
  mode: 'live' | 'mock';
  gcpProjectId: string | null;
  location: string;
  catalogItemCount: number;
  timestamp: string;
}

// Generate or retrieve persistent anonymous visitorId for Retail ML ranking
function getVisitorId(): string {
  const STORAGE_KEY = 'onix_visitor_id';
  let visitorId = localStorage.getItem(STORAGE_KEY);
  if (!visitorId) {
    visitorId = `vis_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
    localStorage.setItem(STORAGE_KEY, visitorId);
  }
  return visitorId;
}

/**
 * Execute a commerce search query via the Vertex AI Retail Search backend proxy.
 */
export async function searchVertexProducts(
  params: VertexSearchParams = {}
): Promise<VertexSearchResponse> {
  const visitorId = getVisitorId();

  try {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...params,
        visitorId,
      }),
    });

    if (!res.ok) {
      throw new Error(`Proxy returned HTTP ${res.status}`);
    }

    const data: VertexSearchResponse = await res.json();
    return data;
  } catch (error) {
    console.warn('Vertex AI search proxy unreachable, using client-side fallback:', error);
    return {
      source: 'local-fallback',
      totalSize: 0,
      correctedQuery: null,
      facets: [],
      products: [],
    };
  }
}

/**
 * Log real-time e-commerce user events (views, cart adds, purchases)
 * to train Vertex AI's personalization and ranking models (Quality Flywheel).
 */
export async function trackVertexUserEvent(
  eventType: 'detail-page-view' | 'add-to-cart' | 'purchase-complete',
  product?: Product,
  details: Record<string, any> = {}
): Promise<void> {
  const visitorId = getVisitorId();

  try {
    await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        visitorId,
        product,
        details,
      }),
    });
  } catch (err) {
    // Non-blocking telemetry
    console.debug('Failed to send Vertex user event:', err);
  }
}

/**
 * Check backend proxy connection and Vertex AI mode.
 */
export async function getVertexHealth(): Promise<VertexHealthResponse | null> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
