import './App.css';
import React from 'react'
import Examples from './components/Examples'
import PayoffChart from './components/PayoffChart'
import Strategy from './components/Strategy.js'
import UnderlyingStock from './components/UnderlyingStock.js'


export const Context = React.createContext({
  options: [],
})

const options = []

class App extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      options,
    }
  }
  
  setOptions = (data) => {
    this.setState({
      options: data,
    })
  }

  render() {
    return (
      <Context.Provider value={{
        options: this.state.options,
        setOptions: this.setOptions,
      }}>
        <div className="App">
          <div className="Container">
            <div className="left">
              <Examples />
              <UnderlyingStock />
            </div>
            <div className="right">
              <Strategy/>
              <PayoffChart />
            </div>
          </div>
        </div>
      </Context.Provider>
    )
  }

}

export default App;
