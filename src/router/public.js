import React from 'react'
//引入路由核心文件
import {Route,Switch,Redirect} from 'react-router-dom'



const Router=(props)=>{
    return (
        <div>
            <Switch>
                {
                    props.routes.map((val,ind)=>{
                        if(val.path==='*'){
                            return <Redirect to={val.redirect}  key={ind}/>
                        }else{
                            return <Route path={val.path} component={val.component}  key={ind}/>
                        }
                    })
                }
            </Switch>
        </div>
    )
};
export default Router