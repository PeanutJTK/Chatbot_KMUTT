const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsite(url) {
    try {
        // ดึงข้อมูลจากเว็บไซต์
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // เลือกข้อมูลข่าวหรือรายการทั้งหมด
        const footerNavHdDiv = $('.footer-nav-hd');

        // วนลูปผ่านข้อมูลทั้งหมดและดึงข้อมูลที่ต้องการ
        footerNavHdDiv.each((index, element) => {
            const newsTitle = $(element).find('.selector-for-news-title').text();
            const newsLink = $(element).find('.selector-for-news-link').attr('href');
            
            console.log(`Title: ${newsTitle}`);
            console.log(`Link: ${newsLink}`);
        });
    } catch (error) {
        console.error(`Error scraping ${url}: `, error.message);
    }
}

// ใช้ URL ของหน้าเว็บไซต์ที่ต้องการดึงข้อมูล
scrapeWebsite('https://www.kmutt.ac.th/en/');
