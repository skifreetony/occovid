import React, { useState, useContext } from 'react'
import TimeContext from 'components/TimeContext'
import color from 'globalVars/Colors'
import Timeselect from 'components/Timeselect'
import {
  FetchDeaths,
  lastTotalDeaths,
  lastDailyReportedDeath,
  lastSNFDeath,
  lastALFDeath,
  lastHomelessDeath,
  lastJailDeath
} from 'components/Datafetch/FetchDeaths'
import Chart from 'components/Chart'
import Widget from 'components/Widget'

const Deaths = props => {
  const { time, setTime } = useContext(TimeContext)
  const [array, updateArray] = useState([])

  return (
    <div>
      <FetchDeaths function={ updateArray } time={ time } />
      <div className='page'>
        <h1 className='pageTitle'>{ props.title }</h1>
        <div className='widgetGrid'>
          <Widget
            title={ 'Total Deaths' }
            stat={ lastTotalDeaths }
            color={ color.red }
          />
          <Widget
            title={ 'Daily Reported' }
            stat={ lastDailyReportedDeath }
            color={ color.red }
          />
          <Widget title={ 'SNF' } stat={ lastSNFDeath } color={ color.yellow } />
          <Widget title={ 'ALF' } stat={ lastALFDeath } color={ color.orange } />
          <Widget title={ 'Homeless' } stat={ lastHomelessDeath } color={ color.purple } />
          <Widget title={ 'Jail' } stat={ lastJailDeath } color={ color.orange } />
        </div>
        <Timeselect />
        <div id='chartGrid'>
          <Chart
            key='2'
            id='death2'
            date={ array.map(a => a.date) }
            data={ [array.map(b => b.total_dth)] }
            fill={ [color.red, color.blue] }
            title={ 'Total Deaths by Reported' }
            label={ ['Deaths'] }
            switches={ ['bar', 'line'] }
          />
          <Chart
            key='1'
            id='death1'
            date={ array.map(a => a.date) }
            data={ [array.map(b => b.total_dth_date)] }
            fill={ [color.red] }
            title={ 'Total Deaths by Death Date' }
            label={ ['Deaths'] }
            switches={ ['bar', 'line'] }
          />
          <Chart
            key='3'
            id='death3'
            date={ array.map(a => a.date) }
            data={ [array.map(b => b.daily_death)] }
            fill={ [color.red] }
            title={ 'Daily Deaths' }
            label={ ['Deaths'] }
            switches={ ['bar', 'line'] }
          />
          <Chart
            key='4'
            id='death4'
            date={ array.map(a => a.date) }
            data={ [array.map(b => b.snf)] }
            fill={ [color.yellow] }
            title={ 'SNF Deaths' }
            label={ ['Deaths'] }
            switches={ ['bar', 'line'] }
          />
          <Chart
            key='5'
            id='death5'
            date={ array.map(a => a.date) }
            data={ [array.map(b => b.alf_dth)] }
            fill={ [color.orange] }
            title={ 'Alf Deaths' }
            label={ ['Deaths'] }
            switches={ ['bar', 'line'] }
          />
          <Chart
            key='6'
            id='death6'
            date={ array.map(a => a.date) }
            data={ [array.map(b => b.homeless)] }
            fill={ [color.purple] }
            title={ 'Homeless Deaths' }
            label={ ['Deaths'] }
            switches={ ['bar', 'line'] }
          />
        </div>
      </div>
    </div>
  )
}

export default Deaths
