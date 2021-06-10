import React from 'react';
import SearchBar from '../searchbar/SearchBar';
import Tracks from '../tracks/Tracks';
import TrackModel from '../track/TrackModel';
import api from "../api/apis"
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
        api.getAllTracks()
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    tracks: result
                });
            })
            .catch(error => {
                console.log("Error occurred while fetching songs",error);
            });
    }

    handleSearchTextChange(searchText: string) {
        this.setState({
            searchText: searchText
        })
        this.searchTracks(searchText);
    }

    searchTracks(searchText: string) {
        api.getTracksByName(searchText)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    tracks: result._embedded.track
                });
            })
            .catch(error => {
                  console.log("Error occurred while fetching song by name",error);
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