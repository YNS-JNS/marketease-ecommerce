import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Luxury Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>


      {/* our services  */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Commitment to Excellence</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-gray-900">Luxury Experience</h3>
                <p className="mt-2 text-base text-gray-500">We are dedicated to providing unparalleled luxury experiences that exceed the expectations of our clients.</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-gray-900">Exceptional Service</h3>
                <p className="mt-2 text-base text-gray-500">We strive to deliver exceptional service that caters to the unique needs and desires of each client.</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-gray-900">Unmatched Elegance</h3>
                <p className="mt-2 text-base text-gray-500">We are committed to providing properties of unmatched elegance and sophistication.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ________________________ */}

      {/* ___________________ Avis ___________________ */}
      <section id="testimonies" className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
          <div className="mb-12 space-y-5 md:mb-16 md:text-center">
            <div className="inline-block px-3 py-1 text-sm font-semibold text-indigo-100 rounded-lg md:text-center text-cn bg-[#202c47] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
              Words from Others
            </div>
            <h1 className="mb-5 text-3xl font-semibold text-white md:text-center md:text-5xl">
              It's not just us.
            </h1>
            <p className="text-xl text-gray-100 md:text-center md:text-2xl">
              Here's what others have to say about us.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {/* Testimonial 1 */}
            <div className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <a href="https://twitter.com/kanyewest" className="cursor-pointer">
                  <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                    <div className="flex items-center space-x-4">
                      <img src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg" className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Kanye West</h3>
                        <p className="text-gray-500 text-md">Morocco, Casablanca</p>
                      </div>
                    </div>
                    <p className="leading-normal text-gray-300 text-md">I recently had the pleasure of staying at one of Luxury Estate's properties, and it was an experience beyond compare. The attention to detail in every aspect of the accommodation, from the elegant decor to the breathtaking views, truly exceeded my expectations. I can't wait to return for another unforgettable getaway!</p>
                  </div>
                </a>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <a href="https://twitter.com/tim_cook" className="cursor-pointer">
                  <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                    <div className="flex items-center space-x-4">
                      <img src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg" className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Tim Cook</h3>
                        <p className="text-gray-500 text-md">UK, London</p>
                      </div>
                    </div>
                    <p className="leading-normal text-gray-300 text-md">My family and I had the most magical vacation at a Luxury Estate property. From the moment we arrived, we were greeted with warmth and hospitality. The luxurious amenities, coupled with the serene surroundings, made our stay truly unforgettable. We highly recommend Luxury Estate for anyone seeking a lavish and rejuvenating retreat.</p>
                  </div>
                </a>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <a href="https://twitter.com/paraga" className="cursor-pointer">
                  <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                    <div className="flex items-center space-x-4">
                      <img src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg" className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Parag Agrawal" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Parag Agrawal</h3>
                        <p className="text-gray-500 text-md">France, Paris</p>
                      </div>
                    </div>
                    <p className="leading-normal text-gray-300 text-md">As a frequent traveler, I've stayed in many luxury accommodations, but none compare to the experience I had with Luxury Estate. The property was impeccably maintained, and every detail was thoughtfully curated to ensure maximum comfort and relaxation. I was thoroughly impressed and will definitely be returning in the future</p>
                  </div>
                </a>
              </div>
            </div>
            {/* Testimonial 4 */}
            <div className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <a href="https://twitter.com/satyanadella" className="cursor-pointer">
                  <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                    <div className="flex items-center space-x-4">
                      <img src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg" className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Satya Nadella" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Satya Nadella</h3>
                        <p className="text-gray-500 text-md">USA, New York</p>
                      </div>
                    </div>
                    <p className="leading-normal text-gray-300 text-md"> I recently hosted a corporate event at one of Luxury Estate's stunning properties, and it was a resounding success. The venue provided the perfect backdrop for our gathering, with its sophisticated ambiance and top-notch amenities. Our guests were thoroughly impressed, and I received nothing but glowing reviews. Thank you, Luxury Estate, for helping to make our event truly memorable. </p>
                  </div>
                </a>
              </div>
            </div>
            {/* Testimonial 5 */}
            <div className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <a href="https://twitter.com/dan_schulman" className="cursor-pointer">
                  <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                    <div className="flex items-center space-x-4">
                      <img src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg" className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Dan Schulman" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Dan Schulman</h3>
                        <p className="text-gray-500 text-md">USA, Los Angeles</p>
                      </div>
                    </div>
                    <p className="leading-normal text-gray-300 text-md">Luxury Estate is the perfect place to stay. The property is well-maintained and offers a variety of amenities. The staff is friendly and helpful, and the location is convenient. I highly recommend</p>
                  </div>
                </a>
              </div>
            </div>
            {/* Testimonial 6 */}
            <div className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <a href="https://twitter.com/elonmusk" className="cursor-pointer">
                  <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                    <div className="flex items-center space-x-4">
                      <img src="https://pbs.twimg.com/profile_images/1354482386039956481/Btnfm47p_400x400.jpg" className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Elon Musk" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Elon Musk</h3>
                        <p className="text-gray-500 text-md">Morocco, Marrakech</p>
                      </div>
                    </div>
                    <p className="leading-normal text-gray-300 text-md">My partner and I celebrated our anniversary at a Luxury Estate property, and it was an experience we'll cherish forever. The romantic atmosphere, coupled with the impeccable service, made our special occasion truly unforgettable. We were blown away by the attention to detail and the level of luxury provided. We can't wait to return for another romantic getaway!</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ______________________________________ */}
    </div>
  );
}
