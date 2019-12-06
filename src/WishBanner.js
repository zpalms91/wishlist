import React, { Component } from 'react';

export class WishBanner extends Component {
    render = () =>
    <div>
        <h1 className="bg-primary text-white text-center p-2">
            { this.props.name }'s Wishlist
            ({ this.props.tasks.filter(t => !t.done).length } items in Wishlist)
        </h1>
    </div>
}