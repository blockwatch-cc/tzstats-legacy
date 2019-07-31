import React from 'react';
import { Centered } from '../../components/Common'

const NotFoundPage = ({ match }) => {

  const hash = match.params.value;

  return (

    <Centered>
      {`We tried hard find ${hash}, but there is nothing here`}
    </Centered >
  )
};

export default NotFoundPage;
