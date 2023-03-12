import { useState, useEffect, createContext, ReactNode, useContext } from "react";

const ReloadContext = createContext<{
  doReload: () => void;
}>({
  doReload: () => {},
});

function ReloadProvider({ children }: { children: ReactNode }) {
  /** Reload engine */
  const [reload, setReload] = useState(false);

  type Props = { children: ReactNode };

  var Reload = ({ children }: Props) => {
    return <>{children}</>;
  };

  const checkReload = () => {
    if (reload) {
      Reload = ({ children }: Props) => {
        return <></>;
      };
      setReload(false);
    }
  };

  useEffect(() => {
    checkReload();
  }, [reload]);

  const reloadContext = {
    doReload: () => {
      setReload(true);
    },
  };

  return (
    <ReloadContext.Provider value={reloadContext}>
      <Reload>{children}</Reload>
    </ReloadContext.Provider>
  );
}

function useReload() {
  return useContext(ReloadContext);
}

export { ReloadProvider, useReload };
