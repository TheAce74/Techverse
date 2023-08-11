import { testimonials } from "../../../data/testimonials";
import Testimonial from "./Testimonial";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>What previous attendees have to say</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        tag="ul"
        breakpoints={{
          1024: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        }}
      >
        {testimonials.map(({ id, ...otherProps }) => (
          <SwiperSlide key={id}>
            <Testimonial {...otherProps} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
export default Testimonials;
