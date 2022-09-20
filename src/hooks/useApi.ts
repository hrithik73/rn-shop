import { api } from '../configs/api';

// A general perpose hook for all the api calling
const useApi = () => {
  // Get the Publishable key from Backend
  const getPublishableKey = async () => {
    const res = await api.get('/getToken');
    console.log(res.data);
  };

  return { getPublishableKey };
};

export default useApi;
