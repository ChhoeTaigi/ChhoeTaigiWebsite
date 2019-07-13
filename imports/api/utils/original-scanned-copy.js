import { func } from "prop-types";

export default originalPage = (dic, page) => {

    let link = '';
    if (dic === 'TaijitToaSutian')
        link = parseTaijitToaSutian(page);
    else if (dic === 'KamJitian')
        link = parseKamJitian(page);
    else if (dic === 'TaioanPehoeKichhooGiku')
        link = parseTaioanPehoeKichhooGiku(page);
    else if (dic === 'TaioanSitbutMialui')
        link = parseTaioanSitbutMialui(page);
    return link;
}

function parseTaijitToaSutian(page) {
    const char = page.slice(0, 1);
    page = page.slice(1, 5);
    let url;
    if (char === 'a') {
        const baseUrl1 = 'http://ip194097.ntcu.edu.tw/memory/TGB/data/TJTST1/TJTST1_%E9%A0%81%E9%9D%A2_';
        const baseUrl2 = '.png';
        if (page < 99)
            page = parseInt(page) + 12;
        else
            page = parseInt(page) + 14;
        url = baseUrl1 + pad(page, 3) + baseUrl2;
    } else if (char === 'b') {
        page = parseInt(page) + 4;
        const baseUrl1 = 'http://ip194097.ntcu.edu.tw/memory/TGB/data/TJTST2/TJTST2_%E9%A0%81%E9%9D%A2_';
        const baseUrl2 = '.png';
        url = baseUrl1 + pad(page, 4) + baseUrl2;
    }
    return url;
}

function parseKamJitian(page) {
    page = parseInt(page) + 34;
    const baseUrl1 = 'http://ip194097.ntcu.edu.tw/memory/tgb/data/EMISJT/EMISJT_%E9%A0%81%E9%9D%A2_0';
    const baseUrl2 = '.png';
    const url = baseUrl1 + pad(page, 3) + baseUrl2;
    return url;
}

function parseTaioanPehoeKichhooGiku(page) {
    page = parseInt(page) + 10;
    const baseUrl1 = 'http://ip194097.ntcu.edu.tw/memory/tgb/data/TOPOKCGK/TOPOKCGK_%E9%A0%81%E9%9D%A2_';
    const baseUrl2 = '.png';
    const url = baseUrl1 + pad(page, 3) + baseUrl2;
    return url;
}

function parseTaioanSitbutMialui(page) {
    page = parseInt(page) + 44;
    const baseUrl1 = 'http://ip194097.ntcu.edu.tw/memory/tgb/data/TOSBBL/TOSBBL_%E9%A0%81%E9%9D%A2_';
    const baseUrl2 = '.png';
    const url = baseUrl1 + pad(page, 3) + baseUrl2;
    return url;
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}