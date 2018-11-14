
export const setLocale = (provider, locale) => {
    provider.state.cookies.set('locale', locale);
    provider.props.setActiveLanguage(locale);
    provider.setState({
        locale: locale,
    });
}

export const getLocale = (cookies) => {
    let locale = cookies.get('locale');
    if (locale === undefined)
        locale = 'tb';
    return locale;
}