import { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';

export type ThemeStlye = {
    mainColor: string;
    subColor: string;
};

export type StyleProps = {
    children?: ReactNode;
    theme?: ThemeStlye;
    size?: 'small' | 'medium' | 'large' | 'full';
    fontSzie?: string;
    mainColor?: string;
    subColor?: string;
    width?: string;
    height?: string;
    disabled?: boolean;
    onClick?: (Function & MouseEventHandler<HTMLButtonElement>) | undefined;
    onKeyPress?:
        | (Function &
              MouseEventHandler<HTMLButtonElement> &
              KeyboardEventHandler<HTMLButtonElement>)
        | undefined;
    isCompleted?: boolean;
    type?: 'button' | 'submit' | 'reset' | undefined;
};
