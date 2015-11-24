import React from 'react';
let update;
let api;
let city;

const Flickr = React.createClass({
  getInitialState() {
    update = 0;
    api = this.props.api;
    city = this.props.city;
    city = city.replace(' ', '+');
    return {photo: ''};
  },
  componentDidMount() {
    let component = this;
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.search&page=1&per_page=50&api_key=' + api +
    '&text='+ city +'+scenic&extras=&format=json&nojsoncallback=1&extras=description,license,date_upload,date_taken,owner_name,icon_server,original_format,last_update,geo,tags,machine_tags,o_dims,views,media,path_alias,url_t,url_s,url_q,url_m,url_n,url_z,url_c,url_l', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText);
        let pickPhoto = Math.floor((Math.random() * 50) + 1);
        let photo = data.photos.photo[pickPhoto].url_l;
        component.setState({photo: photo});
      }
    };
    request.send();
  },
  render() {
    const {hourUpdate, children} = this.props;
    let divStyle = {
      backgroundImage: 'url(' + this.state.photo + ')'
    };


    // run update
    if(hourUpdate > update){
      update = hourUpdate;
      this.componentDidMount();
    }

    return (
      <div className='flickr' style={divStyle}>
          {children}
      </div>
    );
  }
});

module.exports = Flickr;