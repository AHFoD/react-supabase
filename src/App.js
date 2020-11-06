import logo from './logo.svg';
import './App.css';
import {createClient} from '@supabase/supabase-js'
import React from 'react'
import ReactDOM from 'react-dom'
require('dotenv').config()

const supabaseUrl = 'https://xxveprmaayelcdlnhkcj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTU5Njc2MzQzMSwiZXhwIjoxOTEyMzM5NDMxfQ.GGHQ1OfWT8qbmL3vqggmdXmFmkNLf0mcEU80HWfZXlM'
const supabase = createClient(supabaseUrl, supabaseKey)

class Timer extends React.Component {
 
    state = { 
      seconds: 0,
      users: {},
      new: {},
      name:{}
    };
  


  // tick() {
  //   this.setState(state => ({
  //     seconds: state.seconds + 1
  //   }));
  // }
  

  componentDidMount() {
    // this.interval = setInterval(() => this.tick(), 1000);
    this.fetchData()
    
  }

fetchData = async() => {
  let {body} = await supabase.from("users").select("*")
  this.users = body
  console.log(this.users);
    // console.log("inside supabase");
    // supabase.from("users").on("INSERT",payload => {
    //   this.state.users.push(payload.new);
    // })
    // .subscribe()  
  }

  saveData = () => {
    console.log("Try to save");
    console.log(this.state.highlow);
    
    
      this.setState(function(prevState,props){
        return {
          users: {
            name:this.state.highlow
          }   
        }
      }, () => {
        this.updateData()
      })
     
  }

  updateData = async() => {
    await supabase.from("users").insert([this.state.users])
  }

  deleteData = async() => {
    console.log("delete data");
    await supabase.from("users").delete().eq('name', 'i am ali')
  }

  handleChange = (e) => {
    console.log("hello");
    console.log(this.state.highlow);

    this.setState(
      {
        
          [e.target.name]: e.target.value,
  
      }
    );
  };

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  render() {
    return (
      <>
      <div>
        Seconds: {this.state.seconds}
        <h1>Name</h1>
        <input type="text" value={this.state.highlow} name="highlow" onChange={this.handleChange}></input>
        <button onClick={this.saveData}>Submit</button>
        <button onClick={this.fetchData}>Try to check data</button>
        <button onClick={this.deleteData}>Delete daata</button>
        <h1>{this.state.highlow}</h1>
      </div>
      </>
    );
  }

}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Timer;
