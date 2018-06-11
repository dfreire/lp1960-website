const dotenv = require('dotenv')
const axios = require('axios');
const path = require('path');
import Document from'./src/Document';

const config = dotenv.config().parsed;

axios.defaults.headers.common['Authorization'] = `Bearer ${config.DK_API_KEY}`;

export default {
	siteRoot: config.SITE_ROOT,

	Document,

	getSiteData: async () => {
		const {
			data: root
		} = await axios.get(`${config.DK_SERVER}/api/content`);

		const {
			data: introPage
		} = await axios.get(`${config.DK_SERVER}/api/content/0-intro`);

		const {
			data: imagesPage
		} = await axios.get(`${config.DK_SERVER}/api/content/1-imagens`);

		const {
			data: projectsPage
		} = await axios.get(`${config.DK_SERVER}/api/content/2-projectos`);

		const links = [{
				to: '/intro',
				name: introPage.fields.title_pt,
			},
			{
				to: '/imagens',
				name: imagesPage.fields.title_pt,
			},
			{
				to: '/projectos',
				name: projectsPage.fields.title_pt,
			},
		];

		return {
			links,
			title: root.fields.title_pt,
		}
	},
	getRoutes: async () => {
		const {
			data: introPage
		} = await axios.get(`${config.DK_SERVER}/api/content/0-intro`);

		const {
			data: imagesPage
		} = await axios.get(`${config.DK_SERVER}/api/content/1-imagens`);

		const {
			data: imageDirs
		} = await axios.get(`${config.DK_SERVER}/api/dirs/1-imagens`);

		const {
			data: projectsPage
		} = await axios.get(`${config.DK_SERVER}/api/content/2-projectos`);

		const {
			data: projectDirs
		} = await axios.get(`${config.DK_SERVER}/api/dirs/2-projectos`);

		const imageList = [];
		for (let i = 0; i < imageDirs.length; i++) {
			const dir = imageDirs[i];
			const {
				data: image
			} = await axios.get(`${config.DK_SERVER}/api/content/1-imagens/` + dir);
			image.baseUrl = `${config.DK_SERVER}/api/files/1-imagens/` + dir;
			imageList.push(image);
		}

		const projectList = [];
		for (let i = 0; i < projectDirs.length; i++) {
			const dir = projectDirs[i];
			const {
				data: image
			} = await axios.get(`${config.DK_SERVER}/api/content/2-projectos/` + dir);
			image.baseUrl = `${config.DK_SERVER}/api/files/2-projectos/` + dir;
			projectList.push(image);
		}

		return [{
				path: '/',
				component: 'src/pages/Home.jsx',
			}, {
				path: '/intro',
				component: 'src/pages/Intro.jsx',
				getData: () => ({
					text: introPage.fields.text,
				}),
			},
			{
				path: '/imagens',
				component: 'src/pages/ImageList.jsx',
				getData: () => {
					const images = imageList
						.filter(item => item.fields.image != null)
						.map((item, i) => ({
							href: `/imagens/${i}`,
							src: `${item.baseUrl}/${item.fields.image}`,
						}));
					return {
						images,
					}
				},
				children: imageList.map((item, i) => ({
					path: `/${i}`,
					component: 'src/pages/Image.jsx',
					getData: () => ({
						src: `${item.baseUrl}/${item.fields.image}`,
					})
				})),
			},
			{
				path: '/projectos',
				component: 'src/pages/ImageList.jsx',
				getData: () => {
					const images = projectList
						.filter(item => item.fields.image != null)
						.map((item, i) => ({
							href: `/projectos/${i}`,
							src: `${item.baseUrl}/${item.fields.image}`,
						}));
					return {
						images,
					}
				},
				children: projectList.map((item, i) => ({
					path: `/${i}`,
					component: 'src/pages/Image.jsx',
					getData: () => ({
						src: `${item.baseUrl}/${item.fields.image}`,
					})
				})),
			},
			{
				is404: true,
				component: 'src/pages/404.jsx',
			},
		]
	},
}