import { useEffect, useState } from "react";

interface TailwindProviderReturnedObject {
    theme: TailwindProviderObject;
}

type TailwindProviderObject = {
    [key: string]: string;
};

type Keys = keyof TailwindProviderObject;

export const createTailwindProvider = (customTheme: TailwindProviderObject): Function => {
    return (): TailwindProviderReturnedObject => {
        const [theme, setTheme] = useState(customTheme);

        useEffect(() => {
            setTheme((_theme: TailwindProviderObject) => {
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