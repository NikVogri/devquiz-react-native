import AsyncStorage from "@react-native-async-storage/async-storage";

interface useAsyncLocalStorage {
  storeData: (key: string, data: any) => Promise<any>;
  getData: (key: string | string[]) => Promise<any>;
  removeData: (key: string) => Promise<void>;
  pushData: (key: string, dataToPush: any) => Promise<void>;
  getAllDataKeys: () => Promise<any>;
  flushData: () => Promise<any>;
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

  const pushData = async (key: string, dataToPush: any) => {
    try {
      const data = await getData(key);

      let dataToStore;

      if (data) {
        if (typeof dataToPush !== "string") {
          dataToStore = [...data, JSON.stringify(dataToPush)];
        } else {
          dataToStore = [...data, dataToPush];
        }
      } else {
        dataToStore = [dataToPush];
      }
      await storeData(key, JSON.stringify(dataToStore));
    } catch (err) {
      console.log(err);
    }
  };

  const flushData = async () => {
    try {
      const dataKeys = await getAllDataKeys();

      if (dataKeys && dataKeys.length > 0) {
        await AsyncStorage.multiRemove(dataKeys);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    storeData,
    getData,
    removeData,
    getAllDataKeys,
    pushData,
    flushData,
  };
};
