import ReactGA from 'react-ga';

export const initGA = () => {
    if (env === 'prod') {
        ReactGA.initialize('UA-124171318-1', {
            debug: false,
        });
    } else if (env === 'dev') {
        ReactGA.initialize('UA-124171318-2', {
            debug: true,
        });
    }
};

export const logPageView = () => {
    ReactGA.pageview(window.location.pathname)
}
  