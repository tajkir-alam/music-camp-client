import React, { useEffect, useState } from 'react';
import Classes from './Classes';

const PopularClasses = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/class?limit=6&sort=-1')
        .then(res => res.json())
        .then(data => setClasses(data))
    }, [])

    return (
        <section className='custom-container grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {
                classes.map(classes => <Classes key={classes._id} classes={classes}></Classes>)
            }
        </section>
    );
};

export default PopularClasses;