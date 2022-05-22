import { Component } from "react";
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export class PageFilter extends Component {
    render() {
        return (
            <ToggleButtonGroup type="radio" name="page-category-filter" defaultValue={"all"} onChange={this.props.onPageFilterChange}>
                <ToggleButton id="tbg-radio-all" value={"all"}>All</ToggleButton>
                <ToggleButton id="tbg-radio-Personal" value={"Personal"}>Personal</ToggleButton>
                <ToggleButton id="tbg-radio-Spiritual" value={"Spiritual"}>Spiritual</ToggleButton>
                <ToggleButton id="tbg-radio-Career" value={"Career"}>Career</ToggleButton>
            </ToggleButtonGroup>
        )
    }
}

export default PageFilter;