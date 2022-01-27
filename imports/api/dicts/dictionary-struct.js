// https://github.com/ChhoeTaigi/ChhoeTaigiDatabase

module.exports = [
    {
        name: 'KamJitian',
        chineseName: '1913 甘字典',
        brief: {
            PojUnicode: '白話字',
            KipUnicode: '教育部拼音',
            HanLoTaibunPoj: '漢字台文',
            KaisoehHanLoPoj: '漢羅台文解說(白話字)',
        },
        briefWidth: {
            PojUnicode: '150px',
            KipUnicode: '150px',
            HanLoTaibunPoj: '100px',
            KaisoehHanLoPoj: '512px',
        },
        columns: {
            DictWordID: '番號',
            PojUnicode: '白話字',
            PojInput: '白話字輸入式',
            HanLoTaibunPoj: '漢字台文',
            HanbunImPojUnicode: '漢文音(白話字)',
            HanbunImPojInput: '漢文音(白話字輸入式)',
            KaisoehPoj: '台文解說(白話字)',
            KaisoehHanLoPoj: '漢羅台文解說(白話字)',
            KipUnicode: '教育部拼音',
            KipInput: '教育部拼音輸入式',
            HanbunImKipUnicode: '漢文音(教育部拼音)',
            HanbunImKipInput: '漢文音(教育部拼音輸入式)',
            KaisoehKip: '台文解說(教育部拼音)',
            PageNumber: '原冊頁數',
        }
    },
    {
        name: 'TaioanSitbutMialui',
        chineseName: '1928 台灣植物名彙',
        brief: {
            PojUnicode: '白話字',
            KipUnicode: '教育部拼音',
            HanLoTaibunPoj: '漢字台文',
        },
        briefWidth: {
            PojUnicode: '350px',
            KipUnicode: '350px',
            HanLoTaibunPoj: '212px',
        },
        columns: {
            DictWordID: '番號',
            PojUnicode: '白話字',
            PojInput: '白話字輸入式',
            KipUnicode: '教育部拼音',
            KipInput: '教育部拼音輸入式',
            HanLoTaibunPoj: '漢字台文',
            PageNumber: '原冊頁數',
        }
    },
    {
        name: 'TaijitToaSutian',
        chineseName: '1932 台日大辭典(台譯版)',
        brief: {
            PojUnicode: '白話字',
            KipUnicode: '教育部拼音',
            HanLoTaibunPoj: '漢羅台文(白話字)',
            KaisoehHanLoPoj: '漢羅台文解說(白話字)',
        },
        briefWidth: {
            PojUnicode: '150px',
            KipUnicode: '150px',
            HanLoTaibunPoj: '150px',
            KaisoehHanLoPoj: '350px',
        },
        columns: {
            DictWordID: '番號',
            PojUnicode: '白話字',
            PojUnicodeOthers: '白話字(其他講法)',
            PojInput: '白話字輸入式',
            PojInputOthers: '白話字輸入(其他講法)',
            HanLoTaibunPoj: '漢羅台文(白話字)',
            KaisoehHanLoPoj: '漢羅台文解說(白話字)',
            LekuHanLoPoj: '漢羅台文例句(白話字)',
            KipUnicode: '教育部拼音',
            KipUnicodeOthers: '教育部拼音(其他講法)',
            KipInput: '教育部拼音輸入式',
            KipInputOthers: '教育部拼音輸入(其他講法)',
            HanLoTaibunKip: '漢羅台文(教育部拼音)',
            KaisoehHanLoKip: '漢羅台文解說(教育部拼音)',
            LekuHanLoKip: '漢羅台文例句(教育部拼音)',
            PageNumber: '原冊頁數',
            GoanchhehPoochhiongChuliau: '原冊補充資料',
        }
    },
    {
        name: 'TaioanPehoeKichhooGiku',
        chineseName: '1956 台灣白話基礎語句',
        brief: {
            PojUnicode: '白話字',
            KipUnicode: '教育部拼音',
            HoaBun: '對應華文',
            EngBun: '對應英文',
        },
        briefWidth: {
            PojUnicode: '150px',
            KipUnicode: '150px',
            HoaBun: '150px',
            EngBun: '350px',
        },
        columns: {
            DictWordID: '番號',
            PojUnicode: '白話字',
            PojUnicodeOthers: '白話字(其他講法)',
            PojInput: '白話字輸入式',
            PojInputOthers: '白話字輸入(其他講法)',
            KipUnicode: '教育部拼音',
            KipUnicodeOthers: '教育部拼音(其他講法)',
            KipInput: '教育部拼音輸入式',
            KipInputOthers: '教育部拼音輸入(其他講法)',
            HoaBun: '對應華文',
            EngBun: '對應英文',
            KaisoehEngbun: '英文說明',
            NounClassifier: '助數詞',
            LesuPoj: '例詞',
            Opposite: '反義詞',
            LekuPoj: '例句(白話字)',
            LekuEngbun: '例句(英文)',
            LekuHoabun: '例句(華文)',
            Confer: '參照',
            PageNumber: '原冊頁數',
        }
    },
    {
        name: 'EmbreeTaiengSutian',
        chineseName: '1973 Embree台英辭典',
        brief: {
            PojUnicode: '白話字',
            KipUnicode: '教育部拼音',
            HoaBun: '對應華文',
            EngBun: '對應英文',
        },
        briefWidth: {
            PojUnicode: '150px',
            KipUnicode: '150px',
            HoaBun: '150px',
            EngBun: '350px',
        },
        columns: {
            DictWordID: '番號',
            PojUnicode: '白話字',
            PojInput: '白話字輸入式',
            KipUnicode: '教育部拼音',
            KipInput: '教育部拼音輸入式',
            Abbreviation: '詞類縮寫',
            NounClassifier: '助數詞',
            Reduplication: '疊詞',
            HoaBun: '對應華文',
            EngBun: '對應英文',
            Synonym: 'Kāng義詞',
            Confer: '參照',
            PageNumber: '原冊頁數',
        }
    },
    {
        name: 'MaryknollTaiengSutian',
        chineseName: '1976 Maryknoll台英辭典',
        brief: {
            PojUnicode: '白話字',
            KipUnicode: '教育部拼音',
            HoaBun: '對應華文',
            EngBun: '對應英文',
        },
        briefWidth: {
            PojUnicode: '150px',
            KipUnicode: '150px',
            HoaBun: '150px',
            EngBun: '350px',
        },
        columns: {
            DictWordID: '番號',
            PojUnicode: '白話字',
            PojInput: '白話字輸入式',
            KipUnicode: '教育部拼音',
            KipInput: '教育部拼音輸入式',
            HoaBun: '對應華文',
            EngBun: '對應英文',
            PageNumber: '原冊頁數(暫時無)',
        }
    },
    {
        name: 'TaihoaSoanntengTuichiautian',
        chineseName: '2002+ 台華線頂對照典',
        brief: {
            PojUnicode: '白話字',
            KipUnicode: '教育部拼音',
            HanLoTaibunPoj: '漢羅台文(白話字)',
            HoaBun: '對應華文',
        },
        briefWidth: {
            PojUnicode: '200px',
            KipUnicode: '200px',
            HanLoTaibunPoj: '200px',
            HoaBun: '200px',
        },
        columns: {
            DictWordID: '番號',
            PojUnicode: '白話字',
            PojUnicodeOthers: '白話字(其他講法)',
            PojInput: '白話字輸入式',
            PojInputOthers: '白話字輸入(其他講法)',
            HanLoTaibunPoj: '漢羅台文(白話字)',
            KipUnicode: '教育部拼音',
            KipUnicodeOthers: '教育部拼音(其他講法)',
            KipInput: '教育部拼音輸入式',
            KipInputOthers: '教育部拼音輸入(其他講法)',
            HanLoTaibunKip: '漢羅台文(教育部拼音)',
            HoaBun: '對應華文',
        }
    },
    {
        name: 'TJTaigiPehoeSioSutian',
        chineseName: '2009 TJ台語白話小詞典',
        brief: {
            PojUnicode: '白話字',
            PojUnicodeOthers: '白話字(其他講法)',
            PageNumber: '原冊頁數',
        },
        briefWidth: {
            PojUnicode: '250px',
            PojUnicodeOthers: '250px',
            PageNumber: '400px',
        },
        columns: {
            DictWordID: '番號',
            PojUnicode: '白話字',
            PojUnicodeOthers: '白話字(其他講法)',
            PojInput: '白話字輸入式',
            PojInputOthers: '白話字輸入(其他講法)',
            LmjUnicode: '原冊白話字',
            LmjUnicodeOthers: '原冊白話字(其他講法)',
            KipUnicode: '教育部拼音',
            KipUnicodeOthers: '教育部拼音(其他講法)',
            KipInput: '教育部拼音輸入式',
            KipInputOthers: '教育部拼音輸入(其他講法)',
            PageNumber: '原冊頁數',
            StoreLink: '來去買冊',
        }
    },
    {
        name: 'KauiokpooTaigiSutian',
        chineseName: '2011+ 教育部台語辭典',
        brief: {
            PojUnicode: '白話字',
            KipUnicode: '教育部拼音',
            HanLoTaibunPoj: '漢字台文',
            HoaBun: '對應華文',
        },
        briefWidth: {
            PojUnicode: '200px',
            KipUnicode: '200px',
            HanLoTaibunPoj: '180px',
            HoaBun: '300px',
        },
        columns: {
            DictWordID: '番號',
            PojUnicode: '白話字',
            PojUnicodeOthers: '白話字(其他講法)',
            PojInput: '白話字輸入式',
            PojInputOthers: '白話字輸入(其他講法)',
            KipUnicode: '教育部拼音',
            KipUnicodeOthers: '教育部拼音(其他講法)',
            KipInput: '教育部拼音輸入式',
            KipInputOthers: '教育部拼音輸入(其他講法)',
            HanLoTaibunPoj: '漢字台文',
            KipDictHanjiTaibunOthers: '漢字台文(其他寫法)',
            KipDictWordProperty: '字詞屬性',
            HoaBun: '對應華文',
            KaisoehHanLoPoj: '華文解說、詞性，台文例詞、例句(白話字)',
            KaisoehHanLoKip: '華文解說、詞性，台文例詞、例句(教育部拼音)',
            KipDictDialects: '無kāng所在ê講法(教育部拼音)',
            Synonym: 'Kāng義詞',
            Opposite: '反義詞',
        }
    },
    {
        name: 'iTaigiHoataiTuichiautian',
        chineseName: '2016+ iTaigi華台對照典',
        brief: {
            PojUnicode: '白話字',
            KipUnicode: '教育部拼音',
            HanLoTaibunPoj: '漢羅台文(白話字)',
            HoaBun: '對應華文',
        },
        briefWidth: {
            PojUnicode: '200px',
            KipUnicode: '200px',
            HanLoTaibunPoj: '200px',
            HoaBun: '250px',
        },
        columns: {
            DictWordID: '番號',
            PojUnicode: '白話字',
            PojInput: '白話字輸入式',
            KipUnicode: '教育部拼音',
            KipInput: '教育部拼音輸入式',
            HanLoTaibunPoj: '漢羅台文(白話字)',
            HanLoTaibunKip: '漢羅台文(教育部拼音)',
            HoaBun: '對應華文',
            DataProvidedBy: '資料來源',
        }
    },
    {
        name: 'SoanntengMuitheSekin',
        chineseName: '2021+ 線頂媒體索引辭典',
        brief: {
            PojUnicode: '白話字',
            KipUnicode: '教育部拼音',
            HanLoTaibunPoj: '漢羅台文(白話字)',
            HoaBun: '對應華文',
            EngBun: '對應英文',
        },
        briefWidth: {
            PojUnicode: '200px',
            KipUnicode: '200px',
            HanLoTaibunPoj: '140px',
            HoaBun: '140px',
            EngBun: '160px',
        },
        columns: {
            DictWordID: '番號',
            PojUnicode: '白話字',
            PojInput: '白話字輸入式',
            KipUnicode: '教育部拼音',
            KipInput: '教育部拼音輸入式',
            HanLoTaibunPoj: '漢羅台文(白話字)',
            HanLoTaibunKip: '漢羅台文(教育部拼音)',
            HoaBun: '對應華文',
            EngBun: '對應英文',
            SoanntengMuitheSekinPoochhiongChuliau: '參考資料',
            SoanntengMuitheSekinMuitheMiachheng: '媒體名稱',
            SoanntengMuitheSekinHongsangJitki: '放送日期',
            SoanntengMuitheSekinLaigoanBangchi: '媒體網址',
        }
    },
]