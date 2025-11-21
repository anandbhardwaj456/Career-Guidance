const axios = require('axios');

const TOP_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const ITEM_URL = 'https://hacker-news.firebaseio.com/v0/item';

async function fetchTopTechNews(limit = 5) {
  try {
    const { data: ids } = await axios.get(TOP_STORIES_URL, {
      timeout: 5000, // 5 second timeout
    });
    
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('No stories available');
    }

    const topIds = ids.slice(0, Math.min(limit, 20)); // Max 20 items

    const items = await Promise.all(
      topIds.map(async (id) => {
        try {
          const { data } = await axios.get(`${ITEM_URL}/${id}.json`, {
            timeout: 5000,
          });
          
          // Only return story items with required fields
          if (data && data.type === 'story' && data.title) {
            return {
              id: data.id,
              title: data.title,
              url: data.url || `https://news.ycombinator.com/item?id=${data.id}`,
              score: data.score || 0,
              time: data.time,
              type: data.type,
              by: data.by || 'unknown',
            };
          }
          return null;
        } catch (err) {
          console.warn(`Failed to fetch item ${id}:`, err.message);
          return null;
        }
      })
    );

    // Filter out null items
    return items.filter(item => item !== null);
  } catch (err) {
    console.error('Failed to fetch top stories:', err.message);
    throw new Error('Unable to fetch news from HackerNews API');
  }
}

module.exports = { fetchTopTechNews };
