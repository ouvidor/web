import styled from "styled-components"

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 8px;
  padding: 8px 16px;
  margin-bottom: 20px;

  a {
    padding: 0 10px;
    color: #000;
    font-size: 18px;
  }

  a:visited {
    color: #000;
  }
`

const StyledForm = styled.form`
  > div {
    display: flex;

    > div {
      margin-right: 25px;

      label {
        display: block;
        margin-bottom: 4px;
        font-size: 16px;
      }

      input {
        border: 2px solid #ddd;
        border-radius: 4px;
        padding: 4px 8px;
        margin-bottom: 8px;
      }
    }
  }

  button {
    padding: 8px 16px;
    border: 2px solid #0b76da;
    border-radius: 4px;
    background: #0b76da;
    color: #fff;
    font-size: 18px;
    margin-bottom: 5px;
  }

  button + button {
    margin-left: 20px;
  }
`

const Container = styled.article`
  padding: 10px 20px;
  background: #fff;
  border-radius: 8px;
  border: 2px solid #fff;
  transition: border 0.3s;

  &:hover {
    border: 2px solid #ddd;
  }

  h1 {
    font-size: 36px;
    font-weight: 800;
    margin: 0 0 10px 0;
    padding: 0;
  }
`

export const ReportContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  transition: all 0.3s;
`

export const ReportForm = styled(StyledForm)``

export const ReportTable = styled.table`
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  min-width: 400px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;

  thead tr {
    background: #0b76da;
    color: #fff;
    text-align: left;
    font-weight: bold;
  }

  th,
  td {
    padding: 12px 15px;
  }

  tbody tr {
    border-bottom: 1px solid #ddd;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f2f2f2;
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid #0b76da;
  }
`

/**
 * HEATMAP
 */
export const HeatmapContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex: 1;
  transition: all 0.3s;
`

export const HeatmapForm = styled(StyledForm)``

export const MapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100;
  height: 500px;
  position: relative;
  font-weight: bold;
  font-size: 24px;
  color: #fff;
`

/**
 * STATISTICS
 */
export const StatisticsContainer = styled(Container)``

export const GraphContainer = styled.div`
  width: 700px;
  height: 500px;
  background: #eee;
`

export const StatisticForm = styled(StyledForm)``
