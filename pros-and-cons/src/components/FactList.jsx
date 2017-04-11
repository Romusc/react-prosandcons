import React from 'react';
import Fact from './Fact';
import FactForm from './FactForm';


export default class FactList extends React.Component {

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
      var fact = this.state.factData.find(x => x.id === factID);
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
      fact.rate = parseInt(fact.rate, 10);
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
        return (<Fact id={fact.id} key={fact.id} type={fact.type} text={fact.text} rate={fact.rate} onDelete={this._deleteFact.bind(this)} onSwitch={this._switchCon.bind(this)} />);
      })
    }
}
