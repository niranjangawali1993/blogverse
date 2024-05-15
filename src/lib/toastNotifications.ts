import { toast } from 'react-toastify';

// Function to display a success toast
export function showSuccess(message: string) {
  toast.success(message);
}

// Function to display an error toast
export function showError(message: string) {
  toast.error(message);
}

// Function to display an waring toast
export function showWarning(message: string) {
  toast.warn(message);
}
