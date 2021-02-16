import React, { useState, useContext } from 'react'
import TimeContext from 'components/TimeContext'
import moment from 'moment'

function setStorage (value) {
  localStorage.setItem('timeSetting', value)
}

const Timeselect = props => {
  const { time, setTime } = useContext(TimeContext)

  const [valueForNoneOption, updateNoneValue] = useState(time)

  function updateAllTime (x) {
    setStorage(x)
    setTime(x)
    updateNoneValue(x)
  }

  function monthSwitch (e) {
    console.log(e.target)
    let value = e.target.value
    updateAllTime(value)
  }

  function dynamicSelectRender () {
    let startFrom = new Date('03/01/2020')
    let today = new Date(moment().format('L'))

    //Figure out # of months in between
    var diff = (today.getTime() - startFrom.getTime()) / 1000
    diff /= 60 * 60 * 24 * 7 * 4
    let monthDifference = Math.abs(Math.round(diff))

    //Create Array of Month Strings
    let theMonthArray = [{ display: 'Mar 2020', value: '03/01/2020' }]
    for (let i = 0; i < monthDifference - 2; i++) {
      let theMonth = startFrom.setMonth(startFrom.getMonth() + 1)
      let value = moment(new Date(theMonth)).format('L')
      let monthDisplay = moment(new Date(value))
        .format('MMMM')
        .slice(0, 3)
      let yearDisplay = moment(new Date(value)).format('YYYY')

      let display = monthDisplay + ' ' + yearDisplay
      theMonthArray.push({
        display: display,
        value: value
      })
    }

    //Sort to Recent First
    theMonthArray.sort((a, b) =>
      new Date(a.display) > new Date(b.display) ? -1 : 1
    )

    //Create React partials for Each Month
    let optionJSX = [
      <option key={0} value={valueForNoneOption}>
        No Month Isolated
      </option>
    ]
    //Parse the current save date into a string
    for (let i = 0; i < theMonthArray.length; i++) {
      optionJSX.push(
        <option key={i + 1} value={new Date(theMonthArray[i].value)}>
          {theMonthArray[i].display}
        </option>
      )
    }

    return (
      <select onChange={monthSwitch} defaultValue={time}>
        {optionJSX}
      </select>
    )
  }

  return (
    <div>
      <div className='timeFilterTitle'>Isolate Time Periods</div>
      <div className='timeParent'>
        <div className='timeButtonContainer'>
          <a
            className={time == 'All Time' ? 'active' : null}
            onClick={() => updateAllTime('All Time')}
          >
            All Time
          </a>
          <a
            className={time == 14 ? 'active' : null}
            onClick={() => updateAllTime(14)}
          >
            Last 14 Days
          </a>
          <a
            className={time == 30 ? 'active' : null}
            onClick={() => updateAllTime(30)}
          >
            Last 30 Days
          </a>
          <a
            className={time == 60 ? 'active' : null}
            onClick={() => updateAllTime(60)}
          >
            Last 60 Days
          </a>
          <a
            className={time == 90 ? 'active' : null}
            onClick={() => updateAllTime(90)}
          >
            Last 90 Days
          </a>
          <a
            className={time == 120 ? 'active' : null}
            onClick={() => updateAllTime(120)}
          >
            Last 120 Days
          </a>
        </div>
        {dynamicSelectRender()}
      </div>
    </div>
  )
}

export default Timeselect
