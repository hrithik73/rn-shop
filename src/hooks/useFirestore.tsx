import firestore from '@react-native-firebase/firestore';

type ProductByCatProps = {
  lim: string;
  catID: string;
};

const useFirestore = () => {
  /**
   * A function to get the collection from firestore
   */
  const getCollection = async (collectName: string) => {
    let collectionData: object[] = [];
    await firestore()
      .collection(collectName)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          collectionData.push(doc.data());
        });
      });
    return collectionData;
  };

  /**
   * Get Products by CatID
   */
  const getProductByCatID = async (catId: string, lim: number = 10) => {
    let productsBycatID: object[] = [];
    await firestore()
      .collection('products')
      .where('catID', '==', catId)
      .limit(lim)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          productsBycatID.push(doc.data());
        });
      });
    return productsBycatID;
  };

  /**
   * Get Product by productID
   * @param productID
   */
  const getProductByProductId = async (productID: string) => {
    let product;
    await firestore()
      .collection('products')
      .where('productID', '==', productID)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          product = doc.data();
        });
      });
    return product;
  };

  return {getCollection, getProductByCatID, getProductByProductId};
};

export default useFirestore;
