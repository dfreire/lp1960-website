const dotenv = require('dotenv')
const fs = require('fs');
const path = require('path');
import Document from './src/Document';

const config = dotenv.config().parsed;
const { SITE_ROOT, DK_SERVER } = config;
const CONTENT_DIR = path.join(process.cwd(), '..', 'lp1960-diskette-data', 'content');

const root = require(path.join(CONTENT_DIR, 'index.json'));
const introPage = require(path.join(CONTENT_DIR, '0-intro', 'index.json'));
const imagesPage = require(path.join(CONTENT_DIR, '1-imagens-old', 'index.json'));
const projectsPage = require(path.join(CONTENT_DIR, '2-projectos-old', 'index.json'));

function listDirs(location) {
	const dir = path.join(location);

	const list = [];

	fs.readdirSync(dir).forEach(subDir => {
		fs.statSync(path.join(dir, subDir)).isDirectory() && list.push(subDir);
	});

	list.sort((a, b) => {
		const a1 = parseInt(a.split('-')[0]);
		const b1 = parseInt(b.split('-')[0]);
		return a1 - b1;
	});

	return list;
}

const imageList = listDirs(path.join(CONTENT_DIR, '1-imagens-old')).map(dir => {
	const image = require(path.join(CONTENT_DIR, '1-imagens-old', dir, 'index.json'));
	image.baseUrl = `${DK_SERVER}/api/files/1-imagens-old/` + dir;
	return image;
});

const projectList = listDirs(path.join(CONTENT_DIR, '2-projectos-old')).map(dir => {
	const image = require(path.join(CONTENT_DIR, '2-projectos-old', dir, 'index.json'));
	image.baseUrl = `${DK_SERVER}/api/files/2-projectos-old/` + dir;
	return image;
});

export default {
	siteRoot: SITE_ROOT,

	Document,

	getSiteData: async () => {
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