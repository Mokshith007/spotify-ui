class Api{
	
	getAllTracks(){
        return fetch('http://spotifytracks.eastus.azurecontainer.io:8080/getTracks');
    }
    getTracksByName(name:String){
        return fetch('http://spotifytracks.eastus.azurecontainer.io:8080/track/search/findByTrackNameLike?name='+name)
    }
}

export default new Api();