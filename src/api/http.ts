import type {RequestParams} from "@/core/type/request.ts";

function buildUrl(baseUrl: string, params?: RequestParams): string {
    const urlObj = new URL(baseUrl);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                urlObj.searchParams.append(key, value.toString());
            }
        });
    }
    return urlObj.toString();
}

export async function handleRequest<T>(baseUrl: string, params?: RequestParams, method: "GET" | "POST" | "PUT" | "DELETE" = "GET" ): Promise<T> {
    const finalUrl = buildUrl(baseUrl, params);

    const response = await fetch(finalUrl, {method: method})
        .catch((error) => {
            throw error;
        });

    if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    return response.json();
}