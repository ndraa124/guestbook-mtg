<template>
  <div class="bg-gray-50 min-h-screen font-sans">
    <div class="container mx-auto max-w-3xl p-4 sm:p-8">
      <header class="text-center mb-12">
        <div class="flex justify-center mb-6">
          <img
            src="~/assets/logo.png"
            alt="logo minsel"
            class="w-24 h-auto" />
        </div>

        <h2 class="text-2xl sm:text-3xl font-semibold text-indigo-500">Buku Tamu Digital</h2>

        <h1 class="text-4xl sm:text-4xl font-bold text-indigo-700 mt-2">
          Pemerintah Desa Motoling II
        </h1>

        <p class="text-gray-700 mt-4 text-md">Silakan tinggalkan jejak dan pesan Anda di sini.</p>
      </header>

      <section class="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-12">
        <form
          @submit.prevent="submitData"
          class="space-y-6">
          <div>
            <label
              for="name"
              class="block text-gray-800 font-semibold mb-2">
              Nama
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5">
                <svg
                  class="h-5 w-5 text-gray-400"
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
              <input
                v-model="form.name"
                type="text"
                id="name"
                required
                class="w-full rounded-lg border-gray-200 bg-gray-100 py-3 pl-10 pr-4 shadow-sm text-gray-700 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Nama Anda..." />
            </div>
          </div>

          <div>
            <label
              for="phone_number"
              class="block text-gray-800 font-semibold mb-2">
              Nomor Ponsel/WhatsApp
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5">
                <svg
                  class="h-5 w-5 text-gray-400"
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
              </span>
              <input
                v-model="form.phone_number"
                type="tel"
                id="phone_number"
                required
                class="w-full rounded-lg border-gray-200 bg-gray-100 py-3 pl-10 pr-4 shadow-sm text-gray-700 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="0812..." />
            </div>
          </div>

          <div>
            <label
              for="address"
              class="block text-gray-800 font-semibold mb-2">
              Alamat
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5">
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </span>
              <input
                v-model="form.address"
                type="text"
                id="address"
                required
                class="w-full rounded-lg border-gray-200 bg-gray-100 py-3 pl-10 pr-4 shadow-sm text-gray-700 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Alamat Anda..." />
            </div>
          </div>

          <div>
            <label
              for="needs"
              class="block text-gray-800 font-semibold mb-2">
              Keperluan
            </label>
            <div class="relative">
              <span class="absolute top-3.5 left-0 flex items-center pl-3.5">
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
              </span>
              <textarea
                v-model="form.needs"
                id="needs"
                rows="5"
                required
                class="w-full rounded-lg border-gray-200 bg-gray-100 py-3 pl-10 pr-4 shadow-sm text-gray-700 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Tulis keperluan Anda..."></textarea>
            </div>
          </div>

          <div>
            <label class="block text-gray-800 font-semibold mb-2">Swafoto</label>

            <div v-if="cameraState === 'initial'">
              <button
                @click.prevent="startCamera"
                type="button"
                class="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-300 border-dashed rounded-lg text-gray-600 hover:bg-gray-100 transition">
                <svg
                  class="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574v9.548c0 1.067.75 1.994 1.802 2.169a.75.75 0 00.701-.04 4.908 4.908 0 003.114-1.572c.118-.126.24-.251.362-.379 1.2-1.266 2.87-2.25 4.664-2.25s3.463.984 4.664 2.25c.122.128.244.253.362.379a4.908 4.908 0 003.114 1.572.75.75 0 00.701.04c1.052-.175 1.802-1.102 1.802-2.169V9.574c0-1.067-.75-1.994-1.802-2.169a48.804 48.804 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                Buka Kamera untuk Swafoto
              </button>
            </div>

            <div
              v-else-if="cameraState === 'streaming'"
              class="space-y-4">
              <video
                ref="videoRef"
                autoplay
                playsinline
                class="w-full h-100 rounded-lg object-cover bg-gray-900 shadow-md"></video>
              <button
                @click.prevent="takePicture"
                type="button"
                class="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition hover:bg-indigo-700">
                Ambil Foto
              </button>
            </div>

            <div
              v-else-if="cameraState === 'captured'"
              class="space-y-4">
              <p class="block text-gray-800 font-semibold">Preview Swafoto:</p>
              <img
                v-if="photoPreviewUrl"
                :src="photoPreviewUrl"
                alt="Preview Swafoto"
                class="w-full rounded-lg shadow-md" />
              <button
                @click.prevent="retakePicture"
                type="button"
                class="w-full bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition hover:bg-gray-700">
                Ambil Ulang
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400">
            {{ isSubmitting ? 'Mengirim...' : 'Kirim Keperluan' }}
          </button>
        </form>
      </section>

      <section>
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Jejak Digital Terbaru</h2>

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
          <p class="text-red-700 font-semibold">Oops! Gagal memuat data.</p>
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
            class="bg-white rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl overflow-hidden">
            <div class="p-6">
              <div class="flex items-center space-x-4 mb-4">
                <div class="flex-shrink-0">
                  <img
                    v-if="data.photo_url"
                    :src="data.photo_url"
                    :alt="'Foto ' + data.name"
                    class="w-12 h-12 rounded-full object-cover bg-gray-200" />
                  <span
                    v-else
                    class="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <svg
                      class="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A1.75 1.75 0 0117.625 22H6.375a1.75 1.75 0 01-1.875-1.882z" />
                    </svg>
                  </span>
                </div>

                <div>
                  <strong class="text-lg text-indigo-700 font-bold block">{{ data.name }}</strong>
                  <span class="text-xs text-gray-500">
                    {{
                      new Date(data.timestamp).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    }}
                  </span>
                </div>
              </div>

              <div class="my-4 py-4 border-t border-b border-gray-100">
                <p class="text-gray-700 leading-relaxed break-words">{{ data.needs }}</p>
              </div>

              <div class="space-y-2">
                <div class="flex items-center text-sm text-gray-600">
                  <svg
                    class="w-4 h-4 mr-2.5 flex-shrink-0 text-gray-400"
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
                  <span>{{ data.phone_number }}</span>
                </div>
                <div class="flex items-start text-sm text-gray-600">
                  <svg
                    class="w-4 h-4 mr-2.5 mt-0.5 flex-shrink-0 text-gray-400"
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
                  <span>{{ data.address }}</span>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <div class="flex justify-between items-center space-x-4 mt-10">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            Sebelumnya
          </button>
          <span class="text-sm font-medium text-gray-600">
            Halaman {{ currentPage }} dari {{ totalPages }}
          </span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            Berikutnya
          </button>
        </div>

        <div
          v-if="!pending && !error && guestBook && guestBook.length === 0"
          class="text-center mt-8 ..."></div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { GuestBook, FormState } from '~/types/guestbook';

  useHead({
    title: 'Home',
  });

  const { showToast } = useToastState();

  const form = reactive<FormState>({
    name: '',
    phone_number: '',
    address: '',
    needs: '',
  });

  const isSubmitting = ref<boolean>(false);

  type CameraState = 'initial' | 'streaming' | 'captured';
  const cameraState = ref<CameraState>('initial');
  const videoRef = ref<HTMLVideoElement | null>(null);
  const streamRef = ref<MediaStream | null>(null);

  const photoFile = ref<File | null>(null);
  const photoPreviewUrl = ref<string | null>(null);

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

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('phone_number', form.phone_number);
    formData.append('address', form.address);
    formData.append('needs', form.needs);

    if (photoFile.value) {
      formData.append('photo', photoFile.value);
    }

    try {
      const response = await $fetch<{ message: string }>('/api/guestbook', {
        method: 'POST',
        body: formData,
      });

      showToast(response.message, 'success');

      form.name = '';
      form.phone_number = '';
      form.address = '';
      form.needs = '';

      photoFile.value = null;
      photoPreviewUrl.value = null;
      cameraState.value = 'initial';

      refresh();
    } catch (e) {
      console.error('Submission error:', e);
      showToast('Gagal mengirim pesan.', 'error');
    } finally {
      isSubmitting.value = false;
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      streamRef.value = stream;
      cameraState.value = 'streaming';

      await nextTick();
      if (videoRef.value) {
        videoRef.value.srcObject = stream;
        videoRef.value.play();
      }
    } catch (err) {
      console.error('Error mengakses kamera:', err);
      showToast('Tidak bisa mengakses kamera. Pastikan Anda memberi izin.', 'error');
    }
  };

  const stopCamera = () => {
    if (streamRef.value) {
      streamRef.value.getTracks().forEach(track => track.stop());
      streamRef.value = null;
    }
  };

  const takePicture = () => {
    if (!videoRef.value) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.value.videoWidth;
    canvas.height = videoRef.value.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(blob => {
        if (blob) {
          const timestamp = Date.now();
          const newFilename = `swafoto_${timestamp}.jpg`;
          photoFile.value = new File([blob], newFilename, { type: 'image/jpeg' });

          photoPreviewUrl.value = URL.createObjectURL(blob);
          cameraState.value = 'captured';
          stopCamera();
        }
      }, 'image/jpeg');
    }
  };

  const retakePicture = () => {
    photoFile.value = null;
    photoPreviewUrl.value = null;
    startCamera();
  };

  onUnmounted(() => {
    stopCamera();
  });
</script>
