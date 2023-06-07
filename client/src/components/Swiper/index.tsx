// Import Swiper React components
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-element.min.css";
import "swiper/swiper-bundle.min.css";

const Slide = styled(SwiperSlide)`
	border: 1px solid #ccc;
	padding: 20px;
	border-radius: 10px;
	cursor: pointer;
	margin-top: 20px;
	margin-bottom: 40px;
`;

type SlideType = {
	title: string;
};

interface SliderProps {
	sliderData: SlideType[];
}

function Slider({ sliderData }: SliderProps) {
	return (
		<Swiper
			style={{
				"--swiper-padding-bottom": "40px",
				"--swiper-pagination-color": "blue",
				"--swiper-pagination-bullet-inactive-color": "#999999",
				"--swiper-pagination-bullet-inactive-opacity": "1",
				"--swiper-pagination-bullet-size": "16px",
				"--swiper-pagination-bullet-horizontal-gap": "16px",
				"--swiper-pagination-bottom": "0px",
			}}
			modules={[Pagination]}
			spaceBetween={50}
			slidesPerView={3}
			pagination={{ clickable: true }}
		>
			{sliderData.map((slide) => (
				<Slide key={slide.title}>{slide.title}</Slide>
			))}
		</Swiper>
	);
}

export default Slider;
