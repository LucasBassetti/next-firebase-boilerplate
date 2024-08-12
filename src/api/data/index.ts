import { addDoc, onSnapshot } from 'firebase/firestore';
import { collections } from '../firebase';

export type DataItem = {
  email: string;
};

type SubscribeToDataEventCallbackState = {
  success: (data: DataItem[]) => void;
  error: (error: Error) => void;
};

let unsubscribeDataEvent: () => void;

export const subscribeToDataEvent = (callbackState: SubscribeToDataEventCallbackState) => {
  unsubscribeDataEvent = onSnapshot(
    collections.data,
    (querySnapshot) => {
      const data: DataItem[] = [];

      querySnapshot.forEach((doc) => {
        data.push(doc.data() as DataItem);
      });

      callbackState.success(data);
    },
    (error) => {
      callbackState.error(error);
    },
  );
};

type UnsubscribeToDataEventCallback = () => void;

export const unsubscribeToDataEvent = (callback: UnsubscribeToDataEventCallback) => {
  if (unsubscribeDataEvent) {
    unsubscribeDataEvent();
  }

  callback();
};

export const createDataItem = (data: DataItem) => {
  addDoc(collections.data, data);
};
