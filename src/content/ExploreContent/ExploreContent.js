import React from 'react'
import CardComponent from '../../Components/Card/CardComponent'

const style = {
    display: 'grid',
    // justifyContent: 'space-around',
    // flexWrap: 'wrap',
    gridTemplateColumns: '1fr 1fr 1fr',
    justifyItems: 'center'

};

const ExploreContent = ({isSignedIn}) => {
    return (
        <div style={style}>
           <CardComponent data={{id: 2222}} isSignedIn={isSignedIn} />
           <CardComponent data={{id: 2222}} isSignedIn={isSignedIn} />
           <CardComponent data={{id: 2222}} isSignedIn={isSignedIn} />
           <CardComponent data={{id: 2222}} isSignedIn={isSignedIn} />
           <CardComponent data={{id: 2222}} isSignedIn={isSignedIn} />
           <CardComponent data={{id: 2222}} isSignedIn={isSignedIn} />
           <CardComponent data={{id: 2222}} isSignedIn={isSignedIn} />
        </div>
    )
}

export default ExploreContent
