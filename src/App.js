import { Component } from "react";
import axios from "axios";

class App extends Component{

  state = {
    searchItem : '',
    data:[],
    videoId: ''
  }

   storeData = '';

  componentDidUpdate = (prevProps, prevState) =>{
    const getYoutubeVideo = () =>{

        var  url = 'https://www.googleapis.com/youtube/v3/search';
        var  type = 'video';
        var  part = 'snippet';
        var  key = 'AIzaSyALObuJrvNfn-g_iQ4kAsTmnZNJ9xcmiTQ';
        var  q = this.state.searchItem;


        var targetUrl = `${url}?key=${key}&type=${type}&part=${part}&q=${q}`;
        const promise = axios.get(targetUrl)


        const success = (response) =>{
          const newState = {searchItem : this.state.searchItem , data: response.data.items, videoId : this.state.videoId}
          this.setState(newState)
        }
      
        const error = (error)=>{
          console.log(error)
        }




        promise
            .then(success)
            .catch(error)




    }
    if(prevState.searchItem !== this.state.searchItem) getYoutubeVideo()
  }

  changeHandler = (event) => {
    var  searchItem = event.target.value;
    this.storeData = searchItem;
  }

  submitHandler = () => {
    this.setState({searchItem : this.storeData,data:this.state.data, videoId : this.state.videoId})
  }

  handleSelect = (videoId) =>{
    const newState = {searchItem : this.storeData, data:this.state.data, videoId: videoId}
    this.setState(newState)
  }

  render(){

    const items = this.state.data;
    console.log(items)
    return(
      <>
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-10 mx-auto">
                  <div className="input-group mb-3">
                      <input type="text" className="form-control" onChange={this.changeHandler} placeholder="search here .." />
                      <div className="input-group-append">
                      <button className="btn btn-outline-secondary" onClick={this.submitHandler} type="button">Search</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-8">
                  {console.log(`https://www.youtube.com/embed/${this.state.videoId}`)}
                <iframe style={{width:'100%',height:'500px'}}
                      src= {`https://www.youtube.com/embed/${this.state.videoId}`}
                  />
                </div>
                <div className="col-md-4 card p-2">

                  {
                    items.map((item,id)=>{
                      var title = item.snippet.title 
                      var channelTitle = item.snippet.channelTitle
                      var img = item.snippet.thumbnails.default.url
                      var videoId = item.id.videoId
                      return(
                        <div className="card mb-3 list_card" key={id} onClick={(event)=>{
                          console.log(videoId)
                          this.handleSelect(videoId)
                        }}>
                            <div className="row">
                                <div className="col-md-4">
                                  <img src={img} style={{height:'100%',width:'100%'}} />
                                </div>
                                <div className="col-md-8">
                                  <p>{title}</p>
                                  <b>{channelTitle}</b>
                                </div>
                              </div>
                      </div>

                      )
                    })
                  }
                      
                </div>
              </div>
            </div>
      </>
    )
  }
}
export default App;