import React from 'react';

const Menu = React.createClass({
  displayName: 'Menu',
  getInitialState() {
    return { settingsClass: 'hide settings', settingsOpen: false, city: this.props.city, degrees: this.props.degrees };
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
  },
  saveSettings(event) {
    // prevent form from submitting
    event.preventDefault();

    // hide settings
    this.hideSettings();
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
            </fieldset>
            <fieldset>
              <legend>Weather Settings</legend>
              <label htmlFor='celcius'>Celcius</label>
              <input type='radio' id='celcius' name='degrees' value='C' checked={ this.state.degrees === 'C' }
               onChange={ component.onChanged.bind(this, 'degrees') } />
              <label htmlFor='fahrenheit'>Fahrenheit</label>
              <input type='radio' id='fahrenheit' name='degrees' value='F' checked={ this.state.degrees === 'F' }
               onChange={ component.onChanged.bind(this, 'degrees') } />
            </fieldset>
            <div className='buttons'>
              <a href='#' className='cancel' onClick={ component.hideSettings }>Cancel</a>
              <button className='save'>Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Menu;