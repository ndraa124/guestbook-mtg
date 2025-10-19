<template>
  <div>
    <div
      v-if="toast.show"
      :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
      class="fixed top-5 right-5 text-white py-2 px-4 rounded-lg shadow-lg z-50 ...">
      {{ toast.message }}
    </div>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
  const { toast } = useToastState();
</script>
