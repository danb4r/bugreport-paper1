import { AppState } from "react-native";

/**
  Listen to App events changes "active" and "background" and execute a function

  Usage example:

  const [appEventListener, setAppEventListener] = useState<AppEventListener>();

  useEffect(() => {
    setAppEventListener(
      new AppEventListener("active", () => {
        doSomething();
      })
    );
    return appEventListener?.finalize();
  }, []);
  
 */
export class AppEventListener {
  private appListener;
  listenToState;
  takeThisAction;

  constructor(listenToState: "active" | "background", takeThisAction: () => void) {
    this.appListener = AppState.addEventListener("change", this.appEventListener);
    this.listenToState = listenToState;
    this.takeThisAction = takeThisAction;
  }

  private appEventListener = (value: string) => {
    if (value === this.listenToState) {
      this.takeThisAction();
    }
  };

  /**
   * Must be called on the return of the useEffect(()=>{},[]) hook to lease the listener
   */
  finalize() {
    this.appListener.remove();
  }
}
