import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { parse } from '../../../api/utils/url-helper';
import DictionaryList from './DictionaryList';
import SingleDic from './SingleDic';

class Search extends Component {
    constructor(props) {
        super(props);
        
        const options = parse(props.location.search);
        this.state = {
            dic: options.dic,
            allResults: undefined,
        };
        this.process(props.location.search);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.location !== this.props.location) {
            const options = parse(nextProps.location.search);
            this.setState({
                dic: options.dic,
                allResults: undefined,
            });
            this.process(nextProps.location.search);
        }
    }

    process(search) {
        const options = parse(search); 
        Meteor.call('search', options, (error, allResults) => {
            if (error) throw new Meteor.Error(error);
            let state = {
                allResults: allResults,
                options: options,
            };

            this.setState(state);
        });
    }

    render() {
        let content;
        if (this.state.dic)
            content = <SingleDic allResults={this.state.allResults} options={this.state.options} />;
        else
            content = <DictionaryList allResults={this.state.allResults} options={this.state.options} />;

        return (
            <div>{content}</div>
        );
    }
}

export default withRouter(Search);