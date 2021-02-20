import AsyncStorage from "@react-native-async-storage/async-storage";

interface useAsyncLocalStorage {
  storeData: (key: string, data: any) => Promise<any>;
  getData: (key: string | string[]) => Promise<any>;
  removeData: (key: string) => Promise<void>;
  getAllDataKeys: () => Promise<any>;
}

export const useAsyncLocalStorage = (): useAsyncLocalStorage => {
  const storeData = async (key: string, data: any) => {
    try {
      if (typeof data === "object") {
        data = JSON.stringify(data);
      }

      await AsyncStorage.setItem(key, data);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async (key: string | string[]) => {
    try {
      let data;
      if (Array.isArray(key)) {
        data = await AsyncStorage.multiGet(key);
      } else {
        data = await AsyncStorage.getItem(key);
      }

      if (data && typeof data === "string") {
        return JSON.parse(data);
      }
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const removeData = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllDataKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (err) {
      console.log(err);
    }
  };

  return { storeData, getData, removeData, getAllDataKeys };
};
