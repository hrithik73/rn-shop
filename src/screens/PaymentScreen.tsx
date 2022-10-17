/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import useApi from '../hooks/useApi';
import { CartStackType } from '../types/NavigationTypes';
import { RouteProp, useRoute } from '@react-navigation/native';

type CartScreenRouteProps = RouteProp<CartStackType, 'Payment'>;

const PaymentScreen = () => {
  const [cardDetails, setCardDetails] = useState({});
  const { confirmPayment, loading } = useConfirmPayment();
  const { fetchPaymentIntentClientSecret } = useApi();
  const route = useRoute<CartScreenRouteProps>();

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails) {
      Alert.alert('Please enter Complete card details');
      return;
    }
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret(
        route.params.totalPrice,
      );
      // route.params,
      //2. confirm the payment
      if (error) {
        console.log('Unable to process payment');
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: 'Card',
        });

        if (error) {
          Alert.alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          Alert.alert('Payment Successful');
          console.log('Payment successful ', paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
};
export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
  input: {
    backgroundColor: '#efefefef',

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: '#efefefef',
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
