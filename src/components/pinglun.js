import  React from'react'
import '../assets/reset.css'
import '../assets/pinglun.css'
import axios from 'axios'
import '../font_88hefa6fwcj/iconfont.css'
import 'antd-mobile/lib/date-picker/style/css'
import 'antd-mobile/dist/antd-mobile.css';
import sofa from '../assets/sofa.png'
import moment from 'moment'

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: true,
            flag1: [],
            flag2: [],
        }
    }

    render() {
        return (
            <div style={{'background':'white'}}>
                <div className="top_one">
                    <span className="iconfont icon-fanhuijiantou" onClick={this.back.bind(this)}></span>
                    <h1>{this.props.history.location.state.allcomment}<span>条点评</span></h1>
                    <span className="iconfont  icon-comment-copy"></span>
                </div>
                <div className="longcomment">
                    <p className="longcomment_top">{this.props.history.location.state.chang.length}<span>条长评</span></p>
                    <ul className="longcomment_two">
                        { this.props.history.location.state.chang.map((val, ind) => {
                            return <li key={ind} className="longallcomment">
                                <img className="head_photo" src={val.avatar} alt=""/>
                                <div className="two_content">
                                    <div>
                                        <p className="screen_name">{val.author}</p>
                                        <span className="iconfont icon-zan1"> {val.likes}</span>
                                    </div>
                                    <div className="comment_content">
                                        {val.content}
                                    </div>
                                    <div style={!val.reply_to ? {height: "0"} : {height: ""}}>{val.reply_to?
                                        <div>
                                            <p className="dontknow">//{val.reply_to.author}：
                                                <span>
                                            {val.reply_to.content}
                                        </span>
                                            </p>
                                        </div> : ""}
                                    </div>
                                    <div className="comment_time">
                                        <p>{moment(val.time).format('MM-DD HH:mm')}</p>
                                    </div>
                                </div>
                            </li>
                        })}
                    </ul>
                    <div className="watting" style={this.props.history.location.state.chang.length == 0 ? {display: ""} : {display: "none"}}>
                        <img src={sofa} className="sofa"/>
                    </div>
                    <div className="pin-main">
                        <p>
                            {this.props.history.location.state.duan.length} 条短评
                        </p>
                        <span className={this.state.flag ? "iconfont icon-zhankai1" : "iconfont icon-zhankai"} onClick={this.upflod.bind(this)}></span>
                    </div>
                    <ul className="longcomment_two" style={!this.state.flag ? {} : {display: "none"}}>
                        { this.props.history.location.state.duan.map((val, ind) => {
                            return <li key={ind} className="longallcomment">
                                <img className="head_photo" src={val.avatar} alt=""/>
                                <div className="two_content">
                                    <div>
                                        <p className="screen_name">{val.author}</p>
                                        <span className="iconfont icon-zan1"> {val.likes}</span>
                                    </div>
                                    <div className="comment_content">
                                        {val.content}
                                    </div>
                                    <div style={!val.reply_to ? {height: "0"} : {height: ""}}>{val.reply_to?
                                        <div className="dontknow">
                                            <p>//{val.reply_to.author}：
                                                <span>
                                            {val.reply_to.content}
                                        </span>
                                            </p>
                                        </div> : ""}
                                    </div>
                                    <div className="comment_time">
                                        <p>{moment(val.time).format('MM-DD HH:mm')}</p>
                                    </div>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )

    }

    componentDidMount() {
        // console.log(this.props.history);
    }

    back() {
        this.props.history.go(-1)
    }
    upflod(e){
        // console.log(e.target.offsetTop);
        var T=e.target.offsetTop;
        // console.log(e.target.offsetHeight);
        var H=e.target.offsetHeight;
        if(this.state.flag){
            // console.log(document.documentElement.scrollTop);
            setTimeout(()=>{
                document.documentElement.scrollTop =(T-H)-18
            },0);
        }else{
            document.documentElement.scrollTop = 0;
        }
        this.setState({
            flag: !this.state.flag
        })
    }
}
export default Comments ;