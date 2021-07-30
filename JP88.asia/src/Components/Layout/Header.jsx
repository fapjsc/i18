import React, { Component } from 'react';

import style from './Header.module.scss';

export default class Header extends Component {
  render() {
    return (
      <div className="" style={{ backgroundColor: '#fff ' }}>
        <header className={style.header}>{this.props.children}</header>
      </div>
    );
  }
}
