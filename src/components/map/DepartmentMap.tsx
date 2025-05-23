import React, { useState } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Mock data for demonstration - in real app would come from an API
const mockDepartmentData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "code": "75",
        "nom": "Paris",
        "amount": 10000
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[2.22, 48.82], [2.22, 48.9], [2.42, 48.9], [2.42, 48.82], [2.22, 48.82]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "code": "69",
        "nom": "Rhône",
        "amount": 8500
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[4.7, 45.7], [4.7, 45.9], [4.9, 45.9], [4.9, 45.7], [4.7, 45.7]]]
      }
    }
  ]
};

const DepartmentMap: React.FC = () => {
  const [hoveredDepartment, setHoveredDepartment] = useState<{
    code: string;
    nom: string;
    amount: number;
  } | null>(null);

  const [viewState, setViewState] = useState({
    latitude: 46.603354,
    longitude: 1.888334,
    zoom: 5
  });

  // Layer styling
  const departmentLayer = {
    id: 'department-fill',
    type: 'fill' as const,
    paint: {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'amount'],
        5000, '#c6e2ff',
        7500, '#76baf9',
        10000, '#1F4567'
      ],
      'fill-opacity': 0.7
    }
  };

  const departmentOutline = {
    id: 'department-outline',
    type: 'line' as const,
    paint: {
      'line-color': '#fff',
      'line-width': 1
    }
  };

  const onHover = (event: any) => {
    if (!event.features) return;
    
    const hoveredFeature = event.features[0];
    
    if (hoveredFeature) {
      setHoveredDepartment({
        code: hoveredFeature.properties.code,
        nom: hoveredFeature.properties.nom,
        amount: hoveredFeature.properties.amount
      });
    } else {
      setHoveredDepartment(null);
    }
  };

  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle={{
          version: 8,
          sources: {
            'osm': {
              type: 'raster',
              tiles: [
                'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
              ],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors'
            }
          },
          layers: [
            {
              id: 'osm-tiles',
              type: 'raster',
              source: 'osm',
              minzoom: 0,
              maxzoom: 19
            }
          ]
        }}
        interactiveLayerIds={['department-fill']}
        onMouseMove={onHover}
        attributionControl={false}
        mapLib={import('maplibre-gl')}
      >
        <Source type="geojson" data={mockDepartmentData}>
          <Layer {...departmentLayer} />
          <Layer {...departmentOutline} />
        </Source>
      </Map>
      
      {hoveredDepartment && (
        <div className="absolute top-4 left-4 bg-white p-3 rounded shadow z-10">
          <h4 className="font-bold text-primary">{hoveredDepartment.nom} ({hoveredDepartment.code})</h4>
          <p className="text-sm">Aide moyenne : <span className="font-semibold">{hoveredDepartment.amount}€</span></p>
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-white p-3 rounded shadow z-10">
        <h4 className="font-bold text-primary text-sm mb-2">Montant des aides CEE</h4>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-[#c6e2ff]"></div>
          <span className="text-xs">5000€ et moins</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-[#76baf9]"></div>
          <span className="text-xs">7500€ environ</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-[#1F4567]"></div>
          <span className="text-xs">10000€ et plus</span>
        </div>
      </div>
    </div>
  );
};

export default DepartmentMap;