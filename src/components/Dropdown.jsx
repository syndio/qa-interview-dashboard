import React from 'react';
import PropTypes from 'prop-types';
import chevron from 'assets/chevron.svg';

import 'stylesheets/Dropdown.scss';

const propTypes = {
    /** List of option objects to display in menu */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            /** Label for visual display menu */
            label: PropTypes.node.isRequired,
            /** Value to pass in callback representing selected menu item */
            value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
            /** True if item should be disabled (unclickable) */
            disabled: PropTypes.bool
        })
    ),
    /** Default selected item when component first renders */
    defaultSelected: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    /** Callback function to call when selecting item */
    onSelectOption: PropTypes.func,
    /** Optional unclickable menu item to display at top of menu as dropdown label */
    label: PropTypes.string
}

const defaultProps = {
    onSelectOption: () => {}
}

/** Basic stateful Dropdown component */
class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            optionsVisible: false,
            selected: this.props.defaultSelected
        };
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        //This is needed in case the defaultSelected prop is updated after the component has already rendered
        if (nextProps.defaultSelected !== prevState.selected) {
            return { selected: nextProps.defaultSelected };
        } else {
            return null;
        }
    };

    _toggleOptionsVisible = () => {
        this.setState({ optionsVisible: !this.state.optionsVisible });
    };

    _onSelectOption = (selected) => {
        this.props.onSelectOption(this.state.selected);
        this.setState({ selected, optionsVisible: !this.state.optionsVisible })
    };

    /** Render menu section of dropdown, visible only when toggle element is active */
    _renderOptions() {
        const { optionsVisible, selected } = this.state;
        const { options, label } = this.props;
        let optionNodes = options.map(option => {
            return  (selected === option.value || option.disabled) 
                ? <li key={option.value} id={option.id} className="disabled">{option.label}</li>
                : <li key={option.value} id={option.id} onClick={() => this._onSelectOption(option.value)}>{option.label}</li>;
        })

        if (label) {
            optionNodes.unshift(<li key="label-option" className="labelOption">{label}</li>);
        }

        return  optionsVisible ? (
            <ul className="optionsList">
                { optionNodes }
            </ul>
        ) : null;
    };

    render() {
        const { optionsVisible, selected } = this.state;
        let label;
        this.props.options.some(option => {
            if (option.value === selected) {
                label = option.label;
            }
        });

        return (
            <div className="dropdown">
                <button 
                    className={`toggle ${optionsVisible ? 'active' : ''}`} 
                    id="dropdown-button"
                    onClick={this._toggleOptionsVisible}
                >
                    <span>{label}</span><img src={chevron} alt="" />
                </button>
                { this._renderOptions() }
            </div>
        )
    }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps
export default Dropdown;