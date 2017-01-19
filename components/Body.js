import React,{Component,PropTypes} from 'react';
import BodyLeft from './body/BodyLeft';
import BodyRight from './body/BodyRight';

class Body extends Component{
    render(){
        return(
            <section className="body">
                <BodyLeft />
                <BodyRight />
            </section>
        )
    }
}

export default Body;