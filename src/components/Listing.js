import React, { Component } from "react";
import "../css/Listing.css";
import "react-slideshow-image/dist/styles.css";
import Select from "react-select";
import Pagination from "@material-ui/lab/Pagination";

import List from "./List";
import axios from "axios";

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageAmount: 0,
      accomodPerPage: 12,
      finishSorting: false,
      asc: 1,
      sortType: {
        value: "postedDate",
        label: "Ngày đăng",
        listOrder: [
          { value: "desc", label: "Mới nhất" },
          { value: "asc", label: "Cũ nhất" },
        ],
      },
      sortOrder: { value: "desc", label: "Mới nhất" },

      listSortOption: [
        {
          value: "postedDate",
          label: "Ngày đăng",
          listOrder: [
            { value: "desc", label: "Mới nhất" },
            { value: "asc", label: "Cũ nhất" },
          ],
        },
        {
          value: "price",
          label: "Giá",
          listOrder: [
            { value: "asc", label: "Tăng dần" },
            { value: "desc", label: "Giảm dần" },
          ],
        },
        {
          value: "livingArea",
          label: "Diện tích",
          listOrder: [
            { value: "asc", label: "Tăng dần" },
            { value: "desc", label: "Giảm dần" },
          ],
        },
      ],
      listSortOrder: [
        { value: "desc", label: "Mới nhất" },
        { value: "asc", label: "Cũ nhất" },
      ],
      list_accomod: [],
      accomod_to_render: [],
    };
    this.handleSortButton = this.handleSortButton.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  componentDidMount() {
    if (this.props.list_accomod) {
      this.setState(
        {
          list_accomod: this.props.list_accomod.sort((a, b) =>
            a[this.state.sortType.value] < b[this.state.sortType.value] ? 1 : -1
          ),
        },
        () => {
          this.setState({
            pageAmount:
              parseInt(
                this.state.list_accomod.length / this.state.accomodPerPage
              ) + 1,
            accomod_to_render: this.state.list_accomod.slice(
              (this.state.currentPage - 1) * this.state.accomodPerPage,
              this.state.currentPage * this.state.accomodPerPage
            ),
          }, () => this.setState({finishSorting: true}));
        }
      );
    } else {
      //"I dont see any accomod here");
    }
  }

  handleSortButton() {
    this.setState(
      {
        finishSorting: false,
        list_accomod: this.props.list_accomod.sort((a, b) =>
          a[this.state.sortType.value] > b[this.state.sortType.value]
            ? this.state.asc
            : -this.state.asc
        ),
        currentPage: 1
      },
      () => {
        //"Current page: ", this.state.currentPage);
        this.setState({ 
          accomod_to_render: this.state.list_accomod.slice(
            (this.state.currentPage - 1) * this.state.accomodPerPage,
            this.state.currentPage * this.state.accomodPerPage
          ),  
        }, (() => this.setState({finishSorting: true})));
      }
    );
  }

  handleChangePage(event, newPage) {
    //newPage);
    //this.state.list_accomod)
    this.setState(
      {
        finishSorting: false,
        currentPage: newPage,
        accomod_to_render: this.state.list_accomod.slice(
          (newPage - 1) * this.state.accomodPerPage,
          newPage * this.state.accomodPerPage
        ),
      },
      () => {
        this.setState({
          finishSorting: true
        })
        this.props.myRef.current.scrollIntoView();
        //"page choosing: ", this.state.currentPage);
        //"page render: ", this.state.accomod_to_render);
      }
    );
  }
  render() {
    const { sortType, sortOrder } = this.state;
    return (
      <>
        <div className="sortField">
          <div className="sort-result">
            <p style={{ fontStyle: "italic", textAlign: "left" }}>
              Tìm kiếm được {this.state.list_accomod.length} kết quả
            </p>
          </div>
          <div className="sort-option">
            <Select
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 21 }),
              }}
              options={this.state.listSortOption}
              defaultValue={this.state.listSortOption[0]}
              value={sortType}
              onChange={(sortType) => {
                this.setState({
                  sortType,
                  listSortOrder: sortType.listOrder,
                  sortOrder: sortType.listOrder[0],
                  asc: sortType.listOrder[0].value === "asc" ? 1 : -1,
                });
              }}
            />
          </div>
          <div className="sort-order">
            <Select
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 21 }),
              }}
              options={this.state.listSortOrder}
              defaultValue={this.state.listSortOrder[0]}
              value={sortOrder}
              onChange={(sortOrder) =>
                this.setState({
                  sortOrder,
                  asc: sortOrder.value === "asc" ? 1 : -1,
                })
              }
            />
          </div>
          <div className="sort-submit">
            <button className="sort-button" onClick={this.handleSortButton}>
              Sắp xếp
            </button>
          </div>
        </div>
        <div
          className="uk-slider-items list-product-items"
          style={{ marginBottom: "30px", height: "100%" }}
        >
          {this.state.finishSorting &&
            this.state.accomod_to_render.map((house, index) => {
              let isFollowed = false;
              if(this.props.list_follow.indexOf(house._id) != -1) isFollowed= true;
              return <List accomod={house} key={index} isFollowed={isFollowed}/> 
            })}
        </div>
        <Pagination
          page={this.state.currentPage}
          count={this.state.pageAmount}
          color="primary"
          variant="outlined"
          onChange={this.handleChangePage}
        />
      </>
    );
  }
}

export default Listing;
