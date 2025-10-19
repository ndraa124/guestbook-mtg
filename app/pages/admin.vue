<template>
  <div class="bg-slate-900 text-slate-100 min-h-screen font-sans p-6 sm:p-10">
    <div class="max-w-7xl mx-auto">
      <header class="flex justify-between items-center mb-8 pb-6 border-b border-slate-700">
        <h1 class="text-3xl sm:text-4xl font-bold">Dashboard Admin</h1>
        <div class="flex flex-wrap items-center justify-center sm:justify-end gap-4">
          <div class="flex items-center gap-2">
            <label
              for="startDate"
              class="text-sm text-slate-400">
              Dari:
            </label>
            <input
              type="date"
              id="startDate"
              v-model="startDate"
              class="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <div class="flex items-center gap-2">
            <label
              for="endDate"
              class="text-sm text-slate-400">
              Sampai:
            </label>
            <input
              type="date"
              id="endDate"
              v-model="endDate"
              class="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>

          <button
            @click="exportToPDF"
            :disabled="isExporting"
            class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-500">
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span class="hidden sm:inline">{{ isExporting ? 'Memproses...' : 'Ekspor PDF' }}</span>
          </button>

          <button
            @click="handleLogout"
            class="flex items-center gap-2 bg-slate-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3l3-3m0 0l-3-3m3 3H9" />
            </svg>
            <span class="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div
        id="pdf-content"
        class="hidden print:block">
        <div class="p-8 bg-white text-black text-sm">
          <header class="flex justify-between items-center border-b border-gray-400 pb-4 mb-6">
            <div>
              <h1 class="text-2xl font-bold text-indigo-700">Laporan Buku Tamu</h1>
              <p class="text-gray-600">Pemerintah Desa Motoling II</p>
            </div>
            <img
              src="~/assets/logo.png"
              alt="logo minsel"
              class="w-16 h-auto" />
          </header>
          <p class="mb-6 text-gray-700 italic">
            Periode Laporan:
            <span class="font-semibold">
              {{ startDate ? new Date(startDate).toLocaleDateString('id-ID') : 'Semua Data' }}
            </span>
            sampai
            <span class="font-semibold">
              {{ endDate ? new Date(endDate).toLocaleDateString('id-ID') : 'Hari Ini' }}
            </span>
            <br />
            Dicetak pada: {{ new Date().toLocaleString('id-ID') }}
          </p>

          <table class="w-full border-collapse border border-gray-300">
            <thead class="bg-gray-100">
              <tr>
                <th class="border border-gray-300 p-2 text-left">Foto</th>
                <th class="border border-gray-300 p-2 text-left">Tamu</th>
                <th class="border border-gray-300 p-2 text-left">Kontak</th>
                <th class="border border-gray-300 p-2 text-left">Keperluan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="msg in allData"
                :key="msg.id"
                class="page-break">
                <td class="border border-gray-300 p-2 align-top">
                  <img
                    v-if="msg.photo_url"
                    :src="msg.photo_url"
                    :alt="msg.name"
                    class="w-16 h-16 rounded object-cover" />
                  <span
                    v-else
                    class="text-xs text-gray-500">
                    (Tidak ada foto)
                  </span>
                </td>
                <td class="border border-gray-300 p-2 align-top">
                  <strong class="font-bold">{{ msg.name }}</strong>
                  <p class="text-xs text-gray-600">
                    {{ new Date(msg.timestamp).toLocaleString('id-ID') }}
                  </p>
                </td>
                <td class="border border-gray-300 p-2 align-top">
                  <p>{{ msg.phone_number }}</p>
                  <p>{{ msg.address }}</p>
                </td>
                <td class="border border-gray-300 p-2 align-top min-w-[200px]">
                  {{ msg.needs }}
                </td>
              </tr>
              <tr v-if="!allData || allData.length === 0">
                <td
                  colspan="5"
                  class="text-center border border-gray-300 p-4">
                  Tidak ada data untuk ditampilkan.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        v-if="pending"
        class="flex justify-center items-center gap-3 text-lg text-slate-400 mt-20">
        <svg
          class="w-6 h-6 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Memuat data...
      </div>

      <div
        v-if="error"
        class="text-center text-red-400 mt-20"></div>

      <div
        v-if="!pending && !error"
        class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div class="flex flex-col">
          <div class="flex items-center gap-3 mb-5">
            <h2 class="text-2xl font-semibold border-yellow-500">Menunggu Persetujuan</h2>
            <span
              class="flex items-center justify-center w-7 h-7 bg-yellow-400 text-yellow-900 font-bold text-sm rounded-full">
              {{ pendingData.length }}
            </span>
          </div>
          <div class="space-y-5 max-h-[70vh] overflow-y-auto pr-3">
            <div
              v-if="pendingData.length === 0"
              class="text-slate-500 text-center py-10">
              Tidak ada pesan untuk dimoderasi.
            </div>
            <div
              v-for="msg in pendingData"
              :key="msg.id"
              class="bg-slate-800 border border-slate-700 p-5 rounded-lg shadow-lg">
              <div class="flex items-center space-x-3 mb-4">
                <img
                  v-if="msg.photo_url"
                  :src="msg.photo_url"
                  :alt="msg.name"
                  class="w-10 h-10 rounded-full object-cover bg-slate-700" />
                <span
                  v-else
                  class="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 text-slate-400 flex items-center justify-center">
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A1.75 1.75 0 0117.625 22H6.375a1.75 1.75 0 01-1.875-1.882z" />
                  </svg>
                </span>
                <div>
                  <p class="font-bold text-slate-100">{{ msg.name }}</p>
                  <span class="text-xs font-normal text-slate-400">
                    {{ new Date(msg.timestamp).toLocaleString('id-ID') }}
                  </span>
                </div>
              </div>
              <p class="my-3 text-slate-200">{{ msg.needs }}</p>
              <div class="text-sm text-slate-400 border-t border-slate-700 pt-3 space-y-1">
                <p class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.836-1.425-4.854-3.443-6.279-6.279l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                  </svg>
                  {{ msg.phone_number }}
                </p>
                <p class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {{ msg.address }}
                </p>
              </div>
              <div class="flex space-x-3 mt-4">
                <button
                  @click="moderateMessage(msg.id, 'APPROVE')"
                  class="flex items-center gap-1.5 bg-green-700 hover:bg-green-600 text-white text-sm font-bold py-2 px-3 rounded-lg transition-colors">
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Setujui
                </button>
                <button
                  @click="moderateMessage(msg.id, 'DELETE')"
                  class="flex items-center gap-1.5 bg-red-700 hover:bg-red-600 text-white text-sm font-bold py-2 px-3 rounded-lg transition-colors">
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.578 0c-1.131.07-2.267.117-3.402.166m10.977-1.073c-.14.13-.28.257-.42.382a15.8 15.8 0 00-4.04 4.042L4.135 15.43c-.16.223-.07.547.18.686l.705.352c.224.11.48.05.643-.14L11 9.301l.003-.004c.01-.01.018-.02.028-.03c.43-.44.894-.852 1.399-1.233c.026-.02.05-.04.076-.06l.387-.312c.24-.192.38-.49.38-.8V6.1c0-.23.11-.44.29-.56l.57-.38c.24-.16.55-.07.68.18l.317.59c.12.22.07.49-.12.64l-.353.705c-.17.34-.02.75.29.91l.346.173c.31.15.49.46.49.8V8.7c0 .02-.01.04-.01.06c-.01.06-.02.12-.03.18a.63.63 0 00.02.02c.03.04.06.07.09.11c.1.11.19.22.29.33l.02.02c.1.11.19.21.28.32l.3.31c.24.25.38.58.38.94v1.02c0 .27-.12.53-.33.7l-.52.42c-.22.18-.33.45-.33.73v.73c0 .28.11.55.31.75l.7.7a.75.75 0 001.06 0l.706-.705c.2-.2.31-.47.31-.75V11.2c0-.26-.09-.5-.26-.7l-.39-.46c-.2-.23-.3-.51-.3-.79v-.7c0-.31.09-.61.27-.87l.47-.69c.2-.29.25-.66.13-.98l-.317-.59a.75.75 0 00-.68-.18l-.57.38c-.18.12-.29.33-.29.56v.38c0 .28-.11.55-.31.75l-.7.7a.75.75 0 00-1.06 0l-.706-.705c-.2-.2-.31-.47-.31-.75V8.4c0-.28.11-.55.31-.75l.7-.7a.75.75 0 000-1.06l-.706-.705a.75.75 0 00-1.06 0z" />
                  </svg>
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex items-center gap-3 mb-5">
            <h2 class="text-2xl font-semibold border-green-500">Sudah Disetujui</h2>
            <span
              class="flex items-center justify-center w-7 h-7 bg-green-500 text-green-900 font-bold text-sm rounded-full">
              {{ approvedData.length }}
            </span>
          </div>
          <div class="space-y-5 max-h-[70vh] overflow-y-auto pr-3">
            <div
              v-if="approvedData.length === 0"
              class="text-slate-500 text-center py-10">
              Belum ada pesan yang disetujui.
            </div>
            <div
              v-for="msg in approvedData"
              :key="msg.id"
              class="bg-slate-800 border border-slate-700 p-5 rounded-lg shadow-lg opacity-70 hover:opacity-100 transition-opacity">
              <div class="flex items-center space-x-3 mb-4">
                <img
                  v-if="msg.photo_url"
                  :src="msg.photo_url"
                  :alt="msg.name"
                  class="w-10 h-10 rounded-full object-cover bg-slate-700" />
                <span
                  v-else
                  class="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 text-slate-400 flex items-center justify-center">
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A1.75 1.75 0 0117.625 22H6.375a1.75 1.75 0 01-1.875-1.882z" />
                  </svg>
                </span>
                <div>
                  <p class="font-bold text-slate-100">{{ msg.name }}</p>
                  <span class="text-xs font-normal text-slate-400">
                    {{ new Date(msg.timestamp).toLocaleString('id-ID') }}
                  </span>
                </div>
              </div>
              <p class="my-3 text-slate-200">{{ msg.needs }}</p>
              <div class="text-sm text-slate-400 border-t border-slate-700 pt-3 space-y-1">
                <p class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.836-1.425-4.854-3.443-6.279-6.279l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                  </svg>
                  {{ msg.phone_number }}
                </p>
                <p class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {{ msg.address }}
                </p>
              </div>
              <div class="flex justify-end mt-4">
                <button
                  @click="moderateMessage(msg.id, 'DELETE')"
                  class="flex items-center gap-1.5 bg-slate-700 hover:bg-red-700 text-slate-300 hover:text-white text-sm font-bold py-2 px-3 rounded-lg transition-colors">
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.578 0c-1.131.07-2.267.117-3.402.166m10.977-1.073c-.14.13-.28.257-.42.382a15.8 15.8 0 00-4.04 4.042L4.135 15.43c-.16.223-.07.547.18.686l.705.352c.224.11.48.05.643-.14L11 9.301l.003-.004c.01-.01.018-.02.028-.03c.43-.44.894-.852 1.399-1.233c.026-.02.05-.04.076-.06l.387-.312c.24-.192.38-.49.38-.8V6.1c0-.23.11-.44.29-.56l.57-.38c.24-.16.55-.07.68.18l.317.59c.12.22.07.49-.12.64l-.353.705c-.17.34-.02.75.29.91l.346.173c.31.15.49.46.49.8V8.7c0 .02-.01.04-.01.06c-.01.06-.02.12-.03.18a.63.63 0 00.02.02c.03.04.06.07.09.11c.1.11.19.22.29.33l.02.02c.1.11.19.21.28.32l.3.31c.24.25.38.58.38.94v1.02c0 .27-.12.53-.33.7l-.52.42c-.22.18-.33.45-.33.73v.73c0 .28.11.55.31.75l.7.7a.75.75 0 001.06 0l.706-.705c.2-.2.31-.47.31-.75V11.2c0-.26-.09-.5-.26-.7l-.39-.46c-.2-.23-.3-.51-.3-.79v-.7c0-.31.09-.61.27-.87l.47-.69c.2-.29.25-.66.13-.98l-.317-.59a.75.75 0 00-.68-.18l-.57.38c-.18.12-.29.33-.29.56v.38c0 .28-.11.55-.31.75l-.7.7a.75.75 0 00-1.06 0l-.706-.705c-.2-.2-.31-.47-.31-.75V8.4c0-.28.11-.55.31-.75l.7-.7a.75.75 0 000-1.06l-.706-.705a.75.75 0 00-1.06 0z" />
                  </svg>
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { AdminGuestBook } from '~/types/guestbook';

  definePageMeta({
    middleware: ['auth'],
  });

  useHead({
    title: 'Dashboard',
  });

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const startDate = ref<string>(formatDate(firstDayOfMonth));
  const endDate = ref<string>(formatDate(today));

  const {
    data: guestBook,
    pending,
    error,
    refresh,
  } = await useLazyFetch<AdminGuestBook[]>('/api/admin/guestbook', {
    server: false,
  });

  const router = useRouter();

  const filteredData = computed(() => {
    if (!guestBook.value) return [];

    const start = startDate.value ? new Date(startDate.value).getTime() : 0;
    const end = endDate.value ? new Date(endDate.value).setHours(23, 59, 59, 999) : Infinity;

    return guestBook.value.filter(msg => {
      const msgTimestamp = new Date(msg.timestamp).getTime();
      return msgTimestamp >= start && msgTimestamp <= end;
    });
  });

  const pendingData = computed(
    () =>
      filteredData.value
        ?.filter(m => m.status === 'PENDING')
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) || []
  );

  const approvedData = computed(
    () =>
      filteredData.value
        ?.filter(m => m.status === 'APPROVED')
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) || []
  );

  const allData = computed(() => {
    return [...filteredData.value].sort((a, b) => {
      if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
      if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  });

  const handleLogout = async () => {
    if (!confirm('Anda yakin ingin logout?')) return;

    const authToken = useCookie('auth-token');
    authToken.value = null;

    await router.push('/login');
  };

  const moderateMessage = async (id: string, action: 'APPROVE' | 'DELETE') => {
    const message = action === 'APPROVE' ? 'menyetujui' : 'menghapus';

    if (!confirm(`Anda yakin ingin ${message} pesan ini?`)) {
      return;
    }

    try {
      await $fetch('/api/admin/moderate', {
        method: 'POST',
        body: { id, action },
      });

      await refresh();
    } catch (err: any) {
      console.error('Moderation failed:', err);
      alert(`Aksi gagal: ${err.data?.statusMessage || 'Error'}`);
    }
  };

  const isExporting = ref(false);

  const exportToPDF = async () => {
    window.print();
  };
</script>
