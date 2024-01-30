export const aboutServiceData = [
    {
        title: 'Select location',
        description: 'Choose the location where your food will be delivered.',
    },
    {
        title: 'Choose order',
        description: 'Check over hundreds of menus to pick your favorite food',
    },
    {
        title: 'Pay advanced',
        description:
            'It`s quick, safe, and simple. Select several methods of payment',
    },
    {
        title: 'Enjoy meals',
        description: 'Food is made and delivered directly to your home.',
    },
];

export const cardsOfOrdersData = [
    {
        title: 'Best deals',
        subtitle: 'Crispy Sandwiches',
        description:
            'Enjoy the large size of sandwiches. Complete perfect slice of sandwiches.',
        link: '/restaurant/pizza-hub',
    },
    {
        title: 'Celebrate parties with',
        subtitle: 'Fried Chicken',
        description:
            'Get the best fried chicken smeared with a lip smacking lemon chili flavor. Check out best deals for fried chicken.',
        link: '/restaurant/kuakata-fried-chicken',
    },
    {
        title: 'Wanna eat hot & spicy',
        subtitle: 'Pizza?',
        description:
            'Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals.',
        link: '/search/pizza',
    },
];

export const flashDealsData = [
    {
        name: 'Greys Vage',
        description: '6 Days Remaining',
        discount: 15,
    },
    {
        name: 'Greys Vage',
        description: '6 Days Remaining',
        discount: 10,
    },
    {
        name: 'Greys Vage',
        description: '7 Days Remaining',
        discount: 25,
    },
    {
        name: 'Greys Vage',
        description: '8 Days Remaining',
        discount: 20,
    },
];

export const footerData = [
    {
        title: 'Company',
        items: ['About us', 'Team', 'Careers', 'Blog'],
    },
    {
        title: 'Contact',
        items: ['Help & Support', 'Partner with us', 'Ride with us'],
    },
    {
        title: 'Legal',
        items: [
            'Terms & Conditions',
            'Refund & Cancellation',
            'Privacy Policy',
            'Cookie Policy',
        ],
    },
];

export const userPopupNavPanelData = [
    {
        id: 'personal__data',
        name: 'user__info',
        label: 'Personal Data',
        value: '1',
    },
    {
        id: 'address__data',
        name: 'user__info',
        label: 'Address Data',
        value: '2',
    },
    {
        id: 'order-history__data',
        name: 'user__info',
        label: 'Order History',
        value: '3',
    },
];

export const userPopupInputsPersonalData = [
    { name: 'name', value: 'name', type: 'text' },
    { name: 'email', value: 'email', type: 'email' },
    { name: 'password', value: 'password', type: 'password' },
    { name: 'phone', value: 'phone', type: 'tel' },
];

export const userPopupInputsAddressData = [
    { name: 'city', value: 'city', type: 'text' },
    { name: 'street', value: 'street', type: 'text' },
    { name: 'house', value: 'house', type: 'text' },
    { name: 'level', value: 'level', type: 'number' },
    { name: 'apartment', value: 'apartment', type: 'text' },
];

export const searchedListOptions = [
    { value: '0', label: 'All' },
    { value: '1', label: 'Pizza' },
    { value: '2', label: 'World' },
    { value: '3', label: 'Sushi' },
    { value: '4', label: 'Taco' },
];

export const restaurantFilterOptions = [
    { value: '0', label: 'Featured' },
    { value: '1', label: 'Low to High' },
    { value: '2', label: 'High to Low' },
];

export const templateErrorMessagesOfInput = {
    basic: 'is the required field',
    phone: 'must be 10 length symbols',
    email: 'your email must contain symbols @ and .',
};
