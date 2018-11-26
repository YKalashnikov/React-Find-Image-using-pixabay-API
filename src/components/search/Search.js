import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import ImageResult from "../image-results/ImageResult";
class Search extends Component {
  state = {
    images: [],
    amount: 15,
    apiUrl: "https://pixabay.com/api",
    apiKey: "10803290-49c7ff51fbac54baf9d715363",
    searchText: ""
  };
  onTextChange = e => {
    let value = e.target.value;
    this.setState({ [e.target.name]: value }, () => {
      if (value === "") {
        this.setState({ images: [] });
      } else {
        fetch(
          `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
            this.state.searchText
          }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
        )
          .then(response => response.json())
          .then(data => this.setState({ images: data.hits }))
          .catch(err => console.log(err));
      }
    });
  };
  onAmountChange = (e, index, value) => this.setState({ amount: value });

  render() {
    //console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          fullWidth={false}
          floatingLabelText="Search For Images"
        />
        <br />
        <SelectField
          name="amount"
          //floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResult images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;
