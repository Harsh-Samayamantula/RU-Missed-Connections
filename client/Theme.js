const palette = {
    purple: '#5A31F4',
    green: '#0ECD9D',
    red: '#CD0E61',
    darkRed: '#AB2132',
    black: '#54131B',
    white: 'white',
    gray: '#C4C4C4',
    pink: '#EF6C7C'
}

export const theme = {
    colors: {
        background: 'white',
        foreground: '#54131B',
        primary: '#E93046',
        primaryDark: '#AB2132',
        primaryLight: "#EF6C7C",
        primaryExtraLight: '#EEA4AD',
        subtitle: '#9F9393',
        faint: '#C4C4C4',
        success: '#0ECD9D',
        danger: '#CD0E61',
        failure: '#CD0E61',

        livingston: "#9DC2D1",
        collegeAve: "#C8C289",
        cookDoug: "#7BC991",
        busch: "#9B93CF",

    },
    spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 40,
    },
    textVariants: {
        header: {
            fontFamily: 'Raleway',
            fontSize: 36,
            fontWeight: 'bold',
        },
        body: {
            fontFamily: 'Merriweather',
            fontSize: 16,
        },
    }
};

export const darkTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        background: palette.black,
        foreground: palette.white,
    }
}