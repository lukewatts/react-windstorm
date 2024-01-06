import { test } from '@jest/globals';
import { renderHook } from '@testing-library/react';

import { createTheme } from './createTheme';

const useTheme = createTheme({
    heading: "font-bold",
    heading1: "@heading text-2xl",
    heading2: "@heading text-xl",
});

describe('createTheme', () => {
    test('createTheme return hook', () => {
        expect(useTheme).toBeInstanceOf(Function);
    });

    test('hook returns object with a theme property', () => {
        const { result } = renderHook(() => useTheme());
        
        expect(result.current).toHaveProperty('theme');
    });

    test('theme property is an object', () => {
        const { result } = renderHook(() => useTheme());
        
        expect(result.current.theme).toBeInstanceOf(Object);
    });

    test('theme object has expected properties', () => {
        const { result } = renderHook(() => useTheme());
        
        expect(result.current.theme).toHaveProperty('heading');
        expect(result.current.theme).toHaveProperty('heading1');
        expect(result.current.theme).toHaveProperty('heading2');
    });

    test('theme object properties have correct compiled values', () => {
        const { result } = renderHook(() => useTheme());
        
        expect(result.current.theme.heading).toBe('font-bold');
        expect(result.current.theme.heading1).toBe('font-bold text-2xl'); // @heading is replaced with font-bold
        expect(result.current.theme.heading2).toBe('font-bold text-xl'); // @heading is replaced with font-bold
    });
});