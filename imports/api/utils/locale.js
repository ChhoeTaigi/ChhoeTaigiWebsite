
export const setLocale = (provider, locale) => {
    provider.state.cookies.set('locale_20240510', locale);
    provider.props.setActiveLanguage(locale);
    provider.setState({
        locale: locale,
    });
}

export const getLocale = (cookies) => {
    let locale = cookies.get('locale_20240510');
    if (locale === undefined)
        locale = 'lang_hanlo';
    return locale;
}