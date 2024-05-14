import ReactGA from 'react-ga4';

export const initGA = () => {
    if (env === 'prod') {
        ReactGA.initialize('G-K5EDJKYNPR', {
            gaOptions: { cookieFlags: 'SameSite=Strict' },
        });
    } else if (env === 'dev') {
        ReactGA.initialize([
            {
                trackingId: "G-K5EDJKYNPR",
                testMode: false,
                gaOptions: { cookieFlags: 'SameSite=Strict' },
            },
        ]);
    }
};
