import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Card, Feed, Input } from 'semantic-ui-react'

class Autocomplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: []
    };

    constructor(props) {
        super(props);

        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: "",
            hover: false
        };
    }

    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion => {
                return suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1 || suggestion.address.toLowerCase().indexOf(userInput.toLowerCase()) > -1 || suggestion.id.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            }
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
    };

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions, hover } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        }
        // User pressed the up arrow
        else if (e.keyCode === 38 && hover === false) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({
                activeSuggestion: activeSuggestion
                    - 1
            });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40 && hover === false) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };
    onChangeHover() {
        this.setState({
            hover: !this.state.hover
        })
    }
    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            onChangeHover,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput,
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <Card className="cardd">
                        <Card.Content>
                            <Feed>
                                {filteredSuggestions.map((it, index) => {
                                    let className

                                    // Flag the active suggestion with a class
                                    if (index === activeSuggestion) {
                                        className = "suggestion-active";
                                    }
                                    else
                                        className = ""

                                    return (
                                        <Feed.Event>
                                            <Feed.Content>
                                                <Feed.Summary className={this.state.hover ? '' : className} onMouseEnter={onChangeHover.bind(this)} onMouseLeave={onChangeHover.bind(this)}>
                                                    <span style={{ fontWeight: '2px' }}>{it.id}</span>,
                                                    <br></br> {it.name} , <span style={{ color: 'blue' }}>{it.address}</span>
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>
                                    )
                                })}

                            </Feed>
                        </Card.Content>
                    </Card>
                )
            } else {
                suggestionsListComponent = (
                    <div class="no-suggestions">
                        <Card>
                            <Card.Content>
                                No suggestions!
                            </Card.Content>
                        </Card>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <Input
                    icon="users"
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    placeholder={'Search for Users by ID,Name,Address'}
                />
                {suggestionsListComponent}
            </Fragment>
        );
    }
}

export default Autocomplete;
