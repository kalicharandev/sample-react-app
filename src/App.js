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
      <div className='mainContainer'>
        <img src={profile.avatar_url}/>    
        <div >{profile.login}</div>
        <div >{profile.bio}</div>
        <div >{`Public Repository:${profile.public_repos}`}</div>
        <div >{`Followers: ${profile.followers}`}</div>
        <div >{`Following: ${profile.following}`}</div>
 

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
          <div className="formContainer">
          <input type= 'text' 
          value={this.state.userName} 
          onChange={event => this.setState({userName: event.target.value})}
          placeholder='Enter a GitHub Username' 
          required/>
          <button className="btncls">GetData</button>
          </div>
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
        <p>{this.props.title}</p>
        <Form submit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>
    </div>
  );
  }
}

export default App;
