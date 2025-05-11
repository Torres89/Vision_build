import React, { useState } from 'react';
import './styles.css';

const ConfigurationStation = () => {
  const [config, setConfig] = useState({
    plant: '//sql.express:port',
    shop: 'Product Manager',
    line: 'Product Manager',
    station: 'Product Manager',
    workLocation: 'Product Manager'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditTable = () => {
    // Here you would typically open a modal or navigate to table editor
    console.log('Opening standard scrap reason table editor');
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving station configuration:', config);
  };

  const handleCancel = () => {
    // Reset form or navigate back
    console.log('Operation cancelled');
  };

  return (
    <div className="configuration-container">
      <div className="configuration-header">
        <h1>Configuration System</h1>
        <div className="user-profile">
          <img src="/path-to-user-avatar.jpg" alt="User 1" />
          <span>User 1</span>
        </div>
      </div>

      <div className="configuration-content">
        <h2>Station</h2>
        
        <div className="form-group">
          <label>Plant</label>
          <input
            type="text"
            name="plant"
            value={config.plant}
            onChange={handleInputChange}
            placeholder="//sql.express:port"
          />
        </div>

        <div className="form-group">
          <label>Shop</label>
          <input
            type="text"
            name="shop"
            value={config.shop}
            onChange={handleInputChange}
            placeholder="Product Manager"
          />
        </div>

        <div className="form-group">
          <label>Line</label>
          <input
            type="text"
            name="line"
            value={config.line}
            onChange={handleInputChange}
            placeholder="Product Manager"
          />
        </div>

        <div className="form-group">
          <label>Station</label>
          <input
            type="text"
            name="station"
            value={config.station}
            onChange={handleInputChange}
            placeholder="Product Manager"
          />
        </div>

        <div className="form-group">
          <label>Work Location</label>
          <input
            type="text"
            name="workLocation"
            value={config.workLocation}
            onChange={handleInputChange}
            placeholder="Product Manager"
          />
        </div>

        <div className="form-group">
          <label>Standard Scrap Reason</label>
          <button className="edit-table-button" onClick={handleEditTable}>
            Edit Table
          </button>
        </div>

        <div className="button-group">
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationStation; 