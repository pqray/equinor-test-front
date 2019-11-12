import React from "react";
import GoogleMapReact from 'google-map-react';
import API from "./api";

const MarkComponent = ({ text }) => <div className="pinMark">{text}</div>;

class MyMap extends React.Component {
  constructor() {
    super()

    this.state = {
      pins: null
    }
  }

  static defaultProps = {
    center: {
      lat: 34.390723,
      lng: -120.121508
    },
    zoom: 11
  };

  async componentDidMount() {
    const pins = await API.get('/platforms');

    this.setState({ pins: pins.data })
  }

  render() {
    let pins = null
    console.log(this.state)
    if (this.state.pins) {
      pins = this.state.pins.map(pin => (
        <MarkComponent
          lat={pin.latdd83}
          lng={pin.londd83}
          text={pin.name}
        />
      )
      )
      return (
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBoZ4-ektU-i_4_hfNRUbYNVAnvQW20uIA' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            disableDefaultUI={true}
          >
            {pins}
          </GoogleMapReact>
        </div>)
    }
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC65JtnN74ec7DlQMwevTEgrkXCCn5gCvU' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </div>
    );
  }
}
export default MyMap;
