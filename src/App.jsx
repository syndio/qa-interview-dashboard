import React from "react";
import Header from 'components/Header';
import TabMenu from 'components/TabMenu';
import DemographicStats from 'components/DemographicStats';

import './App.scss';

const URL_PATH = 'https://run.mocky.io/v3/';
const GROUPS_PATH_VAR = '9e343425-c47c-4c7f-a1ac-972c099be0ed';

/**
 * Top level stateful component that manages state for entire page and makes RESTful API requests
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    const urlParams = new URLSearchParams(window.location.search);
    
    this.state = {
      groups: [],
      demographicsData: {},
      activeGroup: urlParams.get('group') ? urlParams.get('group') : '',
      errorMsg: null
    };
  };

  componentDidMount() {
    this._getGroups();
  };

  /**
   * Get list of groups
   */
  _getGroups = async () => {
    try {
      const response = await fetch(URL_PATH + GROUPS_PATH_VAR);
      if (!response.ok) {
        this._handleError(); 
        return;
      }
  
      const groups = await response.json();
      
      if (Array.isArray(groups)) {
        const activeGroup =  this.state.activeGroup ? this.state.activeGroup : groups[0].id;
  
        this.setState({ groups, activeGroup }, () => this._getGroupDemographics(activeGroup));
      } else {
        this._handleError();
      }
    } catch (error) {
      this._handleError(); 
    }
    
  };

  /**
   * Get all demographic data for specific group
   * 
   * @param {string} groupId
   */
  _getGroupDemographics = async (groupId) => {
    try {
      const response = await fetch(URL_PATH + groupId);
      if (!response.ok) {
        this._handleError(); 
        return;
      }
  
      const json = await response.json();
      const demographicsData = json.data || {};
  
      this.setState({ demographicsData, activeGroup: groupId });
    } catch (error) {
      this._handleError(); 
    }
    
  };

  _handleError() {
    this.setState({ errorMsg: 'Error retrieving requested demographic statistics.'})
  };

  /**
   * Generate list of tab objects with respective content from the demographicsData to provide to TabMenu
   */
  _generateTabs() {
    const { demographicsData } = this.state;

    const tabs = Object.keys(demographicsData).map(key =>{
      const tab = { id: key, label: key.charAt(0).toUpperCase() + key.slice(1) };

      tab.content = (
        <div className="demographicsTab">
          {
            Object.keys(demographicsData[key]).map(statKey => {
              const stats = demographicsData[key][statKey];

              return (
                <DemographicStats
                  id={statKey}
                  label={stats.label}
                  data={stats.data || {}}
                  key={statKey}
                />
              );
            })
          }
        </div>
      )

      return tab;
    });
    
    return tabs;
  };

  render() {
    const { errorMsg } = this.state;

    return (
      <div className="app">
        <Header 
          groups={this.state.groups}
          onUpdateGroup={this._getGroupDemographics}
          activeGroup={this.state.activeGroup}
        />
        { errorMsg
          ? <div className="error">{errorMsg}</div>
          : <TabMenu 
              tabs={this._generateTabs()}
            />
        }
      </div>
    );
  };
}

export default App;
