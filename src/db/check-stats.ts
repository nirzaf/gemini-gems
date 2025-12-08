import { getGemStats } from '../lib/db-utils';

async function checkStats() {
    try {
        console.log('Checking gem stats...');
        const stats = await getGemStats();
        console.log('Stats:', JSON.stringify(stats, null, 2));
    } catch (error) {
        console.error('Error checking stats:', error);
    }
}

checkStats();
