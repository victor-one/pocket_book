import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation
} from "react-router-dom"

import { ConfigProvider } from "zarm";

import NavBar from "@/components/NavBar";

import routes from "@/router";

function App() {
  const location = useLocation(); // 拿到 Location 实例
  const { pathname } = location; // 获取当前路径
  const needNav = ['/', '/data', '/user'] // 需要底部导航栏的路径
  const [showNav, setShowNav] = useState(false) // 是否展示 Nav
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname]) // [] 内的参数若变化，便会执行上述回调函数

  return (
      <ConfigProvider primaryColor={'#007fff'}>
        <>
          <Switch>
            {
              routes.map(route => <Route exact key={route.path} path={route.path}>
                <route.component />
              </Route>)
            }
          </Switch>
          <NavBar showNav={showNav} />      
        </>
      </ConfigProvider>
  )
}

export default App
