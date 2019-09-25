import { useState, useEffect } from 'react';
import axios from 'axios';

import { GET, POST, PATCH, DELETE, DELETE_ALL } from '../helpers/urls';

export default function useFetchApi(adToolName) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [overwriteSuccessMessage, setOverwriteSuccessMessage] = useState('');
  const [overwriteErrorMessage, setOverwriteErrorMessage] = useState('');
  const [removeSuccessMessage, setRemoveSuccessMessage] = useState('');
  const [allConfigurations, setAllConfigurations] = useState(null);
  const [chosenConfiguration, setChosenConfiguration] = useState('select');

  useEffect(() => {
    let isSubscribed = true;
    axios
      .get(`${GET}`)
      .then(res => {
        if (isSubscribed) {
          const data = res.data.data;
          if (data.length !== 0) setAllConfigurations(data);
        }
      })
      .catch(err => {
        return isSubscribed ? 
        console.error('Nie udało się pobrać danych. ', err) : 
        null;
      });

    return () => (isSubscribed = false);
  }, []);

  const saveConfiguration = config => {
    axios.post(`${POST}/adtools`, config)
      .then(res => {
        const configurations = res.data.body.formConfigurations;
        setSuccessMessage(res.data.message);
        if (allConfigurations) {
          setAllConfigurations([...allConfigurations, configurations[configurations.length - 1]]);
        }
        setChosenConfiguration(configurations[configurations.length - 1]._id);
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      })
      .catch(err => {
        setErrorMessage(err.response.data.message);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      });
  };

  const overwriteConfiguration = config => {
    axios.post(`${PATCH}/${config.id}`, config)
      .then(res => {
        console.log(res);
        setTimeout(() => {
          setOverwriteSuccessMessage('');
        }, 5000);
      })
      .catch(err => {
        setOverwriteErrorMessage(err.response.data.message);
        setTimeout(() => {
          setOverwriteErrorMessage('');
        }, 5000);
      });
  };

  const removeConfiguration = () => {
    axios.delete(`${DELETE}/adtools/${adToolName}/${chosenConfiguration}`)
      .then(res => {
        setAllConfigurations(allConfigurations.filter(config => config._id !== chosenConfiguration));
        setChosenConfiguration('select');
        setRemoveSuccessMessage(res.data.message);
        setTimeout(() => {
          setRemoveSuccessMessage('');
        }, 5000);
      })
      .catch(err => console.log(err));
  };

  const setConfiguration = configId => {
    setChosenConfiguration(configId);
  };

  return { saveConfiguration, overwriteConfiguration, removeConfiguration, successMessage, errorMessage, overwriteSuccessMessage, overwriteErrorMessage, removeSuccessMessage, allConfigurations, chosenConfiguration, setConfiguration };
}
