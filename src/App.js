import React, { useState } from 'react'

// Import Icon
import virus from './virus.svg'

// Import Covid Services
import { GetCountries, GetCovidInfo, GetCovidTimeline } from './services/CovidService';

// Import components
import { Header, Info, Timeline } from './components';

const App = () => {
  const [country, setCountry] = useState('')

  function onCountryChange(country) {
    setCountry(country)
  }

  return (
    <div className="App">
      <Header icon={virus} title="Covid-19 Tracker" onCountryChange={onCountryChange} fetchCountries={GetCountries} />
      <Info country={country} fetchInfo={GetCovidInfo} />
      <Timeline country={country} fetchTimeLine={GetCovidTimeline} />
    </div>
  )
}

export default App