import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider, Text } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";

/** Adding custom fonts (see down the code before the render function ) */
// import { useFonts } from "expo-font";
// import { Oswald_400Regular } from "@expo-google-fonts/oswald";
// import { Lato_300Light } from "@expo-google-fonts/lato";

import { Skeleton } from "@src/bugrepro/skeleton";

/** Main */
export default function App() {
  /** Adding custom fonts */
  // const [fontsLoaded] = useFonts({
  //   Oswald_400Regular,
  //   Lato_300Light,
  // });

  /** This next line must be the last one before the return code
    and there must be no hooks bellow, otherwise
    hook order gets broke and React rises an error */
  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <PaperProvider>
          <NavigationContainer documentTitle={{ enabled: false }}>
            <Skeleton>
              <View>
                <Text style={{ color: "blue" }}>My app...</Text>
              </View>
            </Skeleton>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
