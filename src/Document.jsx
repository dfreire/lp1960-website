import React from 'react';

const Document = ({ Html, Head, Body, children, siteData, renderMeta }) => (
	<Html lang="pt">
		<Head>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>{siteData.title}</title>
		</Head>
		<Body>{children}</Body>
	</Html>
);

export default Document;
