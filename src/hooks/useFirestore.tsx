import firestore from '@react-native-firebase/firestore';
import { CartItemProps, ProductType } from '../types';

/**
 * All the types are defined here
 */

type AddUserToDBTypes = {
  userID: string;
  name: string;
  email: string;
};

type AddToCartProps = {
  userId: string | undefined;
  product: any;
};

type RemoveFromCart = {
  userID: string;
  productID: string;
};

/********** All the functions are defined here to perform any kind of action in Firebase **************/

const useFirestore = () => {
  /**
   * A function to get the collection from firestore
   */
  const getCollection = async (collectName: string) => {
    let collectionData: ProductType[] = [];
    await firestore()
      .collection(collectName)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          collectionData.push(doc.data() as ProductType);
        });
      });
    return collectionData;
  };

  /**
   * Get Products by CatID
   */
  const getProductByCatID = async (catId: string, lim: number = 10) => {
    let productsBycatID: ProductType[] = [];
    await firestore()
      .collection('products')
      .where('catID', '==', catId)
      .limit(lim)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          productsBycatID.push(doc.data() as ProductType);
        });
      });
    return productsBycatID;
  };

  /**
   * Get Product by productID
   * @param productID
   */
  const getProductByProductId = async (productID: string) => {
    let product: ProductType = {
      catID: '',
      deliveryDate: '',
      imgUrl: '',
      isFreeDelivery: false,
      oldPrice: '',
      price: '',
      productID: '',
      rating: 1,
      title: '',
    };
    await firestore()
      .collection('products')
      .where('productID', '==', productID)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          product = doc.data() as ProductType;
        });
      });
    return product;
  };

  // Add user to DB after successfully signUP
  const addUserToDB = async ({ userID, name, email }: AddUserToDBTypes) => {
    await firestore()
      .collection('users')
      .doc(userID)
      .set({
        name: name,
        email: email,
        userID: userID,
      })
      .then(() => {
        console.log('User Created Successfully');
      });
  };
  /**
   * Add product to cart
   * @param param0
   */

  const addToCart = async ({ userId, product }: AddToCartProps) => {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('cart')
      .doc(product.productID)
      .set({
        productData: product,
        qnty: 1,
      })
      .then(() => {
        console.log('Product Added');
      });
  };
  /**
   * Function to get the Cart data
   * @param userID userID to identify the data
   * @returns returns an Array of products
   */
  const getCartData = async (userID?: string) => {
    let cartData: CartItemProps[] = [];
    await firestore()
      .collection('users')
      .doc(userID)
      .collection('cart')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          cartData.push(doc.data() as CartItemProps);
        });
      });
    return cartData;
  };

  const removeFromCart = async ({ userID, productID }: RemoveFromCart) => {
    await firestore()
      .collection('users')
      .doc(userID)
      .collection('cart')
      .doc(productID)
      .delete()
      .then(() => {
        console.log('Item Deleted Successfully');
      });
  };

  return {
    getCollection,
    getProductByCatID,
    getProductByProductId,
    addUserToDB,
    addToCart,
    getCartData,
    removeFromCart,
  };
};

export default useFirestore;
