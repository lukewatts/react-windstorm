import { useEffect, useState } from "react";

interface ThemeReturnedObject {
    theme: ThemeObject;
}

type ThemeObject = {
    [key: string]: string;
};

type Keys = keyof ThemeObject;

export const createTheme = (customTheme: ThemeObject): Function => {
    return (): ThemeReturnedObject => {
        const [theme, setTheme] = useState(customTheme);

        useEffect(() => {
            setTheme((_theme: ThemeObject) => {
                Object.keys(customTheme).forEach((className: Keys) => {
                    const classes = customTheme[className];
                    const classNames = classes.split(" ");
                    const parsedClassNames = classNames.map((keyIdentifier: string): string => {
                      if (keyIdentifier.startsWith("@")) {
                            const objectKey = keyIdentifier.replace(/^@/, "");

                            return customTheme[objectKey];
                        }

                        return keyIdentifier;
                    });

                    customTheme[className] = parsedClassNames.join(" ");
                });

                return { ...customTheme };
            });
        }, [customTheme]);

        return { theme };
    };
};