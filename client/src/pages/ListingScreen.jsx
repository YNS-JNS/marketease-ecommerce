import { useState, useEffect } from 'react';
import ItemListing from '../components/ItemListing';
import { useSelector } from 'react-redux';

const ListingScreen = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchUserListings = async () => {
            try {
                const res = await fetch(`/api/user/listings/${currentUser._id}`);
                const data = await res.json();
                setListings(data);
                console.log("user listing:", data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserListings();
    }, [currentUser._id]);

    const handleListingDelete = async (listingId) => {
        try {
            const res = await fetch(`/api/listing/delete/${listingId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }

            setListings((prev) =>
                prev.filter((listing) => listing._id !== listingId)
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='flex flex-col gap-6 p-10 max-w-6xl mx-auto'>
            <h2 className='text-3xl font-semibold'>Your Listings</h2>
            <div className='flex flex-wrap gap-4'>
                {
                    listings.length > 0 ?
                        (
                            listings.map((listing, index) => (
                                <ItemListing key={index} listing={listing} handleListingDelete={handleListingDelete} />
                            ))
                        )
                        :
                        (
                            <div>
                                <p className='text-xl text-slate-700'>No listing found!</p>
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default ListingScreen;
