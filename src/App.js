import './App.css';
import React from 'react'
import Examples from './components/Examples'
import PayoffChart from './components/PayoffChart'
import Strategy from './components/Strategy.js'
import UnderlyingStock from './components/UnderlyingStock.js'
import { fetchUnderlyingStock, fetchOptionsInfo } from './fetch.js'

export const Context = React.createContext({
  options: [],
  stock: {},
  call: {},
  put: {}
})

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  async componentDidMount() {
    let stock = await fetchUnderlyingStock('sh510050')
    this.setStock(stock)

    let call = await fetchOptionsInfo('510050', 'call', '2106')
    this.setCall(call)
    
    let put = await fetchOptionsInfo('510050', 'put', '2106')
    this.setPut(put)


  }
  
  setOptions = (data) => {
    this.setState({
      options: data,
    })
  }

  setStock = (data) => {
    this.setState({
      stock: data,
    })
  }

  setCall = (data) => {
    this.setState({
      call: data,
    })
  }
  
  setPut = (data) => {
    this.setState({
      put: data,
    })
  }

  render() {
    return (
      <Context.Provider value={{
        options: this.state.options || [],
        stock: this.state.stock || null,
        call: this.state.call || null,
        put: this.state.put || null,
        setOptions: this.setOptions,
      }}>
        <div className="App">
          <div className="layout">
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
