import React from 'react';
let update;
let api;
let city;
let flickrPhotos = [];
let removedPhotos = JSON.parse(localStorage.getItem('remove'));

if(removedPhotos === null){
  removedPhotos = [];
}

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
    request.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.search&page=1&per_page=150&api_key=' + api +
    '&text='+ city +'+scenic+city&extras=&format=json&content_type=1&accuracy=11&nojsoncallback=1&extras=description,license,date_upload,date_taken,owner_name,icon_server,original_format,last_update,geo,tags,machine_tags,o_dims,views,media,path_alias,url_t,url_s,url_q,url_m,url_n,url_z,url_c,url_l', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText);
        let photos = data.photos.photo;
        photos.map(function(photo){
          if(photo.url_l !== undefined && removedPhotos.indexOf(photo.url_n) < 0){
            flickrPhotos.push(photo.url_l);
          }
        });

        component.loadPhotos();
      }
    };
    request.send();

  },
  loadPhotos(){
    let pickPhoto = Math.floor((Math.random() * flickrPhotos.length));
    this.setState({photo: flickrPhotos[pickPhoto]});
  },
  render() {
    let component = this;
    const {hourUpdate, children} = this.props;
    let divStyle = {
      backgroundImage: 'url(' + this.state.photo + ')'
    };

    // set update to hourUpdate value
    if(update === 0 && hourUpdate !== undefined){
      update = hourUpdate;
    }

    // run update
    if(hourUpdate > update){
      update = hourUpdate;
      this.loadPhotos();
    }

    return (
      <div className='flickr' style={divStyle}>
          {children}
          <button className='change' onClick={component.loadPhotos}></button>
      </div>
    );
  }
});

module.exports = Flickr;