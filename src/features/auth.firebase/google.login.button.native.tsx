import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import { th } from "@src/helpers/theme";

type Props = {
  /** The sign in function to fire when button pressed */
  signIn: () => void;
};

export const GoogleLoginButton = (props: Props) => {
  return (
    <GoogleSigninButton
      style={{ width: 140, height: 44 }}
      size={GoogleSigninButton.Size.Standard}
      color={th.dark ? GoogleSigninButton.Color.Dark : GoogleSigninButton.Color.Light}
      onPress={() => {
        props.signIn();
      }}
    />
  );
};
