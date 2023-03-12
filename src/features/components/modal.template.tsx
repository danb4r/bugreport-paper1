import { View } from "react-native";
import { Modal, Headline } from "react-native-paper";
import { th } from "@src/helpers/theme";

export declare type Props = {
  /** Determines whether clicking outside the modal dismiss it */
  dismissible?: boolean;

  /** Callback that is called when the user dismisses the modal */
  onDismiss?: () => void;

  /** Accessibility label for the overlay. This is read by the screen reader when the user taps outside the modal. */
  overlayAccessibilityLabel?: string;

  /** Determines Whether the modal is visible */
  visible: boolean;

  /** The headline title */
  headline: string;

  /** Content of the Modal */
  body: React.ReactNode;

  /** Footer objects */
  footer: React.ReactNode;
};

export const ModalTemplate = (props: Props) => {
  return (
    <Modal
      dismissable={props.dismissible}
      onDismiss={props.onDismiss}
      overlayAccessibilityLabel={props.overlayAccessibilityLabel}
      visible={props.visible}
      contentContainerStyle={{ backgroundColor: th.colors.surface, borderRadius: 20 }}
      style={{ margin: 40, alignItems: "center" }}>
      <View style={{ alignItems: "flex-start", padding: 10, minWidth: 300 }}>
        <Headline
          style={{ color: th.colors.theme_text_faded, paddingTop: 15, paddingBottom: 10, paddingHorizontal: 15 }}>
          {props.headline}
        </Headline>
        <View style={{ width: "100%" }}>{props.body}</View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingVertical: 10,
            paddingBottom: 10,
          }}>
          {props.footer}
        </View>
      </View>
    </Modal>
  );
};
