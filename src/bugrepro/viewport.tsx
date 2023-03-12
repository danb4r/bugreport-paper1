import { ReactNode } from "react";
import { View, Dimensions } from "react-native";

import { th } from "@src/helpers/theme";
import { constants } from "@src/features/app/constants";

type Props = {
  /** The children elements to render inside ViewPort */
  children: ReactNode;

  /** The color of the outer side of the viewport (defaults to th.colors.background2) */
  outerBackgroundColor?: string;

  /** The color of the inner side of the viewport (defaults to th.color.background) */
  innerBackgroundColor?: string;

  /** The set of padding, margin and borderRadius to apply.
    Defaults to 10, pass 0 to not decorate */
  decorateBorder?: number;

  /** Uses the decorateBorder parameter only on big screens (>820px wide)
    and 0 on the others (defaults to true) */
  decorateBigScreenOnly?: boolean;
};

export const ViewPort = (props: Props) => {
  let decorateBorder = props.decorateBorder == undefined ? 10 : props.decorateBorder;
  const decorateBigScreenOnly = props.decorateBigScreenOnly == undefined ? true : props.decorateBigScreenOnly;

  /** Zeroes (disables) decoration on other platforms if decorateWebOnly */
  if (decorateBigScreenOnly && Dimensions.get("window").width < constants.viewPortThreshold) decorateBorder = 0;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: props.outerBackgroundColor ? props.outerBackgroundColor : th.colors.background2,
      }}>
      <View
        style={{
          flex: 1,
          maxWidth: constants.viewPortMaxWidth,
          width: "100%",
          alignSelf: "center",
          backgroundColor: props.innerBackgroundColor ? props.innerBackgroundColor : th.colors.background,
          padding: decorateBorder,
          margin: decorateBorder,
          borderRadius: decorateBorder,
        }}>
        {props.children}
      </View>
    </View>
  );
};
