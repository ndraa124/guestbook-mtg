import { google } from 'googleapis';
import { compareSync } from 'bcryptjs';

export default defineEventHandler(async event => {
  const { username, password } = await readBody(event);

  if (!username || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Username dan password wajib diisi.' });
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

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: config.googleSheetId,
      range: 'users!A:F',
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) throw new Error('Sheet pengguna kosong.');

    const headers = rows[0] as string[];
    const userIndex = headers.indexOf('username');
    const passIndex = headers.indexOf('password');
    const activeIndex = headers.indexOf('is_active');
    const nameIndex = headers.indexOf('full_name');

    const userRow = rows.slice(1).find(row => row[userIndex] === username);

    if (!userRow) {
      throw createError({ statusCode: 401, statusMessage: 'Username tidak ditemukan.' });
    }

    const hashedPassword = userRow[passIndex];
    const isActive = userRow[activeIndex] === 'TRUE';

    if (!isActive) {
      throw createError({ statusCode: 403, statusMessage: 'Akun ini tidak aktif.' });
    }

    const passwordMatch = compareSync(password, hashedPassword);

    if (!passwordMatch) {
      throw createError({ statusCode: 401, statusMessage: 'Password salah.' });
    }

    const sessionToken = crypto.randomUUID();

    return {
      success: true,
      token: sessionToken,
      user: {
        username: userRow[userIndex],
        fullName: userRow[nameIndex],
      },
    };
  } catch (error: any) {
    console.error('Login error:', error);
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: 'Terjadi kesalahan pada server.' });
  }
});
