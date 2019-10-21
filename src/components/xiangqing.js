import  React from'react'
import '../assets/reset.css'
import '../assets/xiangqing.css'
import '../font_ol20cvo0zyb/iconfont.css'
import axios from 'axios'
import {Carousel, WingBlank} from 'antd-mobile';
import 'antd-mobile/lib/date-picker/style/css';
import 'antd-mobile/dist/antd-mobile.css';
import moment from 'moment'
let allcomment=0;
class Details extends React.Component {
    state = {
        arr: [],
        brr: [],
        color: [
            {
                color: "#f13f19",
                name: "iconfont icon-weibo",
                title: "新浪微博"
            },
            {
                color: "#60c84f",
                name: "iconfont icon-weixin",
                title: "微信"
            },
            {
                color: "#68ca15",
                name: "iconfont icon-weixinpengyouquan",
                title: "微信朋友圈"
            },
            {
                color: "#5ab540",
                name: "iconfont icon-fenxiang_yinxiangbiji",
                title: "印象笔记"
            },
            {
                color: "#30a1ed",
                name: "iconfont icon-youdaoyunbiji",
                title: "有道云笔记"
            },
            {
                color: "#2369c8",
                name: "iconfont icon-qq",
                title: "QQ"
            },
            {
                color: "#7f7f7f",
                name: "iconfont icon-gengduo",
                title: "更多平台"
            }
        ],
        flag:true,
        fla:true,
        fl:false,
        dianzan:'',
        short:'',
        long:'',
    };
    render() {
          allcomment=String(this.state.long.length+this.state.short.length);
        setTimeout(()=>{
            let pict = document.getElementsByClassName('img-place-holder')[0];
            // console.log(pict);
            if(pict!=undefined){
                pict.style.position = "relative";
                pict.innerHTML=`<img src=${this.state.arr.image}  style="height: 4rem;width: 100%;margin-top:1rem"/><p style="position: absolute;bottom:-1.2rem;color: white;font-size: 0.4rem
;padding: 0 0.3rem;line-height: 0.5rem">${this.state.arr.title}</p><p style="position: absolute;bottom:-1.7rem;right:0.2rem;color: #f4f4f4;font-size: 0.2rem;padding: 0 0.1rem;line-height: 0.5rem">${this.state.arr.image_source}</p>`;
            }
        },0);
        return (
            <div>
                <div className="top_one">
                    <span className="iconfont icon-fanhuijiantou
" onClick={this.back.bind(this)}></span>
                    <span className="zan">{this.state.dianzan}</span>
                    <span className="iconfont icon-zan" style={this.state.fla ? {color: "#fff"} : {color: "red"}} onClick={this.dianzan.bind(this)}></span>
                    <span className="messng">{allcomment}</span>
                    <span className="iconfont icon-pinglun3" onClick={this.pinlun.bind(this)}></span>
                    <span className="iconfont icon-shoucang1"  onClick={this.shoucang.bind(this)} style={this.state.fl==true? {color: "yellow"} : {color: "#fff"}}></span>
                    <span className="iconfont icon-fenxiang"   onClick={this.diss.bind(this)}></span>
                </div>
                <div dangerouslySetInnerHTML={{__html: this.state.arr.body}}></div>
                <link href={this.state.brr} rel="stylesheet"/>
                    <div className={this.state.flag ? "shadow active" : "shadow"}>
                    <ul className="share" >
                        <p>分享</p>
                        {this.state.color.map((val, ind) => {
                            return <li key={ind}>
                                <div style={{background: val.color}}>
                                    <span className={val.name} onClick={this.nodiss.bind(this)}></span>
                                </div>
                                <i>{val.title}</i>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
    componentWillMount() {
        axios.get(
            `api/4/news/${this.props.history.location.state.id}`
        ).then((res) => {
            // console.log(res.data);
            this.setState({
                arr: res.data,
                brr: res.data.css
            });
        });
        axios.get(
            `/api/4/story-extra/${this.props.history.location.state.id}`
        ).then(
            (res) => {
                this.setState({
                    dianzan: res.data.popularity
                });

            }
        );
        axios.get(`/api/4/story/${this.props.history.location.state.id}/long-comments`).then(
            (res) => {
                this.setState({
                    long: res.data.comments
                });
            }
        );
        axios.get(`/api/4/story/${this.props.history.location.state.id}/short-comments`).then(
            (res) => {
                this.setState({
                    short: res.data.comments
                });

            }
        );
        let a = sessionStorage.getItem(this.props.history.location.state.id);
        this.key=this.props.history.location.state.id;
        console.log(a);
        if(sessionStorage.getItem(this.props.history.location.state.id) !=== null ){
            this.state.fl=true;
            this.setState({
                fl:this.state.fl
            });
            console.log(this.state.fl);
        }else{
            this.state.fl=false;
            this.setState({
                fl:this.state.fl
            });
        }
    }
    back(){
        this.props.history.go(-1)
    }
    diss(){
        document.body.style.overflow = "hidden";
        this.setState({
            flag: false
        });
    }
    nodiss() {
        document.body.style.overflow = "";
        this.setState({
            flag: true
        });
    }
    dianzan(){
        this.setState({
            fla: !this.state.fla
        });
        if (this.state.fla) {
            this.setState({
                dianzan: ++this.state.dianzan
            });
        } else {
            this.setState({
                dianzan: --this.state.dianzan
            });
        }
    }
    pinlun(){
        this.props.history.push(
            {
                pathname: "/comment",
                state: {
                    id: this.props.history.location.state.id,
                    allcomment,
                    chang: this.state.long,
                    duan: this.state.short,
                }
            }
        )
    }
    shoucang(){
        this.state.fl=!this.state.fl
        this.setState({
            fl:this.state.fl
        });
        if(this.state.fl){
            console.log(11111);
            this.key=this.props.history.location.state.id;
            window.sessionStorage.setItem(this.key, JSON.stringify({
                id: this.key,
                title: this.state.arr.title,
                image:this.state.arr.image
            }));
        }else{
            sessionStorage.removeItem(this.key)
        }
        console.log(this.state.fl);
    }
}
export default Details

