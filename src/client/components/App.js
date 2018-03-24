import React, { Component } from 'react';
import {searchSecretByHash} from './../actions/SecretAction'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchHash: ""
        }
    }

    render() {
        return (
            <div>
                <div id="secretCreation">
                    <form method="post" action="/secret">
                        <div>
                            <label>Secret text: </label>
                            <input type="text" name="secretText"/>
                        </div>
                        <div>
                            <label>Expired after(minutes): </label>
                            <input type="number" name="expireAfter"/>
                        </div>
                        <div>
                            <label>Expire after views: </label>
                            <input type="number" name="expireAfterViews"/>
                        </div>
                        <input type="submit" value="Create"/>
                    </form>
                </div>

                <div id="secretSearch">
                    <div>
                        <label>Search secret by hash: </label>
                        <input type="text" value={this.state.searchHash} onChange={this.searchFieldChange.bind(this)} />
                        <input type="button" value="Search" onClick={this.searchByHash.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }

    searchFieldChange(changeEvent) {
        this.setState({searchHash: changeEvent.target.value});
    }

    searchByHash() {
        searchSecretByHash(this.state.searchHash)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }


}
export default App;