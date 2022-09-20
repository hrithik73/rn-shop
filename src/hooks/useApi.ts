import { api, getBaseURL } from '../configs/api';

// A general perpose hook for all the api calling
const useApi = () => {
  // Get the Publishable key from Backend
  const getPublishableKey = async () => {
    const res = await api.get('/stripe-key');
    console.log(res.data);
    return res.data.publishableKey;
  };

  const fetchPaymentIntentClientSecret = async (totalAmount: number) => {
    let body = { totalAmount: totalAmount };
    const response = await fetch(`${getBaseURL()}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const { clientSecret, error } = await response.json();
    console.log('Client Secrete', clientSecret);
    console.log('Error', error);

    return { clientSecret, error };
  };

  return { getPublishableKey, fetchPaymentIntentClientSecret };
};

export default useApi;
