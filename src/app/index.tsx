import React, { useState } from "react";
import {
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { defaultStyles } from "@/constants/Styles";
import { ThemedText } from "@/components/common/ThemedText";
import Icon, { IconType } from "@/components/common/Icon";
import GoogleIcon from "@/components/common/GoogleIcon";
import { Colors } from "@/constants/Colors";
import LucidLogo from "@/components/common/LucidLogo";
import SimpleButtonV2 from "@/components/common/SimpleButtonV2";
import ErrorBox from "@/components/common/ErrorBox";
import * as WebBrowser from "expo-web-browser";

const CLERK_REDIRECT_URL = process.env.EXPO_PUBLIC_CLERK_REDIRECT_URL || "";

const styles = StyleSheet.create({
  separatorView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    marginTop: 12,
  },
  separator: {
    fontSize: 16,
  },
});

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
}

// Warm up the android browser to improve UX
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  useWarmUpBrowser();
  const textColor = useThemeColor({}, "text");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const boxColor = useThemeColor({}, "box");
  const bgColor = useThemeColor({}, "background");
  const { signIn: signInClerk, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: Strategy.Google,
  });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: Strategy.Apple });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
    }[strategy];
    setIsLoading(true);
    if (errorMessage.length > 0) {
      setErrorMessage("");
    }
    try {
      const { createdSessionId, setActive } = await selectedAuth({
        redirectUrl: CLERK_REDIRECT_URL,
      });
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setErrorMessage(err.errors[0].message);
      console.error("OAuth error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignInPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    if (errorMessage.length > 0) {
      setErrorMessage("");
    }
    try {
      const signInAttempt = await signInClerk.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        console.error("Sign-in failed", signInAttempt);
      }
    } catch (err: any) {
      setErrorMessage(err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ThemedView className="pt-6 px-6">
        <View className="mb-4 flex-row">
          <LucidLogo style={{ width: 50, height: 50 }} />
          <ThemedText className="ml-2 mt-2" type="large">
            Lucid Care
          </ThemedText>
        </View>
        <ThemedText type="highlight" className="mt-4">
          Email
        </ThemedText>
        <TextInput
          editable={!isLoading}
          autoComplete="email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={emailAddress}
          placeholder="Your e-mail address"
          style={[
            defaultStyles.input,
            {
              marginTop: 5,
              color: textColor,
              backgroundColor: boxColor,
              padding: 14,
            },
          ]}
          onChangeText={setEmailAddress}
        />
        <ThemedText type="highlight" className="mt-5">
          Password
        </ThemedText>
        <TextInput
          editable={!isLoading}
          value={password}
          autoComplete="password"
          placeholder="Your Password"
          secureTextEntry
          style={[
            defaultStyles.input,
            { marginTop: 5, color: textColor, backgroundColor: boxColor },
          ]}
          onChangeText={setPassword}
        />

        <SimpleButtonV2
          disabled={isLoading}
          style={{
            marginTop: 16,
            borderWidth: 0,
          }}
          textColor="#fff"
          backgroundColor={Colors.button}
          text="Sign In"
          onPress={onSignInPress}
        />
        <ThemedView style={styles.separatorView}>
          <View
            style={{
              flex: 1,
              borderBottomColor: `${textColor}90`,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <ThemedText
            type="paragraph"
            style={[
              styles.separator,
              { color: `${textColor}90`, paddingHorizontal: 10 },
            ]}
          >
            OR
          </ThemedText>
          <View
            style={{
              flex: 1,
              borderBottomColor: `${textColor}90`,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </ThemedView>
        <ThemedView>
          <SimpleButtonV2
            disabled={isLoading}
            onPress={() => onSelectAuth(Strategy.Apple)}
            text="Continue with Apple"
            textColor={bgColor}
            style={{ backgroundColor: textColor }}
            icon={
              <Icon
                type={IconType.AntDesign}
                name="apple1"
                size={24}
                style={{ color: bgColor }}
              />
            }
          />
          <SimpleButtonV2
            disabled={isLoading}
            onPress={() => onSelectAuth(Strategy.Google)}
            text="Continue with Google"
            textColor={bgColor}
            style={{ backgroundColor: textColor }}
            icon={<GoogleIcon />}
          />
          <View className="items-center mt-4">
            <ThemedText type="paragraph">
              Don't have an account?{" "}
              <ThemedText
                onPress={isLoading ? null : () => router.push("/signup")}
                type="paragraph"
                style={{ color: Colors.button }}
              >
                Sign Up
              </ThemedText>
            </ThemedText>
          </View>
          {isLoading && (
            <ActivityIndicator
              size="large"
              color={textColor}
              style={{ marginTop: 20 }}
            />
          )}
          {errorMessage && <ErrorBox errorMessage={errorMessage} />}
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
};

export default SignIn;
