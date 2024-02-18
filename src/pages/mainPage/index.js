import {
    DeliveryBanner,
    AboutService,
    Banner,
    CardsOfOrders,
    ErrorBoundary,
    FeatureRestaurants,
    FeaturesApp,
    FlashDeals,
    FoodCategory,
    PopularItems,
    ScrollToTopButton,
} from '../../components';

const MainPage = () => {
    return (
        <>
            <DeliveryBanner />
            <ErrorBoundary>
                <PopularItems />
            </ErrorBoundary>
            <FlashDeals />
            <ErrorBoundary>
                <FeatureRestaurants />
            </ErrorBoundary>
            <AboutService />
            <ErrorBoundary>
                <FoodCategory />
            </ErrorBoundary>
            <FeaturesApp />
            <CardsOfOrders />
            <Banner />
            <ScrollToTopButton scrollTopValue={500} />
        </>
    );
};

export default MainPage;
