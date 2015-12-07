import React from 'react';
import updateStorage from './update-storage';
import states from '../states.json';

const Menu = React.createClass({
  displayName: 'Menu',
  getInitialState() {
    return { settingsClass: 'hide settings', settingsOpen: false, city: this.props.city, degrees: this.props.degrees,
     state: this.props.state, stock: this.props.stock };
  },
  componentDidMount() {
  },
  showOpenClose() {
    if(this.state.settingsOpen === true) {
      this.hideSettings();
    }else {
      this.showSettings();
    }
  },
  showSettings() {
    this.setState({ settingsClass: 'settings', settingsOpen: true });
  },
  hideSettings() {
    this.setState({ settingsClass: 'hide settings', settingsOpen: false });
  },
  onChanged(name, event) {
    const change = {};
    change[name] = event.target.value;
    this.setState(change);
    console.log(change);
  },
  saveSettings(event) {
    // prevent form from submitting
    event.preventDefault();

    const updateSettings = {
      'city': this.state.city,
      'state': this.state.state,
      'degrees': this.state.degrees,
      'stock': this.state.stock
    };

    // save updated settings to local storage
    updateStorage(updateSettings);

    // hide settings
    this.hideSettings();

    // reload the page to update settings
    location.reload();
  },
  render() {
    const component = this;
    return (
      <div>
        <button className='menu-button' onClick={ component.showOpenClose }></button>
        <div className={ this.state.settingsClass }>
          <form onSubmit={ component.saveSettings }>
            <fieldset>
              <legend>Settings</legend>
              <label htmlFor='city'>City:</label>
              <input type='text' id='city' defaultValue={ this.state.city }
               onChange={ component.onChanged.bind(this, 'city') } />
               <div className='split'>
                 <label htmlFor='state'>State:</label>
                 <select name='state' id='state' defaultValue={ this.state.state }
                  onChange={ component.onChanged.bind(this, 'state') }>
                   {states.map(function(item, i) {
                      return <option key={ i } value={ item.value }>{ item.state }</option>;
                    })}
                 </select>
                </div>
            </fieldset>
            <fieldset>
              <legend>Weather Settings</legend>
              <label htmlFor='celcius'>Celcius
              <input type='radio' id='celcius' name='degrees' value='C' checked={ this.state.degrees === 'C' }
                onChange={ component.onChanged.bind(this, 'degrees') } /></label>
              <label htmlFor='fahrenheit'>Fahrenheit
              <input type='radio' id='fahrenheit' name='degrees' value='F' checked={ this.state.degrees === 'F' }
                onChange={ component.onChanged.bind(this, 'degrees') } /></label>
            </fieldset>
            <fieldset>
              <legend>Stock Settings</legend>
              <label htmlFor='stock-symbol'>Stock Symbol:</label>
              <input type='text' id='stock-symbol' defaultValue={ this.state.stock }
               onChange={ component.onChanged.bind(this, 'stock') } />
            </fieldset>
            <div className='buttons'>
              <a href='#' className='cancel' onClick={ component.hideSettings }>Cancel</a>
              <button className='save'>Save</button>
            </div>
          </form>
          <div className='issues'>
            <a href='https://github.com/ryanburgess/dashboard/issues' target='_blank'>Submit issues</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Menu;