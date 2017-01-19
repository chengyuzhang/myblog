import React,{Component,PropTypes} from 'react';

class ArticleCon extends Component{
    render(){
        return(
            <div className="article">
                <span className="article-close">X</span>
                <ul className="article-header">
                    <li>
                        <h1 className="title"></h1>
                        <span className="underline"></span>
                    </li>
                    <li className="">
                        <img id="avater-img" src="" alt="" />
                        <span className="name">Nelson</span>
                    </li>
                </ul>
                <article className="context">
                    
                </article>
            </div>
        )
    }
}

export default ArticleCon;