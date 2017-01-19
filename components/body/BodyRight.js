import { connect } from 'react-redux';
import React,{Component,PropTypes} from 'react';
import BodyRightItem from './BodyRightItem';
import move from '../../static/js/move';

class BodyRight extends Component{

    getStyle(obj,name){
        return (obj.currentStyle || getComputedStyle(obj,false))[name];
    }

    render(){

        var {state}=this.props;
        var arrBodyRightItem=[];

        state.forEach((item,index)=>{
            console.log(item);
            var src=item.imgUrl;
            var avaterSrc=item.blogid.avaterUrl;
            var date=item.date;
            var article=item.context;
            var title=item.title;
            var name=item.blogid.author;
            //console.log(title);
            arrBodyRightItem.push(<BodyRightItem key={index} title={title} name={name} src={src} avaterSrc={avaterSrc} date={date} article={article} />);
        })

        return(
            <div className="body-right">
                <span className="btn"></span>
                <span className="btn"></span>
                <ul className="img-list" ref="list">
                    {arrBodyRightItem}
                    
                </ul>
            </div>
        )
    }

    componentDidMount(){

        var oBar=document.querySelector('.bar');
        var oList=document.querySelector('.img-list');//获取滑动对象
        var oWrap=document.querySelector('.wrap');
        var oText=document.querySelector('.article .context');//获取滑动对象
        var oTitle=document.querySelector('.article .title');//获取滑动对象
        var oName=document.querySelector('.article .name');
        var oCon=document.querySelector('.wrap>.content');//获取文章页面外层对象
        var oArticle=document.querySelector('.article');//获取文章页面
        var oClose=document.querySelector('.article .article-close');//获取文章页面的关闭按钮
        var oConImg=document.querySelector('.wrap>.content>img');//获取文章页面背影img对象
        var oAvaterImg=document.querySelector('#avater-img');
        var aLi=document.querySelectorAll('.right-item');
        var aImg=document.querySelectorAll('.right-item>img');//获取每一块文章简介内的img对象
        var iW=aLi[0].offsetWidth+1;//获取每一块文章简介内的宽度
        var iH=aLi[0].offsetHeight+1;//获取每一块文章简介内的高度
        var imW=aImg[0].offsetWidth+1;//获取每一块文章简介内的img对象的宽度
        var imH=aImg[0].offsetHeight+1;//获取每一块文章简介内的img对象的高度
        var iL=aLi.length;//获取文章简介的数量
        var l=0;//获取点击当前的img对象距离屏幕左边的距离
        var t=0;//获取点击当前的img对象距离屏幕顶部的距离

        console.log(oText);

        oList.style.width=iW*iL+'px';

        var aBtn=document.querySelectorAll('.btn');//获取左右滑动的按钮
        var num=0;

        aBtn[1].addEventListener('click',function(){
            num--;
            if(num<-(iL-3)){
                num=-(iL-3);
                return;
            }

            var iNum1=num*iW;

            oList.style.transform='translate3d('+iNum1+'px,0,0)';
        },false);

        aBtn[0].addEventListener('click',function(){
            num++;
            if(num>0){
                num=0;
                return;
            }

            var iNum2=num*iW;

            oList.style.transform='translate3d('+iNum2+'px,0,0)';
        },false);

        for(var i=0; i<aLi.length; i++){
            aLi[i].addEventListener('mouseover',function(){
                var oImg=this.querySelector('img');
                this.className="right-item active";
            },false);

            aLi[i].addEventListener('mouseout',function(){
                var oImg=this.querySelector('img');
                this.className="right-item";
            },false);

            aLi[i].addEventListener('click',function(){
                var oImg=this.querySelector('img');//获取点击当前的img对象
                var oN=this.querySelector('em');
                var oT=this.querySelector('.article-name');
                l=parseInt(oImg.getBoundingClientRect().left);//获取点击当前的img对象距离屏幕左边的距离
                t=parseInt(oImg.getBoundingClientRect().top);//获取点击当前的img对象距离屏幕顶部的距离
                var icW=window.innerWidth;//获取当前浏览器窗口的宽度
                var icH=window.innerHeight;//获取当前浏览器窗口的高度

                //console.log('l:',l,',','t:',t,'w:',imW,'h:',imH);
                //导航下面底条位置
                oBar.style.left='1rem';

                oTitle.innerHTML=oT.innerHTML;
                oConImg.src=oAvaterImg.src=oImg.src;
                oName.innerHTML=oN.innerHTML;
                oText.innerHTML=this.getAttribute('data-context');
                oCon.style.width=imW+'px';
                oCon.style.height=imH+'px';
                oCon.style.left=l+'px';
                oCon.style.top=t+'px';
                
                //文章外层显示出来并且提高层级
                oCon.style.zIndex=1;
                oCon.style.display='block';

                //文章外层显示出来的动画
                move(oCon,{
                    width:icW,
                    height:icH,
                    left:0,
                    top:0,
                    opacity:1
                },{
                    duration:250,
                    rate:25
                });

                //文章外层显示出来后的文章页面显示并且有动画
                setTimeout(function(){
                    oArticle.style.width='11rem';
                    oArticle.style.height='9rem';
                    oArticle.style.opacity=1;
                },100);
                
            },false);
        }

        //点击文章页面的关闭按钮
        oClose.addEventListener('click',function(){
            oArticle.style.opacity=0;
            oArticle.style.width='11rem';
            oArticle.style.height='0rem';

            //console.log(l,':',t);
            //导航下面底条位置
            oBar.style.left='0rem';

            //文章页面缩小的动画
          
            setTimeout(function(){
                move(oCon,{
                    width:imW,
                    height:imH,
                    left:l,
                    top:t,
                    opacity:0
                },{
                    duration:280,
                    rate:25
                });
            },100);

            //动画结束后降低层级
            setTimeout(function(){
                oCon.style.zIndex=0;
            },200);
        },false);
    }
}

function getData(state){
    return {state};
}

//BodyRight = connect()(BodyRight)

export default connect(getData)(BodyRight);