import firestore from '@react-native-firebase/firestore';

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const numberToCommaSeperatedPrice = (num: Number | string) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Add Dummy data
function guidGenerator() {
  let S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}

const addDummyData = async () => {
  await firestore()
    .collection('products')
    .add({
      catID: '009',
      deliveryDate: 'Monday',
      imgUrl:
        'https://m.media-amazon.com/images/I/3187i1nSVTL._AC_SY1000_FMwebp_.jpg',
      isFreeDelivery: false,
      oldPrice: '20999',
      price: '14498',
      productID: guidGenerator(),
      rating: 5,
      title:
        '2021 Apple MacBook Pro (14-inch/35.97 cm, Apple M1 Pro chip with 8‑core CPU and 14‑core GPU, 16GB RAM, 512GB SSD) - Space Grey  ',
    })
    .then(() => {
      console.log('Addedddd');
    });
};

export { addDummyData, capitalizeFirstLetter, numberToCommaSeperatedPrice };
