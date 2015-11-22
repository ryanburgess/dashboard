import React from 'react';
let update;
let api;
let city;

const Flickr = React.createClass({
  getInitialState() {
    api = this.props.api;
    city = this.props.city;
    return {photo: ''};
  },
  componentDidMount() {
    update = this.props.hourUpdate;
    let component = this;
    let request = new XMLHttpRequest();
    let page = Math.floor((Math.random() * 1000) + 1);
    request.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.search&page='+ page +'&per_page=1&api_key=' + api +
    '&text='+ city +'%20scenic&extras=&format=json&nojsoncallback=1&extras=description,license,date_upload,date_taken,owner_name,icon_server,original_format,last_update,geo,tags,machine_tags,o_dims,views,media,path_alias,url_t,url_s,url_q,url_m,url_n,url_z,url_c,url_l', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText);
        let photo = data.photos.photo[0].url_l;
        component.setState({photo: photo});
      }
    };
    request.send();
  },
  render() {

    let divStyle = {
      backgroundImage: 'url(' + this.state.photo + ')'
    };

    // run update
    if(this.props.hourUpdate > update){
      update = this.props.hourUpdate;
      this.componentDidMount();
    }

    return (
      <div className='flickr' style={divStyle}>
          {this.props.children}
      </div>
    );
  }
});

module.exports = Flickr;