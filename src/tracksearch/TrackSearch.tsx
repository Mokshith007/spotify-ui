import React from 'react';
import SearchBar from '../searchbar/SearchBar';
import Tracks from '../tracks/Tracks';
import TrackModel from '../track/TrackModel';

class TrackSearch extends React.Component<{}, { searchText: string, tracks: Array<TrackModel> }> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchText: '',
            tracks: []
        };
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.searchTracks = this.searchTracks.bind(this);
    }

    componentDidMount() {
        fetch('http://spotifytracks.eastus.azurecontainer.io:8080/getTracks')
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    tracks: result
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              console.log("Error occurred while fetching songs");
            });
    }

    handleSearchTextChange(searchText: string) {
        this.setState({
            searchText: searchText
        })
        this.searchTracks(searchText);
    }

    searchTracks(searchText: string) {
        fetch('http://spotifytracks.eastus.azurecontainer.io:8080/track/search/findByTrackNameLike?name=' + searchText)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    tracks: result._embedded.track
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              console.log("Error occurred while fetching songs");
            });
    }

    render() {
        return (
            <div>
                <SearchBar 
                    searchText={this.state.searchText}
                    onSearchTextChange={this.handleSearchTextChange}
                />
                <br/>
                <Tracks
                    tracks={this.state.tracks}
                />
            </div>
        );
    }
}

export default TrackSearch;