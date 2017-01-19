import React,{Component,PropTypes} from 'react';

class BodyLeft extends Component{
    render(){
        return(
            <div className="body-left">
                <h2 className="title">Best Story</h2>
                <a className="link">Sell all <span className="icon"></span></a>
                <span className="underline"></span>
                <ul className="list">
                    <li>#every day</li>
                    <li>#how to have a horse</li>
                    <li>#horse life</li>
                </ul>
            </div>
        )
    }
}

export default BodyLeft;