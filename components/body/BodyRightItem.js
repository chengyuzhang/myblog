import React,{Component,PropTypes} from 'react';

class BodyRightItem extends Component{
    render(){
        return(
            <li className="right-item" data-context={this.props.article}>
                <img src={this.props.src} alt="1" />
                <p className="article-name">{this.props.title}</p>
                <span className="underline"></span>
                <em>{this.props.name}</em>
                <ol>
                    <li className="avater"><img src={this.props.avaterSrc} alt="" /><span className="name">{this.props.name}</span></li>
                    <li className="date">{this.props.date}</li>
                </ol>
            </li>
        )
    }
}

export default BodyRightItem;


                