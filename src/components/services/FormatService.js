import Moment from 'react-moment';
import React from 'react';

class FormatService {
    constructor() {
    }

    formatDate(data) {
      return <Moment format="DD/MMM/YYYY">
              {data}
          </Moment>;
    }
}
export default FormatService;