import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";

import { stringify } from '../../../api/utils/url-helper';
import resultsTranslations from '../../../translations/single-dic.json';
import dicStruct from '../../../api/dicts/dictionary-struct';
import BriefWord from './BriefWord';

import { LoadingIndicator } from './LoadingIndicator';

class SingleDic extends Component {
    constructor(props) {
        super(props);

        props.addTranslation(resultsTranslations);

    }


    componentDidMount() {
        window.scrollTo(0, 0);
    }

    goToPage(pageNum, event) {
        if (event.key === 'Enter') {
            let page = event.target.value;
            if (page < 1)
                page = 1;
            if (page > pageNum)
                page = pageNum;
            const options = this.props.options;
            options.page = page;
            this.props.history.push({
                pathname: 'search',
                search: stringify(options),
            });
        }
    }

    render() {
        let dic;
        let keywords = [];
        let totalNum;
        let pageNum;
        let thisPage;
        let pageFrom;
        let pageTo;
        let chineseName;
        const options = this.props.options;
        let words;

        if (this.props.allResults) {
            // dic result
            dic = options.dic;
            const columns = options.columns;

            for (let key in columns) {
                if (columns[key]) {
                    const column = columns[key]; //.replace(/\s/g, '');
                    if (column !== '') {
                        keywords.push("【" + column + "】");
                    }
                }
            }
            keywords = keywords.join('，');
            const struct = dicStruct.find(e => e.name === dic);
            chineseName = struct.chineseName;

            // num
            const rowPerPage = 30;
            totalNum = this.props.allResults.num;
            pageNum = Math.ceil(totalNum / rowPerPage);

            // page
            thisPage = parseInt(options.page || 1);
            pageFrom = thisPage - 3;
            if (pageFrom < 1)
                pageFrom = 1;
            pageTo = pageFrom + 6;

            if (pageTo > pageNum)
                pageTo = pageNum;
            pageFrom = pageTo - 6;
            if (pageFrom < 1)
                pageFrom = 1;

            words = this.props.allResults.words;
        }

        let pageView;
        let bottomPageView;
        if (pageTo > 1) {
            let pages = [];
            let listPageNum = (pageTo - pageFrom + 1);

            for (let i = pageFrom; i <= pageTo; ++i) {
                options.page = i;
                const pageUrl = '/search?' + stringify(options);
                pages.push(<Link key={i} className={'pagination__page ' + (thisPage === i ? 'active' : '')} to={pageUrl}>{i}</Link>);
            }

            let lastPage = thisPage - 1;
            lastPage = lastPage < 1 ? 1 : lastPage;
            options.page = lastPage;
            const lastPageUrl = '/search?' + stringify(options);

            let nextPage = thisPage + 1;
            nextPage = nextPage > pageNum ? pageNum : nextPage;
            options.page = nextPage;
            const nextPageUrl = '/search?' + stringify(options);

            pageView = (
                <div className='pagination'>
                    <Link className='pagination__arrow pagination__arrow--prev' to={lastPageUrl}><span className="sr-only">Prev</span></Link>
                    <div className='pagination__pages'>{pages}</div>
                    <Link className='pagination__arrow pagination__arrow--next' to={nextPageUrl}><span className="sr-only">Next</span></Link>
                    <div className='pagination__goto'>
                        <span><Translate id='oann-iah-part1' /></span>
                        <input type='number' className='pagination__input' onKeyPress={this.goToPage.bind(this, pageNum)}></input>
                        <span><Translate id='oann-iah-part2' /></span>
                    </div>
                </div>
            );

            bottomPageView = (
                <div className='search-result__bottom'>
                    {pageView}
                </div>
            );
        }

        return (
            <div className='search-result'>
                <div className='container'>
                    <div className='search-result__query'>
                        <Translate id='search_keyword' />：{keywords}
                    </div>
                    <div className='dic-block'>
                        <header className='dic-block__header'>
                            <h2 className='dic-block__title'>{chineseName}</h2>
                            <h3 className='dic-block__counts'>(<Translate id='sutian-sooliong-part1' />{totalNum}<Translate id='sutian-sooliong-part2' />{pageNum}<Translate id='sutian-sooliong-part3' />)</h3>
                            {!this.props.allResults && LoadingIndicator}
                            {pageView}
                        </header>
                        <div className='dic-block__content'>
                            <BriefWord key={dic} dic={dic} words={words} />
                        </div>
                        {bottomPageView}
                    </div>
                </div>
            </div>
        );
    }
}

export default withLocalize(withRouter(SingleDic));