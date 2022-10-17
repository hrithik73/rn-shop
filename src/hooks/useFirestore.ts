import firestore from '@react-native-firebase/firestore';
import { CartItemProps, ProductType } from '../types';

/**
 * All the types are defined here
 */

type AddUserToDBProps = {
  userID: string;
  name: string;
  email: string;
};

type AddToCartInFireStoreProps = {
  userId: string | undefined;
  product: any;
};

type RemoveFromCartFireStoreProps = {
  userID: string;
  productID: string;
};

/********** All the functions are defined here to perform any kind of action in Firebase FireStore **********/

const useFirestore = () => {
  /**
   * A function to get the collection from firestore
   * @param {string} collectName collection name to get all data from
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
      })
      .catch(e => {
        console.log(e);
      });

    return collectionData;
  };

  /**
   * Get Products by CatID
   * @param {string} catId
   * @param {number} lim limit to get data
   * @param {}
   */
  const getProductByCatID = async (
    catId: string,
    lim: number = 10,
    // onSuccess: (arg0: boolean) => void,
  ) => {
    let productsBycatID: ProductType[] = [];
    await firestore()
      .collection('products')
      .where('catID', '==', catId)
      .limit(lim)
      .get()
      .then(querySnapshot => {
        // onSuccess(false);
        querySnapshot.forEach(doc => {
          productsBycatID.push(doc.data() as ProductType);
        });
      })
      .catch(e => {
        console.log(e);
      });
    return productsBycatID;
  };

  /**
   * Get Product by productID
   * @param {string }productID
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
  const addUserToDB = async ({ userID, name, email }: AddUserToDBProps) => {
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
   * @param {string}  userId of the user for adding the product in user's db
   * @param {productType} product to add
   */

  const addToCartInFireStore = async ({
    userId,
    product,
  }: AddToCartInFireStoreProps) => {
    //
    console.log('Calling firebase ------->', { userId }, { product });

    await firestore()
      .collection('cart')
      .doc(userId)
      .set({
        ...product,
        qnty: 1,
      })
      .then(() => {
        console.log('Product Added');
      })
      .catch(e => {
        console.log(e);
      });
  };
  /**
   * Function to get the Cart data
   * @param {string} userID userID to identify the data
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

  /**
   * Remove an Item from Cart
   * @param {string} userID userID to remove data from from cart
   * @param {string} productID Product Id of the product to remove
   */

  const removeFromCartFireStore = async ({
    userID,
    productID,
  }: RemoveFromCartFireStoreProps) => {
    console.log({ userID });
    console.log({ productID });

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
    addToCartInFireStore,
    getCartData,
    removeFromCartFireStore,
  };
};

export default useFirestore;
