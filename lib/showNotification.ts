import { Alert } from "react-native";

interface Notification {
  title: string;
  text: string;
  cancelable: boolean;
  onConfirm: () => void;
}

/**
 * Prompts user for confirmation of an action
 * @param {title, text, cancelable, onConfirm}
 */
export const showPromptNotification = ({
  title,
  text,
  cancelable = false,
  onConfirm,
}: Notification) => {
  Alert.alert(
    title,
    text,
    [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: onConfirm,
      },
    ],
    { cancelable }
  );
};
