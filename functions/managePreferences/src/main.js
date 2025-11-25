// This Appwrite function calls REST API directly to avoid external SDK dependency

export default async ({ req, res, log, error }) => {
    const endpoint = 'https://fra.cloud.appwrite.io/v1';
    const projectId = process.env.APPWRITE_FUNCTION_PROJECT_ID;
    const apiKey = process.env.APPWRITE_API_KEY;

    const DB_ID = '69229a90000ef8b82370';
    const COLLECTION_PREFS = 'user_preferences';

    // Parse payload
    let payload;
    try {
        payload = req.body ? JSON.parse(req.body) : {};
    } catch (e) {
        payload = {};
    }

    const { action, userId, preferences } = payload;

    if (!userId) {
        return res.json({ success: false, message: 'Missing userId' }, 400);
    }

    const headers = {
        'Content-Type': 'application/json',
        'X-Appwrite-Project': projectId,
        'X-Appwrite-Key': apiKey,
    };

    const docUrl = `${endpoint}/databases/${DB_ID}/collections/${COLLECTION_PREFS}/documents/${userId}`;
    const createUrl = `${endpoint}/databases/${DB_ID}/collections/${COLLECTION_PREFS}/documents`;

    try {
        if (action === 'get') {
            const resp = await fetch(docUrl, { headers });
            if (resp.status === 404) {
                return res.json({
                    success: true,
                    data: { pinnedGems: [], customColors: {}, sortPreference: 'default' },
                });
            }
            if (!resp.ok) {
                const text = await resp.text();
                throw new Error(`GET failed: ${resp.status} ${text}`);
            }
            const doc = await resp.json();
            return res.json({
                success: true,
                data: {
                    pinnedGems: JSON.parse(doc.pinnedGems || '[]'),
                    customColors: JSON.parse(doc.customColors || '{}'),
                    sortPreference: doc.sortPreference || 'default',
                },
            });
        } else if (action === 'save') {
            if (!preferences) {
                return res.json({ success: false, message: 'Missing preferences data' }, 400);
            }

            const body = {
                documentId: userId,
                data: {
                    userId,
                    pinnedGems: JSON.stringify(preferences.pinnedGems || []),
                    customColors: JSON.stringify(preferences.customColors || {}),
                    sortPreference: preferences.sortPreference || 'default',
                },
            };

            // Try update
            let resp = await fetch(docUrl, {
                method: 'PATCH',
                headers,
                body: JSON.stringify(body.data),
            });

            if (resp.status === 404) {
                // Create if missing
                resp = await fetch(createUrl, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(body),
                });
            }

            if (!resp.ok) {
                const text = await resp.text();
                throw new Error(`SAVE failed: ${resp.status} ${text}`);
            }

            return res.json({ success: true, message: 'Preferences saved' });
        }

        return res.json({ success: false, message: 'Invalid action' }, 400);
    } catch (err) {
        error(err.toString());
        return res.json({ success: false, message: 'Internal Server Error', error: err.message }, 500);
    }
};
