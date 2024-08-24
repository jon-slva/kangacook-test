import './ApiTypes.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function ApiTypes() {
	const [cardToggle, setCardToggle] = useState(false);
	const [apiCards, setApiCards] = useState();


	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`http://127.0.0.1:8000/api/apitypes/`);
				setApiCards(data.apidata);
			}
			catch (error) {
				console.error(error);
			}
		}
		fetchData();
		console.log(apiCards)

	}, [])

	if (!apiCards) {
		return <h1>Loading...</h1>
	}

	const thenCatchCards = apiCards[0].thenCatchCards;
	const asyncAwaitCards = apiCards[1].asyncAwaitCards;
	const preEs6Cards = apiCards[2].preEs6Cards;

	return (
		<main>


			<h1>APIs & Promises</h1>
			<section className="top">
				<h2>Here are some different ways we can query APIs:</h2>
				<h3>Select Request Type:</h3>

				<button className="promise-toggle" onClick={() => setCardToggle("async/await")}>
					async/await
				</button>
				<button className="promise-toggle" onClick={() => setCardToggle("then/catch")}>
					then/catch
				</button>
				<button className="promise-toggle" onClick={() => setCardToggle("pre-ES6")}>
					pre-ES6

				</button>
			</section>


			<h2>
				{apiCards ? (
					(cardToggle === "async/await" ? apiCards[1]
						: cardToggle === "then/catch" ? apiCards[0]
							: apiCards[2]).categoryTitle
				) : (
					"Loading..."
				)}
			</h2>

			<aside className="card-container">
				{(cardToggle === "async/await" ? asyncAwaitCards
					: cardToggle === "then/catch" ? thenCatchCards
						: preEs6Cards)
					.map((card, index) => (
						<article className="card" key={index}>
							<div className="card__top">
								<h2 className="card__title">{card.name}</h2>
								<h3 className="card__title">{card.subtitle}</h3>
								<p className="card__description">{card.description}</p>
							</div>
							<div className="card__image" style={{
								backgroundImage: `url(${card.image})`,
								backgroundPosition: `${cardToggle === "pre-ES6" ? "top" : "center"}`
							}}>
							</div>
						</article>
					))}
			</aside>



		</main >
	)
}