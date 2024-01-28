import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './errorBoundary.scss';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
    };

    componentDidCatch() {
        this.setState({
            hasError: true,
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="container">
                    <div className="error__row" style={{ padding: '40px 0' }}>
                        <h4>Something wrong...</h4>
                        <div className="error__row_text">
                            <ErrorMessage />
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
