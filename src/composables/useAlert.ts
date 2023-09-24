import type { AxiosError } from 'axios';
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

  const showApiError = (error?: AxiosError, summary: string = 'Contact administrator') => {
    const data: any = error?.response?.data;
    toast.add({
      summary,
      detail: (data ? data.message : error) ?? `Something went wrong.`,
      severity: 'error',
      life: 3000,
    });
  };

  return {
    showApiError,
    showSuccess,
    showError,
    showWarning,
  };
}
