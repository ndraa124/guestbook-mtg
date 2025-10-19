import { google } from 'googleapis';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async event => {
  const body = await readBody(event);

  if (!body.name || !body.phone_number || !body.address || !body.needs) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Semua field (Nama, Ponsel, Alamat, Keperluan) wajib diisi.',
    });
  }

  try {
    const config = useRuntimeConfig();
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: config.googleClientEmail,
        private_key: config.googlePrivateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    const newRow = [
      crypto.randomUUID(),
      new Date().toISOString(),
      body.name,
      body.phone_number,
      body.address,
      body.needs,
      'PENDING',
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: config.googleSheetId,
      range: 'guest-book!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [newRow],
      },
    });

    return {
      statusCode: 201,
      message: 'Terima kasih! Pesan Anda akan tampil setelah dimoderasi.',
    };
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Terjadi kesalahan pada server.',
    });
  }
});
