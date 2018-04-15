import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSeach from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyB8bzIUpptHX_mfk_53smbav2JPbPAwl4k';


// Create a new component and produce HTML
class App extends Component {

    constructor(props){
        super(props);
        this.state = { 
            videos : [] , 
            selectedVideo: null
        };
       this.videoSearch('pogba');
    }

    videoSearch(term){
        YTSeach({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render(){
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 1000)

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                    <VideoDetail video={this.state.selectedVideo}/>
                    <VideoList 
                        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                        videos = {this.state.videos}/>
            </div>

            

        );
    }
}

// Take this component's generated HTML and put it on the page(in the DOM)
ReactDOM.render(<App/>, document.querySelector('.container'));