import { test } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks/dom' // will use react-dom

import { createTailwindProvider } from '../dist/createTailwindProvider';

const useTheme = createTailwindProvider({
    heading: "font-bold",
    heading1: "@heading text-2xl",
    heading2: "@heading text-xl",
});

describe('createTailwindProvider', () => {
    test('createTailwindProvider return hook', () => {
        expect(useTheme).toBeInstanceOf(Function);
    });

    test('hook return object with a theme property', () => {
        const { result } = renderHook(() => useTheme());
        
        expect(result.current).toHaveProperty('theme');
    });

    test('theme property is an object', () => {
        const { result } = renderHook(() => useTheme());
        
        expect(result.current.theme).toBeInstanceOf(Object);
    });

    test('theme object has properties heading, heading1 and heading2', () => {
        const { result } = renderHook(() => useTheme());
        
        expect(result.current.theme).toHaveProperty('heading');
        expect(result.current.theme).toHaveProperty('heading1');
        expect(result.current.theme).toHaveProperty('heading2');
    });

    test('theme object has properties heading, heading1 and heading2 with correct values', () => {
        const { result } = renderHook(() => useTheme());
        
        expect(result.current.theme.heading).toBe('font-bold');
        expect(result.current.theme.heading1).toBe('font-bold text-2xl'); // @heading is replaced with font-bold
        expect(result.current.theme.heading2).toBe('font-bold text-xl'); // @heading is replaced with font-bold
    });
});