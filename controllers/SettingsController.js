import db from "../models";

// GET /api/settings — public
// Tra ve tat ca settings duoi dang { key: value }
export async function getSettings(req, res) {
  const settings = await db.Setting.findAll();

  if (!settings || settings.length === 0) {
    return res.status(200).json({
      message: 'Get settings success',
      data: {}
    });
  }

  // Chuyen tu array [{key, value}] sang object { key: value }
  const data = settings.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  return res.status(200).json({
    message: 'Get settings success',
    data
  });
}

// PUT /api/settings — admin only
// Nhan { key: value, ... } va upsert tung key
export async function updateSettings(req, res) {
  const updates = req.body;

  if (!updates || typeof updates !== 'object' || Array.isArray(updates)) {
    return res.status(400).json({
      message: 'Invalid request body. Expected { key: value } object.'
    });
  }

  const keys = Object.keys(updates);
  if (keys.length === 0) {
    return res.status(400).json({ message: 'No settings provided.' });
  }

  // Upsert tung key: neu ton tai thi update, chua co thi insert
  const promises = keys.map((key) =>
    db.Setting.upsert({ key, value: String(updates[key]) })
  );

  await Promise.all(promises);

  return res.status(200).json({
    message: 'Update settings success'
  });
}
