import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ProxyErrorResponse = {
  error: string;
  code?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path } = req.query;
  const pathSegments = Array.isArray(path) ? path : [path];
  const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_BASE_URL;

  if (!baseUrl) {
    return res
      .status(500)
      .json({ error: "NEXT_PUBLIC_LARAVEL_BASE_URL is not configured" });
  }

  const targetUrl = `${baseUrl.replace(/\/+$/, "")}/${pathSegments.join("/")}`;
  const apiKey = process.env.LARAVEL_API_KEY;

  if (!apiKey) {
    console.error("[PROXY] LARAVEL_API_KEY is not configured");
    return res.status(500).json({ error: "LARAVEL_API_KEY is not configured" });
  }

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      data: req.body,
      timeout: 20000,
    });

    return res.status(response.status).json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const data = error.response?.data;

      console.error("[PROXY] Error code:", error.code);
      console.error("[PROXY] Error message:", error.message);
      console.error("[PROXY] Response status:", status);
      console.error("[PROXY] Response data:", data);

      if (data) {
        return res.status(status).json(data);
      }

      const proxyError: ProxyErrorResponse = {
        error: error.message,
        code: error.code,
      };

      return res.status(status).json(proxyError);
    }

    console.error("[PROXY] Unexpected error:", error);

    return res.status(500).json({
      error: "Unexpected proxy error",
    });
  }
}