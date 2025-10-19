<template>
  <div class="bg-gray-800 text-white min-h-screen font-sans p-8">
    <div class="max-w-6xl mx-auto">
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold">Dashboard Admin</h1>
        <button
          @click="handleLogout"
          class="bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded-lg transition">
          Logout
        </button>
      </header>

      <div
        v-if="pending"
        class="text-center text-gray-400">
        Memuat data...
      </div>
      <div
        v-if="error"
        class="text-center text-red-400">
        Gagal memuat data. ({{ error.data?.statusMessage || error.message }})
      </div>

      <div
        v-if="!pending && !error"
        class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 class="text-2xl font-semibold mb-4 border-b-2 border-yellow-500 pb-2">
            Menunggu Persetujuan ({{ pendingData.length }})
          </h2>
          <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <div
              v-if="pendingData.length === 0"
              class="text-gray-500">
              Tidak ada pesan untuk dimoderasi.
            </div>
            <div
              v-for="msg in pendingData"
              :key="msg.id"
              class="bg-gray-900 p-4 rounded-lg shadow-lg">
              <p class="font-bold">
                {{ msg.name }}
                <span class="text-xs font-normal text-gray-400">
                  - {{ new Date(msg.timestamp).toLocaleString('id-ID') }}
                </span>
              </p>
              <p class="text-sm text-gray-400">{{ msg.phone_number }} | {{ msg.address }}</p>
              <p class="my-2 text-gray-300">{{ msg.needs }}</p>
              <div class="flex space-x-2 mt-3">
                <button
                  @click="moderateMessage(msg.id, 'APPROVE')"
                  class="bg-green-600 hover:bg-green-700 text-xs font-bold py-1 px-3 rounded">
                  Setujui
                </button>
                <button
                  @click="moderateMessage(msg.id, 'DELETE')"
                  class="bg-red-600 hover:bg-red-700 text-xs font-bold py-1 px-3 rounded">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-semibold mb-4 border-b-2 border-green-500 pb-2">
            Sudah Disetujui ({{ approvedData.length }})
          </h2>
          <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <div
              v-if="approvedData.length === 0"
              class="text-gray-500">
              Belum ada pesan yang disetujui.
            </div>
            <div
              v-for="msg in approvedData"
              :key="msg.id"
              class="bg-gray-900/50 p-4 rounded-lg">
              <p class="font-bold">
                {{ msg.name }}
                <span class="text-xs font-normal text-gray-400">
                  - {{ new Date(msg.timestamp).toLocaleString('id-ID') }}
                </span>
              </p>
              <p class="text-sm text-gray-400">{{ msg.phone_number }} | {{ msg.address }}</p>
              <p class="my-2 text-gray-300">{{ msg.needs }}</p>
              <div class="flex justify-between items-center mt-3">
                <button
                  @click="moderateMessage(msg.id, 'DELETE')"
                  class="bg-gray-600 hover:bg-gray-700 text-xs font-bold py-1 px-3 rounded">
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

  const {
    data: guestBook,
    pending,
    error,
    refresh,
  } = await useLazyFetch<AdminGuestBook[]>('/api/admin/guestbook', {
    server: false,
  });

  const router = useRouter();

  const pendingData = computed(
    () =>
      guestBook.value
        ?.filter(m => m.status === 'PENDING')
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) || []
  );
  const approvedData = computed(
    () =>
      guestBook.value
        ?.filter(m => m.status === 'APPROVED')
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) || []
  );

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
</script>
