import "expo-dev-client";

import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";

import resourcesToBackend from "i18next-resources-to-backend";

const supportedLanguages = ["en"];

const importLanguageFile = async (language, namespace) => {
	console.log(language, namespace);
	if (language !== "en" || namespace !== "translation") {
		return {};
	}
	const assetResult = require("./assets/locales/en/translation.json");
	return assetResult;
};

i18n
	.use(ChainedBackend)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		partialBundledLanguages: true,
		load: "languageOnly",
		supportedLngs: supportedLanguages,
		ns: ["translation"],
		debug: false,

		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		backend: {
			backends: [
				resourcesToBackend((language, namespace, callback) => {
					importLanguageFile(language, namespace)
						.then((data) => {
							callback(null, data);
						})
						.catch((error) => {
							callback(error, null);
						});
				}),
				HttpBackend,
			],
			backendOptions: [],
		},
	});

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
