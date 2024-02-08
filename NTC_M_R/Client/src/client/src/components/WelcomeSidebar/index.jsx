import React from 'react';
import cn from 'classnames';
import styles from './WelcomeSidebar.module.scss';

function WelcomeSidebar() {
  return (
    <div className={cn('col-md-4', styles.sidebarContainer)}>
      <h1 className={styles.headerColor}>
        Seeder
      </h1>
      <h3 className={cn('fw-400 text-center mt-100', styles.headerColor)}>
        Pay technology!
      </h3>
    </div>
  );
}

export default WelcomeSidebar;
