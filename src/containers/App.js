import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../Components/Persons/Persons';
import Cockpit from '../Components/Cockpit/Cockpit';
import withClass from '../Components/hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context.js'

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 'slkfj', name: 'Max', age: 28 },
      { id: 'oisj', name: 'Manu', age: 29 },
      { id: 'lkjsw', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props,state) {
    console.log('[App.js] getDerivedStateFromProps');
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }
  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate')
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }


  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })
    // below this is a way to declare it in an immutable fashion.
    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex])
    //This is an alternate way to declare the const person in an immutable fashion.

    person.name = event.target.value;

    const persons = [...this.state.persons];

    persons[personIndex] = person;


    this.setState((prevState, props) => {
      return{

        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    } );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});

  }

  loginHandler= () => {
    this.setState({authenticated:true});
  };

  render () {
    console.log('[App.js] render')

    let persons = null;

    if(this.state.showPersons) {
      persons = <Persons
      persons = {this.state.persons}
      clicked = {this.deletePersonHandler}
      changed = {this.nameChangedHandler}
      isAuthenticated = {this.state.authenticated}/>;
    }

    return (
      <Aux>
      <button onClick = {()=> {this.setState({showCockpit: false});
    }}
    > Remove Cockpit
    </button>
    <AuthContext.Provider value = {{
      authenticated: this.state.authenticated,
      login: this.loginHandler
    }}>
    {this.state.showCockpit? (<Cockpit
      title = {this.props.appTitle}
      showPersons= {this.state.showPersons}
      personsLength = {this.state.persons.length}
      clicked = {this.togglePersonsHandler}
      />) : null}
      {persons}
      </AuthContext.Provider>
      </ Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
