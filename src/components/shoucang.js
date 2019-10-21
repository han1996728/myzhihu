import  React from'react'
import '../assets/reset.css'
import '../assets/shoucang.css'
import axios from 'axios'
import {Carousel, WingBlank, Drawer} from 'antd-mobile';
import '../font_ol20cvo0zyb/iconfont.css'
import 'antd-mobile/lib/date-picker/style/css'
import 'antd-mobile/dist/antd-mobile.css';
import moment from 'moment'
import jinmu  from '../assets/fengjing.jpg'

class Collects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            c:[],
        };
        console.log(this.state.c);
    }
    render(){
        const sidebar = (
            <div className="zcdh">
                <div className="kuang">
                    <img className="fengjing" src={jinmu} /><span className="zhihuname">一问三不知</span><br/>
                    <div style={{'float':'left'}} onClick={this.myshou.bind(this)}><span className="iconfont icon-shoucang" ></span><span className="myshoucang">我的收藏</span></div>
                    <div style={{'float':'left','marginLeft':'0.8rem'}}><span className="iconfont  icon-xiazai"></span><span className="down">离线下载</span></div>
                </div>
                <div className="login" onClick={this.backindex.bind(this)}>
                    <span className="iconfont icon-shouye"></span><span className="shou">首页</span>
                </div>
            </div>
        );
        return(
            <div>
                <div className="topp">
                    <span onClick={this.onOpenChange}  className="iconfont icon-quanbu"></span>
                    <h1>{this.state.c.length}</h1><span className="tiaozi">条收藏</span>
                </div>
                <ul className="todayMain_one " >
                    {this.state.c.map((val,ind) => {
                        return <li key={ind}  onClick={this.xiangqing.bind(this,val.id)}>
                            <p>{val.title}</p>
                            <img src={val.image} alt=""/>
                        </li>
                    })}
                </ul>


                <Drawer
                    className="my-drawer"
                    style={{ width:0 }}
                    enableDragHandle
                    contentStyle={{ }}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                    sidebarStyle={{position:'fixed',zIndex:9999,left:'-1px'}}
                    overlayStyle={{position:'fixed'}}
                    dragHandleStyle={{width:0}}

                >
                    Click upper-left corner
                </Drawer>

            </div>

        )
    }
    componentDidMount(){
        for ( var k=0; k < sessionStorage.length; k++) {
           this.state.c.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(k))));
           this.setState({
               c:this.state.c
           })
        }
    }
    onOpenChange = () => {
        if(!this.state.open){
            document.body.style.overflow='hidden'
        }else{
            document.body.style.overflow=''
        }
        this.setState({ open: !this.state.open });
    };
    myshou(){
        this.setState({ open: false });
    }
    backindex(){
        this.props.history.push({
            pathname:"/index",
        })
    }
    xiangqing(x){
        this.props.history.push({
            pathname:"/details",
            state:{
                id:x,
            }
        })
    }
}
export  default Collects