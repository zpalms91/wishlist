import React, { Component } from 'react';
import { WishBanner } from "./WishBanner";
import { WishRow } from './WishRow';
import { WishCreator } from './WishCreator';
import { VisibilityControl } from "./VisibilityControl";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Zoe",
      wishItems: [
        {
          action: "My two front teeth",
          done: false
        }
      ],
      showCompleted: true
    }
  }

  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Zoe" ? "Scott" : "Zoe"
    })
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  }

  createNewWish = (wish) => {
    if (!this.state.wishItems.find(x => x.action === wish)) {
      this.setState({
        wishItems: [
          ...this.state.wishItems,
          {
            action: wish,
            done: false
          }
        ]
      },
        () => localStorage.setItem("wishes", JSON.stringify(this.state))
      );
    }
  }

  wishTableRows = (doneValue) => this.state.wishItems
  .filter(item => item.done === doneValue).map(item =>
    <WishRow key={item.action} item={item} callback={this.toggleWish} />
  );

  toggleWish = (wish) => this.setState(
    {
      wishItems: this.state.wishItems.map(
        item => item.action === wish.action ? { ...item, done: !item.done } : item
      )
    },
    () => localStorage.setItem("wishes", JSON.stringify(this.state))
  );

  componentDidMount = () => {
    let data = localStorage.getItem("wishes");
    this.setState(data != null ? JSON.parse(data) :
      {
        userName: "Zoe",
        wishItems: [
          {
            action: "My two front teeth",
            done: false
          }
        ],
        showCompleted: true
      }
    )
  }

  render = () =>
    <div>
      <WishBanner name={this.state.userName} tasks={this.state.wishItems} />
      <div className="container-fluid">
        <WishCreator callback={this.createNewWish} />
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {this.wishTableRows(false)}
        </tbody>
      </table>
      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl description="Fulfilled Wishes" isChecked={this.state.showCompleted}
          callback={(checked) => this.setState({ showCompleted: checked })} />
      </div>
      {
        this.state.showCompleted &&
        <table className="table table-striped table-bordered">
          <thead>
            <tr><th>Description</th><th>Done</th></tr>
          </thead>
          <tbody>{this.wishTableRows(true)}</tbody>
        </table>
      }
    </div>
}
