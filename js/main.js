const restauransURL = "../db/partners.json";

const restaurantsNode = document.querySelector( ".restaurants" );

const getData = async (URL) => {
    const res = await fetch(URL, {
        method: "GET",
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }

    throw new Error('Ошибка');
}

const createRestauransCard = ({ name, kitchen, price, stars, time_of_delivery, image, products }) => {

    const restaurantCard = `
        <div class="restaurant-card" data-product="${products}">
            <h3>${name}</h3>
            <span>${kitchen}</span>
            <ul>
                <li>${price}</li>
                <li>${stars}</li>
                <li>${time_of_delivery}</li>
            </ul>
            <img src="${image}" alt="#">
        </div>
    `;

    restaurantsNode.insertAdjacentHTML("beforeend", restaurantCard);

    // console.log(restaurantsArr);
}

const openRestaurant = (e) => {
    const target = e.target;
    const restaurant = target.closest(".restaurant-card");
    console.log(restaurant.dataset.product);

    if (restaurant) {
        // console.log(`../db/${restaurant.dataset.product}`);
        getData(`../db/${restaurant.dataset.product}`)
    }

}

const init = async () => {
    const restaurantsArr = await getData(restauransURL);

    restaurantsArr.map(restaurant => createRestauransCard(restaurant));
    console.log(restaurantsArr);
}

restaurantsNode.addEventListener("click", openRestaurant)

init();