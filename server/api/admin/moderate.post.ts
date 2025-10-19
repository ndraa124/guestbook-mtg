import { google } from 'googleapis';
import { defineEventHandler, readBody } from 'h3';

async function getSheetId(
  sheets: any,
  spreadsheetId: string,
  sheetName: string
): Promise<number | null> {
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  const sheet = spreadsheet.data.sheets?.find((s: any) => s.properties?.title === sheetName);
  return sheet?.properties?.sheetId ?? null;
}

export default defineEventHandler(async event => {
  const token = getCookie(event, 'auth-token');

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized. Anda harus login.',
    });
  }

  const { id, action } = await readBody(event);
  if (!id || !action) {
    throw createError({ statusCode: 400, statusMessage: 'ID dan Aksi diperlukan.' });
  }

  const config = useRuntimeConfig();
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: config.googleClientEmail,
      private_key: config.googlePrivateKey.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const sheetName = 'guest-book';

  try {
    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId: config.googleSheetId,
      range: `${sheetName}!A:A`,
    });

    const ids = getRows.data.values;
    if (!ids) throw new Error('Sheet kosong');

    const rowIndex = ids.findIndex(row => row[0] === id);
    if (rowIndex === -1) {
      throw createError({ statusCode: 404, statusMessage: 'Pesan tidak ditemukan.' });
    }

    const rowNumber = rowIndex + 1;

    if (action === 'APPROVE') {
      await sheets.spreadsheets.values.update({
        spreadsheetId: config.googleSheetId,
        range: `${sheetName}!G${rowNumber}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [['APPROVED']] },
      });
      return { message: 'Pesan berhasil disetujui.' };
    }

    if (action === 'DELETE') {
      const sheetId = await getSheetId(sheets, config.googleSheetId as string, sheetName);
      if (sheetId === null) throw new Error('Sheet ID tidak ditemukan.');

      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: config.googleSheetId,
        requestBody: {
          requests: [
            {
              deleteDimension: {
                range: {
                  sheetId: sheetId,
                  dimension: 'ROWS',
                  startIndex: rowIndex,
                  endIndex: rowNumber,
                },
              },
            },
          ],
        },
      });
      return { message: 'Pesan berhasil dihapus.' };
    }

    throw createError({ statusCode: 400, statusMessage: 'Aksi tidak valid.' });
  } catch (error: any) {
    console.error('Moderation error:', error);
    throw createError({ statusCode: 500, statusMessage: 'Gagal melakukan moderasi.' });
  }
});
