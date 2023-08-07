import { useState } from 'react';
import data from './search_and_rescue_data.json';
import './DisplayData.css'
function DisplayData({showPractices}) {
  const [selectedTerrain, setSelectedTerrain] = useState('');
  const terrainTypes = data.data.map((item) => item.terrainType);

  const handleTerrainChange = (event) => {
    setSelectedTerrain(event.target.value);
  };

  const selectedTerrainData = data.data.find(
    (item) => item.terrainType === selectedTerrain
  );

  return (
    <div className= {showPractices? 'right-sidebar-on' : 'right-sidebar'}>
      <label htmlFor="terrain"><p>Select Terrain Type:</p></label>
      <br />
      <select
        name="terrain"
        value={selectedTerrain}
        onChange={handleTerrainChange}
      >
        {terrainTypes.map((terrain, index) => (
          <option key={index} value={terrain}>
            {terrain}
          </option>
        ))}
      </select>

      {selectedTerrainData && (
        <div>
          <ul>
            {selectedTerrainData.bestPractices.map((practice, index) => (
              <li key={index}>
                <strong>{Object.keys(practice)[0]}</strong>
                {practice[Object.keys(practice)[0]]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DisplayData;
