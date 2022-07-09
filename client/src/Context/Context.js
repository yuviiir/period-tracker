import React, { createContext } from "react";

export const Context = createContext();

export const PeriodTrackerConsumer = Context.Consumer;

export class PeriodTrackerProvider extends React.Component {
    state = {
        email: "",
        isLoading: false
    }

    setEmail = (value) => {
        this.setState({
          ...this.state,
          email: value
        })
    }

    setIsLoading = (value) => {
        this.setState({
            ...this.state,
            isLoading: value
        })
    }
    
    render() {
        return (
            <Context.Provider
                value={{
                    email: this.state.email,
                    isLoading: this.state.isLoading,

                    setEmail: this.setEmail,
                    setIsLoading: this.setIsLoading
                }}
            >
                {this.props.children}
            </Context.Provider>
        )}
}