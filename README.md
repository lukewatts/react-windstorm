# React Windstorm

## What

React Windstorm will create a Tailwind CSS theme provider which allows for quickly creating a Tailwind CSS theme for your React pages or components which can be completely decoupled from your component/application markup.

## Why

TailwindCSS is great! It makes styling an application or component super fast and less error prone and means you no longer have to maintain one or multiple stylesheets.

However, it has some downside too. Mainly, putting Tailwind classes directly into your HTML isn't very SOLID and actually creates a whole new set of maintainance issues. React Windstorm solves some of these issues by allowing themes to be completely seperate from their markup and allowing className strings in a theme to be re-used in other className strings with ease. Any property in your theme object can be re-used as part of any other properties value, meaning no duplication.

### Separation of concerns/Open-closed Principal

Having all your Tailwind classes in your components HTML means your styles and your markup are very tightly coupled to one another. If you want to tweak your styles, you have to edit the component itself. By using a theme provider instead, your styles can be managed completely seperately from your component. And because they are simply an object or a JSON file, you don't even need the developer who is editing them to be aware of the component or even know any React. Tailwind knowledge will be all they need. Likewise, developers working in the component file will no longer need to see all the classNames everywhere, which is less visual clutter for them to focus on the functionality.

### DRY (Don't Repeat Yourself)

In React particularly, there isn't really the opportunity to use the @apply method of creating reusable classes unless you go back to writing stylesheets. It's also not really recommended to use @apply all that much since you would just end up back writing hard to maintain stylesheets. However, putting all of your classes in the HTML will inevitably lead to a lot more duplication in your className strings. React Windstorm solves this by allowing better composition and reuse of logical Tailwind class groups.

### Semantics

By grouping your Tailwind classes into a single property, we can create "classnames" that actually describe what that element is. Also, with the reusable properties variables we can better describe what is happening in our className strings.

The raw Tailwind way...

```jsx
export default () => {
    const {theme} = useTheme();

    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
                    <a href="#" className="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a>
                </div>
            </div>
        </main>
    );
};
```

It probably didn't take you long to figure out this is a 404 page component. However, it probably took you longer to spot what exactly each element is for, or how many columns there are or are those links styled like links or buttons, and so on. There's just a lot of visual noise caused by Tailwind, even in a simple component like this.

Now let's see the same markup but with all the Tailwind stuff moved out of the component and into a `createTailwindTheme` provider.

```jsx
const useTheme = createTheme({
    fullHeightColumnCentered: "grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-white",
    textCentered: "text-center",
    statusCode: "text-base font-semibold text-indigo-600",
    statusMessage: "mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl",
    helpText: "mt-6 text-base leading-7 text-gray-600",
    callToActionContainer: "mt-10 flex items-center justify-center gap-x-6",
    homeLinkButton: "px-3.5 py-2.5 text-sm font-semibold text-white rounded-md shadow-sm bg-indigo-600 hover:bg-indigo-500 focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
    supportLink: "text-sm font-semibold text-gray-900"
});
```

You can probably already tell exactly what is going on just from this. But it becomes very obvious when we use the theme in out component

```jsx
export default () => {
    const {theme} = useTheme();

    return (
        <main className={theme.fullHeightColumnCentered}>
            <div className={theme.textCentered}>
                <p className={theme.statusCode}>404</p>
                <h1 className={theme.statusMessage}>Page not found</h1>
                <p className={theme.helpText}>Sorry, we couldn’t find the page you’re looking for.</p>
                <div className={theme.callToActionContainer}>
                    <a href="#" className={theme.homeLinkButton}>Go back home</a>
                    <a href="#" className={theme.supportLink}>Contact support <span aria-hidden="true">&rarr;</span></a>
                </div>
            </div>
        </main>
    );
});
```

## How

### Step 1. 

Install and configure React and Tailwind as normal using the instructions on the [TailwindCSS docs](https://tailwindcss.com/docs/guides/vite#react)

### Step 2.

Install React Windstorm from npm:

`yarn add -D react-windstorm`

In a component, create a theme and apply it like so:

```jsx
import { createTheme } from "react-windstorm";

const useTheme = createTheme({
    // ----------------------------------------
    // Helper Classes
    // ----------------------------------------
    gridFullHeightCentered: "grid min-h-full place-items-center",
    padding_x6_y24: "px-6 py-24 sm:py-32 lg:px-8",
    semibold: "font-semibold", // We can create reusable items. Call them in other properties by prefixing the key with @ (e.g. @semibold). This can also be a way to easily alias reusable chunks, or simply alias something so it makes more sense for you project
    textSmallSemiBold: "text-sm font-semibold",
    text3xlBold: "text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl",
    standardParagraphText: "text-base leading-7 text-gray-600",
    flexRowWithCenteredItems: "flex items-center justify-center",
    linkButtonPadding: "px-3.5 py-2.5",
    indigoButtonRounded: "text-white rounded-md shadow-sm bg-indigo-600 hover:bg-indigo-500 focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",

    // ----------------------------------------
    // Theme Classes
    // ----------------------------------------
    fullHeightColumnCentered: "@gridFullHeightCentered @padding_x6_y24 bg-white",
    textCentered: "text-center",
    statusCode: "text-base @semibold text-indigo-600",
    statusMessage: "mt-4 @text3xlBold",
    helpText: "mt-6 @standardParagraphText",
    callToActionContainer: "mt-10 @flexRowWithCenteredItems gap-x-6",
    homeLinkButton: "@linkButtonPadding @textSmallSemiBold @indigoButtonRounded",
    supportLink: "@textSmallSemiBold text-gray-900"
});

const ErrorMessagePage = () => {
    const {theme} = useTheme();

    return (
        <main className={theme.fullHeightColumnCentered}>
            <div className={theme.textCentered}>
                <p className={theme.statusCode}>404</p>
                <h1 className={theme.statusMessage}>Page not found</h1>
                <p className={theme.helpText}>Sorry, we couldn’t find the page you’re looking for.</p>
                <div className={theme.callToActionContainer}>
                    <a href="#" className={theme.homeLinkButton}>Go back home</a>
                    <a href="#" className={theme.supportLink}>Contact support <span aria-hidden="true">&rarr;</span></a>
                </div>
            </div>
        </main>
    );
});
```

