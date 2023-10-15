import React from 'react';
import Banner from '../Banner/Banner';
import PopularClasses from '../PopularClasses/PopularClasses';
import PopularInstructors from '../PopularInstructors/PopularInstructors';
import Review from '../Review/Review';
import JoinUs from '../JoinUs/JoinUs';
import ClassSchedule from '../ClassSchedule/ClassSchedule';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <ClassSchedule></ClassSchedule>
            <Review></Review>
            <JoinUs></JoinUs>
        </>
    );
};

export default Home;