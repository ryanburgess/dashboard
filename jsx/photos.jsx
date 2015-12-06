import React from 'react';
import ReactDOM from 'react-dom';
import config from '../config.json';

const flickrPhotos = [];
let removedPhotos = JSON.parse(localStorage.getItem('remove'));
let city;
let api;

if(removedPhotos === null) {
  removedPhotos = [];
}

const Flickr = React.createClass({
  displayName: 'PhotoGallery',
  getInitialState() {
    city = config.settings.city;
    city = city.replace(' ', '+');
    api = config.api.flickr;
    return { photos: flickrPhotos };
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
          if(photo.url_n !== undefined && removedPhotos.indexOf(photo.url_n) < 0) {
            flickrPhotos.push(photo.url_n);
          }
        });

        component.setState({ photos: flickrPhotos });
      }
    };
    request.send();
  },
  handleClick(item) {
    removedPhotos.push(item);
    localStorage.setItem('remove', JSON.stringify(removedPhotos));
  },
  render() {
    const component = this;
    const photos = this.state.photos;
    return (
      <ul className='photos'>
        {photos.map(function(photo, i) {
          return <li key={i} onClick={component.handleClick.bind(this, photo)}><img src={photo} /></li>;
        })}
      </ul>
    );
  }
});

module.exports = Flickr;
ReactDOM.render(<Flickr />, target);