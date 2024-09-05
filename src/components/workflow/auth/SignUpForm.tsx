import { TextInput } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/components/common/ThemedText";
import { defaultStyles } from "@/constants/Styles";
import { useThemeColor } from "@/hooks/useThemeColor";
import SimpleButtonV2 from "@/components/common/SimpleButtonV2";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/common/ThemedView";

export type SignUpFormProps = {
  firstName: string;
  emailAddress: string;
  password: string;
};

const SignUpForm = ({
  onSubmit,
  isLoading = false,
}: {
  onSubmit: (props: SignUpFormProps) => Promise<void>;
  isLoading?: boolean;
}) => {
  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const textColor = useThemeColor({}, "text");
  const boxColor = useThemeColor({}, "box");

  const onSignUpPress = async () => {
    await onSubmit({
      firstName,
      emailAddress,
      password,
    });
  };

  return (
    <ThemedView>
      <ThemedText type="highlight" className="mt-2">
        First Name
      </ThemedText>
      <TextInput
        autoComplete="name"
        keyboardType="default"
        value={firstName}
        placeholder="First Name"
        style={[
          defaultStyles.input,
          {
            marginTop: 5,
            color: textColor,
            backgroundColor: boxColor,
            padding: 14,
          },
        ]}
        onChangeText={(firstName: string) => setFirstName(firstName)}
      />
      <ThemedText type="highlight" className="mt-5">
        Email
      </ThemedText>
      <TextInput
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
        onChangeText={(email) => setEmailAddress(email)}
      />
      <ThemedText type="highlight" className="mt-5">
        Password
      </ThemedText>
      <TextInput
        value={password}
        autoComplete="password"
        placeholder="Create Password"
        secureTextEntry={true}
        style={[
          defaultStyles.input,
          { marginTop: 5, color: textColor, backgroundColor: boxColor },
        ]}
        onChangeText={(password) => setPassword(password)}
      />
      <SimpleButtonV2
        style={{
          marginTop: 40,
          borderWidth: 0,
          backgroundColor: Colors.button,
        }}
        text="Sign Up"
        onPress={onSignUpPress}
        disabled={!firstName || !emailAddress || !password || isLoading}
      />
    </ThemedView>
  );
};

export default SignUpForm;
