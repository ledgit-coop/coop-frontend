import { useToast } from 'primevue/usetoast';

export default function useAlert() {
  const toast = useToast();

  const showSuccess = (detail: string) => {
    toast.add({
      summary: 'Success',
      detail,
      severity: 'success',
      life: 3000,
    });
  };

  const showWarning = (detail: string) => {
    toast.add({
      summary: 'Warning',
      detail,
      severity: 'warn',
      life: 3000,
    });
  };

  const showError = (detail: string) => {
    toast.add({
      summary: 'Error',
      detail,
      severity: 'error',
      life: 3000,
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
  };
}
