import React from 'react';

export default class FactForm extends React.Component {
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
