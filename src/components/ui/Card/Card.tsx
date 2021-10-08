import React, { Component } from 'react';
import styles from './Card.module.scss';

class Card extends Component {
  render() {
    return (
      <div className={styles.Card}>
        Card Component
      </div>
    );
  }
}

export default Card;