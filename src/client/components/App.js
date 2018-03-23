import React, { Component } from 'react';

class App extends Component {

    render() {
        return (
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
        );
    }



}
export default App;