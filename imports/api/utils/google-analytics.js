import ReactGA from 'react-ga4';

export const initGA = () => {
    if (env === 'prod') {
        ReactGA.initialize('378760521', {
            testMode: false,
            gaOptions: { cookieFlags: 'SameSite=Strict' },
        });
    } else if (env === 'dev') {
        ReactGA.initialize([
            {
                trackingId: "378760521",
                testMode: true,
                gaOptions: { cookieFlags: 'SameSite=Strict' },
            },
        ]);
    }
};
