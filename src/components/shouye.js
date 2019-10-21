import  React from'react'
import '../assets/reset.css'
import '../assets/shouye.css'
import '../font_ol20cvo0zyb/iconfont.css'
import axios from 'axios'
import {Carousel, WingBlank, Drawer} from 'antd-mobile';
import 'antd-mobile/lib/date-picker/style/css';
import 'antd-mobile/dist/antd-mobile.css';
import {NavLink} from 'react-router-dom';
import moment from 'moment'
import jinmu  from '../assets/fengjing.jpg'

class Indexx extends React.Component{
    constructor(props){
        super(props);
        this.state={
            stories:[],
            crr:[],
            num:0,
            numb:0,
            date:"",
            arr: ['1', '2', '3', '4', '5'],
            brr: [],
            id:'首页',
        }
    }
    componentDidMount(){
        let app=[];
        let add="";
        let todayMain = document.getElementsByClassName("todayMain");
        axios.get("/api/4/news/latest").then((res) => {
            this.setState({
                stories:res.data.stories,
                crr:[],
                date:res.data.date,
                arr: res.data.top_stories,
            });
            if(250+todayMain[0].clientHeight<document.documentElement.scrollHeight){
                axios.get(`/api/4/news/before/${this.state.date}`).then((res) => {
                    add=moment(res.data.date).format('YYYY年MM月DD日');
                    app.push(
                        {
                            title:add,
                            main:res.data.stories
                        }
                    );
                    this.setState({
                            crr: app,
                            date:res.data.date
                        }
                    );
                });
                // console.log(res.data);
            }
        });
        window.onscroll=()=>{
            if(document.documentElement.scrollTop+ document.documentElement.clientHeight>=document.documentElement.scrollHeight){
                axios.get(`/api/4/news/before/${this.state.date}`).then((res) => {
                    add=moment(res.data.date).format('YYYY年MM月DD');
                    app.push(
                        {
                            title:add,
                            main:res.data.stories
                        }
                    );
                    this.setState({
                            crr: app,
                            date:res.data.date
                        }
                    );
                });
            }
            let scro=document.documentElement.scrollTop;
            let dt = Array.from(document.getElementsByTagName("p"));
            if(scro>this.state.numb){
                this.state.numb=scro;
                if(dt[this.state.num]){
                    if(document.documentElement.scrollTop>=dt[this.state.num].offsetTop){
                        this.setState({
                            num:++this.state.num
                        });
                    }
                }
            }else{
                this.state.numb=scro;
                if(dt[this.state.num]){
                    if(document.documentElement.scrollTop<dt[this.state.num].offsetTop){
                        if(this.state.num <=0){
                            this.setState({
                                num:0
                            });
                        }else {
                            this.setState({
                                num:--this.state.num
                            });
                        }
                    }
                }
            }
        };
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    };
    render(){
        const sidebar = (
            <div className="zcdh">
                <div className="kuang">
                    <img className="fengjing" src={jinmu} /><span className="zhihuname">一问三不知</span><br/>
                     <div style={{'float':'left'}} onClick={this.myshoucang.bind(this)}><span className="iconfont icon-shoucang" ></span><span className="myshoucang">我的收藏</span></div>
                    <div style={{'float':'left','marginLeft':'0.8rem'}}><span className="iconfont  icon-xiazai"></span><span className="down">离线下载</span></div>
                </div>
                <div className="login" onClick={this.backindex.bind(this)}>
                    <span className="iconfont icon-shouye"></span><span className="shou">首页</span>
                </div>
            </div>
          );
        return(
            <div>
                <div className="top">
                    <span onClick={this.onOpenChange}  className="iconfont icon-quanbu"></span>
                    <span className="iconfont icon-diandiandianshu"></span>
                    <span className="iconfont icon-lingdang"></span>
                    <h1>首页</h1>
                </div>
                <WingBlank style={{'margin': '0', 'padding': '0', 'marginTop': '1.2rem'}}>
                    <Carousel
                        autoplay={true}
                        infinite
                        autoplayInterval={2000}
                        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        // afterChange={index => console.log('slide to', index)}
                    >
                        {this.state.arr.map(val => (
                            <a
                                key={val}
                                // href="http://www.alipay.com"
                                style={{display: 'inline-block', width: '100%', height: '4.5rem'}}
                            >
                                <img
                                    src={val.image}
                                    alt=""
                                    style={{width: '100%', verticalAlign: 'top'}}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({imgHeight: 'auto'});
                                    }}
                                />
                                <p className="title">{val.title}</p>
                            </a>
                        ))}
                    </Carousel>
                </WingBlank>
                <div> <ul className="todayMain" >
                    <h1>今日热闻</h1>
                    {this.state.stories.map((val,ind) => {
                        return <li key={ind} onClick={this.go.bind(this,val.id)}>
                            <p>{val.title}</p>
                            <img src={val.images} alt=""/>
                        </li>
                    })}
                </ul>
                </div>
                <div>
                    {this.state.crr.map((val,ind) => {
                        return <ul className="todayMain" key={ind}>
                            <p className="tittle_one">{val.title}</p>
                            {val.main.map((va,i) => {
                                return <li key={i} onClick={this.go.bind(this,va.id)}>
                                    <p>{va.title}</p>
                                    <img src={va.images} alt=""/>
                                </li>
                            })}
                        </ul>
                    })}
                </div>

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
    go(x){
        window.onscroll=null;
        console.log(this.props.history);
        this.props.history.push({
            pathname:"/details",
            state:{
                  id:x,
            }
        })
    }h
    myshoucang(){
        this.props.history.push({
            pathname:"/collects",
        })
    }
    backindex(){
        this.setState({ open: false});
    }
    onOpenChange = () => {
        if(!this.state.open){
            document.body.style.overflow='hidden'
        }else{
            document.body.style.overflow=''
        }
        this.setState({ open: !this.state.open });
    }

}
export default Indexx;
