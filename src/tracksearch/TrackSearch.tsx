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
        });
        this.searchTracks(searchText);
    }

    searchTracks(searchText: string) {
        let searchedTracks:  Array<TrackModel> = [];
        api.getTracksByTrackName(searchText)
            .then(res => res.json())
            .then((result) => {
                const searchedTracksByTrackName: Array<TrackModel> = result._embedded.track;
                api.getTracksByArtistName(searchText)
                    .then(res => res.json())
                    .then((result) => {
                        const searchedTracksByArtistName: Array<TrackModel> = result._embedded.track;
                        searchedTracks = searchedTracksByTrackName.concat(searchedTracksByArtistName);
                        const arr = searchedTracks.map((track) => track.trackId);
                        searchedTracks = searchedTracks.filter(({trackId}, index) => !arr.includes(trackId, index + 1));
                        setTimeout(() => { 
                            this.setState({ 
                                tracks: searchedTracks
                            });
                        }, searchText.length*1000);
                    })
                    .catch(error => {
                        console.log("Error occurred while fetching song by name",error);
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