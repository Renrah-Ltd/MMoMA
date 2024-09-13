import { Link } from 'gatsby';
import React from 'react';

const Map = ({ centerX, centerZ, zoom = 348, markers = [] }) => {


    const markersMap = markers.map((marker, i) => {
        return (<Link to={`/plot/${marker.number}`} className="marker" data-plot={marker.number} style={{ "--x": marker.relative.x + "%", "--z": marker.relative.z + "%", }}></Link>)
    })

    return (
        <div className="map">
            <div className="overlay">
                {markersMap}
            </div>
            <iframe src={`http://homesteadcraft.mcserver.us:8123/#homesteadcraft:${centerX}:76:${centerZ}:${zoom}:0:0:0:1:flat`} />
        </div>
    );
};

export default Map;
