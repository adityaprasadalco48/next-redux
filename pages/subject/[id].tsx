import Link from 'next/link';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {recipesSelector} from '../../redux/authSlice';
import {selectSubject, setSubjectName} from '../../redux/subjectSlice';

const Page = () => {
    // console.log('State on render', useStore().getState(), {props});
    const {subjectName} = useSelector(selectSubject);
    const dispatch = useDispatch();

    const {recipes, loading, hasErrors} = useSelector(recipesSelector);

    const renderRecipes = () => {
        if (loading) return <p>Loading recipes...</p>;
        if (hasErrors) return <p>Cannot display recipes...</p>;

        console.log('recipes from id', recipes);

        return (
            recipes &&
            recipes.meals &&
            recipes.meals.length > 0 &&
            recipes.meals.map((recipe) => (
                <div key={recipe.idMeal} className="tile">
                    <h2>{recipe.strMeal}</h2>
                </div>
            ))
        );
    };

    const handleSubject = () => {
        dispatch(setSubjectName('Hindi'));
    };

    return (
        <div>
            <h3>{subjectName}</h3>
            <Link href="/subject/1">
                <a>Subject id 1</a>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/subject/2">
                <a>Subject id 2</a>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/">
                <a>Home</a>
            </Link>
            <button onClick={handleSubject}>Set Subject</button>
            <div className="content">{renderRecipes()}</div>
        </div>
    );
};

export default Page;
