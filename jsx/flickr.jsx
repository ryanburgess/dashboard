import React from 'react';
let update;
let api;
let city;
const flickrPhotos = [];
let removedPhotos = JSON.parse(localStorage.getItem('remove'));

if(removedPhotos === null) {
  removedPhotos = [];
}

const Flickr = React.createClass({
  displayName: 'Flickr',
  getInitialState() {
    update = 0;
    api = this.props.api;
    city = this.props.city;
    city = city.replace(' ', '+');
    return { photo: '' };
  },
  componentDidMount() {
    const component = this;
    const request = new XMLHttpRequest();
    request.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.search&page=1&per_page=150&api_key='
      + api + '&text=' + city + '+scenic+city&extras=&format=json&content_type=1&accuracy=11&nojsoncallback=1' +
      '&extras=description%2Clicense%2Cdate_upload%2Cdate_taken%2Cowner_name%2Cicon_server%2Coriginal_format' +
      '%2Clast_update%2Cgeo%2Ctags%2Cmachine_tags%2Co_dims%2Cviews%2Cmedia%2Cpath_alias%2Curl_t%2Curl_s' +
      '%2Curl_q%2Curl_m%2Curl_n%2Curl_z%2Curl_c%2Curl_l', true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText);
        const photos = data.photos.photo;
        photos.map(function(photo) {
          if(photo.url_l !== undefined && removedPhotos.indexOf(photo.url_n) < 0) {
            flickrPhotos.push(photo.url_l);
          }
        });

        component.loadPhotos();
      }
    };
    request.send();

  },
  loadPhotos() {
    const pickPhoto = Math.floor((Math.random() * flickrPhotos.length));
    this.setState({ photo: flickrPhotos[pickPhoto] });
  },
  render() {
    const component = this;
    const { hourUpdate, children } = this.props;
    console.log(this.state.photo);
    const divStyle = {
      backgroundImage: 'url(' + this.state.photo + ')'
    };

    // set update to hourUpdate value
    if(update === 0 && hourUpdate !== undefined) {
      update = hourUpdate;
    }

    // run update
    if(hourUpdate > update) {
      update = hourUpdate;
      this.loadPhotos();
    }

    return (
      <div className='flickr' style={ divStyle }>
          { children }
          <button className='change' onClick={ component.loadPhotos }></button>
      </div>
    );
  }
});

module.exports = Flickr;