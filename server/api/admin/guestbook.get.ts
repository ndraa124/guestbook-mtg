import { google } from 'googleapis';

export default defineEventHandler(async event => {
  const token = getCookie(event, 'auth-token');
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized. Anda harus login.',
    });
  }

  try {
    const config = useRuntimeConfig();
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: config.googleClientEmail,
        private_key: config.googlePrivateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: config.googleSheetId,
      range: 'guest-book!A:H',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      return [];
    }

    const messages = rows.slice(1).map(row => ({
      id: row[0],
      timestamp: row[1],
      name: row[2],
      phone_number: row[3],
      address: row[4],
      needs: row[5],
      status: row[6] || 'PENDING',
      photo_url: row[7] || '',
    }));

    return messages;
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return [];
  }
});
