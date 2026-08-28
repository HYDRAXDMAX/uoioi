export default async function handler(req, res) {
  const uid = String(req.query.uid || "").trim();

  if (!/^\d{5,}$/.test(uid)) {
    return res.status(400).json({
      error: "Invalid UID. Enter a numeric player UID."
    });
  }

  const target =
    `https://dm-info7.vercel.app/info?uid=${encodeURIComponent(uid)}`;

  try {
    const response = await fetch(target, {
      headers: {
        "Accept": "application/json"
      }
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Upstream API returned HTTP ${response.status}`
      });
    }

    let json;

    try {
      json = JSON.parse(text);
    } catch {
      return res.status(502).json({
        error: "Upstream API did not return valid JSON."
      });
    }

    res.setHeader(
      "Cache-Control",
      "s-maxage=10, stale-while-revalidate=30"
    );

    return res.status(200).json(json);

  } catch (error) {
    return res.status(502).json({
      error: "Could not connect to the player information API."
    });
  }
}
