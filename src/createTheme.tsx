import { useEffect, useState } from "react";

interface ThemeReturnedObject {
    theme: ThemeObject;
}

type ThemeObject = {
    [key: string]: string;
};

type ReplacementMapObject = {
    [key: string]: string;
};

/**
 * Compile Theme
 * Relaces all @key values with the value of the key
 * 
 * @author Luke Watts
 * @since 0.1.0
 * 
 * @param compileTheme: ThemeObject
 * @returns ThemeObject
 */
const compileTheme = (compileTheme: ThemeObject): ThemeObject => {
    // 1. Loop over each property in the theme object
    // 2. Split all the values by space
    // 3. Loop over each value
    // 4. If the value starts with @, create a property with the value as the key and the value as the value, e.g. { '@key': "bg-blue-500" }
    const replacementMap: ReplacementMapObject = {};
    for (const [, value] of Object.entries(compileTheme)) {
        const classNames = value.split(" ");
        for (const className of classNames) {
            if (className.startsWith("@")) {
                if (!replacementMap[className]) {
                    const keyLookup = className.replace("@", "");
                    replacementMap[className] = compileTheme[keyLookup];
                }
            }
        }
    }

    // Create the compiled theme object, which will be what is re-compiled and returned
    // This also means the compileTheme object is immutable. compiledTheme is a deep copy of compileTheme
    const compiledTheme: ThemeObject = {};
    for (const [key, value] of Object.entries(compileTheme)) {
        compiledTheme[key] = value;
    }

    // 1. Loop over each property in the replacementMap object
    // 2. Loop over each property in the compiledTheme object
    // 3. Replace all instances of the key in the compileTheme value with the value from the replacementMap
    for (const [replacementKey, replacementValue] of Object.entries(replacementMap)) {
        for (const [key] of Object.entries(compiledTheme)) {
            const replacedValue = compiledTheme[key].replace(replacementKey, replacementValue).replace(replacementKey, replacementValue);
            compiledTheme[key] = replacedValue;
        }
    }
    
    return compiledTheme;
};

/**
 * Create Theme
 * Generated the useTheme hook to be called in the component
 * 
 * @author Luke Watts
 * @since 0.0.1
 * 
 * @param customTheme: ThemeObject
 * @returns Function
 */
export const createTheme = (customTheme: ThemeObject): Function => {
    return (): ThemeReturnedObject => {
        const [theme, setTheme] = useState(customTheme);

        useEffect(() => {
            setTheme((_theme: ThemeObject) => {
                return compileTheme(customTheme);
            });
        }, [customTheme]);

        return { theme };
    };
};