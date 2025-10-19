<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
      <header class="text-center">
        <h1 class="text-3xl font-bold text-gray-900">Admin Login</h1>
        <p class="text-gray-500">Selamat datang kembali!</p>
      </header>

      <form
        @submit.prevent="handleLogin"
        class="space-y-6">
        <div>
          <label
            for="username"
            class="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required />
        </div>
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required />
        </div>

        <p
          v-if="errorMsg"
          class="text-center text-red-500 text-sm">
          {{ errorMsg }}
        </p>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400">
          {{ isLoading ? 'Memverifikasi...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: ['guest'],
  });

  useHead({
    title: 'Login',
  });

  const username = ref('');
  const password = ref('');
  const isLoading = ref(false);
  const errorMsg = ref('');

  const router = useRouter();

  const handleLogin = async () => {
    isLoading.value = true;
    errorMsg.value = '';

    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          username: username.value,
          password: password.value,
        },
      });

      if (response.token) {
        const authToken = useCookie('auth-token');
        authToken.value = response.token;
      }

      await router.push('/admin');
    } catch (error: any) {
      console.error('Login failed:', error);
      errorMsg.value = error.data?.statusMessage || 'Terjadi kesalahan.';
    } finally {
      isLoading.value = false;
    }
  };
</script>
