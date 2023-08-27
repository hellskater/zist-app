import { useMutation } from '@tanstack/react-query';

import axiosInstance from '../axios';

const sendMessage = async (message: string) => {
  const response = await axiosInstance.post(
    `${window.location.origin}/api/contact`,
    {
      message,
    }
  );

  return response.data;
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
  });
};
