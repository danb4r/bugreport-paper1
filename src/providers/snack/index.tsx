import { createContext, ReactNode, useContext, useMemo, useRef, useState, useEffect } from "react";
import { SnackbarFlex } from "@src/features/components/snackbar.flex";
import { useChangeState } from "@src/hooks/use-change-state";

declare type TSnack = {
  message: string;
  actionLabel?: string;
  timeout?: number;
  callback?: () => void;
};

const SnackContext = createContext<{
  showSnack: (snack: TSnack) => void;
}>({
  showSnack: (snack: TSnack) => {},
});

/**
 * Provides a context to show a SnackBar from everywhere.
 * Items are queued and shown in FIFO order.
 */
function SnackProvider({ children }: { children: ReactNode }) {
  /** changeState triggers a redraw */
  const [, changeState] = useChangeState();

  /** Queue to keep snacks */
  const snackQueue = useRef<TSnack[]>([]);

  /** Current snack to be shown or undefined to trigger another render */
  const [currentSnack, setCurrentSnack] = useState<TSnack | undefined>(undefined);

  function checkQueue() {
    if (!currentSnack && snackQueue.current.length > 0) {
      /** Retrieve snack from queue */
      const nextSnack = snackQueue.current.shift();

      if (nextSnack) {
        /** Embed user callback with our callback */
        const originalCallback = nextSnack.callback;
        nextSnack.callback = () => {
          /** Calls the user callback */
          if (originalCallback) originalCallback();

          /** Resets currentSnack triggering another render  */
          setCurrentSnack(undefined);
        };
      }

      /** Show the next snack */
      setCurrentSnack(nextSnack);
    }
  }

  /** Check the queue at every render */
  useEffect(() => {
    checkQueue();
  });

  /**
   * Adds a message to be show in the Snackbar
   *
   * @param message Message to be shown in the snackbar
   * @param timeout Timeout in milliseconds
   * @param button Button label
   * @param callback Callback to be fired after timeout or button click
   */
  function showSnack(snack: TSnack) {
    /** Enqueue snack message */
    snackQueue.current.push(snack);

    /** Trigger a redraw to check for queued items */
    changeState();
  }

  const snackContext = useMemo(
    () => ({
      showSnack,
    }),
    []
  );

  return (
    <>
      <SnackContext.Provider value={snackContext}>{children}</SnackContext.Provider>
      {currentSnack ? (
        <SnackbarFlex
          visible={currentSnack ? true : false}
          callback={
            currentSnack.callback
              ? currentSnack.callback
              : () => {
                  changeState();
                }
          }
          message={currentSnack.message}
          actionLabel={currentSnack.actionLabel}
          timeout={currentSnack.timeout}
        />
      ) : null}
    </>
  );
}

function useSnack() {
  return useContext(SnackContext);
}

export { SnackProvider, useSnack, TSnack };
