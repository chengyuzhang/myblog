
import React,{Component,PropTypes} from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import Content from '../components/Body/BodyRightItemContent';

export class App extends Component{
    render() {
        return (
            <div className="wrap" ref="wrap">
            
                <Content />
                <Header />
                <Body />
                <Footer />
            </div>
        )
    }

    componentDidMount(){

    }
}
