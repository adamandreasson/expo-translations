import "expo-dev-client";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function App() {
	const { t } = useTranslation();
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>{t("test_translation")}</Text>
		</View>
	);
}
