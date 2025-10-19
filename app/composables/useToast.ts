interface ToastState {
  message: string;
  show: boolean;
  type: 'success' | 'error';
}

export const useToastState = () => {
  const toast = useState<ToastState>('toast', () => ({
    message: '',
    show: false,
    type: 'success',
  }));

  const showToast = (
    message: string,
    type: 'success' | 'error' = 'success',
    duration: number = 3000
  ) => {
    toast.value.message = message;
    toast.value.type = type;
    toast.value.show = true;

    setTimeout(() => {
      toast.value.show = false;
    }, duration);
  };

  return {
    toast,
    showToast,
  };
};
