const axios = require('axios');
const cheerio = require('cheerio');

const baseURL = 'https://weworkremotely.com';
let jobsData = [];

const fetchHTML = async (url) => {
    const { data } = await axios.get(url);
    return cheerio.load(data);
};

fetchHTML(`${baseURL}/categories/remote-programming-jobs`).then($ => {
    $('.jobs article ul li').each((i, elem) => {
        if (i > 0) {
            jobsData.push({
                title: $(elem).find('div+a .title').text(),
                company: $(elem).find('div+a .company:first').text(),
                link: baseURL + $(elem).find('div+a').attr('href'),
            });
        }
    });
    console.log(jobsData.slice(0, 5));
});
