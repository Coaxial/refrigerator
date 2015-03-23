/* Extracts haikus form the nytimes page and saves them to a file so we don't
 * need to hammer the website with requests
 **/
var xray = require('x-ray');
var phantom = require('x-ray-phantom');
var _ = require('lodash');

var loot = [];
var base_url = 'http://haiku.nytimes.com';

/*
var current_page = 1;
var extractHaikus = function(err, haikus) {
  console.log('extracting haikus');
  if (err) return console.log('error!', err);
  loot = loot.concat(haikus);
  console.log('haikus:', haikus);
  console.log('loot:', loot);
  var next_page = current_page + 1;
  nyt_website.next_page_url = base_url + '/page/' + next_page;
  current_page = next_page;
};

var nyt_website = function(url) {
  console.log('scraping', url);
  xray(url)
    .use(phantom())
    .select([{
      text: {
        line1: '.nytint-haiku-line-1',
        line2: '.nytint-haiku-line-2',
        line3: '.nytint-haiku-line-3'
      },
      date: '.nytint-haiku-date',
      article: {
        headline: '.nytint-article-headline',
        permalink: 'a.nytint-article-headline[href]'
      }
    }])
    .run(extractHaikus)
    .run(function nextPage() {
      console.log('moving on to the next page');
      nyt_website(nyt_website.next_page_url);
    });
};

nyt_website(base_url);
*/

var next_page = 2;
var extractHaikus = function(err, haikus) {
  console.log('extracting haikus');
  if (err) return console.log('error!', err);
  loot = loot.concat(haikus);
  console.log('loot:', loot);
  next_page++;
};

xray(base_url)
  .use(phantom())
  .select([{
    text: {
      line1: '.nytint-haiku-line-1',
      line2: '.nytint-haiku-line-2',
      line3: '.nytint-haiku-line-3'
    },
    date: '.nytint-haiku-date',
    article: {
      headline: '.nytint-article-headline',
      permalink: 'a.nytint-article-headline[href]'
    }
  }])
  .run(extractHaikus)
  .paginate(base_url + '/page/' + next_page); // Doesn't work because it is 
  // expecting a selector containing the link to the next page

