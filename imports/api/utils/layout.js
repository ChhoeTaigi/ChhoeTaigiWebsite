export const setLayout = (provider, layout) => {
    provider.state.cookies.set('layout', layout);
    provider.setState({
      layout: layout,
    });
}

export const getLayout = (cookies) => {
    let layout = cookies.get('layout');
    if (layout === undefined)
      layout = 'new';
    return layout;
}