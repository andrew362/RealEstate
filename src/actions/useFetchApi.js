import { useState } from 'react';
import axios from 'axios';

import { GET, POST, PATCH, DELETE, DELETE_ALL } from '../helpers/urls';

export default function useFetchApi(adToolName) {
  const [message, setMessage] = useState('');
  const [allConfigurations, setAllConfigurations] = useState(null);

  const getAllConfigurations = () => {
    axios
    .get(`${GET}`)
    .then(res => {
        if(res.status === 200){
          const data = res.data.data;
          if (data.length !== 0) setAllConfigurations(data);
        } else {
          setMessage('error/' + Math.random());
          console.log(res);
        }
    })
    .catch(err => {
      setMessage('error/' + Math.random());
      console.log(err);
    });
  }

  const saveConfiguration = config => {
    axios.post(`${POST}`, config)
      .then(res => {
        console.log(res);
        if(res.data.status === 'success'){
          setMessage('create/' + Math.random());
          getAllConfigurations();
        } else {
          setMessage('error/' + Math.random());
          console.log(res);
        }
      })
      .catch(err => {
        setMessage('error/' + Math.random());
        console.log(err);
      });
  };

  const overwriteConfiguration = config => {
    axios.patch(`${PATCH}/${config.id}`, config)
      .then(res => {
        console.log(res);
        if(res.data.status === 'success'){
          setMessage('update/' + Math.random());
        } else {
          setMessage('error/' + Math.random());
          console.log(res);
        }
      })
      .catch(err => {
        setMessage('error/' + Math.random());
        console.log(err);
      });
  };

  const removeConfiguration = config => {
    axios.delete(`${DELETE}/${config.id}`, config)
      .then(res => {
        console.log(res);
        if(res.data.status === 'success'){
          setMessage('delete/' + Math.random());
          getAllConfigurations();
        } else {
          setMessage('error/' + Math.random());
          console.log(res);
        }
      })
      .catch(err => {
        setMessage('error/' + Math.random());
        console.log(err);
      });
  };

  const removeAllConfiguration = () => {
    axios.delete(`${DELETE_ALL}`)
      .then(res => {
        console.log(res);
        if(res.data.status === 'success'){
          setMessage('delete/' + Math.random());
          getAllConfigurations();
          console.log(res);
        } else {
          setMessage('error/' + Math.random());
          console.log(res);
        }
      })
      .catch(err => {
        setMessage('error/' + Math.random());
        console.log(err);
      });
  };


  return { getAllConfigurations, saveConfiguration, overwriteConfiguration, removeConfiguration, message, allConfigurations, removeAllConfiguration };
}
