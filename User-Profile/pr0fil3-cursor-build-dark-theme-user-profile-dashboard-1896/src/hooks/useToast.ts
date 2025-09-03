import toast from 'react-hot-toast';

interface ToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export const useToast = () => {
  const success = (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      duration: options?.duration || 3000,
      position: options?.position || 'top-right',
      style: {
        background: 'rgba(16, 185, 129, 0.95)',
        color: '#ffffff',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        backdropFilter: 'blur(10px)',
      },
    });
  };

  const error = (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      duration: options?.duration || 5000,
      position: options?.position || 'top-right',
      style: {
        background: 'rgba(239, 68, 68, 0.95)',
        color: '#ffffff',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        backdropFilter: 'blur(10px)',
      },
    });
  };

  const loading = (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      position: options?.position || 'top-right',
      style: {
        background: 'rgba(59, 130, 246, 0.95)',
        color: '#ffffff',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        backdropFilter: 'blur(10px)',
      },
    });
  };

  const info = (message: string, options?: ToastOptions) => {
    return toast(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
      icon: 'ℹ️',
      style: {
        background: 'rgba(59, 130, 246, 0.95)',
        color: '#ffffff',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        backdropFilter: 'blur(10px)',
      },
    });
  };

  const promise = <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options?: ToastOptions
  ) => {
    return toast.promise(
      promise,
      messages,
      {
        position: options?.position || 'top-right',
        style: {
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        success: {
          style: {
            background: 'rgba(16, 185, 129, 0.95)',
            color: '#ffffff',
          },
        },
        error: {
          style: {
            background: 'rgba(239, 68, 68, 0.95)',
            color: '#ffffff',
          },
        },
        loading: {
          style: {
            background: 'rgba(59, 130, 246, 0.95)',
            color: '#ffffff',
          },
        },
      }
    );
  };

  const dismiss = (toastId?: string) => {
    toast.dismiss(toastId);
  };

  const custom = (jsx: React.ReactElement, options?: ToastOptions & { id?: string }) => {
    return toast.custom(jsx, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
      id: options?.id,
    });
  };

  return {
    success,
    error,
    loading,
    info,
    promise,
    dismiss,
    custom,
  };
};