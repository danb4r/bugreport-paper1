import { useState } from "react";
import { AppNavigator } from "@src/features/app/app.navigator";
import { LinkContext } from "@src/features/link/web/link.context";
import { ActivityIndicatorDefault } from "@src/features/components/activity.indicator.default";
import { Skeleton } from "@src/features/components/skeleton";

import { t } from "@src/helpers/i18n";
import { ksGetItem } from "@src/services/keystorage";
import { WebAskQRCode } from "@src/features/link/web/link.web.ask.qrcode";

enum ELinkState {
  checkingPreviousPairing,
  notConnected,
  connected,
  error,
  errorAuth,
}

export const LinkWeb = () => {
  /** Possible states for the web link workflow. */
  const [linkState, setLinkState] = useState<ELinkState>(ELinkState.checkingPreviousPairing);

  const linkContext = {
    /** Disconnect from current server */
    disconnect: () => {},
  };

  /** Check for previous pairing data to restore link */
  if (linkState === ELinkState.checkingPreviousPairing) {
    ksGetItem("link_auth").then((value: unknown) => {
      if (value) {
        // TODO connect to ioserver
      } else {
        // TODO remove timeout
        setTimeout(() => {
          setLinkState(ELinkState.notConnected);
        }, 500);
      }
    });
    return (
      <Skeleton>
        <ActivityIndicatorDefault message={t("link_web_restore_previous")} />
      </Skeleton>
    );
  }

  /** Ask server for an id and show as a QR Code */
  if (linkState === ELinkState.notConnected)
    return (
      <Skeleton>
        <WebAskQRCode />
      </Skeleton>
    );

  return (
    <LinkContext.Provider value={linkContext}>
      <AppNavigator />
    </LinkContext.Provider>
  );
};
