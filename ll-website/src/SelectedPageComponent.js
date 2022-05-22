import { Component } from "react";
import parse from 'html-react-parser'

export class SelectedPageComponent extends Component {

    render() {
        return (
        <div className="SelectedPageComponent">
            <p>{this.props.selectedPage.name}: {parse(this.props.selectedPage.text)}</p>
        </div>
        )
    }
}

export default SelectedPageComponent;