import React, { Component } from 'react';

import '../api/update';

export default class Update extends Component {
    update() {
        Meteor.call('update.import', (error, result) => {
            console.log(result);
        });
    }
    
    render() {
        return (
            <div>
                <button onClick={this.update.bind(this)}>Import</button>
            </div>
        );
    }
}