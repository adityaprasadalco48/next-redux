import {unwrapResult} from '@reduxjs/toolkit';
import Link from 'next/link';
import React from 'react';
import {useSelector} from 'react-redux';
import {fetchRecipes, recipesSelector, setUser} from '../redux/authSlice';
import {wrapper} from '../redux/store';

export default function IndexPage() {
    const {recipes, loading, hasErrors} = useSelector(recipesSelector);

    const renderRecipes = () => {
        if (loading) return <p>Loading recipes...</p>;
        if (hasErrors) return <p>Cannot display recipes...</p>;

        console.log('recipes', recipes);

        return (
            recipes &&
            recipes.meals &&
            recipes.meals.length > 0 &&
            recipes.meals.map((recipe) => (
                <div key={recipe.idMeal} className="tile">
                    <h2>{recipe.strMeal}</h2>
                    <img src={recipe.strMealThumb} alt="" />
                </div>
            ))
        );
    };

    return (
        <div>
            <h3>Rendering without state</h3>
            You can see &quot;Rendered content: undefined&quot; in browser console after navigating between these pages:
            <br />
            <br />
            <Link href="/subject/1">
                <a>Go to problem pages</a>
            </Link>
            <h1>Recipes</h1>
            <div className="content">{renderRecipes()}</div>
        </div>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({params}) => {
    await store.dispatch(
        setUser({
            email: 'aditya.alcowhiz@gmail.com',
        }),
    );

    try {
        const resultAction: any = await store.dispatch(fetchRecipes());
        const originalPromiseResult = unwrapResult(resultAction);

        console.log('originalPromiseResult', originalPromiseResult);
        // handle result here
    } catch (rejectedValueOrSerializedError) {
        // handle error here
    }

    return {
        props: {},
    };
});
