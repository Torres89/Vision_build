import React, { useState } from 'react';
import './styles.css';

const ConfigurationSystem = () => {
  const [config, setConfig] = useState({
    jdbcConnection: '//sql.express:port',
    unclassifiedTaskPath: 'Product Manager',
    outlinersPerformancePath: 'Product Manager'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving configuration:', config);
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
        <h2>System</h2>
        
        <div className="form-group">
          <label>JDBC Connection</label>
          <input
            type="text"
            name="jdbcConnection"
            value={config.jdbcConnection}
            onChange={handleInputChange}
            placeholder="//sql.express:port"
          />
        </div>

        <div className="form-group">
          <label>Path to unclassified task</label>
          <input
            type="text"
            name="unclassifiedTaskPath"
            value={config.unclassifiedTaskPath}
            onChange={handleInputChange}
            placeholder="Product Manager"
          />
        </div>

        <div className="form-group">
          <label>Path to outliners perfomance videos</label>
          <input
            type="text"
            name="outlinersPerformancePath"
            value={config.outlinersPerformancePath}
            onChange={handleInputChange}
            placeholder="Product Manager"
          />
        </div>

        <div className="button-group">
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationSystem; 