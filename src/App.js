import './App.css';
import axios from 'axios';
import React from 'react';


const CardList =(props)=>(
  <div>
   { props.profiles.map(profile =><Card key ={profile.id}{...profile}/>) }
  </div>
);
class Card extends React.Component{
  render()

  {
    const profile = this.props;
    return (
      <div className='App'>
        <img src={profile.avatar_url}/>    
        <div className='info'>{profile.login}</div>
        <div className='bio'>{profile.bio}</div>
        </div>
    );
    }
  }
  class Form extends React.Component{
    state = {userName: ''};
   handleSubmit = async(event) =>{
      event.preventDefault();
      const response = await axios.get(`https://api.github.com/users/${this.state.userName}`);
      this.props.submit(response.data);
      this.setState({userName : ''});
    }
    render()
  
    {
      return(
        <form onSubmit={this.handleSubmit}>
          <input type= 'text' 
          value={this.state.userName} 
          onChange={event => this.setState({userName: event.target.value})}
          placeholder='Enter a GitHub Username' 
          required/>
          <button >getData</button>
        </form>
      );
    }
  }

class App extends React.Component{
  state = { profiles : []};
  addNewProfile = (profileData) => {
 this.setState(preState => ({
  profiles:[...preState.profiles, profileData] 
 }))
  };
render()
{
  return (
    <div className="App">
      <div className='container'>
        <p>{this.props.title}</p>
        <Form submit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>
      </div>
    </div>
  );
  }
}

export default App;
