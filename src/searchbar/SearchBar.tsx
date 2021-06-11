import React from 'react';
import SearchModel from './SearchModel'

class SearchBar extends React.Component<SearchModel> {
    constructor(props: any) {
        super(props);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    }

    handleSearchTextChange(event: any) {
        this.props.onSearchTextChange(event.target.value);
    }

    render() {
        return (
            <form>
                <input 
                    type="text" 
                    placeholder="Track or Artist name" 
                    value={this.props.searchText} 
                    onChange={this.handleSearchTextChange}
                />
            </form>
        );
    }
}

export default SearchBar;