import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class FactList extends React.Component {

    constructor() {
      super();
      this.state = {
        showFacts: false,
        factData: [{id: "1", type: "CON", text: "It rains more", rate: -2},
                  {id: "2", type: "PRO", text: "Cotton is softer", rate: 3},
                  {id: "3", type: "PRO", text: "Grass is greener", rate: 6},
                  {id: "4", type: "PRO", text: "Blue is bluer", rate: 6}]
      };
    }

    render() {
      let score = this._getScore();
      var advice = '';
      var adviceColor = '';
      score >= 0 ? advice = "you should go ahead with this decision" : advice = "you should not go ahead with this decision";
      score >= 0 ? adviceColor = "green" : adviceColor = "red";
      const facts = this._getFacts();
      var factButton = "Show facts";
      let factNodes;
      if (this.state.showFacts) {
        factNodes = facts;
        factButton = "Hide facts";
      }
      return(
          <div className="row">
            <div className="col-md-10">
              <h1 className="decision-title">{this.props.name}</h1>
            </div>
            <div className="col-md-2">
              <div className="btn btn-default facts-button text-right" onClick={this._handleShowFacts.bind(this)}>{factButton}</div>
            </div>
            <div className="col-md-12 result">
              <h2 style={{color: adviceColor}}>Your total score is {score} therefore {advice} </h2>
            </div>
            <div className="col-md-12 fact-form">
              <FactForm addFact={this._addFact.bind(this)}/>
            </div>
            {factNodes}
          </div>
      )
    }

    _switchCon(factID) {
      var fact = this.state.factData.find(x => x.id == factID);
      if (fact.type === 'PRO') {
        fact.type = 'CON';
      } else {
        fact.type = 'PRO';
      }
      fact.rate *= -1;
      this.setState({ selected: { type: fact.type, rate: fact.rate}});
    }

    _handleShowFacts() {
      this.setState({
        showFacts: !this.state.showFacts
      });
    }

    _addFact(type, text, rate) {
      const fact = {
        id: this.state.factData.length + 1,
        type,
        text,
        rate
      };
      if (fact.type === "CON") {
        fact.rate *= -1;
      }
      fact.rate = parseInt(fact.rate)
      this.setState({factData: this.state.factData.concat([fact])})
    }

    _deleteFact(factID) {
      if (!factID) {
        return;
      }
      const facts = this.state.factData.filter(fact => fact.id !== factID);
      this.setState({factData: facts});
    }

    _getScore() {
      var scores = this.state.factData.map(function(fact) {
        return fact.rate
      })
      var totalScore = scores.reduce(function(prev, cur) {
        return prev + cur;
      });
      return totalScore;
    }

    _getFacts() {
      return this.state.factData.map((fact) => {
        return (<Fact id={fact.id} key={fact.id} type={fact.type} text={fact.text} rate={fact.rate} onDelete={this._deleteFact.bind(this)} onSwitch=                    {this._switchCon.bind(this)} />);
      })
    }
}

class Fact extends React.Component {
  constructor() {
    super()
  }

  render() {
    var decisionColor = '';
    this.props.type === "CON" ? decisionColor = "red" : decisionColor = "green";
    return(
        <div className="col-md-12 fact">
          <h4 className="fact-number">Fact {this.props.id}</h4>
          <div className="row" style={{color: decisionColor}}>
            <div className="col-md-2 fact-type" onClick={this._handleClick.bind(this)}><h2>{this.props.type}</h2></div>
            <div className="col-md-8 fact-text"><h2>{this.props.text}</h2></div>
            <div className="col-md-1 fact-delete"><div className="btn btn-primary" onClick={this._handleDelete.bind(this)}>Delete</div></div>
            <div className="col-md-1 fact-rate"><h2>{this.props.rate}</h2></div>
          </div>
        </div>
    )
  }

  _handleClick(e) {
    e.preventDefault();
    this.props.onSwitch(this.props.id);
  }

  _handleDelete(e) {
    e.preventDefault();
    this.props.onDelete(this.props.id);
  }
}

class FactForm extends React.Component {
  render() {
    return(<form className="form-inline" onSubmit={this._handleSubmit.bind(this)}>
      <div className="form-group">
        <select className="mb-2 mr-sm-2 form-control" placeholder="Type" ref={(input) => this._type = input}>
            <option>CON</option>
            <option>PRO</option>
        </select>
        <input className="mb-2 mr-sm-2" placeholder="Text" ref={(input) => this._text = input}/>
        <input className="mb-2 mr-sm-2" placeholder="Rate" ref={(input) => this._rate = input}/>
        <button className="btn btn-default mb-2 mr-sm-2" type="submit">Add</button>
      </div>
    </form>)
  }

  _handleSubmit(event) {
    event.preventDefault();
    let type = this._type;
    let text = this._text;
    let rate = this._rate;

    this.props.addFact(type.value, text.value, rate.value)
  }
}



ReactDOM.render(< FactList name="Should I switch house with my neighbour?" />, document.getElementById('main-container'))



















