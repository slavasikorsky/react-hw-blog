import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import pagesMetaContent from "../../data/pagesMetaContent";

function MetaContent() {
	const location = useLocation();
	useEffect(() => {
		const page = pagesMetaContent.filter(
			(pageMeta) => pageMeta.url === location.pathname
		);

		const description: HTMLElement | null = document.querySelector(
			'meta[name="description"]'
		);
		document.title = page[0]?.title || "My app default title";
		if (description instanceof HTMLMetaElement) {
			description.content =
				page[0]?.description || "Page description here";
		}
	}, [location]);

	return null;
}

export default MetaContent;
