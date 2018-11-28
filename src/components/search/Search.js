import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import ImageResult from "../image-results/ImageResult";
import VideoResult from "../video-results/VideoResult.js";
class Search extends Component {
  state = {
    images: [],
    videos: [],
    amount: 15,
    apiImageUrl: "https://pixabay.com/api",
    apiVideoUrl: "https://pixabay.com/api/videos",
    apiKey: "10803290-49c7ff51fbac54baf9d715363",
    searchText: "",
    media_type: "Images"
  };
  onTextChange = e => {
    let value = e.target.value;
    this.setState(
      { searchText: value },
      value === ""
        ? this.setState({ images: [], videos: [] })
        : this.state.media_type === "Images"
        ? this.fetchImages()
        : this.fetchVideos()
    );
  };

  fetchImages = () => {
    fetch(
      `${this.state.apiImageUrl}/?key=${this.state.apiKey}&q=${
        this.state.searchText
      }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
    )
      .then(response => response.json())
      .then(data => this.setState({ images: data.hits }))
      .catch(err => console.log(err));
  };
  fetchVideos = () => {
    fetch(
      `${this.state.apiVideoUrl}/?key=${this.state.apiKey}&q=${
        this.state.searchText
      }&video_type=all&per_page=${this.state.amount}&safesearch = true`
    )
      .then(response => response.json())
      .then(data => this.setState({ videos: data.hits }));
  };

  onAmountChange = (e, index, value) =>{
   this.setState({ amount: value });
   this.fetchOneOfThem();
  }
  onMediaChange = (e, index, value) => {
    this.setState({ media_type: value });
    this.fetchOneOfThem();
  };
  fetchOneOfThem = () => {
    this.state.media_type === "Images"
      ? this.fetchImages()
      : this.fetchVideos();
  };

  render() {
    //console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          fullWidth={false}
          floatingLabelText="Search For Images or Videos"
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={20} primaryText="20" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>

        <SelectField
          name="media_type"
          floatingLabelText="Media Type"
          value={this.state.media_type}
          onChange={this.onMediaChange}
        >
          <MenuItem value={"Images"} primaryText="Images" />
          <MenuItem value={"Videos"} primaryText="Videos" />
        </SelectField>
        <br />
        {this.state.media_type === "Images" ? (
          this.state.images.length > 0 ? (
            <ImageResult images={this.state.images} />
          ) : null
        ) : this.state.videos.length > 0 ? (
          <VideoResult videos={this.state.videos} />
        ) : null}
      </div>
    );
  }
}
export default Search;
