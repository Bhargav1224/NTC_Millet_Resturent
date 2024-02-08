import React, { useEffect } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './notification.module.scss';
import { handleNotificationPanel } from '../../../reducers/applicationSlice';

function Notification({ msg, msgType }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.notification.notificationPanel);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        dispatch(handleNotificationPanel(false));
      }, 3000);
    }
  }, [open]);

  return (
    open && (
      <div className={cn(styles.notificationContainer)} style={{ backgroundColor: msgType === 'success' ? 'green' : '#AD0028' }}>
        <div className="d-flex">
          <div className="toast-body">
            {msg}
          </div>
          <button type="button" className={cn('btn-close me-2 m-auto', styles.closeBtn)} data-bs-dismiss="toast" aria-label="Close" onClick={() => dispatch(handleNotificationPanel(false))} />
        </div>
      </div>
    )

  );
}

Notification.defaultProps = {
  msg: 'msg',
  msgType: 'msgType'
};

Notification.propTypes = {
  msg: PropTypes.string,
  msgType: PropTypes.string
};

export default Notification;
