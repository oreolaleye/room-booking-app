import React from 'react';
import GoogleMapReact from 'google-map-react';

function Map() {
    const mapProps = {
        center: {
            lat: 7.4547,
            lng: 3.9152
        },
        zoom: 11
    };

    return (
        <div style={{height: '500px', width: '100%'}}>
            <h2 className="center boldText" style={{fontSize: '25px', paddingBottom: '30px'}}>Locate Us</h2>
            <GoogleMapReact
            bootstrapURLKeys="AIzaSyDnDcQAGFsFLXtE2qrhxDC3s20gAkvhkBk"
                defaultCenter={mapProps.center}
                defaultZoom={mapProps.zoom}
            ></GoogleMapReact>
        </div>
    )
}

export default Map
