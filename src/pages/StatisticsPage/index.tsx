import React from "react"
import { Switch, Route, Link, useRouteMatch } from "react-router-dom"

import Statistics from "./Statistics"
import Report from "./Report"
import Heatmap from "./Heatmap"
import { Background } from "../../styles"
import { NavBar } from "./styles"

const StatisticsPage: React.FC = () => {
  const { path, url } = useRouteMatch()

  return (
    <Background>
      <NavBar>
        <Link to={url}>Estatísticas</Link>
        <Link to={`${url}/report`}>Relatório</Link>
        <Link to={`${url}/heatmap`}>Heat Map</Link>
      </NavBar>

      <Switch>
        <Route exact path={path}>
          <Statistics />
        </Route>
        <Route path={`${path}/report`}>
          <Report />
        </Route>
        <Route path={`${path}/heatmap`}>
          <Heatmap />
        </Route>
      </Switch>
    </Background>
  )
}

export default StatisticsPage
