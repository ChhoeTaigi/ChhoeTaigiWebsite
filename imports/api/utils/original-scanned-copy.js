import { func } from "prop-types";
import DictNames from '../dicts/dictConstants';

export default originalPage = (dic, chhehMia, page) => {
    console.log("originalPage: dic="+dic+", chhehMia="+chhehMia+", page="+page);

    let link = '';
    if (dic === DictNames.DICT_1932_TAIJIT_TOA_SUTIAN)
        link = parseTaijitToaSutian(page);
    else if (dic === DictNames.DICT_1931_TAIJIT_SIN_SUSU)
        link = parseTaijitSinSusu(page);
    else if (dic === DictNames.DICT_1913_KAM_UILIM_TAIGI_JITIAN)
        link = parseKamJitian(page);
    else if (dic === DictNames.DICT_1956_TAIOAN_PEHOE_KICHHOO_GIKU)
        link = parseTaioanPehoeKichhooGiku(page);
    else if (dic === DictNames.DICT_1895_JITPUN_SITAI_TANGI_MIALUI_CHIP)
        link = parseJitpunSitaiTangiMialuiChip(chhehMia, page);
    else if (dic === DictNames.DICT_TAIOAN_BUNHAK_TUCHOK_SEKIN)
        link = parseBunhakTuchok(chhehMia, page);
    else if (dic === DictNames.DICT_1973_EMBREE_TAIENG_SUTIAN)
        link = parseEmbreeTaiengSutian(page);
    else if (dic === DictNames.DICT_1976_MARYKNOLL_TAIENG_SUTIAN)
        link = parseMaryknollTaiengSutian(page);
    else if (dic === DictNames.DICT_1979_MARYKNOLL_ENGTAI_SUTIAN)
        link = parseMaryknollEngtaiSutian(page);
    else if (dic === DictNames.DICT_1957_TAIOANGI_SIONGIONG_GILUI)
        link = parseTaioangiSiongiongGilui(page);
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

function parseTaijitSinSusu(page) {
    page = parseInt(page) + 51;
    const baseUrl1 = 'https://thak.taigi.info/1931TaijitSinSusu/chheh/?page=';
    const url = baseUrl1 + page;
    return url;
}

function parseTaioangiSiongiongGilui(page) {
    page = parseInt(page) + 4;
    const baseUrl1 = 'https://thak.taigi.info/1957TaioangiSiongiongGilui/chheh/?page=';
    const url = baseUrl1 + page;
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

function parseJitpunSitaiTangiMialuiChip(chhehMia, page) {
    console.log("parseJitpunSitaiTangiMialuiChip: chhehMia="+chhehMia+", page="+page);

    if (chhehMia === '1895《臺灣語》') {
        page = parseInt(page/2) + 5;
        const baseUrl1 = 'https://thak.taigi.info/1895Taioangi/chheh/?page=';
        const url = baseUrl1 + page
        return url;
    } else if (chhehMia === '1896《日臺會話大全》') {
        page = parseInt(page) + 10;
        const baseUrl1 = 'https://thak.taigi.info/1896JittaiHoeoeTaichoan/chheh/?page=';
        const url = baseUrl1 + page
        return url;
    } else if (chhehMia === '1896《臺灣土語全書》') {
        page = parseInt(page) + 22;
        const baseUrl1 = 'https://thak.taigi.info/1896TaioanThoogiChoansu/chheh/?page=';
        const url = baseUrl1 + page
        return url;
    } else if (chhehMia === '1905《臺灣職業名字彙》') {
        pageNumber = parseInt(page)
        if (pageNumber <= 5) {
            page = pageNumber + 12;
        } else {
            page = parseInt(page/2) + 15;
        }
        const baseUrl1 = 'https://thak.taigi.info/1905TaioanChitgiapMiaJilui/chheh/?page=';
        const url = baseUrl1 + page
        return url;
    } else if (chhehMia === '1922《臺灣職業名字彙》') {
        page = parseInt(page/2) + 16;
        const baseUrl1 = 'https://thak.taigi.info/1922TaioanChitgiapMiaJilui/chheh/?page=';
        const url = baseUrl1 + page
        return url;
    } else if (chhehMia === '1922《臺灣語典》') {
        page = parseInt(page/2) + 143;
        const baseUrl1 = 'https://thak.taigi.info/1922TaioangiTian/chheh/?page=';
        const url = baseUrl1 + page
        return url;
    } else if (chhehMia === '1923《專賣局臺灣語典 第二篇 腦務》') {
        page = parseInt(page) + 15;
        const baseUrl1 = 'https://thak.taigi.info/1923ChoanbekiokTaioangiTianLobu/chheh/?page=';
        const url = baseUrl1 + page
        return url;
    } else if (chhehMia === '1926《銀行台語會話》') {
        page = parseInt(page) + 12;
        const baseUrl1 = 'https://thak.taigi.info/1926GinhangTaigiHoeoe/chheh/?page=';
        const url = baseUrl1 + page
        return url;
    } else if (chhehMia === '1928《臺灣植物名彙》') {
        page = parseInt(page) + 41;
        const baseUrl1 = 'https://thak.taigi.info/1928TaioanSitbutMialui/chheh/?page=';
        const url = baseUrl1 + page
        return url;
    } else if (chhehMia === '1933《臺灣稻在來品種名彙》') {
        page = parseInt(page) + 1;
        const baseUrl1 = 'https://thak.taigi.info/1933TaioanTiuChailaiPhinchengMialui/chheh/?page=';
        const url = baseUrl1 + page
        return url;
    } else {
        return page
    }
}

function parseBunhakTuchok(chhehMia, page) {
    console.log("parseBunhakTuchok: chhehMia="+chhehMia+", page="+page);

    if (chhehMia.startsWith('《Chhut Sí-sòaⁿ (出死線)》')) {
        page = parseInt(page) + 1;
        const baseUrl1 = 'https://thak.taigi.info/1926ChhutSisoann/chheh/?page=';
        const url = baseUrl1 + page
        return url;
    } else if (chhehMia.startsWith('《Khó-ài ê Siû-jîn (可愛ê仇人)》')) {
        const char = page.slice(0, 1);
        newPage = 0;
        if (char === 'T') {
            newPage = parseInt(page.slice(1, 3));
        } else {
            newPage = parseInt(page) + 5;
        }
        const baseUrl1 = 'https://thak.taigi.info/1960KhoaiESiujin/chheh/?page=';
        const url = baseUrl1 + newPage
        return url;
    } else {
        return page
    }
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