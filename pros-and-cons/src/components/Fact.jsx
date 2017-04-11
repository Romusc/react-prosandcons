import React from 'react';

export default class Fact extends React.Component {

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
