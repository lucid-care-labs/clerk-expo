import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/common/ThemedView";
import SignUpForm, {
  SignUpFormProps,
} from "@/components/workflow/auth/SignUpForm";
import SignUp2FA from "@/components/workflow/auth/SignUp2FA";
import ErrorBox from "@/components/common/ErrorBox";

const SignUp = () => {
  const textColor = useThemeColor({}, "text");
  const { isLoaded, signUp, setActive } = useSignUp();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const resendVerificationEmail = async () => {
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err) {
      setErrorMessage(err.errors[0].message);
    }
  };

  const onSignUpPress = async (signUpFormProps: SignUpFormProps) => {
    if (!isLoaded) {
      return;
    }
    setIsLoading(true);
    try {
      await signUp.create({
        ...signUpFormProps,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      if (errorMessage.length > 0) {
        setErrorMessage("");
      }
      setPendingVerification(true);
    } catch (err: any) {
      setErrorMessage(err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  const onPressVerify = async (code: string) => {
    if (!isLoaded) {
      return;
    }

    if (errorMessage.length > 0) {
      setErrorMessage("");
    }
    setIsLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        setActive({ session: completeSignUp.createdSessionId });
      } else {
        setErrorMessage("Verification failed. Please try again");
      }
    } catch (err: any) {
      setErrorMessage(err.errors[0].longMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView className="pt-6 px-6 h-full" style={{ minHeight: "100%" }}>
      {!pendingVerification && (
        <SignUpForm onSubmit={onSignUpPress} isLoading={isLoading} />
      )}
      {pendingVerification && (
        <SignUp2FA
          onVerify={onPressVerify}
          onResendVerificationEmail={resendVerificationEmail}
        />
      )}
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={textColor}
          style={{ marginTop: 20 }}
        />
      )}
      {errorMessage && <ErrorBox errorMessage={errorMessage} />}
    </ThemedView>
  );
};

export default SignUp;
