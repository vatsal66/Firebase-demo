import React from 'react';
import ThemeContextWrapper from './themes/ThemeContextWrapper';
import { ThemeContext, themes } from './themes/Themes';


const Theme = () => {

    const [darkMode, setDarkMode] = React.useState(true);

    return (
        <div>
            <h1>dadsads</h1>
            <ThemeContextWrapper>
                <ThemeContext.Consumer>
                    {({ changeTheme }) => (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            color="link"
                            onClick={() => {
                                setDarkMode(!darkMode);
                                changeTheme(darkMode ? themes.light : themes.dark);
                            }}
                        >
                            <span className="d-lg-none d-md-block">Switch mode</span>
                        </button>
                    )}
                </ThemeContext.Consumer>
            </ThemeContextWrapper>
        </div>
    )
}

export default Theme;