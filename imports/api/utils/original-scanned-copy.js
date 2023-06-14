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
    else if (dic === 'EmbreeTaiengSutian')
        link = parseEmbreeTaiengSutian(page);
    else if (dic === 'MaryknollTaiengSutian')
        link = parseMaryknollTaiengSutian(page);
    else if (dic === 'MaryknollEngtaiSutian')
        link = parseMaryknollEngtaiSutian(page);
    return link;
}

function parseTaijitToaSutian(page) {
    const char = page.slice(0, 1);
    page = page.slice(1, 5);
    let url;
    if (char === 'A') {
        const baseUrl1 = 'https://thak.taigi.info/1931TaijitToaSutian1/chheh/?page=';
        page = parseInt(page) + 12;
        url = baseUrl1 + page;
    } else if (char === 'B') {
        page = parseInt(page) + 4;
        const baseUrl1 = 'https://thak.taigi.info/1932TaijitToaSutian2/chheh/?page=';
        url = baseUrl1 + page;
    }
    return url;
}

function parseKamJitian(page) {
    page = parseInt(page) + 34;
    const baseUrl1 = 'https://thak.taigi.info/1913KamJitian/chheh/?page=';
    const url = baseUrl1 + page;
    return url;
}

function parseTaioanPehoeKichhooGiku(page) {
    page = parseInt(page) + 10;
    const baseUrl1 = 'https://thak.taigi.info/1956TaioanPehoeKichhooGiku/chheh/?page=';
    const url = baseUrl1 + page;
    return url;
}

function parseTaioanSitbutMialui(page) {
    page = parseInt(page) + 41;
    const baseUrl1 = 'https://thak.taigi.info/1928TaioanSitbutMialui/chheh/?page=';
    const url = baseUrl1 + page
    return url;
}

function parseEmbreeTaiengSutian(page) {
    page = parseInt(page) + 44;
    const baseUrl1 = 'https://thak.taigi.info/1973EmbreeTaiengSutian/chheh/?page=';
    const url = baseUrl1 + page;
    return url;
}

function parseMaryknollTaiengSutian(page) {
    page = parseInt(page) + 17;
    const baseUrl1 = 'https://thak.taigi.info/1976MaryknollTaiengSutian/chheh/?page=';
    const url = baseUrl1 + page;
    return url;
}

function parseMaryknollEngtaiSutian(page) {
    page = parseInt(page) + 1;
    const baseUrl1 = 'https://thak.taigi.info/1979MaryknollEngtaiSutian/chheh/?page=';
    const url = baseUrl1 + page;
    return url;
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}