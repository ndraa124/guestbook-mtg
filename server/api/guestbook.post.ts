import { google } from 'googleapis';
import { put } from '@vercel/blob';

export default defineEventHandler(async event => {
  const formData = await readMultipartFormData(event);

  if (!formData) {
    throw createError({ statusCode: 400, statusMessage: 'Data form tidak ada.' });
  }

  let formFields: Record<string, string> = {};
  let photoFile: { filename: string; data: Buffer; type: string } | null = null;

  for (const part of formData) {
    if (part.name === 'photo' && part.filename && part.data.length > 0) {
      photoFile = {
        filename: part.filename,
        data: part.data,
        type: part.type!,
      };
    } else if (part.name) {
      formFields[part.name] = part.data.toString();
    }
  }

  const { name, phone_number, address, needs } = formFields;

  if (!name || !phone_number || !address || !needs) {
    throw createError({ statusCode: 400, statusMessage: 'Semua field wajib diisi.' });
  }

  let photoUrl = '';

  try {
    if (photoFile) {
      const { url } = await put(photoFile.filename, photoFile.data, {
        access: 'public',
        contentType: photoFile.type,
      });
      photoUrl = url;
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

    const newRow = [
      crypto.randomUUID(),
      new Date().toISOString(),
      name,
      phone_number,
      address,
      needs,
      'APPROVED',
      photoUrl,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: config.googleSheetId,
      range: 'guest-book!A:H',
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
