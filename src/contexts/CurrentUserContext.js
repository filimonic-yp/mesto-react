import React from 'react';

export const defaultUser = {
  name:'',
  about:'',
  avatar:'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', // Empty gif 1x1
  _id: undefined,
}

export const CurrentUserContext = React.createContext();

