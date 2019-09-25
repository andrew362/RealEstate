import React from 'react'
import CardComponent from '../../Components/Card/CardComponent'
import useFetchApi from '../../actions/useFetchApi';

const style = {
    display: 'grid',
    // justifyContent: 'space-around',
    // flexWrap: 'wrap',
    gridTemplateColumns: '1fr 1fr 1fr',
    justifyItems: 'center'

};

const ExploreContent = ({isSignedIn}) => {

    const {
        allConfigurations
      } = useFetchApi();
      console.log(allConfigurations);

    return (
        <div style={style}>
            {allConfigurations && allConfigurations.map(el => (<CardComponent key={el.id} data={el} isSignedIn={isSignedIn} />))}
        </div>
    )
}

export default ExploreContent
