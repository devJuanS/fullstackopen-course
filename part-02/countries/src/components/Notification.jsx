/**
 * Component to render a notification message to the user based on the type of this.
 * @param {Boolean} isErrorMessage true if the notification is due to an error
 * @param {String} message 
 * @returns React component
 */
const Notification = ( { isErrorMessage, message } ) => {
  const normalNotificationStyle = {
    fontStyle: 'italic'
  };
  const errorNotificationStyle  = {
    marginBlockStart: 12,
    marginBlockEnd: 12,
    padding: 8,
    color: 'red',
    fontSize: 20,
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 8
  };
  const notificationStyle = isErrorMessage ? errorNotificationStyle : normalNotificationStyle;

  if( message === null ) return null;

  return (
    <div style={ notificationStyle }>
      { message }
    </div>
  );
}

export default Notification;