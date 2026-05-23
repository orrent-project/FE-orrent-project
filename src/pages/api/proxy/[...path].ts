import type { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query
  const targetUrl = `${process.env.NEXT_PUBLIC_LARAVEL_BASE_URL}/${(path as string[]).join("/")}`

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.LARAVEL_API_KEY!,
      },
      data: req.body,
    })

    res.status(200).json(response.data)
  } catch (error: any) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}