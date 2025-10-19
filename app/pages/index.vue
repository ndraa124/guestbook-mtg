<template>
  <div class="bg-gray-100 min-h-screen font-sans">
    <div class="container mx-auto max-w-3xl p-4 sm:p-8">
      <header class="text-center mb-10">
        <h1 class="text-4xl sm:text-5xl font-bold text-blue-600">📖 Buku Tamu Digital</h1>
        <p class="text-gray-600 mt-2">Silakan tinggalkan jejak dan pesan Anda di sini.</p>
      </header>

      <section class="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-10">
        <form @submit.prevent="submitData">
          <div class="mb-4">
            <label
              for="name"
              class="block text-gray-700 font-semibold mb-2">
              Nama
            </label>
            <input
              v-model="form.name"
              type="text"
              id="name"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama Anda..."
              required />
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block text-gray-700 font-semibold mb-2">
              Nomor Ponsel/WhatsApp
            </label>
            <input
              v-model="form.phone_number"
              type="text"
              id="name"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nomor ponsel anda..."
              required />
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block text-gray-700 font-semibold mb-2">
              Alamat
            </label>
            <input
              v-model="form.address"
              type="text"
              id="name"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Alamat anda..."
              required />
          </div>
          <div class="mb-6">
            <label
              for="message"
              class="block text-gray-700 font-semibold mb-2">
              Keperluan
            </label>
            <textarea
              v-model="form.needs"
              id="message"
              rows="5"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tulis keperluan Anda..."
              required></textarea>
          </div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400">
            {{ isSubmitting ? 'Mengirim...' : 'Kirim' }}
          </button>
        </form>
      </section>

      <section>
        <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Pesan Terbaru</h2>

        <div
          v-if="pending"
          class="space-y-6">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-white p-5 rounded-lg shadow-md animate-pulse">
            <div class="flex justify-between items-center mb-3">
              <div class="h-4 bg-gray-200 rounded w-1/3"></div>
              <div class="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>

        <div
          v-else-if="error"
          class="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-700 font-semibold">Oops! Gagal memuat pesan.</p>
          <p class="text-red-600 text-sm mb-4">Mungkin ada masalah dengan koneksi. Coba lagi.</p>
          <button
            @click="refresh()"
            class="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition">
            Coba Muat Ulang
          </button>
        </div>

        <TransitionGroup
          v-else-if="guestBook && guestBook.length > 0"
          tag="div"
          name="fade"
          class="space-y-6">
          <div
            v-for="data in paginated"
            :key="data.id"
            class="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500">
            <div class="flex justify-between items-center mb-2">
              <strong class="text-lg text-gray-900">{{ data.name }}</strong>
              <span class="text-xs text-gray-500">
                {{ new Date(data.timestamp).toLocaleDateString('id-ID') }}
              </span>
            </div>
            <p class="text-gray-700 break-words">{{ data.needs }}</p>
          </div>
        </TransitionGroup>

        <div
          v-if="totalPages > 1"
          class="flex justify-center items-center space-x-4 mt-8">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="disabled:opacity-50">
            Sebelumnya
          </button>
          <span>Halaman {{ currentPage }} dari {{ totalPages }}</span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="disabled:opacity-50">
            Berikutnya
          </button>
        </div>

        <div
          v-if="!pending && !error && guestBook && guestBook.length === 0"
          class="text-center mt-8 p-6 bg-white rounded-lg shadow-sm">
          <p class="text-gray-500">Belum ada pesan. Jadilah yang pertama!</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { GuestBook, FormState } from '~/types/guestbook';

  const { showToast } = useToastState();

  const form = reactive<FormState>({
    name: '',
    phone_number: '',
    address: '',
    needs: '',
  });

  const isSubmitting = ref<boolean>(false);

  const currentPage = ref(1);
  const itemsPerPage = ref(5);

  const paginated = computed(() => {
    if (!guestBook.value) return [];
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return guestBook.value.slice(start, end);
  });

  const totalPages = computed(() => {
    if (!guestBook.value) return 0;
    return Math.ceil(guestBook.value.length / itemsPerPage.value);
  });

  const {
    data: guestBook,
    pending,
    error,
    refresh,
  } = await useFetch<GuestBook[]>('/api/guestbook', {
    transform: data => {
      if (!data) return [];
      return data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    },
    lazy: true,
    server: false,
  });

  const submitData = async (): Promise<void> => {
    if (!form.name || !form.phone_number || !form.address || !form.needs) return;
    isSubmitting.value = true;

    try {
      const response = await $fetch<{ message: string }>('/api/guestbook', {
        method: 'POST',
        body: { ...form },
      });

      showToast(response.message, 'success');

      form.name = '';
      form.phone_number = '';
      form.address = '';
      form.needs = '';
    } catch (e) {
      console.error('Submission error:', e);
      showToast('Gagal mengirim pesan.', 'error');
    } finally {
      isSubmitting.value = false;
    }
  };
</script>
