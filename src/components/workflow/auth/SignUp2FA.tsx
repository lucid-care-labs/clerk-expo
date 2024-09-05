import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/common/ThemedView";
import { ThemedText } from "@/components/common/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import OTPInput from "@/components/common/OTPInput";
import SimpleButtonV2 from "@/components/common/SimpleButtonV2";
import { Colors } from "@/constants/Colors";

const DEFAULT_COOLDOWN_SECONDS = 10;

const SignUp2FA = ({
  onVerify,
  onResendVerificationEmail,
}: {
  onVerify: (code: string) => Promise<void>;
  onResendVerificationEmail: () => Promise<void>;
}) => {
  const textColor = useThemeColor({}, "text");
  const bgColor = useThemeColor({}, "background");
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(DEFAULT_COOLDOWN_SECONDS);

  useEffect(() => {
    let timer;
    if (isCooldown && cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (cooldownTime === 0) {
      setIsCooldown(false);
      setCooldownTime(DEFAULT_COOLDOWN_SECONDS);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isCooldown, cooldownTime]);

  const handleVerify = async () => {
    await onVerify(code.join(""));
  };

  const handleResendVerificationEmail = async () => {
    setIsCooldown(true);
    setCooldownTime(DEFAULT_COOLDOWN_SECONDS);
    await onResendVerificationEmail();
  };

  return (
    <ThemedView>
      <ThemedText className="ml-2 mt-4" type="title">
        2-Step Verification
      </ThemedText>
      <ThemedText className="ml-2 mt-2" type="highlight">
        A verification code has been sent to your email address. Please enter
        the 6 digit code below.
      </ThemedText>
      <OTPInput
        style={{ marginTop: 20 }}
        value={code}
        setValue={setCode}
        length={6}
      />
      <SimpleButtonV2
        disabled={code.some((char) => char === "")}
        style={{
          marginTop: 40,
          borderWidth: 0,
          backgroundColor: Colors.button,
          borderRadius: 30,
          fontSize: 18,
        }}
        text="Submit"
        onPress={handleVerify}
      />
      <SimpleButtonV2
        style={{
          borderWidth: 0,
          backgroundColor: bgColor,
        }}
        text={`Resend Verification Code${isCooldown ? ` (${cooldownTime}s)` : ""}`}
        textColor={`${textColor}90`}
        onPress={isCooldown ? null : handleResendVerificationEmail}
        disabled={isCooldown}
      />
    </ThemedView>
  );
};

export default SignUp2FA;
