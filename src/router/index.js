//引入组件
import Indexx from "../components/shouye";
import Details from '../components/xiangqing';
import Comments from '../components/pinglun';
import Collects  from '../components/shoucang';

//一般建议使用函数的方法 创建路由
const routes=[
    {
        path:'/index',
        component:Indexx
    },
    {
        path:'/details',
        component:Details
    },
    {
        path:'/collects',
        component:Collects
    },
    {
        path:'/comment',
        component:Comments
    },
      {
        path:'*',
        redirect:'/index'
    },
];
export  default routes