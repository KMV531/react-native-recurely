import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const signIn = () => {
  return (
    <View>
      <Text>signIn</Text>
      <Link href="/(auth)/sign-up">Don&apos;t have an account? Sign up</Link>
    </View>
  );
};

export default signIn;
