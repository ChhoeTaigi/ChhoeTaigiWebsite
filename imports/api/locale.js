
export const setLocale = (cookies, locale) => {
    cookies.set('locale', locale);
    document.location.reload(true);
}

export const getLocale = (cookies) => {
    let locale = cookies.get('locale');
    if (locale === undefined)
        locale = 'tb';
    return locale;
}