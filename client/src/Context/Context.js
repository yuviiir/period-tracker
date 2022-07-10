import React, { createContext } from "react";

export const PeriodTrackerContext = createContext();

export const PeriodTrackerConsumer = PeriodTrackerContext.Consumer;

export class PeriodTrackerProvider extends React.Component {
    state = {
        email: null,
        jwtToken: null
    };

    setEmail = (value) => {
        this.setState({
          ...this.state,
          email: value
        })
    }

    setJwtToken = (value) => {
        this.setState({
            ...this.state,
            jwtToken: value
        })
    }

    resetState = () => {
        this.setState({ ...this.state })
    }

    
    render() {
        return (
            <PeriodTrackerContext.Provider
                value={{
                    email: this.state.email,
                    jwtToken: this.state.jwtToken,

                    setEmail: this.setEmail,
                    setJwtToken: this.setJwtToken,
                    resetState: this.resetState
                }}
            >
                {this.props.children}
            </PeriodTrackerContext.Provider>
        )}
}