class Api{
	
	getAllTracks(){
        return fetch('http://spotifytracks.eastus.azurecontainer.io:8080/getTracks');
    }
    getTracksByTrackName(name: string){
        return fetch('http://spotifytracks.eastus.azurecontainer.io:8080/track/search/findByTrackNameLike?name='+ encodeURIComponent(name));
    }
    getTracksByArtistName(name: string){
        return fetch('http://spotifytracks.eastus.azurecontainer.io:8080/track/search/findByArtistNameLike?name='+ encodeURIComponent(name));
    }
}

export default new Api();