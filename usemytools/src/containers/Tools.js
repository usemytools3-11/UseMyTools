import React from 'react';
import { connect } from 'react-redux';
import Tool from '../components/Tool';

const tools = [
    {
        id: 0,
        name: 'Tool 1',
        photo_url: 'https://picsum.photos/200/?random',
        price: 50,
        lender_id: 1
    },
    {
        id: 1,
        name: 'Tool 2',
        photo_url: 'https://picsum.photos/200/?random',
        price: 50,
        lender_id: 2
    },
    {
        id: 2,
        name: 'Tool 3',
        photo_url: 'https://picsum.photos/200/?random',
        price: 50,
        lender_id: 3
    },
];

const Tools = (props) => {
    return (
        <>
            {tools.map(tool => <Tool
                key={tool.id}
                id={tool.id}
                name={tool.name}
                photo_url={tool.photo_url}
                price={tool.price}
                lender_id={tool.lender_id}
            />)}
        </>
    );
}
export default connect()(Tools);