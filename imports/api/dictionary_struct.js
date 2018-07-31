// https://github.com/ChhoeTaigi/ChhoeTaigiDatabase

export default [
    {
        name: 'TaibunHoabunSoanntengSutian',
        chineseName: '台文華文線頂辭典',
        columns: {
            id: '編號（照來源資料編號）',
            poj_input: '白話字輸入',
            poj_other_input: '其他講法ê白話字輸入',
            poj_unicode: '白話字萬國碼',
            poj_other_unicode: '其他講法ê白話字萬國碼',
            tailo_input: '台羅輸入',
            tailo_other_input: '其他講法ê台羅輸入',
            tailo_unicode: '台羅萬國碼',
            tailo_other_unicode: '其他講法ê台羅萬國碼',
            hanlo_poj: '漢羅（白話字）',
            hanlo_tailo: '漢羅（台羅）',
            hoagi: '華語漢字',
        }
    },
    {
        name: 'TaiJitToaSuTian',
        chineseName: '台日大辭典（台文譯本）',
        columns: {
            id: '編號（照來源資料編號）',
            poj_input: '白話字輸入',
            poj_other_input: '其他講法ê白話字輸入',
            poj_unicode: '白話字萬國碼',
            poj_other_unicode: '其他講法ê白話字萬國碼',
            tailo_input: '台羅輸入',
            tailo_other_input: '其他講法ê台羅輸入',
            tailo_unicode: '台羅萬國碼',
            tailo_other_unicode: '其他講法ê台羅萬國碼',
            hanlo_poj: '漢羅（白話字）',
            hanlo_tailo: '漢羅（台羅）',
            taigi_kaisoeh_hanlo_poj: '台語解說（漢羅白話字）',
            taigi_kaisoeh_hanlo_tailo: '台語解說（漢羅台羅）',
            taigi_leku_hanlo_poj: '台語例句（漢羅白話字）',
            taigi_leku_hanlo_tailo: '台語例句（漢羅台羅）',
            page_number: '原冊頁數',
        }
    },
    {
        name: 'MaryknollTaiEngSuTian',
        chineseName: 'Maryknoll台英辭典',
        columns: {
            id: '編號（照來源資料編號）',
            poj_input: '白話字輸入',
            poj_unicode: '白話字萬國碼',
            tailo_input: '台羅輸入',
            tailo_unicode: '台羅萬國碼',
            hoagi: '華語漢字',
            english_descriptions: '英文解說',
            page_number: '原冊頁數（暫時無）',
        }
    },
    {
        name: 'EmbreeTaigiSuTian',
        chineseName: 'Embree台語辭典',
        columns: {
            id: '編號（照來源資料編號）',
            poj_input: '白話字輸入',
            poj_unicode: '白話字萬國碼',
            tailo_input: '台羅輸入',
            tailo_unicode: '台羅萬國碼',
            hoagi: '華語漢字',
            abbreviations: '詞類縮寫',
            noun_classifiers: '單位量詞',
            reduplication: '疊詞',
            english_descriptions: '英文解說',
            page_number: '原冊頁數（暫時無）',
        }
    },
    {
        name: 'KauiokpooTaigiSutian',
        chineseName: '教育部台語辭典',
        columns: {
            id: '編號（照來源資料編號）',
            poj_input: '白話字輸入',
            poj_unicode: '白話字萬國碼',
            poj_other_input: '其他講法ê白話字輸入',
            poj_other_unicode: '其他講法ê白話字萬國碼',
            tailo_input: '台羅輸入',
            tailo_unicode: '台羅萬國碼',
            tailo_other_input: '其他講法ê台羅輸入',
            tailo_other_unicode: '其他講法ê台羅萬國碼',
            word_property: '字詞ê屬性',
            word_bunpeh_property: '文白屬性',
            word_other_property: '其他講法ê類型',
            taigi_hanji: '台語漢字',
            hoagi: '華語漢字',
            descriptions: '華語解說、詞性、台語例詞kap例句',
        }
    },
    {
        name: 'KamJitian',
        chineseName: '甘字典',
        columns: {
            id: '編號（照來源資料編號）',
            poj_input: '白話字輸入',
            poj_unicode: '白話字萬國碼',
            tailo_input: '台羅輸入',
            tailo_unicode: '台羅萬國碼',
            taigi_hanlo_poj: '台文漢羅（白話字）',
            taigi_hanlo_tailo: '台文漢羅（台羅）',
            taigi_kaisoeh_poj: '台文解說（白話字）',
            taigi_kaisoeh_tailo: '台文解說（台羅）',
            taigi_kaisoeh_hanlo_poj: '台文解說（漢羅白話字）',
            page_number: '原冊頁數',
        }
    },
    {
        name: 'iTaigiHoaTaiSutian',
        chineseName: 'iTaigi華台辭典',
        columns: {
            id: '編號（照來源資料ê順序編號）',
            poj_input: '白話字輸入',
            poj_unicode: '白話字萬國碼',
            tailo_input: '台羅輸入',
            tailo_unicode: '台羅萬國碼',
            hanlo: '台文漢羅（台羅）',
            hoagi: '華語漢字',
            from: '字詞來源',
        }
    },
    {
        name: 'TaioanPehoeKichhooGiku',
        chineseName: '台灣白話基礎語句',
        columns: {
            id: '編號（照來源資料ê順序編號）',
            poj_input: '白話字輸入',
            poj_other_input: '其他講法ê白話字輸入',
            poj_unicode: '白話字萬國碼',
            poj_other_unicode: '其他講法ê白話字萬國碼',
            tailo_input: '台羅輸入',
            tailo_other_input: '其他講法ê台羅輸入',
            tailo_unicode: '台羅萬國碼',
            tailo_other_unicode: '其他講法ê台羅萬國碼',
            hoagi: '華語漢字',
            page_number: '原冊頁數',
        }
    },
    {
        name: 'TaioanSitbutMialui',
        chineseName: '台灣植物名彙',
        columns: {
            id: '編號（照來源資料ê順序編號）',
            poj_input: '白話字輸入',
            poj_unicode: '白話字萬國碼',
            tailo_input: '台羅輸入',
            tailo_unicode: '台羅萬國碼',
            taigi_hanji: '台語漢字',
            page_number: '原冊頁數',
        }
    },
]