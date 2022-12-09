import './SelectedPageComponent.css';
import './shimmer.css';
import { Component } from "react";
import parse from 'html-react-parser'

export class SelectedPageComponent extends Component {

    render() {
        return (
        <div className="SelectedPageComponent">
            <p><span className="shimmer">{this.props.selectedPage.name}</span>
                : {parse(this.props.selectedPage.text)}
            </p>
        </div>
        )
    }
}

export default SelectedPageComponent;