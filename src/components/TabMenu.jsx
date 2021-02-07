import React from 'react';
import PropTypes from 'prop-types';
import Tab from 'components/Tab';

import 'stylesheets/TabMenu.scss';

const propTypes = {
    /** List of tab objects containing label and id for Tab component as well as content to display when visible  */
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.node.isRequired,
            id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
            content: PropTypes.node
        }).isRequired
    ),
    /** Default active tab for initial page render */
    activeTab: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
}

/** Stateful component for a TabMenu containing tab list and tab content */
class TabMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: props.activeTab
        };
    };

    _setActiveTab = (id) => {
        this.setState({ activeTab: id });
    };

    /**
     * Render list of clickable tabs 
     */
    _renderTabs() {
        const tabList =  this.props.tabs
            ? this.props.tabs.map( tab => {
                const activeTab = this.state.activeTab || this.props.tabs[0].id;

                 return (
                    <li key={`tab-${tab.id}`} id={`tab-${tab.id}`} >
                        <Tab
                            label={tab.label}
                            id={tab.id}
                            onClickAction={this._setActiveTab}
                            active={tab.id === activeTab}
                        />
                    </li>
                 );
            })
            : null;

        return <ul className="tabList">{tabList}</ul>;
    };

    /**
     * Render content of currently active tab only
     */
    _renderActiveContent() {
        const { tabs } = this.props;
        let activeContent = null;
        
        tabs.some(tab => {
            if (tab.id === 0) {
                activeContent = tab.content;
            }
        });

        if (!activeContent && tabs.length) {
            activeContent = tabs[0].content;
        }

        return activeContent ? (
            <div className="content">
                {activeContent}
            </div>
        ) : null;
    };

    render() {
        return (
            <div className="tabMenu">
               { this._renderTabs() }
               { this._renderActiveContent() }
            </div>
        )
    }
}

TabMenu.propTypes = propTypes;
export default TabMenu;